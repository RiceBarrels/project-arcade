import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { ItemCard } from "@/components/item-card";
import { ProfileStatsGrid } from "@/components/profile-stats";
import { ReturnCheck } from "@/components/return-check";
import { getProfileStats, itemsByOwner } from "@/lib/data/catalogue";
import { getLoansAwaitingReturn } from "@/lib/data/me";
import { requireUser } from "@/lib/data/session";
import { damageLabel, memberSince } from "@/lib/domain";
import { path } from "@/lib/paths";

export const metadata: Metadata = { title: "Profile" };

// Private (proxy.ts redirects signed-out visitors). Everything below reads the
// session, so it streams in behind one boundary.
export default function ProfilePage({ searchParams }: PageProps<"/[locale]/profile">) {
  return (
    <Suspense fallback={<p className="font-bold">Loading…</p>}>
      <MyProfile searchParams={searchParams} />
    </Suspense>
  );
}

async function MyProfile({ searchParams }: { searchParams: PageProps<"/[locale]/profile">["searchParams"] }) {
  const me = await requireUser("/en/profile");
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
          Your password has been updated.
        </p>
      )}
      <section className="flex flex-wrap items-center gap-5 rounded-lg border-4 border-border bg-accent p-5 text-accent-foreground shadow sm:p-6">
        <Avatar />
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-black">{me.display_name}</h1>
          <p className="font-medium">
            {me.city ? `${me.city} · ` : ""}member since {memberSince(me.created_at)}
          </p>
          {me.bio && <p className="mt-1 text-sm">{me.bio}</p>}
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          <Link href={path(`/profile/${me.id}`)} className="inline-flex min-h-10 items-center underline underline-offset-4">
            See your public profile
          </Link>
          <Link href={path("/settings")} className="inline-flex min-h-10 items-center underline underline-offset-4">
            Settings
          </Link>
        </div>
      </section>

      <ProfileStatsGrid stats={stats} />

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Out on loan</h2>
        {out.length === 0 ? (
          <p className="font-medium">Nothing of yours is out right now.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {out.map((loan) => (
              <li key={loan.id}>
                <ReturnCheck
                  loanId={loan.id}
                  itemTitle={loan.item?.title ?? "(deleted item)"}
                  borrowerName={loan.borrower?.display_name ?? "Deleted account"}
                  borrowerId={loan.borrower?.id ?? null}
                  amountLabel={damageLabel(loan)}
                  damageWaived={loan.damage_waived}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Your listings</h2>
        {mine.length === 0 ? (
          <p className="font-medium">
            You haven&apos;t listed anything yet.{" "}
            <Link href={path("/list")} className="font-bold underline underline-offset-4">List your gear</Link>
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mine.map((item) => <li key={item.id}><ItemCard item={item} /></li>)}
          </ul>
        )}
      </section>
    </div>
  );
}
