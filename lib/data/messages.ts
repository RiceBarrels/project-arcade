import "server-only";
import type { ThreadMessage } from "@/components/messages/types";
import { isUuid, type LoanStatus } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Reads for in-site messages. RLS limits loans and messages to the two parties
// of a loan, so nothing here takes a user id from the client.

/**
 * Messages of one loan, oldest first. supabase/05-messages-and-deletion.sql may
 * not have run yet (no messages table), so any error means "no messages".
 */
export async function getMessages(loanId: string): Promise<ThreadMessage[]> {
  if (!isUuid(loanId)) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("id, loan_id, sender_id, body, created_at")
      .eq("loan_id", loanId)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true });
    if (error || !data) return [];
    return data as ThreadMessage[];
  } catch {
    return [];
  }
}

/**
 * item_title snapshots (added in 05) for the given loans, keyed by loan id.
 * getMyConversations() doesn't select the column, so the list page reads it
 * here. Before 05 runs (no column) or on any error this is empty and callers
 * fall back to the joined item's title.
 */
export async function getLoanItemTitles(loanIds: string[]): Promise<Map<string, string>> {
  const ids = loanIds.filter(isUuid);
  if (ids.length === 0) return new Map();
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("loans").select("id, item_title").in("id", ids);
    if (error || !data) return new Map();
    const rows = data as unknown as { id: string; item_title: string | null }[];
    return new Map(rows.flatMap((r) => (r.item_title ? [[r.id, r.item_title] as const] : [])));
  } catch {
    return new Map();
  }
}

export interface ThreadLoan {
  id: string;
  status: LoanStatus;
  /** Snapshot of the item title (added in 05); null before 05 runs. */
  item_title: string | null;
  borrower_id: string | null;
  lender_id: string | null;
  item: { id: string; title: string; category: string } | null;
  borrower: { id: string; display_name: string } | null;
  lender: { id: string; display_name: string } | null;
}

const LOAN_BASE =
  "id, status, borrower_id, lender_id, item:items(id, title, category), borrower:profiles!loans_borrower_id_fkey(id, display_name), lender:profiles!loans_lender_id_fkey(id, display_name)";

/** One loan the caller is a party of, or null (missing, or hidden by RLS). */
export async function getThreadLoan(loanId: string): Promise<ThreadLoan | null> {
  if (!isUuid(loanId)) return null;
  const supabase = await createClient();
  const load = async (select: string) => {
    const { data, error } = await supabase.from("loans").select(select).eq("id", loanId).maybeSingle();
    return { data: data as unknown as Partial<ThreadLoan> | null, error };
  };
  let res = await load(`${LOAN_BASE}, item_title`);
  // Before 05 runs there is no item_title column; retry without it.
  if (res.error) res = await load(LOAN_BASE);
  if (res.error) throw res.error;
  if (!res.data) return null;
  return { item_title: null, ...res.data } as ThreadLoan;
}
