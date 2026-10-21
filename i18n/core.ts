import { createElement, Fragment, type ReactNode } from "react";
import { LOCALE_INFO, type Locale } from "./config";
import { CONTEXT_SEPARATOR } from "./msg";

// The translator, shared by server (i18n/server.ts) and client (i18n/client.tsx).
// Keys are the English source text (docs/i18n.md). A dictionary maps a key to
// a string, or to plural forms keyed by Intl.PluralRules category. Anything
// missing falls back to the English in the code, so a half-done dictionary
// never breaks a page.

/** Plural categories of the language, plus an optional "=0" for exactly zero. */
export type PluralForms = Partial<Record<Intl.LDMLPluralRule | "=0", string>>;
export type Messages = Record<string, string | PluralForms>;

export type Vars = Record<string, string | number>;
type Tag = (chunks: ReactNode) => ReactNode;
export type RichVars = Record<string, ReactNode | Tag>;

export interface Translator {
  /** t("Hello {name}", { name }) -> string. */
  (source: string, vars?: Vars): string;
  /** A word used in two jobs: t.ctx("item page heading", "Queue") (see msgCtx). */
  ctx(context: string, source: string, vars?: Vars): string;
  /** Text with markup: t.rich("Read the <link>terms</link>", { link: (c) => <Link>{c}</Link> }). */
  rich(source: string, vars: RichVars): ReactNode;
  /** t.plural(n, "{count} item", "{count} items"): `count` is filled in; the "other" form is the key. */
  plural(count: number, one: string, other: string, vars?: Vars): string;
  richPlural(count: number, one: string, other: string, vars: RichVars): ReactNode;
  locale: Locale;
  dir: "ltr" | "rtl";
  /** 1234 -> "1,234" (Western digits everywhere). */
  number(n: number, opts?: Intl.NumberFormatOptions): string;
  /** Item prices: whole amounts without cents, like "$5" or "$5.50". */
  money(n: number, currency?: string): string;
  /** Dates in UTC, so server and browser render the same text. */
  date(d: string | number | Date, opts?: Intl.DateTimeFormatOptions): string;
  /** ["a", "b", "c"] -> "a, b, c" in English, "a、b和c" in Chinese, "a، b وc" in Arabic... */
  list(items: string[]): string;
  /** Lower case by the page language's rules (no-op for scripts without case). */
  lower(s: string): string;
}

// Unicode isolates around values in right-to-left text, so an English name
// or number inside an Arabic sentence keeps its own direction (like <bdi>).
const FSI = "⁨";
const PDI = "⁩";

const TOKEN = /<(\w+)>|<\/(\w+)>|<(\w+)\s*\/>|\{(\w+)\}/g;

export function createTranslator(locale: Locale, messages: Messages): Translator {
  const info = LOCALE_INFO[locale];
  const rtl = info.dir === "rtl";
  const nf = new Intl.NumberFormat(info.intl, { maximumFractionDigits: 2, useGrouping: "min2" });
  const rules = new Intl.PluralRules(info.intl);

  const value = (v: string | number) => {
    const s = typeof v === "number" ? nf.format(v) : v;
    return rtl ? FSI + s + PDI : s;
  };

  // English fallback for a context key "context::text" is the text.
  const english = (key: string) => {
    const i = key.indexOf(CONTEXT_SEPARATOR);
    return i === -1 ? key : key.slice(i + CONTEXT_SEPARATOR.length);
  };

  const lookup = (source: string): string => {
    const m = messages[source];
    return typeof m === "string" && m !== "" ? m : english(source);
  };

  const lookupPlural = (count: number, one: string, other: string): string => {
    const m = messages[other];
    const cat = rules.select(count);
    if (m && typeof m === "object") {
      // "=0" lets a language say "no items" where its rules would use "one" (French "0 objet").
      const form = (count === 0 && m["=0"]) || m[cat] || m.other;
      if (form) return form;
    }
    // English fallback uses English rules, whatever the page language.
    return count === 1 ? one : other;
  };

  const fill = (text: string, vars?: Vars) =>
    vars ? text.replace(/\{(\w+)\}/g, (all, k: string) => (k in vars ? value(vars[k]) : all)) : text;

  const richFill = (text: string, vars: RichVars): ReactNode => {
    const root: ReactNode[] = [];
    const stack: { name: string; children: ReactNode[] }[] = [];
    const out = () => (stack.length ? stack[stack.length - 1].children : root);
    let last = 0;
    let key = 0;
    for (const m of text.matchAll(TOKEN)) {
      if (m.index > last) out().push(text.slice(last, m.index));
      last = m.index + m[0].length;
      const [, open, close, selfClose, ph] = m;
      if (open) stack.push({ name: open, children: [] });
      else if (close) {
        const top = stack.pop();
        if (!top) continue; // stray closing tag
        const fn = vars[top.name];
        const node = typeof fn === "function" ? (fn as Tag)(top.children) : top.children;
        out().push(createElement(Fragment, { key: key++ }, node));
      } else if (selfClose) {
        const v = vars[selfClose];
        out().push(createElement(Fragment, { key: key++ }, typeof v === "function" ? (v as Tag)(null) : v));
      } else if (ph) {
        const v = vars[ph];
        if (v === undefined) out().push(m[0]);
        else if (typeof v === "string" || typeof v === "number") out().push(value(v));
        else out().push(createElement(Fragment, { key: key++ }, v as ReactNode));
      }
    }
    if (last < text.length) out().push(text.slice(last));
    // Unclosed tags: keep their text.
    while (stack.length) root.push(...stack.shift()!.children);
    return createElement(Fragment, null, ...root);
  };

  const t = ((source: string, vars?: Vars) => fill(lookup(source), vars)) as Translator;
  t.ctx = (context, source, vars) => fill(lookup(context + CONTEXT_SEPARATOR + source), vars);
  t.rich = (source, vars) => richFill(lookup(source), vars);
  t.plural = (count, one, other, vars) => fill(lookupPlural(count, one, other), { count, ...vars });
  t.richPlural = (count, one, other, vars) => richFill(lookupPlural(count, one, other), { count, ...vars });
  t.locale = locale;
  t.dir = info.dir;
  t.number = (n, opts) => new Intl.NumberFormat(info.intl, opts).format(n);
  t.money = (n, currency = "USD") => {
    const digits = n % 1 ? 2 : 0;
    const opts = { style: "currency", minimumFractionDigits: digits, maximumFractionDigits: digits } as const;
    try {
      return new Intl.NumberFormat(info.intl, { ...opts, currency }).format(n);
    } catch {
      return new Intl.NumberFormat(info.intl, { ...opts, currency: "USD" }).format(n); // malformed code in a row
    }
  };
  t.date = (d, opts = { year: "numeric", month: "short", day: "numeric" }) =>
    new Intl.DateTimeFormat(info.intl, { timeZone: "UTC", ...opts }).format(new Date(d));
  // English keeps the plain comma list the site has always shown; other
  // languages get their own "and" and separators.
  t.list = (items) => new Intl.ListFormat(info.intl, { type: locale === "en" ? "unit" : "conjunction" }).format(items);
  t.lower = (s) => s.toLocaleLowerCase(info.htmlLang);
  return t;
}
