import "server-only";
import { isUuid } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Account-level reads for /settings. Reads cookies (runtime data), so callers
// must sit inside a <Suspense> boundary or a Server Action.

/**
 * True when the user is a party to a loan whose item is physically out
 * (status handed_off). public.delete_my_account() refuses in that case.
 * Runs as the signed-in user, so RLS limits it to their own loans.
 * Returns false on any error (the delete function is the real backstop).
 */
export async function hasLoanInProgress(userId: string): Promise<boolean> {
  if (!isUuid(userId)) return false; // keeps the .or() filter string safe
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("loans")
      .select("id", { count: "exact", head: true })
      .eq("status", "handed_off")
      .or(`borrower_id.eq.${userId},lender_id.eq.${userId}`);
    if (error) return false;
    return (count ?? 0) > 0;
  } catch {
    return false;
  }
}
