import { Suspense } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { UserSlot, UserSlotFallback } from "@/components/user-slot";
import { Link } from "@/i18n/link";
import { msg } from "@/i18n/msg";
import { getT } from "@/i18n/server";
import { SITE_NAME, SITE_STAGE } from "@/lib/site";

const links = [
  { href: "/browse", label: msg("Browse") },
  { href: "/queue", label: msg("My queue") },
  { href: "/list", label: msg("List gear") },
  { href: "/messages", label: msg("Messages") },
];

// Desktop and tablet header (md and up); phones get MobileTopBar + BottomNav.
// Static chrome prerenders; only the signed-in slot streams per request.
export async function SiteHeader() {
  const t = await getT();
  return (
    <header className="hidden border-b-4 border-border bg-primary text-primary-foreground md:block">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-h-11 shrink-0 items-center">
          <span className="flex flex-col items-start text-start leading-none">
            <bdi className="text-xl font-black tracking-tight">{SITE_NAME}</bdi>
            <span className="mt-1 font-mono text-xs font-bold lowercase">{SITE_STAGE}</span>
          </span>
        </Link>
        <nav aria-label={t("Main")} className="flex flex-wrap items-center gap-2 text-sm font-bold">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 md:min-h-10 items-center rounded-lg border-2 border-border bg-background px-3 text-foreground shadow-xs transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              {t(l.label)}
            </Link>
          ))}
          <LocaleSwitcher variant="header" />
          <Suspense fallback={<UserSlotFallback />}>
            <UserSlot />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
