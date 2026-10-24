// Shared by scripts/i18n-extract.ts and scripts/i18n-check.ts (docs/i18n.md).
// Parses the source with the TypeScript compiler and collects every message:
//   t("..."), t.rich("..."), msg("...")                      -> plain key
//   t.plural(n, "one", "other"), t.richPlural(...), msgPlural("one", "other") -> plural key ("other")
//   t.ctx("context", "..."), msgCtx("context", "...")      -> key "context::...", English "..."
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

export const ROOT = join(import.meta.dirname, "..");
export const SCAN_DIRS = ["app", "components", "lib", "i18n", "content"];
export const MESSAGES_DIR = join(ROOT, "i18n", "messages");

export type Entry = string | { one: string; other: string };

export interface Extraction {
  /** key -> English (string, or plural forms). */
  messages: Map<string, Entry>;
  /** key -> "file:line" places it is used. */
  sources: Map<string, string[]>;
  /** Keys a Client Component may need (see clientKeys below). */
  clientKeys: Set<string>;
  /** t(x) with a non-literal argument (fine when x comes from msg()). */
  dynamic: string[];
  /** Visible English that isn't inside t()/msg(): JSX text and text-like attributes. */
  untranslated: string[];
  errors: string[];
}

const TEXT_ATTRS = new Set(["aria-label", "title", "placeholder", "alt", "aria-description"]);

function walk(dir: string, out: string[]) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (name === "node_modules" || full === MESSAGES_DIR || name.startsWith(".")) continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(name) && !name.endsWith(".d.ts")) out.push(full);
  }
}

const literal = (n: ts.Node | undefined) =>
  n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) ? n.text : null;

export function extract(): Extraction {
  const files: string[] = [];
  for (const d of SCAN_DIRS) walk(join(ROOT, d), files);
  files.sort();

  const res: Extraction = {
    messages: new Map(),
    sources: new Map(),
    clientKeys: new Set(),
    dynamic: [],
    untranslated: [],
    errors: [],
  };

  for (const file of files) {
    const rel = relative(ROOT, file);
    const text = readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    // Files that call getT() are async Server Components: their keys never reach the browser.
    // Everything else (Client Components, shared helpers) may render on the client.
    const serverOnly = /\bgetT(For)?\(/.test(text) && !/^["']use client["']/m.test(text);
    const where = (n: ts.Node) => `${rel}:${sf.getLineAndCharacterOfPosition(n.getStart()).line + 1}`;

    const add = (key: string, entry: Entry, node: ts.Node, client: boolean) => {
      if (!key.trim()) {
        res.errors.push(`${where(node)} empty message`);
        return;
      }
      const prev = res.messages.get(key);
      if (prev !== undefined && typeof prev !== typeof entry) {
        res.errors.push(`${where(node)} "${key}" is used both as a plural and as a plain message`);
      } else if (prev && typeof prev === "object" && typeof entry === "object" && prev.one !== entry.one) {
        res.errors.push(`${where(node)} plural "${key}" has two different "one" forms: "${prev.one}" / "${entry.one}"`);
      }
      if (prev === undefined) res.messages.set(key, entry);
      const list = res.sources.get(key) ?? [];
      list.push(where(node));
      res.sources.set(key, list);
      if (client) res.clientKeys.add(key);
    };

    const visit = (node: ts.Node, inMessage: boolean) => {
      let isMessageCall = false;
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        const name = ts.isIdentifier(callee)
          ? callee.text
          : ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === "t"
            ? `t.${callee.name.text}`
            : null;
        const [a0, a1, a2] = node.arguments;
        if (name === "t" || name === "t.rich" || name === "msg") {
          isMessageCall = true;
          const key = literal(a0);
          if (key !== null) add(key, key, node, name === "msg" || !serverOnly);
          else if (name !== "msg") res.dynamic.push(`${where(node)} ${name}(${a0?.getText(sf) ?? ""})`);
          else res.errors.push(`${where(node)} msg() needs a string literal`);
        } else if (name === "t.ctx" || name === "msgCtx") {
          isMessageCall = true;
          const [ctx, src] = [literal(a0), literal(a1)];
          if (ctx !== null && src !== null) add(`${ctx}::${src}`, src, node, name === "msgCtx" || !serverOnly);
          else res.errors.push(`${where(node)} ${name}() needs string literals`);
        } else if (name === "t.plural" || name === "t.richPlural" || name === "msgPlural") {
          isMessageCall = true;
          const [one, other] = name === "msgPlural" ? [literal(a0), literal(a1)] : [literal(a1), literal(a2)];
          if (one !== null && other !== null) add(other, { one, other }, node, name === "msgPlural" || !serverOnly);
          else if (name === "msgPlural") res.errors.push(`${where(node)} msgPlural() needs string literals`);
          else res.dynamic.push(`${where(node)} ${name}(${node.arguments.map((a) => a.getText(sf)).join(", ")})`);
        }
      }
      if (!inMessage && !isMessageCall) {
        if (ts.isJsxText(node)) {
          const s = node.text.replace(/\s+/g, " ").trim();
          if (/[A-Za-z]{2}/.test(s)) res.untranslated.push(`${where(node)} ${JSON.stringify(s)}`);
        } else if (ts.isJsxAttribute(node) && TEXT_ATTRS.has(node.name.getText(sf))) {
          const v = node.initializer && ts.isStringLiteral(node.initializer) ? node.initializer.text : null;
          if (v && /[A-Za-z]{2}/.test(v)) res.untranslated.push(`${where(node)} ${node.name.getText(sf)}=${JSON.stringify(v)}`);
        }
      }
      ts.forEachChild(node, (c) => visit(c, inMessage || isMessageCall));
    };
    visit(sf, false);
  }
  return res;
}

/** en.json content: keys sorted so diffs stay small. */
export function toEnJson(messages: Map<string, Entry>) {
  const obj: Record<string, Entry> = {};
  for (const k of [...messages.keys()].sort((a, b) => a.localeCompare(b, "en"))) obj[k] = messages.get(k)!;
  return JSON.stringify(obj, null, 2) + "\n";
}

export const sortedList = (s: Iterable<string>) => JSON.stringify([...s].sort((a, b) => a.localeCompare(b, "en")), null, 2) + "\n";

/** {name} placeholders and <tag> names in a message, for comparing translations with the English. */
export function tokens(s: string) {
  const vars = new Set([...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]));
  const tags = [...s.matchAll(/<\/?(\w+)\s*\/?>/g)].map((m) => m[0].replace(/\s/g, "")).sort();
  return { vars, tags };
}
