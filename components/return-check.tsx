"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FocusStatus } from "@/components/focus-status";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { WRITES_ENABLED } from "@/lib/domain";
import { path } from "@/lib/paths";

// Lender closes a handed-off loan: loans.status -> 'returned' | 'damaged' (+ damage_note).
// Writes are off (WRITES_ENABLED): shows a preview notice. When enabled:
// update loans set status, damage_note where id = loanId (lender only, enforced by trigger).
export function ReturnCheck({
  loanId,
  itemTitle,
  borrowerName,
  borrowerId,
  amountLabel,
  damageWaived,
}: {
  loanId: string;
  itemTitle: string;
  borrowerName: string;
  borrowerId: string | null; // null once the borrower deleted their account
  amountLabel: string;
  damageWaived: boolean;
}) {
  const [choice, setChoice] = useState<"" | "returned" | "damaged">("");
  const [note, setNote] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [saved, setSaved] = useState<null | "returned" | "damaged">(null);
  const [error, setError] = useState(false);

  if (saved) {
    return (
      <FocusStatus className="rounded-lg border-2 border-border bg-secondary p-4 font-bold text-secondary-foreground shadow">
        {!WRITES_ENABLED
          ? "Preview only: nothing was sent or saved yet."
          : saved === "returned"
          ? "Marked as returned OK. Thanks for lending!"
          : damageWaived
            ? "Marked as damaged. You set no charge for this item, so nothing is owed."
            : `Marked as damaged. The damage price of ${amountLabel} applies; sort it out with the borrower.`}
      </FocusStatus>
    );
  }

  const noteId = `damage-note-${loanId}`;

  return (
    <form
      className="space-y-4 rounded-lg border-2 border-border bg-card p-5 shadow"
      onSubmit={(e) => {
        e.preventDefault();
        if (!choice) return setError(true);
        if (choice === "damaged") return setConfirming(true);
        setSaved("returned");
      }}
    >
      <div>
        <h3 className="text-lg font-black">How did it come back?</h3>
        <p className="text-sm">
          {itemTitle}, borrowed by{" "}
          {borrowerId ? (
            <Link href={path(`/profile/${borrowerId}`)} className="font-bold underline underline-offset-4">
              {borrowerName}
            </Link>
          ) : (
            <strong>{borrowerName}</strong>
          )}
          . Check the item and tell us. This closes the loan.
        </p>
      </div>
      <RadioGroup
        value={choice}
        onValueChange={(v) => {
          setChoice(v as "returned" | "damaged");
          setError(false);
        }}
        aria-label={`Return condition for ${itemTitle}`}
        className="gap-3"
      >
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border p-3">
          <RadioGroupItem value="returned" className="mt-1" />
          <span>
            <span className="block font-black">Returned OK</span>
            <span className="text-sm">Everything&apos;s fine. Nobody owes anything.</span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border-2 border-border p-3">
          <RadioGroupItem value="damaged" className="mt-1" />
          <span>
            <span className="block font-black">Damaged or lost</span>
            <span className="text-sm">
              {damageWaived
                ? "The item came back damaged, or didn't come back. You set no charge if damaged, so nothing is owed."
                : `The item came back damaged, or didn't come back. The damage price of ${amountLabel} applies.`}
            </span>
          </span>
        </label>
      </RadioGroup>
      {error && <p role="alert" className="text-sm font-bold text-destructive">Please pick one.</p>}
      {choice === "damaged" && (
        <div className="space-y-2">
          <Label htmlFor={noteId}>What happened? (optional)</Label>
          <Textarea id={noteId} value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} placeholder="e.g. cracked screen, missing parts" />
          <p className="text-xs">
            You and the borrower settle this directly. The site doesn&apos;t collect or hold payment. Photos from
            handoff and return can help.
          </p>
        </div>
      )}
      <p className="text-xs">Normal wear and tear isn&apos;t damage.</p>
      <Button type="submit">Save</Button>

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as damaged?</AlertDialogTitle>
            <AlertDialogDescription>
              {damageWaived
                ? "This tells the borrower it came back damaged. You set no charge for this item, so nothing is owed."
                : `This tells the borrower the damage price of ${amountLabel} applies. You can add a note on what happened.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction onClick={() => setSaved("damaged")}>Mark as damaged</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
