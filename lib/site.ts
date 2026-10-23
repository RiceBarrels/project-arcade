import { msg } from "@/i18n/msg";

// Site name chosen by the owner; shown with a small stage label under it in the header.
// Brand words stay in English in every language.
export const SITE_NAME = "project-arcade";
export const SITE_STAGE = "pre-alpha";
export const SITE_URL = "https://project-arcade.ricebarrel.com";
/**
 * Pre-alpha: the site is public but not announced, so search engines are asked
 * not to index or crawl it (layout metadata, global-not-found, app/robots.ts).
 * Flip to true at the public launch (docs/PROJECT.md, "Before going public").
 */
export const ALLOW_SEARCH_INDEXING = false;
/** Sender of account emails (Resend); shown so people can find them in spam. Not a user's address. */
export const EMAIL_SENDER = "no-reply@project-arcade.ricebarrel.com";
export const SITE_TAGLINE = msg("Borrow gear. Return gear. Repeat.");
export const SITE_DESCRIPTION = msg(
  "A non-profit community lending library for gear. Browse, queue up, borrow from people nearby, and pass it on. No ads, no site fees.",
);

// URL prefixes, in the order the language switcher lists them. English is the
// default and the source language (docs/i18n.md). Locales are matched as a
// whole path segment, never as a string prefix, so "zh" can't swallow "zh-hant".
export const LOCALES = ["en", "zh", "zh-hant", "ja", "es", "fr", "ar", "tl", "vi", "ko", "pt", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie that remembers the language picked in the switcher (read by proxy.ts for "/"). */
export const LOCALE_COOKIE = "pa_locale";

export const isLocale = (s: unknown): s is Locale => typeof s === "string" && (LOCALES as readonly string[]).includes(s);
