import { Fragment, type ReactNode } from "react";
import { BackBar } from "@/components/mobile/back-bar";
import { LOCALE_INFO, localePath } from "@/i18n/config";
import { Link } from "@/i18n/link";
import { getT } from "@/i18n/server";
import type { LegalDoc, LegalName } from "@/lib/legal";

// Renders a legal Markdown file (lib/legal.ts) with the page's existing look.
// Supports only what the files use: "## " sections, paragraphs, "- " and "1. "
// lists, **bold**, *emphasis*, `code`, [text](link), and ::: draft / summary /
// note boxes. Any HTML in the file is shown as text.

type Block =
  | { kind: "box"; box: string; text: string }
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul" | "ol"; items: string[] };

function blocks(md: string): Block[] {
  const out: Block[] = [];
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
    } else if (line.startsWith(":::")) {
      const box = line.slice(3).trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(":::")) body.push(lines[i++]);
      i++;
      out.push({ kind: "box", box, text: body.join(" ").trim() });
    } else if (line.startsWith("## ")) {
      out.push({ kind: "h2", text: line.slice(3).trim() });
      i++;
    } else if (/^(- |\d+\. )/.test(line)) {
      const ordered = !line.startsWith("- ");
      const items: string[] = [];
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i]) && lines[i].startsWith("- ") !== ordered) {
        items.push(lines[i].replace(/^(- |\d+\. )/, ""));
        i++;
        while (i < lines.length && /^\s+\S/.test(lines[i])) items[items.length - 1] += ` ${lines[i++].trim()}`;
      }
      out.push({ kind: ordered ? "ol" : "ul", items });
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !/^(:::|## |- |\d+\. )/.test(lines[i])) para.push(lines[i++].trim());
      out.push({ kind: "p", text: para.join(" ") });
    }
  }
  return out;
}

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    last = m.index + m[0].length;
    const [, bold, em, code, label, href] = m;
    if (bold !== undefined) parts.push(<strong key={k++}>{inline(bold)}</strong>);
    else if (em !== undefined) parts.push(<em key={k++}>{inline(em)}</em>);
    else if (code !== undefined) parts.push(<code key={k++}>{code}</code>);
    else if (href.startsWith("/"))
      parts.push(
        <Link key={k++} href={href} className="font-bold underline underline-offset-4">
          {inline(label)}
        </Link>,
      );
    else if (/^https?:\/\//.test(href))
      parts.push(
        <a key={k++} href={href} className="font-bold underline underline-offset-4" rel="noreferrer">
          {inline(label)}
        </a>,
      );
    else parts.push(m[0]);
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const BOX: Record<string, string> = {
  draft: "rounded-lg border-4 border-border bg-destructive p-4 font-bold text-destructive-foreground",
  summary: "rounded-lg border-2 border-border bg-accent p-4 font-medium text-accent-foreground shadow-xs",
  note: "rounded-lg border-2 border-border bg-card p-4 font-medium shadow-xs",
};

function renderBlock(b: Block, key: number, inSection: boolean): ReactNode {
  switch (b.kind) {
    case "box":
      return (
        <p key={key} role={b.box === "draft" ? "note" : undefined} className={BOX[b.box] ?? BOX.note}>
          {inline(b.text)}
        </p>
      );
    case "p":
      return (
        <p key={key} className={inSection ? undefined : "font-medium"}>
          {inline(b.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={key} className="list-disc space-y-1 ps-6">
          {b.items.map((it, j) => (
            <li key={j}>{inline(it)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="list-decimal space-y-3 ps-6">
          {b.items.map((it, j) => (
            <li key={j}>{inline(it)}</li>
          ))}
        </ol>
      );
    case "h2":
      return null;
  }
}

export async function LegalPage({ name, doc }: { name: LegalName; doc: LegalDoc }) {
  const t = await getT();
  // No file in this language yet: the English text, marked as English.
  const fallback = doc.locale !== t.locale;
  const all = blocks(doc.body);
  const englishHref = localePath(`/${name}`, "en");

  // The page header goes after the leading draft box(es), as on the original pages.
  const lead = all.findIndex((b) => !(b.kind === "box" && b.box === "draft"));
  const top = lead === -1 ? all : all.slice(0, lead);
  const rest = lead === -1 ? [] : all.slice(lead);

  // "## " starts a section that runs to the next heading.
  const content: ReactNode[] = [];
  let section: { title: string; body: Block[] } | null = null;
  const flush = () => {
    if (!section) return;
    const s = section;
    content.push(
      <section key={content.length} className="space-y-2">
        <h2 className="text-2xl font-black">{inline(s.title)}</h2>
        {s.body.map((b, j) => renderBlock(b, j, true))}
      </section>,
    );
    section = null;
  };
  for (const b of rest) {
    if (b.kind === "h2") {
      flush();
      section = { title: b.text, body: [] };
    } else if (section) (section as { body: Block[] }).body.push(b);
    else content.push(renderBlock(b, content.length, false));
  }
  flush();

  const info = LOCALE_INFO[doc.locale];
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <BackBar title={doc.title} />
      {t.locale !== "en" && (
        <p role="note" className="rounded-lg border-2 border-border bg-secondary p-4 font-bold text-secondary-foreground shadow-xs">
          {fallback
            ? t("This page isn't available in your language yet, so it's shown in English.")
            : t.rich("This is an unofficial translation. If it differs from the <link>English version</link>, the English version applies.", {
                link: (c) => (
                  <a href={englishHref} hrefLang="en" className="underline underline-offset-4">
                    {c}
                  </a>
                ),
              })}
        </p>
      )}
      <div lang={fallback ? info.htmlLang : undefined} dir={fallback ? info.dir : undefined} className="space-y-6">
        {top.map((b, j) => renderBlock(b, j, false))}
        <header className="space-y-2">
          <h1 className="text-4xl font-black uppercase">{doc.title}</h1>
          <p className="text-sm font-medium">{t("Last updated: {date}", { date: t.date(doc.updated) })}</p>
        </header>
        {content.map((c, j) => (
          <Fragment key={j}>{c}</Fragment>
        ))}
      </div>
    </article>
  );
}
