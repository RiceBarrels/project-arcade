import { Suspense } from "react";
import type { Metadata } from "next";
import { CategoryIcon } from "@/components/category-icon";
import { EmptySearchIllustration } from "@/components/illustrations";
import { ItemCard } from "@/components/item-card";
import { SearchForm } from "@/components/search-form";
import { Link } from "@/i18n/link";
import { alternates, getT } from "@/i18n/server";
import { listItems } from "@/lib/data/catalogue";
import { categories, getCategory } from "@/lib/domain";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Browse"), alternates: await alternates("/browse") };
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function browseHref(category?: string, q?: string) {
  const sp = new URLSearchParams();
  if (category) sp.set("category", category);
  if (q) sp.set("q", q);
  const s = sp.toString();
  return `/browse${s ? `?${s}` : ""}`;
}

async function Results({ searchParams }: { searchParams: PageProps<"/[locale]/browse">["searchParams"] }) {
  const [sp, t] = await Promise.all([searchParams, getT()]);
  const rawCategory = first(sp.category);
  // Ignore unknown/blocked category slugs instead of showing an empty page.
  const category = rawCategory && getCategory(rawCategory) ? rawCategory : undefined;
  const q = (first(sp.q) ?? "").trim().slice(0, 80);
  // Title/description/city match in the database; a category name typed into
  // search (e.g. "camping", in English or the page language) also selects that category.
  const byName =
    !category && q
      ? categories.find((c) => [c.name, t(c.name)].some((n) => n.toLowerCase() === q.toLowerCase()))
      : undefined;
  const list = byName
    ? await listItems({ category: byName.slug })
    : await listItems({ category, q });
  const categoryName = category ? t(getCategory(category)?.name ?? "") : "";
  const n = list.length;
  const listLink = (c: React.ReactNode) => <Link href="/list" className="underline underline-offset-4">{c}</Link>;

  return (
    <>
      <SearchForm key={q} defaultValue={q} category={category} />
      {/* md and up: the header's category row does this (components/header/category-nav.tsx). */}
      <nav aria-label={t("Categories")} className="flex flex-wrap gap-2 md:hidden">
        <Chip href={browseHref(undefined, q)} active={!category}>{t("All")}</Chip>
        {categories.map((c) => (
          <Chip key={c.slug} href={browseHref(c.slug, q)} active={category === c.slug}>
            <CategoryIcon slug={c.slug} /> {t(c.name)}
          </Chip>
        ))}
      </nav>
      <p className="text-sm font-bold" aria-live="polite">
        {q && category
          ? t.plural(n, "{count} item matching “{q}” in {category}", "{count} items matching “{q}” in {category}", { q, category: categoryName })
          : q
            ? t.plural(n, "{count} item matching “{q}”", "{count} items matching “{q}”", { q })
            : category
              ? t.plural(n, "{count} item in {category}", "{count} items in {category}", { category: categoryName })
              : t.plural(n, "{count} item", "{count} items")}
      </p>
      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
          <EmptySearchIllustration className="h-auto w-full max-w-64" />
          <p className="font-bold">
            {q
              ? t.rich("Nothing matches that yet. Try another word, or <link>list something</link>.", { link: listLink })
              : t.rich("Nothing here yet. Be the first to <link>list something</link>.", { link: listLink })}
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
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
      className={`inline-flex min-h-11 md:min-h-10 items-center gap-1.5 rounded-lg border-2 border-border px-3 text-sm font-bold shadow-xs ${active ? "bg-primary text-primary-foreground" : "bg-card"}`}
    >
      {children}
    </Link>
  );
}

export default async function BrowsePage({ searchParams }: PageProps<"/[locale]/browse">) {
  const t = await getT();
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black uppercase">{t("Browse the catalogue")}</h1>
      <Suspense fallback={<p>{t("Loading…")}</p>}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
