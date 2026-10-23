import { Suspense } from "react";
import type { Metadata } from "next";
import { ChevronRight, MessageSquare } from "lucide-react";
import { CategoryArtwork, EmptyQueueIllustration } from "@/components/illustrations";
import { LoanStatusBadge } from "@/components/messages/loan-status-badge";
import { DELETED_ACCOUNT, DELETED_ITEM } from "@/components/messages/types";
import type { Translator } from "@/i18n/core";
import { localePath } from "@/i18n/config";
import { Link } from "@/i18n/link";
import { alternates, getT } from "@/i18n/server";
import { getMyConversations, type LoanWithParties } from "@/lib/data/me";
import { getLoanItemTitles } from "@/lib/data/messages";
import { requireUser } from "@/lib/data/session";
import { BackBar } from "@/components/mobile/back-bar";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Messages"), alternates: await alternates("/messages") };
}

function otherParty(loan: LoanWithParties, myId: string) {
  return loan.lender_id === myId ? loan.borrower : loan.lender;
}

function itemTitle(loan: LoanWithParties, snapshots: Map<string, string>, t: Translator) {
  // item_title is the snapshot added in supabase/05 (kept when the item is deleted
  // or hidden); until 05 runs the map is empty and the joined item is used.
  return snapshots.get(loan.id) ?? loan.item?.title ?? t(DELETED_ITEM);
}

async function Conversations() {
  const t = await getT();
  const user = await requireUser(localePath("/messages", t.locale));
  const loans = await getMyConversations();
  const snapshots = await getLoanItemTitles(loans.map((l) => l.id));

  if (loans.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
        <EmptyQueueIllustration className="h-auto w-full max-w-64" />
        <p className="font-bold">{t("No conversations yet. Once a lender approves a request, you can chat here.")}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {loans.map((loan) => {
        const other = otherParty(loan, user.id);
        const name = other?.display_name ?? t(DELETED_ACCOUNT);
        const title = itemTitle(loan, snapshots, t);
        return (
          <li key={loan.id}>
            <Link
              href={`/messages/${loan.id}`}
              className="flex min-h-16 items-center gap-4 rounded-lg border-2 border-border bg-card p-3 text-card-foreground shadow-xs transition-all outline-none hover:translate-x-px hover:translate-y-px hover:shadow-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:p-4"
            >
              {loan.item ? (
                <CategoryArtwork slug={loan.item.category} className="size-14 shrink-0 rounded-lg border-2 border-border p-1" />
              ) : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border-2 border-border bg-muted">
                  <MessageSquare aria-hidden className="size-6" />
                </span>
              )}
              <span className="min-w-0 flex-1 space-y-1">
                <span className="block font-black break-words">
                  {other
                    ? t.rich("{name} about {item}", { name: <bdi>{name}</bdi>, item: title })
                    : t("Deleted account about {item}", { item: title })}
                </span>
                <span dir="auto" className="block text-sm font-medium break-words ltr:text-left rtl:text-right">
                  {title}
                </span>
                <LoanStatusBadge status={loan.status} />
              </span>
              <ChevronRight aria-hidden className="size-5 shrink-0 rtl:-scale-x-100" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function ListFallback() {
  return (
    <div className="space-y-3" aria-hidden>
      {[0, 1].map((i) => (
        <div key={i} className="h-24 rounded-lg border-2 border-border bg-muted" />
      ))}
    </div>
  );
}

export default async function MessagesPage() {
  const t = await getT();
  return (
    <div className="space-y-6">
      <BackBar title={t("Messages")} fallback="/profile" />
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase">{t("Messages")}</h1>
        <p>{t("One conversation per loan. Use it to agree a time and place for the handoff.")}</p>
      </div>

      <Suspense fallback={<ListFallback />}>
        <Conversations />
      </Suspense>

      <section
        aria-labelledby="preview-conversation-heading"
        className="space-y-2 rounded-lg border-4 border-border bg-secondary p-4 text-secondary-foreground shadow sm:p-5"
      >
        <h2 id="preview-conversation-heading" className="text-xl font-black">
          {t("Preview: sample conversation")}
        </h2>
        <p className="text-sm font-medium">
          {t("Uses sample data, so you can see how messaging will look. Nothing in it is real.")}
        </p>
        <Link
          href="/messages/preview"
          className="inline-flex min-h-11 md:min-h-10 items-center gap-1 font-bold underline underline-offset-4"
        >
          {t("Open the sample conversation")} <ChevronRight aria-hidden className="size-4 rtl:-scale-x-100" />
        </Link>
      </section>
    </div>
  );
}
