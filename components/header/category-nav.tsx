"use client";

import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { useT } from "@/i18n/client";
import { localePath } from "@/i18n/config";
import { Link } from "@/i18n/link";
import { categories, getCategory } from "@/lib/domain";

// Desktop header row 2: every category (lib/domain; blocked ones are never in
// the list), linking to the browse page filtered by it. One line only: when
// the labels don't fit (long languages, narrow windows) the row scrolls
// sideways, with arrow buttons at the edge that has more. On /browse the
// current category is marked and the current search is kept.

/** null: not on /browse, so nothing is marked. "": all categories. */
type Active = string | null;

export function CategoryNav() {
  const t = useT();
  return (
    <nav aria-label={t("Categories")}>
      <Suspense fallback={<Row active={null} q="" />}>
        <CurrentCategory />
      </Suspense>
    </nav>
  );
}

function CurrentCategory() {
  const t = useT();
  const pathname = usePathname();
  const params = useSearchParams();
  if (pathname !== localePath("/browse", t.locale)) return <Row active={null} q="" />;
  const category = params.get("category") ?? "";
  const q = (params.get("q") ?? "").trim().slice(0, 80);
  return <Row active={getCategory(category) ? category : ""} q={q} />;
}

function href(category: string, q: string) {
  const sp = new URLSearchParams();
  if (category) sp.set("category", category);
  if (q) sp.set("q", q);
  const s = sp.toString();
  return `/browse${s ? `?${s}` : ""}`;
}

function Row({ active, q }: { active: Active; q: string }) {
  const t = useT();
  const scroller = useRef<HTMLUListElement>(null);
  const [more, setMore] = useState({ start: false, end: false });

  // Which edges have more to scroll to. scrollLeft runs 0 → -max in RTL.
  const measure = useCallback(() => {
    const s = scroller.current;
    if (!s) return;
    const max = s.scrollWidth - s.clientWidth;
    const pos = Math.abs(s.scrollLeft);
    setMore({ start: pos > 1, end: pos < max - 1 });
  }, []);

  useEffect(() => {
    const s = scroller.current;
    if (!s) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(s);
    s.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      s.removeEventListener("scroll", measure);
    };
  }, [measure]);

  // Bring the marked category into view (by the row's own scroll, never the page's).
  useLayoutEffect(() => {
    const s = scroller.current;
    const el = s?.querySelector<HTMLElement>("[aria-current=page]");
    if (!s || !el) return;
    const box = s.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const pad = 48;
    if (r.left < box.left + pad) s.scrollLeft -= box.left + pad - r.left;
    else if (r.right > box.right - pad) s.scrollLeft += r.right - (box.right - pad);
  }, [active]);

  const page = (towardEnd: boolean) => {
    const s = scroller.current;
    if (!s) return;
    const rtl = getComputedStyle(s).direction === "rtl";
    const step = s.clientWidth * 0.75;
    s.scrollBy({ left: (towardEnd !== rtl ? 1 : -1) * step, behavior: "smooth" });
  };

  const items = [{ slug: "", name: t("All") }, ...categories.map((c) => ({ slug: c.slug, name: t(c.name) }))];

  return (
    <div className="relative">
      <ul
        ref={scroller}
        className="flex gap-2 overflow-x-auto overscroll-x-contain px-1 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((c) => {
          const current = active === c.slug;
          return (
            <li key={c.slug || "all"} className="shrink-0">
              <Link
                href={href(c.slug, active === null ? "" : q)}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border-2 px-3 text-sm font-bold whitespace-nowrap outline-none focus-visible:ring-3 focus-visible:ring-ring/60 ${
                  current
                    ? "border-border bg-primary text-primary-foreground shadow-xs"
                    : "border-transparent hover:border-border hover:bg-card hover:shadow-xs"
                }`}
              >
                {c.slug ? <CategoryIcon slug={c.slug} /> : <LayoutGrid aria-hidden className="size-4" />}
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Mouse helpers only: keyboard users tab through the links, which scroll into view by themselves. */}
      {more.start && <EdgeButton side="start" onClick={() => page(false)} />}
      {more.end && <EdgeButton side="end" onClick={() => page(true)} />}
    </div>
  );
}

function EdgeButton({ side, onClick }: { side: "start" | "end"; onClick: () => void }) {
  const Icon = side === "start" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      onClick={onClick}
      className={`absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-border bg-background text-foreground shadow-xs hover:translate-y-[calc(-50%+2px)] hover:shadow-none ${
        side === "start" ? "start-0" : "end-0"
      }`}
    >
      <Icon className="size-5 rtl:-scale-x-100" strokeWidth={2.5} />
    </button>
  );
}
