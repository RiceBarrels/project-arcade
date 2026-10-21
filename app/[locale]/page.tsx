import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/category-icon";
import {
  EmptySearchIllustration,
  HeroIllustration,
  StepBorrowIllustration,
  StepBrowseIllustration,
  StepQueueIllustration,
  StepReturnIllustration,
} from "@/components/illustrations";
import { SearchForm } from "@/components/search-form";
import { Shelf } from "@/components/shelf";
import { Link } from "@/i18n/link";
import { msg, msgCtx } from "@/i18n/msg";
import { alternates, getT } from "@/i18n/server";
import { getCommunityCounts, listItems } from "@/lib/data/catalogue";
import { categories } from "@/lib/domain";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: await alternates("/") };
}

const steps = [
  [StepBrowseIllustration, msgCtx("how it works step", "Browse"), msg("Find gear in the catalogue: tools, cameras, camping kit, games, instruments and more. Filter by category and area.")],
  [StepQueueIllustration, msg("Queue it"), msg("Add what you want to your queue. If it's out on loan, you keep your place in line. When it's free, you're next.")],
  [StepBorrowIllustration, msg("Borrow"), msg("The lender approves your request and you agree a handoff time and place. Take it, use it, enjoy it.")],
  [StepReturnIllustration, msg("Return"), msg("Bring it back in the condition you got it. The lender marks it returned and the next person in line is up.")],
] as const;

// Catalogue reads are cached public queries (no cookies), so this page still
// prerenders into the static shell and refreshes on the cache lifetime.
export default async function Home() {
  const [items, counts, t] = await Promise.all([listItems({ limit: 120 }), getCommunityCounts(), getT()]);
  const readyNow = items.filter((i) => i.status === "available" && i.queue_length === 0);
  const byCategory = (slug: string) => items.filter((i) => i.category === slug);
  const trust = [
    { value: t.number(counts.items), label: t("items listed") },
    { value: t.number(counts.members), label: t("members") },
    { value: t.money(0), label: t("platform fees") },
  ];
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-6 rounded-lg border-4 border-border bg-accent p-5 text-accent-foreground shadow sm:p-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <h1 className="text-4xl font-black uppercase leading-tight sm:text-6xl">{t("Borrow it. Use it. Pass it on.")}</h1>
          <p className="max-w-2xl text-lg font-medium">
            {t("A community lending library for gear. Browse what people near you are willing to lend, add it to your queue, and pick it up when it's your turn.")}
          </p>
          <SearchForm />
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-background text-foreground"><Link href="/browse">{t("Browse the catalogue")}</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/list">{t("List your gear")}</Link></Button>
          </div>
          <p className="text-sm font-bold">{t("Non-profit. No ads. No platform fees.")}</p>
        </div>
        <div className="rounded-lg border-4 border-border bg-background p-3 shadow">
          <HeroIllustration className="h-auto w-full" />
        </div>
      </section>

      <section aria-labelledby="trust-title" className="rounded-lg border-2 border-border bg-card p-4 shadow">
        <h2 id="trust-title" className="sr-only">{t("Community so far")}</h2>
        <ul className="grid grid-cols-3 gap-4 text-center">
          {trust.map((s) => (
            <li key={s.label}>
              <span className="block text-3xl font-black">{s.value}</span>
              <span className="text-sm font-bold">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {items.length === 0 ? (
        <section className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
          <EmptySearchIllustration className="h-auto w-full max-w-64" />
          <p className="font-bold">
            {t.rich("Nothing here yet. Be the first to <link>list something</link>.", {
              link: (c) => <Link href="/list" className="underline underline-offset-4">{c}</Link>,
            })}
          </p>
        </section>
      ) : (
        <>
          <Shelf title={t("Ready to borrow now")} icon={<CircleCheck aria-hidden className="size-6" />} items={readyNow} href="/browse" />
          {categories.map((c) => (
            <Shelf
              key={c.slug}
              title={t(c.name)}
              icon={<CategoryIcon slug={c.slug} className="size-6" />}
              items={byCategory(c.slug)}
              href={`/browse?category=${c.slug}`}
            />
          ))}
        </>
      )}

      <section className="space-y-4">
        <h2 className="text-2xl font-black">{t("How it works")}</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([Art, title, d], i) => (
            <li key={title} className="rounded-lg border-2 border-border bg-card p-4 shadow">
              <Art className="mb-2 h-auto w-full" />
              <h3 className="font-black">
                <span className="me-2 text-2xl">{t.number(i + 1)}</span>
                {t(title)}
              </h3>
              <p className="text-sm">{t(d)}</p>
            </li>
          ))}
        </ol>
        <p className="font-medium">
          {t.rich("Got something gathering dust? <link>List it</link> and let someone else get some use out of it.", {
            link: (c) => <Link href="/list" className="font-bold underline underline-offset-4">{c}</Link>,
          })}
        </p>
      </section>

      <section className="rounded-lg border-2 border-border bg-secondary p-6 text-secondary-foreground shadow">
        <h2 className="text-2xl font-black">{t("Not for profit. Just for lending.")}</h2>
        <p className="mt-2">
          {t("This site is run as a non-profit community project. There are no ads, no platform fees, and no payments through the site. We don't take a cut of anything.")}
        </p>
        <p className="mt-2">
          {t("The point is simple: lots of useful stuff sits unused, and lots of people need it for a weekend. We'd like to connect the two.")}
        </p>
      </section>
    </div>
  );
}
