"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useT } from "@/i18n/client";
import { localePath } from "@/i18n/config";

// Desktop header search: a plain GET form to /browse, like the browse page's
// own SearchForm (which keeps its id "q"; this one is "header-q"). On /browse
// it shows the current query; elsewhere it starts empty and searches every
// category.
export function HeaderSearch() {
  return (
    <Suspense fallback={<SearchBox q="" />}>
      <CurrentQuery />
    </Suspense>
  );
}

function CurrentQuery() {
  const t = useT();
  const pathname = usePathname();
  const params = useSearchParams();
  const q = pathname === localePath("/browse", t.locale) ? (params.get("q") ?? "").trim().slice(0, 80) : "";
  return <SearchBox key={q} q={q} />;
}

function SearchBox({ q }: { q: string }) {
  const t = useT();
  return (
    <form
      action={localePath("/browse", t.locale)}
      method="get"
      role="search"
      className="flex min-h-11 w-full min-w-0 overflow-hidden rounded-lg border-2 border-border bg-background text-foreground shadow-xs has-focus-visible:ring-3 has-focus-visible:ring-ring/60"
    >
      <label htmlFor="header-q" className="sr-only">
        {t("Search gear")}
      </label>
      <input
        id="header-q"
        name="q"
        type="search"
        defaultValue={q}
        placeholder={t("Search tents, cameras, games…")}
        className="min-w-0 flex-1 bg-transparent px-3 text-base font-medium outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        aria-label={t("Search")}
        className="inline-flex w-12 shrink-0 items-center justify-center border-s-2 border-border bg-secondary text-secondary-foreground outline-none hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_8%)]"
      >
        <Search aria-hidden className="size-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
