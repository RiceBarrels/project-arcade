import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { ItemCard } from "@/components/item-card";
import { ProfileStatsGrid } from "@/components/profile-stats";
import { ReportButton } from "@/components/report-button";
import { getProfile, getProfileStats, itemsByOwner } from "@/lib/data/catalogue";
import { getCurrentUser } from "@/lib/data/session";
import { memberSince } from "@/lib/domain";

export async function generateMetadata({ params }: PageProps<"/[locale]/profile/[id]">): Promise<Metadata> {
  const { id } = await params;
  // Metadata must never take the page down: fall back to a generic title.
  const person = await getProfile(id).catch(() => null);
  return { title: person?.display_name ?? "Profile" };
}

export default function PublicProfilePage({ params }: PageProps<"/[locale]/profile/[id]">) {
  return (
    <Suspense fallback={<p className="font-bold">Loading…</p>}>
      <ProfileContent params={params} />
    </Suspense>
  );
}

async function ProfileContent({ params }: { params: PageProps<"/[locale]/profile/[id]">["params"] }) {
  const { id } = await params;
  const person = await getProfile(id);
  if (!person) notFound(); // proxy.ts already 404s unknown ids before rendering
  const [stats, listings] = await Promise.all([getProfileStats(person.id), itemsByOwner(person.id)]);

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center gap-5 rounded-lg border-4 border-border bg-card p-5 shadow sm:p-6">
        <Avatar className="bg-secondary" />
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-black">{person.display_name}</h1>
          <p className="font-medium">
            {person.city ? `${person.city} · ` : ""}member since {memberSince(person.created_at)}
          </p>
          {person.bio && <p className="mt-1 text-sm">{person.bio}</p>}
        </div>
        <Suspense fallback={null}>
          <ReportUnlessSelf personId={person.id} />
        </Suspense>
      </section>
      <ProfileStatsGrid stats={stats} />
      <section className="space-y-4">
        <h2 className="text-2xl font-black">Listings</h2>
        {listings.length === 0 ? (
          <p className="font-medium">No listings yet.</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
