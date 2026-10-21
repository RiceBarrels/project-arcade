// Send feedback: copy (docs/copy-en.md section 19) and limits shared by the
// dialog and its Server Action. Separate from Report (abuse of items/users).

export const FEEDBACK_TYPES = ["bug", "idea", "other"] as const;
export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export const TYPE_LABEL: Record<FeedbackType, string> = { bug: "Bug", idea: "Idea", other: "Other" };
export const PLACEHOLDER: Record<FeedbackType, string> = {
  bug: "What happened, and what did you expect? Which page were you on?",
  idea: "What would make this better?",
  other: "Tell us anything.",
};

/** Same limit as the feedback table's check constraint (supabase/08-feedback.sql, pending). */
export const FEEDBACK_MAX = 4000;
export const REPLY_MAX = 200;

export const FEEDBACK_ERRORS = {
  empty: "Please write a message first.",
  tooLong: "Your message is too long. Please shorten it.",
  failed: "Couldn't send your feedback. Please try again.",
  tooMany: "Too many tries. Please wait a few minutes and try again.",
} as const;

export const FEEDBACK_SENT = "Thanks! Your feedback was sent.";
