"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckField } from "@/components/check-field";
import { CategoryArtwork, EmptyQueueIllustration } from "@/components/illustrations";
import { useT } from "@/i18n/client";
import type { Translator } from "@/i18n/core";
import { Link } from "@/i18n/link";
import {
  LAST_CALL_HOURS,
  damageLabel,
  formatTimeLeft,
  type Item,
  type QueueStatus,
  WRITES_ENABLED,
} from "@/lib/domain";

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
  const t = useT();
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
      setNotice(t("Preview only: nothing was sent or saved yet."));
    }
    headingRef.current?.focus();
  };

  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-black outline-none">
        {t.plural(rows.length, "{count} item in your queue", "{count} items in your queue")}
      </h2>
      <p role="status" aria-live="polite" className={notice ? "rounded-lg border-2 border-border bg-secondary p-3 font-bold text-secondary-foreground" : "sr-only"}>
        {notice}
      </p>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-6 text-center">
          <EmptyQueueIllustration className="h-auto w-full max-w-64" />
          <p className="font-bold">
            {t.rich("Your queue is empty. <link>Go find something good.</link>", {
              link: (c) => (
                <Link href="/browse" className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
                  {c}
                </Link>
              ),
            })}
          </p>
        </div>
      ) : (
        <ol className="space-y-4">
          {rows.map((row) => (
            <li key={row.entryId}>
              {row.status === "offered" && row.msLeft !== null && row.msLeft > 0 ? (
                <OfferCard
                  row={row}
                  onClaim={() =>
                    drop(row.entryId, t("Claimed: {title}. The lender will be in touch about the handoff.", { title: row.item.title }))
                  }
                  onPass={() =>
                    drop(row.entryId, t("You passed on {title}. It moves to the next person in line.", { title: row.item.title }))
                  }
                />
              ) : row.status === "expired" || row.status === "offered" ? (
                <div className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted p-4">
                  <Thumb item={row.item} />
                  <div className="min-w-0 flex-1">
                    <ItemLink item={row.item} />
                    <p className="text-sm">
                      {t("Time's up. This one moved on to the next person in the queue. You can rejoin the queue any time.")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/item/${row.item.id}#request`}>{t("Rejoin")}</Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label={t("Dismiss {title}", { title: row.item.title })}
                      onClick={() => drop(row.entryId, t("Dismissed {title}.", { title: row.item.title }))}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-border bg-card p-4 shadow">
                  {row.position !== null ? (
                    <div className="text-center" aria-label={t("Number {position} of {total} in line", { position: row.position, total: row.lineLength })}>
                      <div className="text-3xl font-black leading-none" aria-hidden>#{row.position}</div>
                      <div className="text-xs font-bold uppercase" aria-hidden>{t("of {total}", { total: row.lineLength })}</div>
                    </div>
                  ) : (
                    <div className="text-center text-sm font-black uppercase">{t("In line")}</div>
                  )}
                  <Thumb item={row.item} />
                  <div className="min-w-0 flex-1">
                    <ItemLink item={row.item} />
                    <p className="text-sm">{waitingText(row, t)}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label={t("Leave the queue for {title}", { title: row.item.title })}
                    onClick={() => drop(row.entryId, t("You left the queue for {title}.", { title: row.item.title }))}
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
        {t.rich(
          "<strong>Why 48 hours?</strong> So items don't sit idle while people are away from their phones. When it's your turn you have 48 hours to respond. Miss it and the item passes to the next person; you can always rejoin.",
          { strong: (c) => <strong>{c}</strong> },
        )}
      </p>
    </div>
  );
}

function waitingText(row: QueueRow, t: Translator) {
  if (row.position === null) {
    return row.item.status === "available"
      ? t("Waiting for your turn.")
      : t("On loan. You're in line for when it comes back.");
  }
  const ahead = row.position - 1;
  if (row.item.status === "available") {
    return ahead === 0
      ? t("You're first in line. It's offered to you as soon as the lender confirms.")
      : t.plural(
          ahead,
          "Offered to the person ahead of you. {count} person ahead.",
          "Offered to the person ahead of you. {count} people ahead.",
        );
  }
  return ahead === 0
    ? t("On loan. You're next when it comes back.")
    : t.plural(ahead, "On loan. {count} person ahead of you.", "On loan. {count} people ahead of you.");
}

function Thumb({ item }: { item: Item }) {
  return <CategoryArtwork slug={item.category} className="size-16 shrink-0 rounded-lg border-2 border-border p-1" />;
}

function ItemLink({ item }: { item: Item }) {
  return (
    <Link href={`/item/${item.id}`} className="inline-flex min-h-11 md:min-h-10 items-center font-black underline-offset-4 hover:underline">
      <bdi>{item.title}</bdi>
    </Link>
  );
}

// Head of the queue: 48h window to claim. Claiming is the borrow request, so the
// same confirmations apply (damage price, safety, 18+) as on the item page.
function OfferCard({ row, onClaim, onPass }: { row: QueueRow; onClaim: () => void; onPass: () => void }) {
  const t = useT();
  const [confirming, setConfirming] = useState(false);
  const [ackDamage, setAckDamage] = useState(false);
  const [ackSafety, setAckSafety] = useState(false);
  const [adult, setAdult] = useState(false);
  const [tried, setTried] = useState(false);

  // Count down from the server's value; tick once a minute after mount.
  const [ms, setMs] = useState(row.msLeft!);
  useEffect(() => {
    const timer = setInterval(() => setMs((v) => v - 60_000), 60_000);
    return () => clearInterval(timer);
  }, []);
  const lastCall = ms < LAST_CALL_HOURS * 3_600_000;
  const left = formatTimeLeft(ms, t);
  const prefix = `ack-${row.entryId}`;

  return (
    <div className={`space-y-3 rounded-lg border-4 border-border p-4 shadow ${lastCall ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"}`}>
      <p className="flex items-center gap-2 text-sm font-black uppercase">
        <Clock className="size-4" aria-hidden /> {t("You're up next! #1 of {total}", { total: row.lineLength })}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Thumb item={row.item} />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-xl font-black">
            {t("Your turn: {title}.", { title: row.item.title })}{" "}
            {lastCall
              ? t("Last call: {left} left to respond.", { left })
              : t("Respond within {left} to keep your spot.", { left })}
          </p>
          <p className="text-sm font-medium">{t("Damage price: {price}", { price: damageLabel(row.item, t) })}</p>
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
            error={tried && !ackDamage ? t("Please confirm the damage price to send your request.") : undefined}
            helper={t("The site doesn't take or hold any payment.")}
          >
            {row.item.damage_waived
              ? t("I understand the lender has set no charge if this item comes back damaged or lost, and I'll still take good care of it.")
              : t(
                  "I understand that if this item comes back damaged or lost, I'll owe the lender the damage price of {price}, and we'll settle it directly.",
                  { price: damageLabel(row.item, t) },
                )}
          </CheckField>
          <CheckField
            id={`${prefix}-safety`}
            checked={ackSafety}
            onChange={setAckSafety}
            error={tried && !ackSafety ? t("Please confirm to continue.") : undefined}
          >
            {t("I'm responsible for the safety of this item while I have it. I'll check it before use and use it appropriately.")}
          </CheckField>
          <CheckField
            id={`${prefix}-adult`}
            checked={adult}
            onChange={setAdult}
            error={tried && !adult ? t("You need to be 18 or older to borrow.") : undefined}
          >
            {t("I'm 18 or older.")}
          </CheckField>
          <div className="flex flex-wrap gap-2">
            <Button type="submit">{t("Claim it")}</Button>
            <Button type="button" variant="outline" onClick={() => setConfirming(false)}>{t("Back")}</Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setConfirming(true)} className="bg-background text-foreground">{t("Claim it")}</Button>
          <Button variant="outline" onClick={onPass}>{t("Pass for now")}</Button>
          <Button asChild variant="link" className={lastCall ? "text-destructive-foreground" : "text-accent-foreground"}>
            <Link href={`/item/${row.item.id}`}>{t("View item")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
