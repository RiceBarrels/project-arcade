import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { alternates, getT } from "@/i18n/server";
import { Avatar } from "@/components/avatar";
import { ItemCard } from "@/components/item-card";
import { ProfileStatsGrid } from "@/components/profile-stats";
import { ReportButton } from "@/components/report-button";
import { getProfile, getProfileStats, itemsByOwner } from "@/lib/data/catalogue";
import { getCurrentUser } from "@/lib/data/session";
import { memberSince } from "@/lib/domain";
import { BackBar } from "@/components/mobile/back-bar";

export async function generateMetadata({ params }: PageProps<"/[locale]/profile/[id]">): Promise<Metadata> {
  const { id } = await params;
  // Metadata must never take the page down: fall back to a generic title.
  const [person, t] = await Promise.all([getProfile(id).catch(() => null), getT()]);
  return { title: person?.display_name ?? t("Profile"), alternates: await alternates(`/profile/${id}`) };
}

export default async function PublicProfilePage({ params }: PageProps<"/[locale]/profile/[id]">) {
  const t = await getT();
  return (
    <Suspense
      fallback={
        <>
          <BackBar title="" fallback="/browse" />
          <p className="font-bold">{t("Loading…")}</p>
        </>
      }
    >
      <ProfileContent params={params} />
    </Suspense>
  );
}

async function ProfileContent({ params }: { params: PageProps<"/[locale]/profile/[id]">["params"] }) {
  const { id } = await params;
  const [person, t] = await Promise.all([getProfile(id), getT()]);
  if (!person) notFound(); // proxy.ts already 404s unknown ids before rendering
  const [stats, listings] = await Promise.all([getProfileStats(person.id), itemsByOwner(person.id)]);

  return (
    <div className="space-y-8">
      <BackBar title={person.display_name} fallback="/browse" />
      <section className="flex flex-wrap items-center gap-5 rounded-lg border-4 border-border bg-card p-5 shadow sm:p-6">
        <Avatar className="bg-secondary" />
        <div className="min-w-0 flex-1">
          <h1 dir="auto" className="text-3xl font-black ltr:text-left rtl:text-right">{person.display_name}</h1>
          <p className="font-medium">
            {person.city
              ? t("{city} · member since {date}", { city: person.city, date: memberSince(person.created_at, t) })
              : t("member since {date}", { date: memberSince(person.created_at, t) })}
          </p>
          {person.bio && <p dir="auto" className="mt-1 text-sm ltr:text-left rtl:text-right">{person.bio}</p>}
        </div>
        <Suspense fallback={null}>
          <ReportUnlessSelf personId={person.id} />
        </Suspense>
      </section>
      <ProfileStatsGrid stats={stats} />
      <section className="space-y-4">
        <h2 className="text-2xl font-black">{t("Listings")}</h2>
        {listings.length === 0 ? (
          <p className="font-medium">{t("No listings yet.")}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {listings.map((item) => <li key={item.id}><ItemCard item={item} /></li>)}
          </ul>
        )}
      </section>
    </div>
  );
}

async function ReportUnlessSelf({ personId }: { personId: string }) {
  const user = await getCurrentUser();
  return user?.id === personId ? null : <ReportButton target="user" targetId={personId} />;
}
