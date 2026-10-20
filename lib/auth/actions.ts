"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeNextPath } from "@/lib/domain";
import { createClient } from "@/lib/supabase/server";

// Email + password auth (Supabase). Copy: docs/copy-en.md section 17.
// Rules: never reveal whether an address has an account; never echo an email
// back to the page; only same-site ?next= targets.

export interface FormState {
  error?: string;
  /** Field-level errors keyed by input name. */
  fields?: Record<string, string>;
  /** Neutral success message (e.g. after a resend). */
  ok?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// over_email_send_rate_limit is per address: Auth only hits it when the
// address has an account (it sends nothing for unknown addresses). Showing a
// different message for it would reveal who has an account, so only the
// per-IP request limit gets its own "please wait" message.
const isPerIpLimit = (code: string | undefined) => code === "over_request_rate_limit";
const WAIT = "Please wait a moment before asking for another email.";
const GENERIC = "Something went wrong. Please try again.";

/** Absolute origin of this request, for links in auth emails. Must be allow-listed in Supabase Auth → URL configuration. */
async function siteOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email");
  const password = String(fd.get("password") ?? "");
  const next = safeNextPath(str(fd, "next"), "/en/profile");
  if (!EMAIL_RE.test(email) || !password) return { error: "That email or password isn't right. Try again." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    switch (error.code) {
      case "email_not_confirmed":
        return { error: "Please verify your email before signing in.", fields: { unverified: "1" } };
      case "over_request_rate_limit":
        return { error: "Too many tries. Please wait a few minutes and try again." };
      case "invalid_credentials":
        return { error: "That email or password isn't right. Try again." };
      default:
        return { error: GENERIC };
    }
  }
  redirect(next);
}

export async function signUp(_prev: FormState, fd: FormData): Promise<FormState> {
  const displayName = str(fd, "display_name");
  const city = str(fd, "city");
  const email = str(fd, "email");
  const password = String(fd.get("password") ?? "");
  const fields: Record<string, string> = {};
  if (!displayName || displayName.length > 60) fields.display_name = "Please add a display name (up to 60 characters).";
  if (city.length > 80) fields.city = "Please keep this under 80 characters.";
  if (!EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (password.length < 8) fields.password = "Your password needs at least 8 characters.";
  if (fd.get("adult") !== "on") fields.adult = "You need to be 18 or older to join.";
  if (fd.get("terms") !== "on") fields.terms = "Please agree to the Terms of use and Privacy policy to continue.";
  if (Object.keys(fields).length) return { fields };

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${await siteOrigin()}/auth/confirm?next=/en/welcome`,
      // Read by the on_auth_user_created trigger. over_18_confirmed is the
      // user's own attestation at sign-up (see report: trigger must copy it).
      data: { display_name: displayName, city: city || null, over_18_confirmed: true },
    },
  });
  if (error) {
    if (error.code === "weak_password") return { fields: { password: "Please choose a stronger password (at least 8 characters)." } };
    if (isPerIpLimit(error.code)) return { error: WAIT };
    // Existing-account outcomes (user_already_exists, email_exists, and the
    // per-address send limit) fall through to the same neutral page as a fresh
    // sign-up, so the form never reveals who has an account.
    const neutral = ["user_already_exists", "email_exists", "over_email_send_rate_limit"];
    if (!neutral.includes(error.code ?? "")) {
      return { error: "We couldn't create your account. Please check your details and try again." };
    }
  }
  redirect("/en/check-email");
}

export async function resendVerification(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email");
  if (!EMAIL_RE.test(email)) return { fields: { email: "Please enter a valid email address." } };
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: `${await siteOrigin()}/auth/confirm?next=/en/welcome` },
  });
  if (error && isPerIpLimit(error.code)) return { error: WAIT };
  // Same message whether or not the address exists.
  return { ok: "If that address has an account waiting to be verified, a new link is on its way. It can take a minute." };
}

export async function requestPasswordReset(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email");
  if (!EMAIL_RE.test(email)) return { fields: { email: "Please enter a valid email address." } };
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await siteOrigin()}/auth/confirm?next=/en/reset-password`,
  });
  if (error && isPerIpLimit(error.code)) return { error: WAIT };
  return { ok: "If an account exists for that email, a reset link is on its way." };
}

export async function updatePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { fields: { password: "Your password needs at least 8 characters." } };
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/en/login?next=/en/reset-password");
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    if (error.code === "same_password") return { fields: { password: "Please choose a password you haven't used here before." } };
    if (error.code === "weak_password") return { fields: { password: "Please choose a stronger password (at least 8 characters)." } };
    return { error: GENERIC };
  }
  redirect("/en/profile?password=updated");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/en/login?signed_out=1");
}
