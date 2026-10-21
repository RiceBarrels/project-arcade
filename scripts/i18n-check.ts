// bun run i18n:check [--allow-missing] [locale ...]
// Checks each dictionary in i18n/messages/ against the English source:
// missing keys, extra keys, placeholders ({name}) and tags (<link>) that
// differ from the English, plural forms per Intl.PluralRules, wrong types.
// Also fails when en.json or client-keys.json is older than the code
// (run `bun run i18n:extract`), and checks the legal pages in
// content/legal/<locale>/ against the English ones. Exit code 1 on any problem.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALE_INFO } from "../i18n/config";
import { LOCALES } from "../lib/site";
import { extract, MESSAGES_DIR, ROOT, sortedList, tokens, toEnJson, type Entry } from "./i18n-lib";

const args = process.argv.slice(2);
const allowMissing = args.includes("--allow-missing");
const only = args.filter((a) => !a.startsWith("--"));

// "many" in these languages only applies to millions ("1 millón de"); the
// "other" form covers it, so a missing "many" is a warning, not an error.
const OPTIONAL_CATEGORIES: Record<string, string[]> = { es: ["many"], fr: ["many"], pt: ["many"] };

let failed = false;
const fail = (s: string) => {
  failed = true;
  console.log(`  ERROR ${s}`);
};
const warn = (s: string) => console.log(`  warn  ${s}`);

const res = extract();
const source = res.messages;

console.log("Source");
if (readFileSync(join(MESSAGES_DIR, "en.json"), "utf8") !== toEnJson(source)) fail("en.json is out of date: run bun run i18n:extract");
if (readFileSync(join(ROOT, "i18n", "client-keys.json"), "utf8") !== sortedList(res.clientKeys)) {
  fail("client-keys.json is out of date: run bun run i18n:extract");
}
for (const e of res.errors) fail(e);
if (!failed) console.log(`  ok    ${source.size} keys`);

const show = (s: Set<string> | string[]) => [...s].join(" ") || "(none)";

function compareForm(locale: string, key: string, form: string, english: string, label: string, allowNoCount = false) {
  const en = tokens(english);
  const tr = tokens(form);
  const missingVars = [...en.vars].filter((v) => !tr.vars.has(v) && !(allowNoCount && v === "count"));
  const extraVars = [...tr.vars].filter((v) => !en.vars.has(v));
  if (missingVars.length || extraVars.length) {
    fail(`${locale} "${key}"${label}: placeholders ${show(tr.vars)} should be ${show(en.vars)}`);
  }
  if (en.tags.join() !== tr.tags.join()) fail(`${locale} "${key}"${label}: tags ${show(tr.tags)} should be ${show(en.tags)}`);
}

for (const locale of LOCALES) {
  if (locale === "en" || (only.length && !only.includes(locale))) continue;
  console.log(`\n${locale}`);
  let dict: Record<string, unknown>;
  try {
    dict = JSON.parse(readFileSync(join(MESSAGES_DIR, `${locale}.json`), "utf8"));
  } catch (e) {
    fail(`${locale}.json can't be read: ${(e as Error).message}`);
    continue;
  }
  const categories = new Intl.PluralRules(LOCALE_INFO[locale].intl).resolvedOptions().pluralCategories as string[];
  const missing: string[] = [];
  const failedBefore: boolean = failed;
  failed = false;

  for (const [key, en] of source as Map<string, Entry>) {
    const v = dict[key];
    if (v === undefined || v === "") {
      missing.push(key);
      continue;
    }
    if (typeof en === "string") {
      if (typeof v !== "string") fail(`${locale} "${key}": should be a string`);
      else compareForm(locale, key, v, en, "");
    } else if (typeof v !== "object" || v === null || Array.isArray(v)) {
      fail(`${locale} "${key}": should be plural forms { ${categories.join(", ")} }`);
    } else {
      const forms = v as Record<string, unknown>;
      for (const c of categories) {
        if (typeof forms[c] === "string" && forms[c] !== "") continue;
        if (OPTIONAL_CATEGORIES[locale]?.includes(c)) warn(`${locale} "${key}": no "${c}" form (falls back to "other")`);
        else fail(`${locale} "${key}": missing plural form "${c}"`);
      }
      for (const [c, f] of Object.entries(forms)) {
        // "=0" (exactly zero) is optional in every language.
        if (c !== "=0" && !categories.includes(c)) fail(`${locale} "${key}": "${c}" is not a plural form in ${locale} (${categories.join(", ")}, or "=0")`);
        else if (typeof f !== "string") fail(`${locale} "${key}".${c}: should be a string`);
        // Forms for exact amounts ("zero", "one", "two") may spell the number out instead of using {count}.
        else compareForm(locale, key, f, en.other, `.${c}`, c !== "other");
      }
    }
  }
  const extra = Object.keys(dict).filter((k) => !source.has(k));
  for (const k of extra) fail(`${locale} extra key (not in the source any more): "${k}"`);
  if (missing.length) {
    const line = `${locale}: ${missing.length} of ${source.size} keys missing (shown in English)`;
    if (allowMissing) warn(line);
    else fail(line);
    for (const k of missing.slice(0, 5)) console.log(`        "${k}"`);
    if (missing.length > 5) console.log(`        ... and ${missing.length - 5} more`);
  }
  if (!failed && !missing.length) console.log(`  ok    ${source.size} keys`);
  failed = failedBefore || failed;
}

// ---- Legal pages (content/legal/<locale>/{terms,privacy}.md, docs/i18n.md) ----
// Errors: unreadable header, unknown ::: box, HTML. Warnings: a structure or
// date that differs from the English (usually a translation behind the English).
const LEGAL_DIR = join(ROOT, "content", "legal");
const BOXES = new Set(["draft", "summary", "note"]);

function legalShape(raw: string) {
  const text = raw.replace(/\r\n/g, "\n");
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  const head: Record<string, string> = {};
  for (const line of (m?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) head[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m ? text.slice(m[0].length) : text;
  const lines = body.split("\n");
  return {
    head,
    hasHeader: !!m,
    boxes: lines.filter((l) => /^:::\s*\S/.test(l)).map((l) => l.slice(3).trim()),
    sections: lines.filter((l) => l.startsWith("## ")).length,
    bullets: lines.filter((l) => l.startsWith("- ")).length,
    numbered: lines.filter((l) => /^\d+\. /.test(l)).length,
    html: /<[a-zA-Z][^>]*>/.test(body),
  };
}

console.log("\nLegal pages");
for (const name of ["terms", "privacy"]) {
  const en = legalShape(readFileSync(join(LEGAL_DIR, "en", `${name}.md`), "utf8"));
  for (const locale of LOCALES) {
    if (locale === "en" || (only.length && !only.includes(locale))) continue;
    const file = join(LEGAL_DIR, locale, `${name}.md`);
    const label = `${locale}/${name}.md`;
    if (!existsSync(file)) {
      warn(`${label}: missing (the English page is shown with a notice)`);
      continue;
    }
    const tr = legalShape(readFileSync(file, "utf8"));
    if (!tr.hasHeader || !tr.head.title || !/^\d{4}-\d{2}-\d{2}$/.test(tr.head.updated ?? "")) {
      fail(`${label}: needs a header with title and updated: YYYY-MM-DD`);
    }
    for (const b of tr.boxes) if (!BOXES.has(b)) fail(`${label}: unknown box "::: ${b}"`);
    if (tr.html) fail(`${label}: contains HTML (shown as plain text)`);
    if (tr.head.updated !== en.head.updated) warn(`${label}: updated ${tr.head.updated}, English is ${en.head.updated}`);
    const diffs = (["sections", "bullets", "numbered"] as const).filter((k) => tr[k] !== en[k]).map((k) => `${k} ${tr[k]} vs ${en[k]}`);
    if (tr.boxes.join() !== en.boxes.join()) diffs.push(`boxes ${tr.boxes.join("/")} vs ${en.boxes.join("/")}`);
    if (diffs.length) warn(`${label}: differs from the English: ${diffs.join(", ")}`);
    else if (tr.head.updated === en.head.updated) console.log(`  ok    ${label}`);
  }
}

process.exit(failed ? 1 : 0);
