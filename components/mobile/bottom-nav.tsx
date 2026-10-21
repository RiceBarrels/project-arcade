"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, ListOrdered, Plus, Search, UserRound, type LucideIcon } from "lucide-react";
import { activeTab, TABS, type TabKey } from "@/lib/nav";
import { path } from "@/lib/paths";

const ICONS: Record<TabKey, LucideIcon> = {
  home: House,
  browse: Search,
  list: Plus,
  queue: ListOrdered,
  me: UserRound,
};

/** Phone-only tab bar (hidden from md up). Rendered in the layout so it is in the static shell. */
export function BottomNav() {
  return <BottomNavBar active={activeTab(usePathname())} />;
}

/**
 * The bar itself, like a native app's tab bar: fixed to the bottom of the
 * screen, five equal cells, the current tab shown as a raised yellow block,
 * and every cell pressing in when tapped. Also used as the Suspense fallback
 * (no active tab) and on the 404 page. Height is fixed (h-16 + 2px border +
 * home indicator) and mirrored by --bottom-nav-h in globals.css.
 */
export function BottomNavBar({ active }: { active: TabKey | null }) {
  return (
    <nav
      aria-label="Main"
      data-bottom-nav=""
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-border bg-background pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] [view-transition-name:bottom-nav] md:hidden in-data-[keyboard=open]:hidden"
    >
      <ul className="grid h-16 grid-cols-5">
        {TABS.map((tab) => {
          const Icon = ICONS[tab.key];
          const current = tab.key === active;
          const list = tab.key === "list";
          return (
            <li key={tab.key} className="min-w-0">
              <Link
                href={path(tab.href)}
                aria-current={current ? "page" : undefined}
                className="group flex h-full items-center justify-center px-1 outline-none"
              >
                <span
                  className={`flex w-full max-w-16 flex-col items-center gap-1 rounded-lg border-2 py-1.5 font-mono text-[11px] leading-none font-bold transition-transform duration-75 group-focus-visible:ring-3 group-focus-visible:ring-ring/60 group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none motion-reduce:transition-none ${
                    current
                      ? "border-border bg-secondary text-secondary-foreground shadow-[3px_3px_0_0_var(--border)]"
                      : list
                        ? "border-border bg-primary text-primary-foreground shadow-[3px_3px_0_0_var(--border)]"
                        : "border-transparent text-muted-foreground"
                  }`}
                >
                  <Icon aria-hidden className="size-5" strokeWidth={current || list ? 3 : 2} />
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div aria-hidden className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}
