import { Suspense } from "react";
import type { Metadata } from "next";
import { QueueList, type QueueRow } from "@/components/queue-list";
import { getMyQueue } from "@/lib/data/me";
import { requireUser } from "@/lib/data/session";

export const metadata: Metadata = { title: "My queue" };

export default function QueuePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase">My queue</h1>
        <p>Your place in line for each item. First come, first served.</p>
      </div>
      <Suspense fallback={<p className="font-bold">Loading your queue…</p>}>
        <MyQueue />
      </Suspense>
    </div>
  );
}

async function MyQueue() {
  await requireUser("/en/queue");
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
