import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CategoryIcon } from "@/components/category-icon";
import { EmptySearchIllustration } from "@/components/illustrations";
import { ItemCard } from "@/components/item-card";
import { SearchForm } from "@/components/search-form";
import { listItems } from "@/lib/data/catalogue";
import { categories, getCategory } from "@/lib/domain";
import { path } from "@/lib/paths";

export const metadata: Metadata = { title: "Browse" };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function browseHref(category?: string, q?: string) {
  const sp = new URLSearchParams();
  if (category) sp.set("category", category);
  if (q) sp.set("q", q);
  const s = sp.toString();
  return path(`/browse${s ? `?${s}` : ""}`);
}

async function Results({ searchParams }: { searchParams: PageProps<"/[locale]/browse">["searchParams"] }) {
  const sp = await searchParams;
  const rawCategory = first(sp.category);
  // Ignore unknown/blocked category slugs instead of showing an empty page.
  const category = rawCategory && getCategory(rawCategory) ? rawCategory : undefined;
  const q = (first(sp.q) ?? "").trim().slice(0, 80);
  // Title/description/city match in the database; a category name typed into
  // search (e.g. "camping") also selects that category.
  const byName = !category && q ? categories.find((c) => c.name.toLowerCase() === q.toLowerCase()) : undefined;
  const list = byName
    ? await listItems({ category: byName.slug })
    : await listItems({ category, q });

  return (
    <>
      <SearchForm key={q} defaultValue={q} category={category} />
      <nav aria-label="Categories" className="flex flex-wrap gap-2">
        <Chip href={browseHref(undefined, q)} active={!category}>All</Chip>
        {categories.map((c) => (
          <Chip key={c.slug} href={browseHref(c.slug, q)} active={category === c.slug}>
            <CategoryIcon slug={c.slug} /> {c.name}
          </Chip>
        ))}
      </nav>
      <p className="text-sm font-bold" aria-live="polite">
        {list.length} {list.length === 1 ? "item" : "items"}
        {q && <> matching &ldquo;{q}&rdquo;</>}
        {category && <> in {getCategory(category)?.name}</>}
      </p>
      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
          <EmptySearchIllustration className="h-auto w-full max-w-64" />
          <p className="font-bold">
            {q ? "Nothing matches that yet. Try another word, or " : "Nothing here yet. Be the first to "}
            <Link href={path("/list")} className="underline underline-offset-4">list something</Link>.
          </p>
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item) => (
            <li key={item.id}><ItemCard item={item} /></li>
          ))}
        </ul>
      )}
    </>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border-2 border-border px-3 text-sm font-bold shadow-xs ${active ? "bg-primary text-primary-foreground" : "bg-card"}`}
    >
      {children}
    </Link>
  );
}

export default function BrowsePage({ searchParams }: PageProps<"/[locale]/browse">) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black uppercase">Browse the catalogue</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
