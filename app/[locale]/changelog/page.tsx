import type { Metadata } from "next";
import { CalendarDays, Hourglass } from "lucide-react";
import { alternates, getT } from "@/i18n/server";
import { CHANGELOG } from "@/content/changelog";
import { SITE_NAME } from "@/lib/site";

// Public "What's new" page. Copy: docs/copy-en.md section 26; entries in
// content/changelog.ts. Same-day groups show only the date, so the heading
// tells them apart; the order is the data file's.

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("What's new"), alternates: await alternates("/changelog") };
}

export default async function ChangelogPage() {
  const t = await getT();
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-black uppercase">{t("What's new")}</h1>
        <p className="font-medium">
          {t.rich("{site} is a non-profit and still in pre-alpha. Here is what we've changed so far.", { site: <bdi>{SITE_NAME}</bdi> })}
        </p>
      </header>
      {CHANGELOG.length === 0 ? (
        <p className="rounded-lg border-4 border-border bg-card p-5 font-bold text-card-foreground shadow">
          {t("Nothing to show yet. Check back soon.")}
        </p>
      ) : (
        <ol className="space-y-6">
          {CHANGELOG.map((release, i) => (
            <li key={`${release.date}-${i}`}>
              <article
                aria-labelledby={`release-${i}`}
                className="space-y-3 rounded-lg border-4 border-border bg-card p-5 text-card-foreground shadow sm:p-6"
              >
                {release.date ? (
                  <time
                    dateTime={release.date}
                    className="inline-flex items-center gap-1.5 rounded-md border-2 border-border bg-secondary px-2.5 py-1 text-sm font-black text-secondary-foreground"
                  >
                    <CalendarDays aria-hidden className="size-4 shrink-0" />
                    {t.date(release.date, { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                ) : (
                  <p className="inline-flex items-center gap-1.5 rounded-md border-2 border-border bg-primary px-2.5 py-1 text-sm font-black text-primary-foreground">
                    <Hourglass aria-hidden className="size-4 shrink-0" />
                    {t("Coming soon")}
                  </p>
                )}
                <h2 id={`release-${i}`} className="text-2xl font-black">
                  {t(release.heading)}
                </h2>
                <ul className="space-y-2">
                  {release.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-2 shrink-0 bg-foreground" />
                      <span className="min-w-0">{t(b)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
