import { msg } from "@/i18n/msg";
import type { LoanStatus } from "@/lib/domain";

// Client-safe shapes for the messages UI (no server-only imports here).

/** One row of public.messages. sender_id null = the sender deleted their account. */
export interface ThreadMessage {
  id: string;
  loan_id: string;
  sender_id: string | null;
  body: string;
  created_at: string;
}

/** Everything the thread view needs, from either the database or lib/mock-messages.ts. */
export interface ThreadData {
  loanId: string;
  status: LoanStatus;
  itemTitle: string;
  itemCategory: string | null;
  /** The signed-in viewer (the sample borrower in preview). */
  myId: string;
  /** The other side of the loan; null when their account was deleted. */
  other: { id: string; display_name: string } | null;
  messages: ThreadMessage[];
}

export const MESSAGE_MAX = 2000;
// English source strings: translate where shown, t(DELETED_ACCOUNT).
export const DELETED_ACCOUNT = msg("Deleted account");
export const DELETED_ITEM = msg("(deleted item)");
