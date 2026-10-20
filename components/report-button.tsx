"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const REASONS = [
  "Unsafe or dangerous item",
  "Illegal or prohibited item",
  "Fake or misleading listing",
  "Item not as described",
  "Harassment or abuse",
  "Spam",
  "Something else",
];

// Mock only: nothing is sent. Maps to public.reports (reported_item_id XOR reported_user_id).
export function ReportButton({ target, targetId }: { target: "listing" | "user"; targetId: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "confirm" | "sent">("form");
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setStep("form");
      setReason("");
      setDetails("");
      setError(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-10"
          title="Something wrong with this listing or user? Let us know."
          data-report-target={`${target}:${targetId}`}
        >
          <Flag aria-hidden /> Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        {step === "sent" ? (
          <>
            <DialogHeader>
              <DialogTitle>Report sent</DialogTitle>
              <DialogDescription>Report sent. Thanks for helping keep the arcade friendly.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : step === "confirm" ? (
          <>
            <DialogHeader>
              <DialogTitle>Send this report?</DialogTitle>
              <DialogDescription>
                Send this report? We&apos;ll review it, but we may not be able to reply to you personally.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("form")}>Cancel</Button>
              <Button onClick={() => setStep("sent")}>Send report</Button>
            </DialogFooter>
          </>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!reason) {
                setError(true);
                return;
              }
              setStep("confirm");
            }}
          >
            <DialogHeader>
              <DialogTitle>Report this {target}</DialogTitle>
              <DialogDescription>Thanks for flagging it. Tell us what&apos;s wrong and we&apos;ll take a look.</DialogDescription>
            </DialogHeader>
            <RadioGroup
              value={reason}
              onValueChange={(v) => {
                setReason(v);
                setError(false);
              }}
              aria-label="Reason"
              aria-invalid={error}
              className="gap-1"
            >
              {REASONS.map((r) => (
                <label key={r} className="flex min-h-10 cursor-pointer items-center gap-3 font-medium">
                  <RadioGroupItem value={r} /> {r}
                </label>
              ))}
            </RadioGroup>
            {error && <p role="alert" className="text-sm font-bold text-destructive">Please pick a reason.</p>}
            <div className="space-y-2">
              <Label htmlFor={`report-details-${targetId}`}>Anything else we should know? (optional)</Label>
              <Textarea
                id={`report-details-${targetId}`}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={1000}
                placeholder="What happened? Keep it factual."
              />
            </div>
            <p className="text-xs">
              We review reports as a small non-profit project, so replies may take a while. For emergencies, contact
              your local emergency services, not us.
            </p>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Send report</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
