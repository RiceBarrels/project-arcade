// Copy and validation shared by the /settings client forms and server actions.
// Copy: docs/copy-en.md 17.7 (17.8 for the preview notice). The deleted/kept
// list mirrors public.delete_my_account() in supabase/05-messages-and-deletion.sql.
// All copy is English source strings (msg): translate where shown, t(PROFILE_SAVED).
// Field errors keep a {max} placeholder, filled with LIMITS[field] when shown.

import { msg } from "@/i18n/msg";

export const PREVIEW_ONLY = msg("Preview only: nothing was sent or saved yet.");

export const PROFILE_SAVED = msg("Profile saved.");
export const PROFILE_ERROR = msg("Couldn't save your changes. Please try again.");
export const BIO_PLACEHOLDER = msg("A line or two about you and the gear you like. Don't include contact details.");

export const DELETE_TEXT = msg(
  "Permanently delete your account. This can't be undone. You'll see exactly what is deleted and what is kept before you confirm.",
);
export const DELETE_DIALOG_BODY = msg("This can't be undone.");
export const DELETE_CONFIRM_LABEL = msg("Type DELETE to confirm.");
export const DELETED_HEADING = msg("What will be deleted");
export const DELETED_LIST = [
  msg("Your profile"),
  msg("All your items and their photos"),
  msg("Your place in any queues"),
  msg("Your pending and approved requests (they'll be closed automatically)"),
  msg("The text of messages you sent (replaced with \"[message removed]\")"),
];
export const KEPT_HEADING = msg("What will be kept (no longer linked to you)");
export const KEPT_LIST = [
  msg("Borrowing records: item name, dates, damage price, damage notes and status"),
  msg("Messages the other person sent in your conversations"),
  msg("Reports"),
];
export const OPEN_LOANS_WARNING = msg(
  "You have items that are currently handed off. Finish those loans before deleting your account.",
);
// The word people type; not translated (the confirm label and hint name it literally).
export const DELETE_CONFIRM_WORD = "DELETE";
export const DELETE_MISMATCH = msg("Type DELETE exactly as shown to continue.");
export const DELETE_ERROR = msg("Couldn't delete your account. Please try again.");

export const LIMITS = { display_name: 60, city: 80, bio: 500 } as const;

export interface ProfileValues {
  display_name: string;
  city: string;
  bio: string;
}

export type ProfileErrors = Partial<Record<keyof ProfileValues, string>>;

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Trims, then checks lengths. Accepts unknown input so server actions can reuse it on untrusted data. */
export function validateProfile(input: unknown): { values: ProfileValues; errors: ProfileErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const values: ProfileValues = {
    display_name: text(raw.display_name),
    city: text(raw.city),
    bio: text(raw.bio),
  };
  const errors: ProfileErrors = {};
  if (!values.display_name) errors.display_name = msg("Please enter a display name.");
  else if (values.display_name.length > LIMITS.display_name)
    errors.display_name = msg("Display name can be at most {max} characters.");
  if (values.city.length > LIMITS.city) errors.city = msg("City can be at most {max} characters.");
  if (values.bio.length > LIMITS.bio) errors.bio = msg("Bio can be at most {max} characters.");
  return { values, errors };
}
