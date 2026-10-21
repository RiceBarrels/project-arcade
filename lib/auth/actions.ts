"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { localeFromForm, localePath } from "@/i18n/config";
import { msg } from "@/i18n/msg";
import { safeNextPath } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Email + password auth (Supabase). Copy: docs/copy-en.md section 17.
// Rules: never reveal whether an address has an account; never echo an email
// back to the page; only same-site ?next= targets.
// Server Actions can't read the page locale: forms post a hidden "locale"
// field (localeFromForm) for redirects and email links, and every message
// returned here is a msg() English key the form shows with t(...).

export interface FormState {
  /** msg() key, translated by the form. */
  error?: string;
  /** Field-level errors (msg() keys) keyed by input name. */
  fields?: Record<string, string>;
  /** Neutral success message (msg() key, e.g. after a resend). */
  ok?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// over_email_send_rate_limit is per address: Auth only hits it when the
// address has an account (it sends nothing for unknown addresses). Showing a
// different message for it would reveal who has an account, so only the
// per-IP request limit gets its own "please wait" message.
const isPerIpLimit = (code: string | undefined) => code === "over_request_rate_limit";
const WAIT = msg("Please wait a moment before asking for another email.");
const GENERIC = msg("Something went wrong. Please try again.");
const BAD_LOGIN = msg("That email or password isn't right. Try again.");
const BAD_EMAIL = msg("Please enter a valid email address.");
const SHORT_PASSWORD = msg("Your password needs at least 8 characters.");
const WEAK_PASSWORD = msg("Please choose a stronger password (at least 8 characters).");

/** Absolute origin of this request, for links in auth emails. Must be allow-listed in Supabase Auth → URL configuration. */
async function siteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  const locale = localeFromForm(fd);
  const email = str(fd, "email");
  const password = String(fd.get("password") ?? "");
  const next = safeNextPath(str(fd, "next"), localePath("/profile", locale));
  if (!EMAIL_RE.test(email) || !password) return { error: BAD_LOGIN };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    switch (error.code) {
      case "email_not_confirmed":
        return { error: msg("Please verify your email before signing in."), fields: { unverified: "1" } };
      case "over_request_rate_limit":
        return { error: msg("Too many tries. Please wait a few minutes and try again.") };
      case "invalid_credentials":
        return { error: BAD_LOGIN };
      default:
        return { error: GENERIC };
    }
  }
  redirect(next);
}

export async function signUp(_prev: FormState, fd: FormData): Promise<FormState> {
  const locale = localeFromForm(fd);
  const displayName = str(fd, "display_name");
  const city = str(fd, "city");
  const email = str(fd, "email");
  const password = String(fd.get("password") ?? "");
  const fields: Record<string, string> = {};
  if (!displayName || displayName.length > 60) fields.display_name = msg("Please add a display name (up to 60 characters).");
  if (city.length > 80) fields.city = msg("Please keep this under 80 characters.");
  if (!EMAIL_RE.test(email)) fields.email = BAD_EMAIL;
  if (password.length < 8) fields.password = SHORT_PASSWORD;
  if (fd.get("adult") !== "on") fields.adult = msg("You need to be 18 or older to join.");
  if (fd.get("terms") !== "on") fields.terms = msg("Please agree to the Terms of use and Privacy policy to continue.");
  if (Object.keys(fields).length) return { fields };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${await siteOrigin()}/auth/confirm?next=${localePath("/welcome", locale)}`,
      // Read by the on_auth_user_created trigger. over_18_confirmed is the
      // user's own attestation at sign-up (see report: trigger must copy it).
      data: { display_name: displayName, city: city || null, over_18_confirmed: true },
    },
  });
  if (error) {
    if (error.code === "weak_password") return { fields: { password: WEAK_PASSWORD } };
    if (isPerIpLimit(error.code)) return { error: WAIT };
    // Existing-account outcomes (user_already_exists, email_exists, and the
    // per-address send limit) fall through to the same neutral page as a fresh
    // sign-up, so the form never reveals who has an account.
    const neutral = ["user_already_exists", "email_exists", "over_email_send_rate_limit"];
    if (!neutral.includes(error.code ?? "")) {
      return { error: msg("We couldn't create your account. Please check your details and try again.") };
    }
  }
  redirect(localePath("/check-email", locale));
}

export async function resendVerification(_prev: FormState, fd: FormData): Promise<FormState> {
  const locale = localeFromForm(fd);
  const email = str(fd, "email");
  if (!EMAIL_RE.test(email)) return { fields: { email: BAD_EMAIL } };
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/confirm?next=${localePath("/welcome", locale)}` },
  });
  if (error && isPerIpLimit(error.code)) return { error: WAIT };
  // Same message whether or not the address exists.
  return { ok: msg("If that address has an account waiting to be verified, a new link is on its way. It can take a minute.") };
}

export async function requestPasswordReset(_prev: FormState, fd: FormData): Promise<FormState> {
  const locale = localeFromForm(fd);
  const email = str(fd, "email");
  if (!EMAIL_RE.test(email)) return { fields: { email: BAD_EMAIL } };
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await siteOrigin()}/auth/confirm?next=${localePath("/reset-password", locale)}`,
  });
  if (error && isPerIpLimit(error.code)) return { error: WAIT };
  // Same message whether or not the address exists.
  return { ok: msg("If an account exists for that email, a reset link is on its way.") };
}

export async function updatePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const locale = localeFromForm(fd);
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { fields: { password: SHORT_PASSWORD } };
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect(localePath(`/login?next=${localePath("/reset-password", locale)}`, locale));
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    if (error.code === "same_password") return { fields: { password: msg("Please choose a password you haven't used here before.") } };
    if (error.code === "weak_password") return { fields: { password: WEAK_PASSWORD } };
    return { error: GENERIC };
  }
  redirect(localePath("/profile?password=updated", locale));
}

/** <form action={signOut}> with a hidden "locale" input. */
export async function signOut(fd: FormData) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(localePath("/login?signed_out=1", localeFromForm(fd)));
}
