import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DEFAULT_LOCALE, type Locale } from "@/lib/site";

// Legal pages (Terms of use, Privacy policy) are Markdown files, one per
// language: content/legal/<locale>/<name>.md (format: docs/i18n.md, "Legal
// pages"). A language without its own file gets the English one.

export type LegalName = "terms" | "privacy";

export interface LegalDoc {
  title: string;
  /** Date of the English version this text follows (YYYY-MM-DD). */
  updated: string;
  body: string;
  /** Language of the text actually returned (English when there is no translation). */
  locale: Locale;
}

const DIR = join(process.cwd(), "content", "legal");

function parse(raw: string, locale: Locale): LegalDoc {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(raw.replace(/\r\n/g, "\n"));
  const head: Record<string, string> = {};
  for (const line of (m?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) head[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { title: head.title ?? "", updated: head.updated ?? "", body: m ? raw.replace(/\r\n/g, "\n").slice(m[0].length) : raw, locale };
}

export async function getLegalDoc(name: LegalName, locale: Locale): Promise<LegalDoc> {
  "use cache"; // files only change with a deploy, so the pages prerender
  if (locale !== DEFAULT_LOCALE) {
    const own = await readFile(join(DIR, locale, `${name}.md`), "utf8").catch(() => null);
    if (own) return parse(own, locale);
  }
  return parse(await readFile(join(DIR, DEFAULT_LOCALE, `${name}.md`), "utf8"), DEFAULT_LOCALE);
}
