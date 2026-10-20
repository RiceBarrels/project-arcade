-- project-arcade: schema. Run order: 01-schema.sql, 02-rls.sql, 03-storage.sql
-- Not executed anywhere yet. Run in the Supabase SQL editor once the user has created the project.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- enums
create type public.item_condition as enum ('new', 'like_new', 'good', 'fair', 'worn');
create type public.item_status    as enum ('available', 'on_loan', 'hidden');
create type public.queue_status   as enum ('waiting', 'offered', 'fulfilled', 'cancelled', 'expired');  -- expired = offer not answered within 48h
create type public.report_status  as enum ('open', 'reviewing', 'resolved', 'dismissed');
create type public.loan_status    as enum (
  'requested', 'approved', 'handed_off', 'returned', 'damaged',
  'declined', 'cancelled'  -- extra terminal states: lender says no / borrower withdraws
);

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 60),
  city         text check (char_length(city) <= 80),
  bio          text check (char_length(bio) <= 500),
  avatar_url   text,
  over_18_confirmed    boolean not null default false,   -- required before requesting a loan
  over_18_confirmed_at timestamptz,                      -- set by trigger
  created_at   timestamptz not null default now()
);

create function public.profiles_over_18() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'UPDATE' and old.over_18_confirmed and not new.over_18_confirmed then
    raise exception 'over_18_confirmed cannot be withdrawn';
  end if;
  if new.over_18_confirmed and (tg_op = 'INSERT' or not old.over_18_confirmed) then
    new.over_18_confirmed_at := now();
  elsif tg_op = 'UPDATE' then
    new.over_18_confirmed_at := old.over_18_confirmed_at;  -- timestamp is not client-writable
  else
    new.over_18_confirmed_at := null;
  end if;
  return new;
end $$;
create trigger profiles_over_18 before insert or update on public.profiles
  for each row execute function public.profiles_over_18();

-- Create a profile automatically on sign-up (no email stored here; it stays in auth.users).
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1), 'Member')
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- items
create table public.items (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references public.profiles (id) on delete cascade,
  title        text not null check (char_length(title) between 1 and 120),
  -- High-risk categories are not allowed in v1: power/electric tools, vehicles, climbing, medical equipment.
  -- DB-level backstop only; the app should also offer a fixed allowlist of category slugs.
  category     text not null check (char_length(category) <= 60),
  constraint items_category_allowed check (
    lower(category) !~ '(power|electric|cordless)[ _-]*tools?|vehicle|climb|medical'
  ),
  safety_ack   boolean not null check (safety_ack),   -- lender confirms the item is safe to lend
  description  text check (char_length(description) <= 2000),
  condition    public.item_condition not null default 'good',
  is_free      boolean not null default true,
  fee_amount   numeric(10,2) check (fee_amount >= 0),   -- optional small fee, settled off-site
  fee_period   text check (fee_period in ('day', 'week', 'loan')),
  damage_price numeric(10,2) not null check (damage_price >= 0),   -- required answer when listing; no default
  damage_waived boolean not null default false,                     -- lender explicitly says: no charge if damaged
  currency     text not null default 'USD' check (char_length(currency) = 3),
  city         text not null check (char_length(city) <= 80),   -- pickup city/area
  photos       text[] not null default '{}' check (cardinality(photos) <= 8),  -- storage paths in item-photos
  status       public.item_status not null default 'available',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  -- free items carry no fee; fee items must state one
  constraint items_fee_consistent check (
    (is_free and fee_amount is null and fee_period is null)
    or (not is_free and fee_amount is not null and fee_period is not null)
  ),
  -- waived means no damage charge
  constraint items_damage_consistent check (not damage_waived or damage_price = 0)
);
create index items_owner_idx  on public.items (owner_id);
create index items_browse_idx on public.items (status, city, category, created_at desc);

create function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

create trigger items_updated_at before update on public.items
  for each row execute function public.set_updated_at();

-- Owners may not reassign an item to someone else.
create function public.items_lock_owner() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.owner_id <> old.owner_id then raise exception 'owner_id is immutable'; end if;
  return new;
end $$;
create trigger items_lock_owner before update on public.items
  for each row execute function public.items_lock_owner();

-- ---------------------------------------------------------------- queue_entries
-- Early-Netflix queue: a user's queued items. Order per item = created_at (first come, first served).
create table public.queue_entries (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles (id) on delete cascade,
  item_id    uuid not null references public.items (id) on delete cascade,
  status     public.queue_status not null default 'waiting',
  offered_at timestamptz,   -- set by trigger when status becomes 'offered'; response window is 48h
  note       text check (char_length(note) <= 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- one live entry per user per item
create unique index queue_entries_live_uniq on public.queue_entries (user_id, item_id)
  where status in ('waiting', 'offered');
create index queue_entries_item_idx on public.queue_entries (item_id, status, created_at);
create index queue_entries_user_idx on public.queue_entries (user_id, status, created_at);

create trigger queue_entries_updated_at before update on public.queue_entries
  for each row execute function public.set_updated_at();

-- Stamp offered_at when an entry is offered; clear it otherwise. Not client-writable.
create function public.queue_offered_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.status = 'offered' then
    new.offered_at := case when tg_op = 'UPDATE' and old.status = 'offered' then old.offered_at else now() end;
  else
    new.offered_at := null;
  end if;
  return new;
end $$;
create trigger queue_offered_at before insert or update on public.queue_entries
  for each row execute function public.queue_offered_at();

-- A lender cannot queue for their own item.
create function public.queue_no_self() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.items where id = new.item_id and owner_id = new.user_id) then
    raise exception 'cannot queue for your own item';
  end if;
  return new;
end $$;
create trigger queue_no_self before insert on public.queue_entries
  for each row execute function public.queue_no_self();

-- ---------------------------------------------------------------- loans
create table public.loans (
  id            uuid primary key default gen_random_uuid(),
  item_id       uuid not null references public.items (id) on delete restrict,
  borrower_id   uuid not null references public.profiles (id) on delete restrict,
  lender_id     uuid not null references public.profiles (id) on delete restrict,  -- copied from item by trigger
  status        public.loan_status not null default 'requested',
  message       text check (char_length(message) <= 500),
  damage_note   text check (char_length(damage_note) <= 1000),
  damage_price  numeric(10,2) not null,   -- snapshot of items.damage_price taken at request time
  damage_waived boolean not null,         -- snapshot of items.damage_waived
  borrower_ack_damage_price boolean not null check (borrower_ack_damage_price),  -- borrower must confirm the damage price to request
  borrower_ack_at timestamptz not null,   -- set by trigger
  requested_at  timestamptz not null default now(),
  approved_at   timestamptz,
  handed_off_at timestamptz,
  closed_at     timestamptz,     -- returned / damaged / declined / cancelled
  updated_at    timestamptz not null default now(),
  check (borrower_id <> lender_id)
);
create index loans_item_idx     on public.loans (item_id, status);
create index loans_borrower_idx on public.loans (borrower_id, status);
create index loans_lender_idx   on public.loans (lender_id, status);
-- an item has at most one loan out at a time
create unique index loans_one_active_per_item on public.loans (item_id)
  where status in ('approved', 'handed_off');
-- a borrower has at most one open request per item
create unique index loans_one_open_request on public.loans (item_id, borrower_id)
  where status = 'requested';

-- On insert: fill lender + damage price snapshot from the item; force initial state.
create function public.loans_before_insert() returns trigger
language plpgsql security definer set search_path = '' as $$
declare it public.items;
begin
  if not exists (select 1 from public.profiles where id = new.borrower_id and over_18_confirmed) then
    raise exception 'borrower must confirm they are 18 or older';
  end if;
  select * into it from public.items where id = new.item_id;
  if not found then raise exception 'item not found'; end if;
  if it.status <> 'available' then raise exception 'item is not available'; end if;
  new.lender_id    := it.owner_id;
  new.damage_price := it.damage_price;
  new.damage_waived := it.damage_waived;
  new.borrower_ack_at := now();
  new.status       := 'requested';
  new.requested_at := now();
  return new;
end $$;
create trigger loans_before_insert before insert on public.loans
  for each row execute function public.loans_before_insert();

-- State machine. Who may do what:
--   lender:   requested -> approved | declined,  approved -> handed_off | cancelled,
--             handed_off -> returned | damaged (damage_note allowed)
--   borrower: requested | approved -> cancelled
-- Everything else is immutable.
create function public.loans_before_update() returns trigger
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid();
begin
  if new.item_id <> old.item_id or new.borrower_id <> old.borrower_id
     or new.lender_id <> old.lender_id or new.damage_price is distinct from old.damage_price
     or new.damage_waived <> old.damage_waived
     or new.borrower_ack_damage_price <> old.borrower_ack_damage_price
     or new.borrower_ack_at <> old.borrower_ack_at
     or new.requested_at <> old.requested_at then
    raise exception 'immutable loan fields changed';
  end if;

  if new.status <> old.status then
    if uid = old.lender_id and (old.status, new.status) in (
         ('requested','approved'), ('requested','declined'),
         ('approved','handed_off'), ('approved','cancelled'),
         ('handed_off','returned'), ('handed_off','damaged')) then
      null;
    elsif uid = old.borrower_id and old.status in ('requested','approved') and new.status = 'cancelled' then
      null;
    else
      raise exception 'illegal loan transition % -> % for this user', old.status, new.status;
    end if;

    if new.status = 'approved'   then new.approved_at   := now(); end if;
    if new.status = 'handed_off' then new.handed_off_at := now(); end if;
    if new.status in ('returned','damaged','declined','cancelled') then new.closed_at := now(); end if;
  end if;

  -- only the lender writes the damage note
  if new.damage_note is distinct from old.damage_note and uid <> old.lender_id then
    raise exception 'only the lender can set damage_note';
  end if;

  new.updated_at := now();
  return new;
end $$;
create trigger loans_before_update before update on public.loans
  for each row execute function public.loans_before_update();

-- Keep items.status in step with loans, and offer the item to the next person in the queue.
create function public.loans_after_change() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.status in ('approved', 'handed_off') then
    update public.items set status = 'on_loan' where id = new.item_id and status <> 'hidden';
    -- borrower's queue entry for this item is fulfilled
    update public.queue_entries set status = 'fulfilled'
      where item_id = new.item_id and user_id = new.borrower_id and status in ('waiting','offered');
  elsif new.status in ('returned','damaged','declined','cancelled') and old.status in ('approved','handed_off') then
    update public.items set status = 'available' where id = new.item_id and status = 'on_loan';
    -- next in line gets the offer
    update public.queue_entries set status = 'offered'
      where id = (select id from public.queue_entries
                  where item_id = new.item_id and status = 'waiting'
                  order by created_at limit 1);
  end if;
  return new;
end $$;
create trigger loans_after_change after update of status on public.loans
  for each row execute function public.loans_after_change();

-- ---------------------------------------------------------------- reports
-- A report targets exactly one item or one user.
create table public.reports (
  id               uuid primary key default gen_random_uuid(),
  reporter_id      uuid not null references public.profiles (id) on delete cascade,
  reported_item_id uuid references public.items (id) on delete cascade,
  reported_user_id uuid references public.profiles (id) on delete cascade,
  reason           text not null check (char_length(reason) between 1 and 1000),
  status           public.report_status not null default 'open',
  created_at       timestamptz not null default now(),
  constraint reports_one_target check ((reported_item_id is null) <> (reported_user_id is null)),
  constraint reports_not_self  check (reported_user_id is null or reported_user_id <> reporter_id)
);
create index reports_reporter_idx on public.reports (reporter_id, created_at desc);
create index reports_status_idx   on public.reports (status, created_at);

-- ---------------------------------------------------------------- queue offer expiry
-- Offers last 48 hours. NOT scheduled automatically: call it by hand, or from pg_cron once the user decides, e.g.
--   select cron.schedule('expire-queue-offers', '*/15 * * * *', $$select public.expire_stale_offers()$$);
-- Marks unanswered offers 'expired' and offers the item to the next waiting person.
-- Returns the number of offers that expired. Only the postgres/service role can call it.
create function public.expire_stale_offers() returns integer
language plpgsql security definer set search_path = '' as $$
declare
  e record;
  n integer := 0;
begin
  for e in
    select id, item_id from public.queue_entries
    where status = 'offered' and offered_at < now() - interval '48 hours'
    order by offered_at
    for update skip locked
  loop
    update public.queue_entries set status = 'expired' where id = e.id;
    n := n + 1;
    -- next in line, only if the item is free and nobody else currently holds an offer
    if exists (select 1 from public.items where id = e.item_id and status = 'available')
       and not exists (select 1 from public.queue_entries where item_id = e.item_id and status = 'offered') then
      update public.queue_entries set status = 'offered'
        where id = (select id from public.queue_entries
                    where item_id = e.item_id and status = 'waiting'
                    order by created_at limit 1);
    end if;
  end loop;
  return n;
end $$;
revoke execute on function public.expire_stale_offers() from public, anon, authenticated;

-- ---------------------------------------------------------------- public helpers
-- Queue length is public (who is queued is not).
create function public.item_queue_length(p_item uuid) returns integer
language sql stable security definer set search_path = '' as $$
  select count(*)::int from public.queue_entries where item_id = p_item and status in ('waiting','offered');
$$;

-- Simple trust signals for a profile page.
create function public.profile_stats(p_user uuid)
returns table (items_listed int, loans_completed int, loans_damaged int, borrowed_returned int)
language sql stable security definer set search_path = '' as $$
  select
    (select count(*)::int from public.items where owner_id = p_user and status <> 'hidden'),
    (select count(*)::int from public.loans where lender_id = p_user and status = 'returned'),
    (select count(*)::int from public.loans where lender_id = p_user and status = 'damaged'),
    (select count(*)::int from public.loans where borrower_id = p_user and status = 'returned');
$$;
grant execute on function public.item_queue_length(uuid), public.profile_stats(uuid) to anon, authenticated;
