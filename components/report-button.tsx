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
import { useT } from "@/i18n/client";
import { msg } from "@/i18n/msg";

const REASONS = [
  msg("Unsafe or dangerous item"),
  msg("Illegal or prohibited item"),
  msg("Fake or misleading listing"),
  msg("Item not as described"),
  msg("Harassment or abuse"),
  msg("Spam"),
  msg("Something else"),
];

// Mock only: nothing is sent. Maps to public.reports (reported_item_id XOR reported_user_id).
export function ReportButton({ target, targetId }: { target: "listing" | "user"; targetId: string }) {
  const t = useT();
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
          className="min-h-11 md:min-h-10"
          title={t("Something wrong with this listing or user? Let us know.")}
          data-report-target={`${target}:${targetId}`}
        >
          <Flag aria-hidden /> {t("Report")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {step === "sent" ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("Report sent")}</DialogTitle>
              <DialogDescription>{t("Report sent. Thanks for helping keep the arcade friendly.")}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>{t("Close")}</Button>
            </DialogFooter>
          </>
        ) : step === "confirm" ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("Send this report?")}</DialogTitle>
              <DialogDescription>
                {t("Send this report? We'll review it, but we may not be able to reply to you personally.")}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("form")}>{t("Cancel")}</Button>
              <Button onClick={() => setStep("sent")}>{t("Send report")}</Button>
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
              <DialogTitle>{target === "user" ? t("Report this user") : t("Report this listing")}</DialogTitle>
              <DialogDescription>{t("Thanks for flagging it. Tell us what's wrong and we'll take a look.")}</DialogDescription>
            </DialogHeader>
            <RadioGroup
              value={reason}
              onValueChange={(v) => {
                setReason(v);
                setError(false);
              }}
              aria-label={t("Reason")}
              aria-invalid={error}
              className="gap-1"
            >
              {REASONS.map((r) => (
                <label key={r} className="flex min-h-11 md:min-h-10 cursor-pointer items-center gap-3 font-medium">
                  <RadioGroupItem value={r} /> {t(r)}
                </label>
              ))}
            </RadioGroup>
            {error && <p role="alert" className="text-sm font-bold text-destructive">{t("Please pick a reason.")}</p>}
            <div className="space-y-2">
              <Label htmlFor={`report-details-${targetId}`}>{t("Anything else we should know? (optional)")}</Label>
              <Textarea
                id={`report-details-${targetId}`}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={1000}
                placeholder={t("What happened? Keep it factual.")}
              />
            </div>
            <p className="text-xs">
              {t(
                "We review reports as a small non-profit project, so replies may take a while. For emergencies, contact your local emergency services, not us. Found a bug or have an idea instead? Use Send feedback.",
              )}
            </p>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>{t("Cancel")}</Button>
              <Button type="submit">{t("Send report")}</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
