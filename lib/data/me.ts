import "server-only";
import { offerMsLeft, type Item, type Loan, type QueueEntry } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Reads scoped to the signed-in user. RLS limits every query to rows the user
// may see (own queue entries; loans where they are borrower or lender), so
// these never take a user id from the client.

const ITEM_JOIN =
  "id, owner_id, title, category, safety_ack, description, condition, is_free, fee_amount, fee_period, damage_price, damage_waived, currency, city, photos, status, created_at";

export interface MyQueueRow extends QueueEntry {
  item: Item | null; // null if the item was hidden by its owner
  /** 1-based place in the item's live line, or null when the database can't tell us yet. */
  position: number | null;
  line_length: number;
  /** Time left in an open 48h offer at request time (status "offered" only). */
  ms_left: number | null;
}

function normaliseItem(row: Item | null): Item | null {
  if (!row) return null;
  return { ...row, fee_amount: row.fee_amount == null ? null : Number(row.fee_amount), damage_price: Number(row.damage_price), photos: row.photos ?? [] };
}

/**
 * The caller's place in an item's queue. Needs a SECURITY DEFINER function
 * (queue RLS hides other people's entries). Until the database session adds
 * it, this returns null and the UI says "In line" without a number.
 */
async function queuePosition(supabase: Awaited<ReturnType<typeof createClient>>, itemId: string) {
  const { data, error } = await supabase.rpc("queue_position", { p_item: itemId });
  if (error) return null;
  return typeof data === "number" ? data : null;
}

export async function getMyQueue(): Promise<MyQueueRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("queue_entries")
    .select(`id, item_id, user_id, status, offered_at, created_at, item:items(${ITEM_JOIN})`)
    .in("status", ["waiting", "offered", "expired"])
    .order("created_at", { ascending: true });
  if (error) throw error;
  const rows = (data ?? []) as unknown as (QueueEntry & { item: Item | null })[];
  const now = Date.now(); // request time; this function only runs after a session read
  return Promise.all(
    rows.map(async (r) => {
      const [position, length] = await Promise.all([
        r.status === "expired" ? Promise.resolve(null) : queuePosition(supabase, r.item_id),
        supabase.rpc("item_queue_length", { p_item: r.item_id }),
      ]);
      return {
        ...r,
        item: normaliseItem(r.item),
        position,
        line_length: typeof length.data === "number" ? length.data : 0,
        ms_left: r.status === "offered" && r.offered_at ? offerMsLeft(r.offered_at, now) : null,
      };
    }),
  );
}

export interface LoanWithParties extends Loan {
  item: Pick<Item, "id" | "title" | "category"> | null;
  borrower: { id: string; display_name: string } | null;
  lender: { id: string; display_name: string } | null;
}

const LOAN_SELECT =
  "id, item_id, borrower_id, lender_id, status, damage_note, damage_price, damage_waived, requested_at, item:items(id, title, category), borrower:profiles!loans_borrower_id_fkey(id, display_name), lender:profiles!loans_lender_id_fkey(id, display_name)";

function normaliseLoan(row: LoanWithParties): LoanWithParties {
  return { ...row, damage_price: Number(row.damage_price) };
}

/** Loans the caller lent out that are with the borrower now (waiting for the return check). */
export async function getLoansAwaitingReturn(userId: string): Promise<LoanWithParties[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("loans")
    .select(LOAN_SELECT)
    .eq("lender_id", userId)
    .eq("status", "handed_off")
    .order("requested_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as unknown as LoanWithParties[]).map(normaliseLoan);
}

/** Loans where the caller is borrower or lender and messaging is open (approved onwards). */
export async function getMyConversations(): Promise<LoanWithParties[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("loans")
    .select(LOAN_SELECT)
    .in("status", ["approved", "handed_off", "returned", "damaged"])
    .order("requested_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as unknown as LoanWithParties[]).map(normaliseLoan);
}
