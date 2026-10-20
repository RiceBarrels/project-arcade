// Placeholder name until the owner picks one (see docs/copy-en.md section 1).
export const SITE_NAME = "Gear Arcade";
export const SITE_TAGLINE = "Borrow gear. Return gear. Repeat.";
export const SITE_DESCRIPTION =
  "A free community lending library for gear. Browse, queue up, borrow from people nearby, and pass it on. Non-profit, no ads, no fees.";

export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
