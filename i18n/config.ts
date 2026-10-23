import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from "@/lib/site";

// Per-language settings. Safe to import anywhere (server, client, proxy).

export interface LocaleInfo {
  /** <html lang> and hreflang (BCP 47). */
  htmlLang: string;
  /** Locale handed to Intl (number, date, plural rules). Arabic keeps Western digits and the Gregorian calendar. */
  intl: string;
  dir: "ltr" | "rtl";
  /** Shown in the language switcher, always in its own language. */
  nativeName: string;
  /** Short form for the compact switcher in the desktop header. */
  short: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  en: { htmlLang: "en", intl: "en", dir: "ltr", nativeName: "English", short: "EN" },
  zh: { htmlLang: "zh-Hans", intl: "zh-Hans", dir: "ltr", nativeName: "简体中文", short: "简" },
  "zh-hant": { htmlLang: "zh-Hant", intl: "zh-Hant", dir: "ltr", nativeName: "繁體中文", short: "繁" },
  ja: { htmlLang: "ja", intl: "ja-JP", dir: "ltr", nativeName: "日本語", short: "日" },
  es: { htmlLang: "es", intl: "es", dir: "ltr", nativeName: "Español", short: "ES" },
  fr: { htmlLang: "fr", intl: "fr", dir: "ltr", nativeName: "Français", short: "FR" },
  ar: { htmlLang: "ar", intl: "ar-u-ca-gregory-nu-latn", dir: "rtl", nativeName: "العربية", short: "ع" },
  // Intl data lists Tagalog as Filipino ("fil"); "tl" alone falls back to English rules.
  tl: { htmlLang: "tl", intl: "fil", dir: "ltr", nativeName: "Tagalog", short: "TL" },
  vi: { htmlLang: "vi", intl: "vi", dir: "ltr", nativeName: "Tiếng Việt", short: "VI" },
  ko: { htmlLang: "ko", intl: "ko", dir: "ltr", nativeName: "한국어", short: "한" },
  pt: { htmlLang: "pt-BR", intl: "pt-BR", dir: "ltr", nativeName: "Português (Brasil)", short: "PT" },
  ru: { htmlLang: "ru", intl: "ru", dir: "ltr", nativeName: "Русский", short: "RU" },
};

/** "/browse" -> "/zh/browse"; "/" -> "/zh". Leaves already-prefixed, /auth and external links alone. */
export function localePath(p: string, locale: Locale) {
  if (!p.startsWith("/") || p.startsWith("//")) return p;
  const first = p.split(/[/?#]/)[1] ?? "";
  if (isLocale(first) || first === "auth") return p;
  if (p === "/") return `/${locale}`;
  if (p.startsWith("/?") || p.startsWith("/#")) return `/${locale}${p.slice(1)}`;
  return `/${locale}${p}`;
}

/** The locale a site path starts with ("/zh/item/1" -> "zh"), or null. */
export function localeOfPath(p: string): Locale | null {
  const first = p.split(/[/?#]/)[1] ?? "";
  return isLocale(first) ? first : null;
}

/** "/zh/item/1" -> "/item/1"; "/zh" -> "/". */
export function stripLocale(p: string) {
  const l = localeOfPath(p);
  if (!l) return p;
  const rest = p.slice(l.length + 1);
  return rest === "" || rest.startsWith("?") || rest.startsWith("#") ? `/${rest}` : rest;
}

/** Same page in another language. */
export const switchLocalePath = (p: string, to: Locale) => localePath(stripLocale(p), to);

/** Locale posted by a form (hidden "locale" field), for Server Actions, which can't read the URL segment. */
export function localeFromForm(fd: FormData): Locale {
  const v = fd.get("locale");
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

export { DEFAULT_LOCALE, isLocale, LOCALES, type Locale };
