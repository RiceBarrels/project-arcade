import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, localeOfPath, localePath } from "@/i18n/config";
import type { Profile } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Data Access Layer for the signed-in user. Everything that depends on "who is
// asking" goes through here. These read cookies (runtime data), so callers must
// sit inside a <Suspense> boundary, a Server Action or a Route Handler.

export interface CurrentUser {
  id: string;
  display_name: string;
  city: string | null;
  bio: string | null;
  over_18_confirmed: boolean;
  created_at: string;
}

/**
 * The verified user (getClaims checks the JWT signature) plus their own
 * profile row, or null when signed out. Never returns the email address.
 * Deduplicated per request with React cache().
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const sub = data?.claims?.sub;
  if (typeof sub !== "string") return null;
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, display_name, city, bio, over_18_confirmed, created_at")
    .eq("id", sub)
    .maybeSingle<Pick<Profile, "id" | "display_name" | "city" | "bio" | "over_18_confirmed" | "created_at">>();
  // A failed read is an outage, not "signed out": surface it (error boundary)
  // instead of sending a signed-in user to /login, which the proxy would
  // bounce straight back (redirect loop).
  if (error) throw error;
  // Signed in per the verified JWT, but no profile row (the sign-up trigger
  // should always create one). Still signed in; show a neutral name.
  if (!profile) {
    return { id: sub, display_name: "Member", city: null, bio: null, over_18_confirmed: false, created_at: new Date(0).toISOString() };
  }
  return profile;
});

/**
 * For private pages and actions: the user, or a redirect to /login with a
 * return path. The login page uses the language nextPath starts with.
 */
export async function requireUser(nextPath: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    const locale = localeOfPath(nextPath) ?? DEFAULT_LOCALE;
    redirect(localePath(`/login?next=${encodeURIComponent(nextPath)}`, locale));
  }
  return user;
}
