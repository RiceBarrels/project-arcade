import { Link } from "@/i18n/link";
import { SITE_NAME, SITE_STAGE } from "@/lib/site";

// Phone-only top bar: just the site name, like an app's title bar. All
// navigation (signing in included, via "Me") lives in the bottom bar.
// Pads itself under the status bar / notch when installed to the home screen.
// Hidden on pages that show a BackBar instead (globals.css).
export function MobileTopBar() {
  return (
    <div
      data-mobile-top=""
      className="shrink-0 border-b-4 border-border bg-primary [--ring:var(--primary-foreground)] pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] text-primary-foreground md:hidden"
    >
      <div className="flex min-h-14 items-center px-4 py-1.5">
        <Link href="/" className="flex min-h-11 items-center">
          <span className="flex flex-col items-start leading-none">
            <bdi className="text-lg font-black tracking-tight">{SITE_NAME}</bdi>
            <span className="mt-1 font-mono text-xs font-bold lowercase">{SITE_STAGE}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
