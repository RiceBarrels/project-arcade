// Send feedback: copy (docs/copy-en.md section 19) and limits shared by the
// dialog and its Server Action. Separate from Report (abuse of items/users).
// Copy is English source strings (msg): translate where shown, t(TYPE_LABEL[k]).

import { msg } from "@/i18n/msg";

export const FEEDBACK_TYPES = ["bug", "idea", "other"] as const;
export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export const TYPE_LABEL: Record<FeedbackType, string> = { bug: msg("Bug"), idea: msg("Idea"), other: msg("Other") };
export const PLACEHOLDER: Record<FeedbackType, string> = {
  bug: msg("What happened, and what did you expect? Which page were you on?"),
  idea: msg("What would make this better?"),
  other: msg("Tell us anything."),
};

/** Same limit as the feedback table's check constraint (supabase/08-feedback.sql, pending). */
export const FEEDBACK_MAX = 4000;
export const REPLY_MAX = 200;

export const FEEDBACK_ERRORS = {
  empty: msg("Please write a message first."),
  tooLong: msg("Your message is too long. Please shorten it."),
  failed: msg("Couldn't send your feedback. Please try again."),
  tooMany: msg("You've sent feedback too many times. Please wait a few minutes and try again."),
} as const;

export const FEEDBACK_SENT = msg("Thanks! Your feedback was sent.");
