// bun run i18n:extract
// Collects every message from the source (scripts/i18n-lib.ts) and writes:
//   i18n/messages/en.json   key -> English (the template translators copy)
//   i18n/client-keys.json   keys Client Components may need (sent to the browser)
//   i18n/key-sources.json   key -> where it's used, as context for translators
// Then reports dynamic t() calls and visible English that isn't translated yet.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { extract, MESSAGES_DIR, ROOT, sortedList, toEnJson } from "./i18n-lib";

const res = extract();

writeFileSync(join(MESSAGES_DIR, "en.json"), toEnJson(res.messages));
writeFileSync(join(ROOT, "i18n", "client-keys.json"), sortedList(res.clientKeys));
const sources: Record<string, string[]> = {};
for (const k of [...res.sources.keys()].sort((a, b) => a.localeCompare(b, "en"))) sources[k] = res.sources.get(k)!;
writeFileSync(join(ROOT, "i18n", "key-sources.json"), JSON.stringify(sources, null, 2) + "\n");

const plural = [...res.messages.values()].filter((v) => typeof v === "object").length;
console.log(`en.json: ${res.messages.size} keys (${plural} plural), ${res.clientKeys.size} used by Client Components.`);

if (res.dynamic.length) {
  console.log(`\nDynamic t() calls (${res.dynamic.length}); their values must come from msg():`);
  for (const d of res.dynamic) console.log(`  ${d}`);
}
if (res.untranslated.length) {
  console.log(`\nPossibly untranslated text (${res.untranslated.length}):`);
  for (const u of res.untranslated) console.log(`  ${u}`);
} else {
  console.log("\nNo untranslated JSX text or text attributes found.");
}
if (res.errors.length) {
  console.error(`\nErrors (${res.errors.length}):`);
  for (const e of res.errors) console.error(`  ${e}`);
  process.exit(1);
}
