"use server";

import { headers } from "next/headers";
import { WRITES_ENABLED } from "@/lib/domain";
import { getCurrentUser } from "@/lib/data/session";
import { createClient } from "@/lib/supabase/server";
import { FEEDBACK_ERRORS, FEEDBACK_MAX, FEEDBACK_TYPES, REPLY_MAX, type FeedbackType } from "./shared";

// Stores one piece of feedback for the signed-in user. A Server Action is a
// public endpoint, so it re-reads the session and re-validates everything.
// The account email is never read or stored here; a reply contact is only
// what the person typed. Refuses while WRITES_ENABLED is false (the dialog
// shows the preview notice instead of calling it).

export type FeedbackResult =
  | { ok: true }
  | { ok: false; error: string; field?: "message"; signedOut?: boolean };

/** Shortened user agent: enough to tell browser and OS apart, nothing more. */
function shortUserAgent(ua: string | null) {
  return (ua ?? "").replace(/\s+/g, " ").trim().slice(0, 160) || null;
}

/** Same-site page path only (no query string, which could carry search terms). */
function pagePath(raw: unknown) {
  const p = typeof raw === "string" ? raw.split("?")[0].slice(0, 300) : "";
  return p.startsWith("/") && !p.startsWith("//") ? p : null;
}

export async function sendFeedback(input: {
  type: unknown;
  message: unknown;
  reply: unknown;
  path: unknown;
}): Promise<FeedbackResult> {
  if (!WRITES_ENABLED) return { ok: false, error: FEEDBACK_ERRORS.failed };

  const user = await getCurrentUser();
  if (!user) return { ok: false, error: FEEDBACK_ERRORS.failed, signedOut: true };

  const type = FEEDBACK_TYPES.includes(input.type as FeedbackType) ? (input.type as FeedbackType) : null;
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const reply = typeof input.reply === "string" ? input.reply.trim().slice(0, REPLY_MAX) : "";
  if (!type) return { ok: false, error: FEEDBACK_ERRORS.failed };
  if (!message) return { ok: false, error: FEEDBACK_ERRORS.empty, field: "message" };
  if (message.length > FEEDBACK_MAX) return { ok: false, error: FEEDBACK_ERRORS.tooLong, field: "message" };

  const supabase = await createClient();
  // Column names follow the feedback table planned in supabase/08-feedback.sql;
  // check them against that file before turning writes on.
  const { error } = await supabase.from("feedback").insert({
    user_id: user.id,
    kind: type,
    message,
    reply_contact: reply || null,
    page_path: pagePath(input.path),
    user_agent: shortUserAgent((await headers()).get("user-agent")),
  });
  if (error) {
    // A rate-limit trigger in the database would raise this; anything else is generic.
    if (/rate|too many/i.test(error.message)) return { ok: false, error: FEEDBACK_ERRORS.tooMany };
    return { ok: false, error: FEEDBACK_ERRORS.failed };
  }
  return { ok: true };
}
