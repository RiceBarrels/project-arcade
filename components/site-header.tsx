import { Suspense } from "react";
import Link from "next/link";
import { UserSlot, UserSlotFallback } from "@/components/user-slot";
import { path } from "@/lib/paths";
import { SITE_NAME, SITE_STAGE } from "@/lib/site";

const links = [
  { href: "/browse", label: "Browse" },
  { href: "/queue", label: "My queue" },
  { href: "/list", label: "List gear" },
  { href: "/messages", label: "Messages" },
];

// Static chrome prerenders; only the signed-in slot streams per request.
export function SiteHeader() {
  return (
    <header className="border-b-4 border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href={path("/")} className="flex min-h-11 shrink-0 items-center">
          <span className="flex flex-col items-start text-left leading-none">
            <span className="text-xl font-black tracking-tight">{SITE_NAME}</span>
            <span className="mt-1 font-mono text-xs font-bold lowercase">{SITE_STAGE}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-2 text-sm font-bold">
          {links.map((l) => (
            <Link
              key={l.href}
              href={path(l.href)}
              className="inline-flex min-h-10 items-center rounded-lg border-2 border-border bg-background px-3 text-foreground shadow-xs transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
            >
              {l.label}
            </Link>
          ))}
          <Suspense fallback={<UserSlotFallback />}>
            <UserSlot />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
