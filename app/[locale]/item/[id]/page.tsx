import { cache, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/category-icon";
import { ItemPhoto } from "@/components/item-photo";
import { ReportButton } from "@/components/report-button";
import { RequestForm } from "@/components/request-form";
import { StatusBadge } from "@/components/status-badge";
import { getItem, getProfile, getProfileStats } from "@/lib/data/catalogue";
import { getCurrentUser } from "@/lib/data/session";
import { CONDITION_LABEL, damageLabel, feeLabel, getCategory, type ItemWithQueue } from "@/lib/domain";
import { path } from "@/lib/paths";
import { createClient } from "@/lib/supabase/server";
import { BackBar } from "@/components/mobile/back-bar";

export async function generateMetadata({ params }: PageProps<"/[locale]/item/[id]">): Promise<Metadata> {
  const { id } = await params;
  // Metadata must never take the page down: fall back to a generic title.
  const item = await getItem(id).catch(() => null);
  return { title: item?.title ?? "Item" };
}

// Static frame; the item streams in (its id is a runtime param), and the
// viewer-specific parts (request box, queue place, sticky bar) stream in
// behind their own boundaries because they read the session.
export default function ItemPage({ params }: PageProps<"/[locale]/item/[id]">) {
  return (
    <Suspense
      fallback={
        <>
          <BackBar title="" fallback="/browse" />
          <p className="font-bold">Loading…</p>
        </>
      }
    >
      <ItemContent params={params} />
    </Suspense>
  );
}

async function ItemContent({ params }: { params: PageProps<"/[locale]/item/[id]">["params"] }) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound(); // proxy.ts already 404s unknown ids before rendering
  const [lender, lenderStats] = await Promise.all([getProfile(item.owner_id), getProfileStats(item.owner_id)]);
  const category = getCategory(item.category);
  const inLine = item.queue_length;
  const damage = damageLabel(item);

  const priceBox = (
    <div className="rounded-lg border-4 border-border bg-accent p-4 text-accent-foreground shadow sm:p-5">
      <p className="text-sm font-bold uppercase">Damage price</p>
      <p className="text-4xl font-black sm:text-5xl">{damage}</p>
      <p className="mt-2 text-sm font-medium">
        {item.damage_waived
          ? "The lender has set no charge if this comes back damaged or lost."
          : "What you'd owe the lender if this comes back damaged or lost. Settled directly between you two."}{" "}
        The site doesn&apos;t collect or hold any money.
      </p>
      <p className="mt-3 border-t-2 border-border pt-3 font-bold">
        {item.is_free ? "Free to borrow" : `Fee: ${feeLabel(item)} (paid directly to the lender)`}
      </p>
    </div>
  );

  return (
    <div>
      <BackBar title={item.title} fallback="/browse" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={item.status} inLine={inLine} />
              {category && (
                <Badge variant="outline">
                  <CategoryIcon slug={category.slug} /> {category.name}
                </Badge>
              )}
              <Badge variant="outline">{CONDITION_LABEL[item.condition]}</Badge>
            </div>
            <h1 className="text-3xl font-black sm:text-4xl">{item.title}</h1>
          </div>
          <ItemPhoto
            item={item}
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            className="aspect-video rounded-lg border-4 border-border shadow sm:aspect-[4/3]"
            artClassName="p-4 sm:p-8"
          />
          {/* On phones the price sits right under the photo, above the description. */}
          <div className="lg:hidden">{priceBox}</div>
          {item.description && <p className="whitespace-pre-line text-lg">{item.description}</p>}
          <p className="font-medium">Pickup: {item.city}</p>

          <section aria-labelledby="queue-title" className="rounded-lg border-2 border-border bg-card p-4 shadow-xs">
            <h2 id="queue-title" className="font-black">Queue</h2>
            <p className="text-sm">
              {inLine > 0
                ? `${inLine} ${inLine === 1 ? "person" : "people"} in line.`
                : item.status === "available"
                  ? "Nobody in line. Request it and you're first."
                  : "On loan. Join the queue and you're first when it's back."}
              <Suspense fallback={null}>
                <MyPlace itemId={item.id} inLine={inLine} />
              </Suspense>
            </p>
            <p className="text-xs">When it&apos;s your turn you have 48 hours to respond before it passes to the next person.</p>
          </section>

          {lender && (
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-border bg-card p-4 shadow-xs">
              <div>
                <p className="text-xs font-bold uppercase">Lender</p>
                <Link className="inline-flex min-h-11 md:min-h-10 items-center font-black underline underline-offset-4" href={path(`/profile/${lender.id}`)}>
                  {lender.display_name}
                </Link>
                <p className="text-sm">
                  {lenderStats.loans_completed} returned OK · {lenderStats.loans_damaged} came back damaged
                </p>
              </div>
              <ReportButton target="user" targetId={lender.id} />
            </section>
          )}
          <div className="flex items-center gap-3 text-sm">
            <span>Something wrong with this listing?</span>
            <ReportButton target="listing" targetId={item.id} />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div className="hidden lg:block">{priceBox}</div>
          <Suspense fallback={<div className="h-40 animate-pulse rounded-lg border-2 border-border bg-muted" aria-hidden />}>
            <RequestArea item={item} />
          </Suspense>
        </aside>
      </div>

      <Suspense fallback={null}>
        <StickyRequestBar item={item} damage={damage} />
      </Suspense>
    </div>
  );
}

/** The viewer's place in this item's line (null when signed out, not queued, or not computable yet). */
const myQueuePosition = cache(async (itemId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("queue_position", { p_item: itemId });
  return error || typeof data !== "number" ? null : data;
});

async function MyPlace({ itemId, inLine }: { itemId: string; inLine: number }) {
  const user = await getCurrentUser();
  if (!user) return null;
  const pos = await myQueuePosition(itemId);
  return pos ? <strong> You&apos;re #{pos} of {inLine}.</strong> : null;
}

async function RequestArea({ item }: { item: ItemWithQueue }) {
  const user = await getCurrentUser();
  const canRequest = item.status === "available" && item.queue_length === 0;
  if (!user) {
    return (
      <div id="request" className="scroll-mt-4 space-y-3 rounded-lg border-2 border-border bg-card p-5 shadow">
        <p className="font-bold">Sign in to {canRequest ? "request this item" : "join the queue"}.</p>
        <Button asChild size="lg" className="w-full">
          <Link href={path(`/login?next=${encodeURIComponent(`/en/item/${item.id}`)}`)}>Sign in</Link>
        </Button>
      </div>
    );
  }
  const isOwner = user.id === item.owner_id;
  const pos = isOwner ? null : await myQueuePosition(item.id);
  if (pos) {
    return (
      <div className="rounded-lg border-2 border-border bg-card p-5 shadow">
        <p className="font-black">You&apos;re #{pos} of {item.queue_length} in line.</p>
        <Button asChild variant="outline" className="mt-3"><Link href={path("/queue")}>Go to my queue</Link></Button>
      </div>
    );
  }
  return (
    <RequestForm
      itemId={item.id}
      damagePrice={item.damage_price}
      damageWaived={item.damage_waived}
      canRequest={canRequest}
      isOwner={isOwner}
    />
  );
}

// Phone-only bar: price + call to action in reach while scrolling the item.
// On phones the scrolling content area ends above the bottom bar, so bottom-0 sits right on top of it.
// Sticky (not fixed) as the page's last child, so it stops at the end of the
// content and never covers the footer. -mx-4/-mb-8 cancel <main>'s padding.
// Hidden once a request is sent ([data-request-sent] on the form's success state).
async function StickyRequestBar({ item, damage }: { item: ItemWithQueue; damage: string }) {
  const user = await getCurrentUser();
  if (user?.id === item.owner_id) return null;
  if (user && (await myQueuePosition(item.id))) return null;
  const canRequest = item.status === "available" && item.queue_length === 0;
  return (
    <div className="sticky bottom-0 z-40 -mx-4 -mb-8 mt-8 flex items-center justify-between gap-3 border-t-4 border-border bg-background px-4 py-3 lg:hidden [body:has([data-request-sent])_&]:hidden">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase">Damage price</p>
        <p className="truncate text-xl font-black">{damage}</p>
      </div>
      <Button asChild size="lg">
        <a href="#request">{!user ? "Sign in" : canRequest ? "Request to borrow" : "Join the queue"}</a>
      </Button>
    </div>
  );
}
