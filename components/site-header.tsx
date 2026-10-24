import { Suspense } from "react";
import { ListOrdered, MessagesSquare, Plus } from "lucide-react";
import { CategoryNav } from "@/components/header/category-nav";
import { HeaderLink } from "@/components/header/header-link";
import { HeaderSearch } from "@/components/header/header-search";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeMenu } from "@/components/theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserSlot, UserSlotFallback } from "@/components/user-slot";
import { Link } from "@/i18n/link";
import { getT } from "@/i18n/server";
import { SITE_NAME, SITE_STAGE } from "@/lib/site";

// Desktop and tablet header (md and up); phones get MobileTopBar + BottomNav.
// Row 1: name, search (on its own line below xl), then the actions, which
// may wrap at the narrowest widths in the longer languages. Row 2:
// the categories (components/header/category-nav.tsx). Static chrome
// prerenders; the signed-in slot and the parts that read the URL stream in.
export async function SiteHeader() {
  const t = await getT();
  return (
    <header className="hidden md:block">
      <div className="border-b-4 border-border bg-primary text-primary-foreground [--ring:var(--primary-foreground)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 xl:flex-nowrap xl:gap-4">
          <Link href="/" className="flex min-h-11 shrink-0 items-center">
            <span className="flex flex-col items-start text-start leading-none">
              <bdi className="text-xl font-black tracking-tight">{SITE_NAME}</bdi>
              <span className="mt-1 font-mono text-xs font-bold lowercase">{SITE_STAGE}</span>
            </span>
          </Link>
          <div className="order-last basis-full xl:order-none xl:min-w-64 xl:flex-1 xl:basis-auto">
            <HeaderSearch />
          </div>
          <nav aria-label={t("Main")} className="ms-auto flex flex-wrap items-center justify-end gap-2 text-sm font-bold xl:shrink-0 xl:flex-nowrap">
            <Link
              href="/list"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border-2 border-border bg-secondary px-4 font-black whitespace-nowrap text-secondary-foreground uppercase shadow transition-transform outline-none hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-xs focus-visible:ring-3 focus-visible:ring-ring/60 md:min-h-10"
            >
              <Plus aria-hidden className="size-4" strokeWidth={3} />
              {t("List gear")}
            </Link>
            <TooltipProvider delayDuration={300}>
              <HeaderLink href="/queue" label={t("My queue")} icon={<ListOrdered aria-hidden className="size-4" />} />
              <HeaderLink href="/messages" label={t("Messages")} icon={<MessagesSquare aria-hidden className="size-4" />} />
            </TooltipProvider>
            <LocaleSwitcher variant="header" />
            <ThemeMenu />
            <Suspense fallback={<UserSlotFallback />}>
              <UserSlot />
            </Suspense>
          </nav>
        </div>
      </div>
      <div className="border-b-4 border-border bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-3">
          <CategoryNav />
        </div>
      </div>
    </header>
  );
}
