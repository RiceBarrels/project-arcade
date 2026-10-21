import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { ThreadView } from "@/components/messages/thread-view";
import { DELETED_ITEM, type ThreadData } from "@/components/messages/types";
import { localePath } from "@/i18n/config";
import { Link } from "@/i18n/link";
import { alternates, getT } from "@/i18n/server";
import { getMessages, getThreadLoan } from "@/lib/data/messages";
import { requireUser } from "@/lib/data/session";
import { isUuid } from "@/lib/domain";
import { PREVIEW_LOAN_ID, previewThread } from "@/lib/mock-messages";
import { BackBar } from "@/components/mobile/back-bar";

type ThreadParams = PageProps<"/[locale]/messages/[loanId]">["params"];

export async function generateMetadata({ params }: { params: ThreadParams }): Promise<Metadata> {
  const [{ loanId }, t] = await Promise.all([params, getT()]);
  return { title: t("Messages"), alternates: await alternates(`/messages/${loanId}`) };
}

// Typed by hand (same shape as PageProps<"/[locale]/messages/[loanId]">) so it type-checks before route types are regenerated.
async function Thread({ params }: { params: ThreadParams }) {
  const [{ loanId }, t] = await Promise.all([params, getT()]);
  const user = await requireUser(localePath(`/messages/${loanId}`, t.locale));

  if (loanId === PREVIEW_LOAN_ID) return <ThreadView thread={previewThread} preview />;

  if (!isUuid(loanId)) notFound();
  const [loan, messages] = await Promise.all([getThreadLoan(loanId), getMessages(loanId)]);
  if (!loan) notFound();

  // The other side: if I'm the lender it's the borrower, otherwise the lender.
  // A null join means that account was deleted.
  const other = loan.lender_id === user.id ? loan.borrower : loan.lender;
  const thread: ThreadData = {
    loanId: loan.id,
    status: loan.status,
    itemTitle: loan.item_title ?? loan.item?.title ?? t(DELETED_ITEM),
    itemCategory: loan.item?.category ?? null,
    myId: user.id,
    other: other ?? null,
    messages,
  };
  return <ThreadView thread={thread} />;
}

function ThreadFallback() {
  return (
    <div className="space-y-4" aria-hidden>
      <div className="h-12 w-3/4 rounded-lg border-2 border-border bg-muted" />
      <div className="h-24 rounded-lg border-2 border-border bg-muted" />
      <div className="h-40 rounded-lg border-2 border-dashed border-border bg-muted" />
    </div>
  );
}

export default async function ThreadPage({ params }: { params: ThreadParams }) {
  const t = await getT();
  return (
    <div className="space-y-6">
      <BackBar title={t("Messages")} fallback="/messages" />
      <Link
        href="/messages"
        className="hidden min-h-10 items-center md:inline-flex gap-1 text-sm font-bold underline underline-offset-4"
      >
        <ChevronLeft aria-hidden className="size-4 rtl:-scale-x-100" /> {t("All messages")}
      </Link>
      <Suspense fallback={<ThreadFallback />}>
        <Thread params={params} />
      </Suspense>
    </div>
  );
}
