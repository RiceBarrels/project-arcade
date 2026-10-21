"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { isLocale } from "@/lib/site";

// Vercel Web Analytics (page views only; the package sends nothing outside
// production). No custom events, no user ids. Before anything leaves the
// browser the URL is scrubbed:
// - query string and hash dropped (search terms, ?next=, tokens),
// - ids replaced with placeholders: /zh/item/<id> -> /zh/item/[id],
//   /en/messages/<loanId> -> /en/messages/[loanId], /en/profile/<id> -> /en/profile/[id]
//   (the language prefix is kept, everything after the id is dropped),
// - unknown sections become "[...]",
// - /auth/* (email links) and paths outside a known language are not sent at all.

const ID_SEGMENT: Record<string, string> = { item: "[id]", messages: "[loanId]", profile: "[id]" };
// Page sections sent as they are; anything else (a mistyped URL) becomes "[...]".
const SECTIONS = new Set([
  "browse", "queue", "list", "profile", "item", "messages", "settings", "login", "signup", "terms", "privacy",
  "check-email", "forgot-password", "reset-password", "verify-failed", "welcome",
]);

export function scrubUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const [locale, section, id] = url.pathname.split("/").filter(Boolean);
  if (!isLocale(locale)) return null;
  let path = `/${locale}`;
  if (section) path += `/${SECTIONS.has(section) ? section : "[...]"}`;
  if (id) path += `/${ID_SEGMENT[section] ?? "[...]"}`;
  return `${url.origin}${path}`;
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = scrubUrl(event.url);
  return url ? { ...event, url } : null;
}

export function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
