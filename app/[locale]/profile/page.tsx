import { Suspense } from "react";
import { ChevronRight, LogOut, MessageSquare, Settings } from "lucide-react";
import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { ItemCard } from "@/components/item-card";
import { ProfileStatsGrid } from "@/components/profile-stats";
import { ReturnCheck } from "@/components/return-check";
import { FeedbackTrigger } from "@/components/feedback/feedback-trigger";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { localePath } from "@/i18n/config";
import { Link } from "@/i18n/link";
import { alternates, getLocale, getT } from "@/i18n/server";
import { getProfileStats, itemsByOwner } from "@/lib/data/catalogue";
import { getLoansAwaitingReturn } from "@/lib/data/me";
import { requireUser } from "@/lib/data/session";
import { damageLabel, memberSince } from "@/lib/domain";
import { signOut } from "@/lib/auth/actions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Profile"), alternates: await alternates("/profile") };
}

// Private (proxy.ts redirects signed-out visitors). Everything below reads the
// session, so it streams in behind one boundary.
export default async function ProfilePage({ searchParams }: PageProps<"/[locale]/profile">) {
  const t = await getT();
  return (
    <Suspense fallback={<p className="font-bold">{t("Loading…")}</p>}>
      <MyProfile searchParams={searchParams} />
    </Suspense>
  );
}

async function MyProfile({ searchParams }: { searchParams: PageProps<"/[locale]/profile">["searchParams"] }) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const me = await requireUser(localePath("/profile", locale));
  const [sp, stats, mine, out] = await Promise.all([
    searchParams,
    getProfileStats(me.id),
    itemsByOwner(me.id),
    getLoansAwaitingReturn(me.id),
  ]);

  return (
    <div className="space-y-10">
      {sp.password === "updated" && (
        <p role="status" className="rounded-lg border-2 border-border bg-secondary p-3 font-bold text-secondary-foreground">
          {t("Your password has been updated.")}
        </p>
      )}
      <section className="flex flex-wrap items-center gap-5 rounded-lg border-4 border-border bg-accent p-5 text-accent-foreground shadow sm:p-6">
        <Avatar />
        <div className="min-w-0 flex-1">
          <h1 dir="auto" className="text-3xl font-black ltr:text-left rtl:text-right">{me.display_name}</h1>
          <p className="font-medium">
            {me.city
              ? t("{city} · member since {date}", { city: me.city, date: memberSince(me.created_at, t) })
              : t("member since {date}", { date: memberSince(me.created_at, t) })}
          </p>
          {me.bio && <p dir="auto" className="mt-1 text-sm ltr:text-left rtl:text-right">{me.bio}</p>}
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          <Link href={`/profile/${me.id}`} className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
            {t("See your public profile")}
          </Link>
          <Link href="/settings" className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
            {t("Settings")}
          </Link>
        </div>
      </section>

      <MeLinks />

      <ProfileStatsGrid stats={stats} />

      <section className="space-y-4">
        <h2 className="text-2xl font-black">{t("Out on loan")}</h2>
        {out.length === 0 ? (
          <p className="font-medium">{t("Nothing of yours is out right now.")}</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {out.map((loan) => (
              <li key={loan.id}>
                <ReturnCheck
                  loanId={loan.id}
                  itemTitle={loan.item?.title ?? t("(deleted item)")}
                  borrowerName={loan.borrower?.display_name ?? t("Deleted account")}
                  borrowerId={loan.borrower?.id ?? null}
                  amountLabel={damageLabel(loan, t)}
                  damageWaived={loan.damage_waived}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">{t("Your listings")}</h2>
        {mine.length === 0 ? (
          <p className="font-medium">
            {t.rich("You haven't listed anything yet. <link>List your gear</link>", {
              link: (c) => (
                <Link href="/list" className="font-bold underline underline-offset-4">
                  {c}
                </Link>
              ),
            })}
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {mine.map((item) => <li key={item.id}><ItemCard item={item} /></li>)}
          </ul>
        )}
      </section>
    </div>
  );
}

// Phone-only entries (docs/copy-en.md 18.3): the bottom bar's "Me" tab is the way to messages and settings.
async function MeLinks() {
  const t = await getT();
  const row =
    "flex min-h-14 w-full items-center gap-3 border-b-2 border-border px-4 py-2 text-start last:border-b-0 focus-visible:bg-muted outline-none";
  return (
    <nav aria-label={t("Your account")} className="overflow-hidden rounded-lg border-4 border-border bg-card shadow md:hidden">
      <Link href="/messages" className={row}>
        <MessageSquare aria-hidden className="size-5 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block font-black">{t("Messages")}</span>
          <span className="block text-sm">{t("Chat with lenders and borrowers")}</span>
        </span>
        <ChevronRight aria-hidden className="size-5 shrink-0 rtl:-scale-x-100" />
      </Link>
      <Link href="/settings" className={row}>
        <Settings aria-hidden className="size-5 shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block font-black">{t("Settings")}</span>
          <span className="block text-sm">{t("Profile and account")}</span>
        </span>
        <ChevronRight aria-hidden className="size-5 shrink-0 rtl:-scale-x-100" />
      </Link>
      <LocaleSwitcher variant="me" />
      <FeedbackTrigger variant="me" signedIn />
      <form action={signOut}>
        <input type="hidden" name="locale" value={t.locale} />
        <button type="submit" className={row}>
          <LogOut aria-hidden className="size-5 shrink-0 rtl:-scale-x-100" />
          <span className="flex-1 font-black">{t("Sign out")}</span>
        </button>
      </form>
    </nav>
  );
}
