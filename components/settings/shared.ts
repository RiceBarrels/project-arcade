// Copy and validation shared by the /settings client forms and server actions.
// Copy: docs/copy-en.md 17.7 (17.8 for the preview notice). The deleted/kept
// list mirrors public.delete_my_account() in supabase/05-messages-and-deletion.sql.

export const PREVIEW_ONLY = "Preview only: nothing was sent or saved yet.";

export const PROFILE_SAVED = "Profile saved.";
export const PROFILE_ERROR = "Couldn't save your changes. Please try again.";
export const BIO_PLACEHOLDER = "A line or two about you and the gear you like. Don't include contact details.";

export const DELETE_TEXT =
  "Permanently delete your account. This can't be undone. You'll see exactly what is deleted and what is kept before you confirm.";
export const DELETE_DIALOG_BODY = "This can't be undone.";
export const DELETE_CONFIRM_LABEL = "Type DELETE to confirm.";
export const DELETED_HEADING = "What will be deleted";
export const DELETED_LIST = [
  "Your profile",
  "All your items and their photos",
  "Your place in any queues",
  "Your pending and approved requests (they'll be closed automatically)",
  "The text of messages you sent (replaced with \"[message removed]\")",
];
export const KEPT_HEADING = "What will be kept (no longer linked to you)";
export const KEPT_LIST = [
  "Borrowing records: item name, dates, damage price, damage notes and status",
  "Messages the other person sent in your conversations",
  "Reports",
];
export const OPEN_LOANS_WARNING =
  "You have items that are currently handed off. Finish those loans before deleting your account.";
export const DELETE_CONFIRM_WORD = "DELETE";
export const DELETE_MISMATCH = "Type DELETE exactly as shown to continue.";
export const DELETE_ERROR = "Couldn't delete your account. Please try again.";

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
  if (!values.display_name) errors.display_name = "Please enter a display name.";
  else if (values.display_name.length > LIMITS.display_name)
    errors.display_name = `Display name can be at most ${LIMITS.display_name} characters.`;
  if (values.city.length > LIMITS.city) errors.city = `City can be at most ${LIMITS.city} characters.`;
  if (values.bio.length > LIMITS.bio) errors.bio = `Bio can be at most ${LIMITS.bio} characters.`;
  return { values, errors };
}
