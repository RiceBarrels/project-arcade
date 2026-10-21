"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/i18n/config";
import { WRITES_ENABLED } from "@/lib/domain";
import { hasLoanInProgress } from "@/lib/data/account";
import { getCurrentUser } from "@/lib/data/session";
import { createClient } from "@/lib/supabase/server";
import {
  DELETE_CONFIRM_WORD,
  DELETE_ERROR,
  OPEN_LOANS_WARNING,
  PROFILE_ERROR,
  validateProfile,
  type ProfileErrors,
} from "@/components/settings/shared";

// Real write paths for /settings. Server Actions are public endpoints, so each
// one re-reads the session itself and never trusts an id sent by the client.
// Both refuse while WRITES_ENABLED is false (the client shows the preview
// notice instead of calling them). Errors are English source strings (msg in
// shared.ts) that the client translates. Server Actions can't read the page
// locale, so the client passes it in for the redirects.

export type ProfileResult = { ok: true } | { ok: false; error: string; fields?: ProfileErrors };
export type DeleteResult = { ok: false; error: string; loanInProgress?: boolean };

const toLocale = (v: unknown): Locale => (isLocale(v) ? v : DEFAULT_LOCALE);
const loginRedirect = (l: Locale) => `${localePath("/login", l)}?next=${encodeURIComponent(localePath("/settings", l))}`;

export async function updateProfile(input: unknown, locale?: unknown): Promise<ProfileResult> {
  if (!WRITES_ENABLED) return { ok: false, error: PROFILE_ERROR };

  const user = await getCurrentUser();
  if (!user) redirect(loginRedirect(toLocale(locale)));

  const { values, errors } = validateProfile(input);
  if (Object.keys(errors).length > 0) return { ok: false, error: PROFILE_ERROR, fields: errors };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: values.display_name,
      city: values.city || null,
      bio: values.bio || null,
    })
    .eq("id", user.id);
  if (error) return { ok: false, error: PROFILE_ERROR };

  updateTag(`profile:${user.id}`);
  updateTag("profiles");
  return { ok: true };
}

type Supabase = Awaited<ReturnType<typeof createClient>>;

const BUCKET = "item-photos";
const PAGE = 100;
const MAX_ROUNDS = 10;

/** Every file path under `prefix` (recursing into folders), or null on a storage error. */
async function listFilesUnder(supabase: Supabase, prefix: string): Promise<string[] | null> {
  const storage = supabase.storage.from(BUCKET);
  const files: string[] = [];
  const folders = [prefix];
  while (folders.length > 0) {
    const dir = folders.pop()!;
    for (let offset = 0; ; offset += PAGE) {
      const { data, error } = await storage.list(dir, { limit: PAGE, offset });
      if (error || !data) return null;
      for (const entry of data) {
        const full = `${dir}/${entry.name}`;
        // Folders come back with a null id.
        if (entry.id === null) folders.push(full);
        else files.push(full);
      }
      if (data.length < PAGE) break;
    }
  }
  return files;
}

/**
 * Removes everything under item-photos/<uid>/ (layout <uid>/<item_id>/<file>).
 * delete_my_account() refuses while any object remains, and SQL can't delete
 * storage objects, so this has to go through the Storage API first.
 */
async function removeAllPhotos(supabase: Supabase, uid: string): Promise<boolean> {
  for (let round = 0; round < MAX_ROUNDS; round++) {
    const files = await listFilesUnder(supabase, uid);
    if (files === null) return false;
    if (files.length === 0) return true;
    for (let i = 0; i < files.length; i += PAGE) {
      const { error } = await supabase.storage.from(BUCKET).remove(files.slice(i, i + PAGE));
      if (error) return false;
    }
  }
  return false;
}

/** Deletes the signed-in user's account. On success it signs out and redirects, so it only ever returns an error. */
export async function deleteMyAccount(confirm: unknown, locale?: unknown): Promise<DeleteResult> {
  if (!WRITES_ENABLED) return { ok: false, error: DELETE_ERROR };
  if (confirm !== DELETE_CONFIRM_WORD) return { ok: false, error: DELETE_ERROR };

  const l = toLocale(locale);
  const user = await getCurrentUser();
  if (!user) redirect(loginRedirect(l));

  // Check before touching storage: photo removal can't be undone, and the RPC
  // would refuse afterwards anyway, leaving a live account with no photos.
  // (Needs supabase/05 applied: if delete_my_account() doesn't exist yet the
  // RPC fails after the photos are gone, so keep WRITES_ENABLED off until then.)
  if (await hasLoanInProgress(user.id)) {
    return { ok: false, error: OPEN_LOANS_WARNING, loanInProgress: true };
  }

  const supabase = await createClient();
  if (!(await removeAllPhotos(supabase, user.id))) return { ok: false, error: DELETE_ERROR };

  const { error } = await supabase.rpc("delete_my_account");
  if (error) {
    const msg = error.message ?? "";
    if (msg.includes("loan_in_progress")) return { ok: false, error: OPEN_LOANS_WARNING, loanInProgress: true };
    // 'delete_photos_first' (a photo appeared between the cleanup and the call) and anything else.
    return { ok: false, error: DELETE_ERROR };
  }

  // The auth user and its sessions are gone; clear this browser's session cookies.
  await supabase.auth.signOut({ scope: "local" });
  updateTag(`profile:${user.id}`);
  updateTag("profiles");
  updateTag(`owner:${user.id}`);
  updateTag("items");
  redirect(`${localePath("/", l)}?account=deleted`);
}
