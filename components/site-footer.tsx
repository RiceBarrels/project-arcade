import { FeedbackEntry } from "@/components/feedback/feedback-entry";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Link } from "@/i18n/link";
import { getT } from "@/i18n/server";
import { SITE_NAME } from "@/lib/site";

// In normal document flow (never fixed/sticky) so it can't cover page content.
export async function SiteFooter() {
  const t = await getT();
  return (
    <footer className="mt-12 border-t-4 border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm font-medium">
        <p>
          {t.rich("<b>{site}</b> is a non-profit community project. No ads, no platform fees, no payments through the site.", {
            b: (c) => <strong>{c}</strong>,
            site: <bdi>{SITE_NAME}</bdi>,
          })}
        </p>
        <nav className="flex flex-wrap gap-2">
          <Link href="/terms" className="inline-flex min-h-11 md:min-h-10 items-center px-2 font-bold underline underline-offset-4">
            {t("Terms of use")}
          </Link>
          <Link href="/signup" className="inline-flex min-h-11 md:min-h-10 items-center px-2 font-bold underline underline-offset-4">
            {t("Sign up")}
          </Link>
          <FeedbackEntry variant="footer" />
          <LocaleSwitcher variant="footer" />
        </nav>
      </div>
    </footer>
  );
}
