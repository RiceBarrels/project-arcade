import "server-only";
import { cache } from "react";
import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { DEFAULT_LOCALE, isLocale, LOCALE_INFO, LOCALES, localePath, type Locale } from "./config";
import { createTranslator, type Messages, type Translator } from "./core";
import clientKeys from "./client-keys.json";
import ar from "./messages/ar.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";
import ko from "./messages/ko.json";
import pt from "./messages/pt.json";
import ru from "./messages/ru.json";
import tl from "./messages/tl.json";
import vi from "./messages/vi.json";
import zhHant from "./messages/zh-hant.json";
import zh from "./messages/zh.json";

// Server side of i18n. Dictionaries are bundled with the server (no async
// loading), so the first render already has every string. English needs no
// dictionary: the keys are the English text.

const MESSAGES: Record<Locale, Messages> = {
  en: {},
  zh,
  "zh-hant": zhHant,
  es,
  fr,
  ar,
  tl,
  vi,
  ko,
  pt,
  ru,
};

/**
 * The page's locale, from the [locale] segment (next/root-params). Works in
 * Server Components, generateMetadata and "use cache" functions; not in Server
 * Actions or Route Handlers (pass the locale in from the form instead).
 */
export async function getLocale(): Promise<Locale> {
  const l = await rootLocale().catch(() => undefined);
  return isLocale(l) ? l : DEFAULT_LOCALE;
}

const translator = cache((locale: Locale) => createTranslator(locale, MESSAGES[locale]));

/** Translator for this page's locale: const t = await getT(); t("Browse"). */
export async function getT(): Promise<Translator> {
  return translator(await getLocale());
}

export const getTFor = (locale: Locale) => translator(locale);

const CLIENT_KEYS = new Set<string>(clientKeys as string[]);

/**
 * The part of a dictionary that Client Components can need (keys listed in
 * i18n/client-keys.json by `bun run i18n:extract`). Sent once with the root
 * layout, so client text never waits on a request.
 */
export const getClientMessages = cache((locale: Locale): Messages => {
  const all = MESSAGES[locale];
  if (CLIENT_KEYS.size === 0) return all;
  const out: Messages = {};
  for (const k of Object.keys(all)) if (CLIENT_KEYS.has(k)) out[k] = all[k];
  return out;
});

/**
 * hreflang links for a page (every language plus x-default, which Google needs
 * as a complete set) and its canonical URL. `path` has no locale: "/browse".
 */
export async function alternates(path: string): Promise<Metadata["alternates"]> {
  const locale = await getLocale();
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_INFO[l].htmlLang] = localePath(path, l);
  languages["x-default"] = localePath(path, DEFAULT_LOCALE);
  return { canonical: localePath(path, locale), languages };
}
