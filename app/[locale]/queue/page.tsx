import { Suspense } from "react";
import type { Metadata } from "next";
import { QueueList, type QueueRow } from "@/components/queue-list";
import { localePath } from "@/i18n/config";
import { alternates, getLocale, getT } from "@/i18n/server";
import { getMyQueue } from "@/lib/data/me";
import { requireUser } from "@/lib/data/session";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("My queue"), alternates: await alternates("/queue") };
}

export default async function QueuePage() {
  const t = await getT();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase">{t("My queue")}</h1>
        <p>{t("Your place in line for each item. First come, first served.")}</p>
      </div>
      <Suspense fallback={<p className="font-bold">{t("Loading your queue…")}</p>}>
        <MyQueue />
      </Suspense>
    </div>
  );
}

async function MyQueue() {
  await requireUser(localePath("/queue", await getLocale()));
  const entries = await getMyQueue();
  const rows: QueueRow[] = entries.flatMap((q) =>
    q.item
      ? [{
          entryId: q.id,
          item: q.item,
          status: q.status,
          position: q.position,
          lineLength: q.line_length,
          msLeft: q.ms_left,
        }]
      : [],
  );
  // Open offers first, then by place in line, expired last.
  const rank = (r: QueueRow) => (r.status === "offered" ? 0 : r.status === "expired" ? 2 : 1);
  rows.sort((a, b) => rank(a) - rank(b) || (a.position ?? 99) - (b.position ?? 99));
  return <QueueList initial={rows} />;
}
