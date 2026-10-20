-- project-arcade: row level security. Run after 01-schema.sql.

alter table public.profiles      enable row level security;
alter table public.items         enable row level security;
alter table public.queue_entries enable row level security;
alter table public.loans         enable row level security;
alter table public.reports       enable row level security;

-- ---- profiles: public directory (name/city/bio only; no email here). Edit own row only.
create policy profiles_select on public.profiles for select using (true);
create policy profiles_update on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
-- insert is done by the auth trigger; delete cascades from auth.users

-- ---- items: browseable by everyone except hidden ones; owner manages their own.
create policy items_select on public.items for select
  using (status <> 'hidden' or owner_id = (select auth.uid()));
create policy items_insert on public.items for insert to authenticated
  with check (owner_id = (select auth.uid()));
create policy items_update on public.items for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy items_delete on public.items for delete to authenticated
  using (owner_id = (select auth.uid()));   -- blocked by FK while any loan exists

-- ---- queue_entries: you see/manage your own; the item's lender sees who is queued for their item.
create policy queue_select on public.queue_entries for select to authenticated
  using (user_id = (select auth.uid())
         or exists (select 1 from public.items i where i.id = item_id and i.owner_id = (select auth.uid())));
create policy queue_insert on public.queue_entries for insert to authenticated
  with check (user_id = (select auth.uid()) and status = 'waiting');
create policy queue_update on public.queue_entries for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()) and status in ('waiting', 'cancelled'));  -- users can only leave/rejoin; offered/fulfilled are set by triggers
create policy queue_delete on public.queue_entries for delete to authenticated
  using (user_id = (select auth.uid()));

-- ---- loans: visible only to the two parties. Insert as borrower; transitions are policed by trigger.
create policy loans_select on public.loans for select to authenticated
  using (borrower_id = (select auth.uid()) or lender_id = (select auth.uid()));
create policy loans_insert on public.loans for insert to authenticated
  with check (borrower_id = (select auth.uid()));
create policy loans_update on public.loans for update to authenticated
  using (borrower_id = (select auth.uid()) or lender_id = (select auth.uid()))
  with check (borrower_id = (select auth.uid()) or lender_id = (select auth.uid()));
-- no delete policy: loans are a permanent record

-- ---- reports: write-only inbox for signed-in users; reporters see only their own. Moderation is done
-- with the service role / dashboard (bypasses RLS). No update or delete policy.
create policy reports_select on public.reports for select to authenticated
  using (reporter_id = (select auth.uid()));
create policy reports_insert on public.reports for insert to authenticated
  with check (reporter_id = (select auth.uid()) and status = 'open');
