import Link from "next/link";
import { path } from "@/lib/paths";
import { SITE_NAME } from "@/lib/site";

// In normal document flow (never fixed/sticky) so it can't cover page content.
export function SiteFooter() {
  return (
    <footer className="mt-12 border-t-4 border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm font-medium">
        <p>
          <strong>{SITE_NAME}</strong> is a non-profit community project. No ads, no platform fees, no payments
          through the site.
        </p>
        <nav className="flex gap-2">
          <Link href={path("/terms")} className="inline-flex min-h-10 items-center px-2 font-bold underline underline-offset-4">
            Terms of use
          </Link>
          <Link href={path("/signup")} className="inline-flex min-h-10 items-center px-2 font-bold underline underline-offset-4">
            Sign up
          </Link>
        </nav>
      </div>
    </footer>
  );
}
