"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckField } from "@/components/check-field";
import { CategoryArtwork, EmptyQueueIllustration } from "@/components/illustrations";
import {
  LAST_CALL_HOURS,
  damageLabel,
  formatTimeLeft,
  type Item,
  type QueueStatus,
  WRITES_ENABLED,
} from "@/lib/domain";
import { path } from "@/lib/paths";

export interface QueueRow {
  entryId: string;
  item: Item;
  status: QueueStatus;
  position: number | null; // 1-based place in the item's line
  lineLength: number;
  msLeft: number | null; // offer window remaining (status "offered" only)
}

// Queue order is per item, first come first served (queue_entries.created_at),
// so there's no manual reordering. Writes are off (WRITES_ENABLED): claim, pass,
// leave and dismiss show a preview notice and leave the row in place.
export function QueueList({ initial }: { initial: QueueRow[] }) {
  const [rows, setRows] = useState(initial);
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The row (and the button that was pressed) disappears, so announce through an
  // always-mounted live region and park focus on the list heading.
  const drop = (id: string, message: string) => {
    if (WRITES_ENABLED) {
      setRows((r) => r.filter((x) => x.entryId !== id));
      setNotice(message);
    } else {
      setNotice("Preview only: nothing was sent or saved yet.");
    }
    headingRef.current?.focus();
  };

  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-black outline-none">
        {rows.length} {rows.length === 1 ? "item" : "items"} in your queue
      </h2>
      <p role="status" aria-live="polite" className={notice ? "rounded-lg border-2 border-border bg-secondary p-3 font-bold text-secondary-foreground" : "sr-only"}>
        {notice}
      </p>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
          <EmptyQueueIllustration className="h-auto w-full max-w-64" />
          <p className="font-bold">
            Your queue is empty.{" "}
            <Link href={path("/browse")} className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
              Go find something good.
            </Link>
          </p>
        </div>
      ) : (
        <ol className="space-y-4">
          {rows.map((row) => (
            <li key={row.entryId}>
              {row.status === "offered" && row.msLeft !== null && row.msLeft > 0 ? (
                <OfferCard
                  row={row}
                  onClaim={() => drop(row.entryId, `Claimed: ${row.item.title}. The lender will be in touch about the handoff.`)}
                  onPass={() => drop(row.entryId, `You passed on ${row.item.title}. It moves to the next person in line.`)}
                />
              ) : row.status === "expired" || row.status === "offered" ? (
                <div className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-4">
                  <Thumb item={row.item} />
                  <div className="min-w-0 flex-1">
                    <ItemLink item={row.item} />
                    <p className="text-sm">
                      Time&apos;s up. This one moved on to the next person in the queue. You can rejoin the queue any time.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={path(`/item/${row.item.id}#request`)}>Rejoin</Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label={`Dismiss ${row.item.title}`}
                      onClick={() => drop(row.entryId, `Dismissed ${row.item.title}.`)}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-border bg-card p-4 shadow">
                  {row.position !== null ? (
                    <div className="text-center" aria-label={`Number ${row.position} of ${row.lineLength} in line`}>
                      <div className="text-3xl font-black leading-none" aria-hidden>#{row.position}</div>
                      <div className="text-xs font-bold uppercase" aria-hidden>of {row.lineLength}</div>
                    </div>
                  ) : (
                    <div className="text-center text-sm font-black uppercase">In line</div>
                  )}
                  <Thumb item={row.item} />
                  <div className="min-w-0 flex-1">
                    <ItemLink item={row.item} />
                    <p className="text-sm">{waitingText(row)}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label={`Leave the queue for ${row.item.title}`}
                    onClick={() => drop(row.entryId, `You left the queue for ${row.item.title}.`)}
                  >
                    <X />
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
      <p className="text-sm">
        <strong>Why 48 hours?</strong> So items don&apos;t sit idle while people are away from their phones. When
        it&apos;s your turn you have 48 hours to respond. Miss it and the item passes to the next person; you can
        always rejoin.
      </p>
    </div>
  );
}

function waitingText(row: QueueRow) {
  if (row.position === null) {
    return row.item.status === "available" ? "Waiting for your turn." : "On loan. You're in line for when it comes back.";
  }
  const ahead = row.position - 1;
  if (row.item.status === "available") {
    return ahead === 0
      ? "You're first in line. It's offered to you as soon as the lender confirms."
      : `Offered to the person ahead of you. ${ahead} ${ahead === 1 ? "person" : "people"} ahead.`;
  }
  return ahead === 0
    ? "On loan. You're next when it comes back."
    : `On loan. ${ahead} ${ahead === 1 ? "person" : "people"} ahead of you.`;
}

function Thumb({ item }: { item: Item }) {
  return <CategoryArtwork slug={item.category} className="size-16 shrink-0 rounded-lg border-2 border-border p-1" />;
}

function ItemLink({ item }: { item: Item }) {
  return (
    <Link href={path(`/item/${item.id}`)} className="inline-flex min-h-11 md:min-h-10 items-center font-black underline-offset-4 hover:underline">
      {item.title}
    </Link>
  );
}

// Head of the queue: 48h window to claim. Claiming is the borrow request, so the
// same confirmations apply (damage price, safety, 18+) as on the item page.
function OfferCard({ row, onClaim, onPass }: { row: QueueRow; onClaim: () => void; onPass: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [ackDamage, setAckDamage] = useState(false);
  const [ackSafety, setAckSafety] = useState(false);
  const [adult, setAdult] = useState(false);
  const [tried, setTried] = useState(false);

  // Count down from the server's value; tick once a minute after mount.
  const [ms, setMs] = useState(row.msLeft!);
  useEffect(() => {
    const t = setInterval(() => setMs((v) => v - 60_000), 60_000);
    return () => clearInterval(t);
  }, []);
  const lastCall = ms < LAST_CALL_HOURS * 3_600_000;
  const left = formatTimeLeft(ms);
  const prefix = `ack-${row.entryId}`;

  return (
    <div className={`space-y-3 rounded-lg border-4 border-border p-4 shadow ${lastCall ? "bg-destructive text-white" : "bg-accent text-accent-foreground"}`}>
      <p className="flex items-center gap-2 text-sm font-black uppercase">
        <Clock className="size-4" aria-hidden /> You&apos;re up next! #1 of {row.lineLength}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Thumb item={row.item} />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-xl font-black">
            Your turn: {row.item.title}.{" "}
            {lastCall ? `Last call: ${left} left to respond.` : `Respond within ${left} to keep your spot.`}
          </p>
          <p className="text-sm font-medium">Damage price: {damageLabel(row.item)}</p>
        </div>
      </div>

      {confirming ? (
        <form
          noValidate
          className="space-y-3 rounded-lg border-2 border-border bg-background p-4 text-foreground"
          onSubmit={(e) => {
            e.preventDefault();
            setTried(true);
            if (ackDamage && ackSafety && adult) onClaim();
          }}
        >
          <CheckField
            id={`${prefix}-damage`}
            checked={ackDamage}
            onChange={setAckDamage}
            error={tried && !ackDamage ? "Please confirm the damage price to send your request." : undefined}
            helper="The site doesn't take or hold any payment."
          >
            {row.item.damage_waived
              ? "I understand the lender has set no charge if this item comes back damaged or lost, and I'll still take good care of it."
              : `I understand that if this item comes back damaged or lost, I'll owe the lender the damage price of ${damageLabel(row.item)}, and we'll settle it directly.`}
          </CheckField>
          <CheckField
            id={`${prefix}-safety`}
            checked={ackSafety}
            onChange={setAckSafety}
            error={tried && !ackSafety ? "Please confirm to continue." : undefined}
          >
            I&apos;m responsible for the safety of this item while I have it. I&apos;ll check it before use and use it appropriately.
          </CheckField>
          <CheckField
            id={`${prefix}-adult`}
            checked={adult}
            onChange={setAdult}
            error={tried && !adult ? "You need to be 18 or older to borrow." : undefined}
          >
            I&apos;m 18 or older.
          </CheckField>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">Claim it</Button>
            <Button type="button" variant="outline" onClick={() => setConfirming(false)}>Back</Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setConfirming(true)} className="bg-background text-foreground">Claim it</Button>
          <Button variant="outline" onClick={onPass}>Pass for now</Button>
          <Button asChild variant="link" className={lastCall ? "text-white" : "text-accent-foreground"}>
            <Link href={path(`/item/${row.item.id}`)}>View item</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
