"use client";

import { useId, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { PREVIEW_ONLY } from "@/components/settings/shared";
import { useRouter, useT } from "@/i18n/client";
import { WRITES_ENABLED } from "@/lib/domain";
import { SITE_NAME } from "@/lib/site";
import { sendFeedback } from "./actions";
import {
  FEEDBACK_ERRORS,
  FEEDBACK_MAX,
  FEEDBACK_SENT,
  FEEDBACK_TYPES,
  PLACEHOLDER,
  REPLY_MAX,
  TYPE_LABEL,
  type FeedbackType,
} from "./shared";

// Send feedback dialog (docs/copy-en.md 19); a bottom sheet on phones like every
// Dialog. Signed-in members only: FeedbackEntry links signed-out visitors to
// /login instead of rendering this. Writes are off (WRITES_ENABLED), so a valid
// submit shows the preview notice and nothing is stored. `error` and `done` hold
// English source strings (msg) and are translated when shown.
// `children` is the trigger. Without one (the desktop account menu opens it
// from a menu item), pass `open`/`onOpenChange`, and `returnFocus` for where
// focus goes when it closes.
export function FeedbackDialog({
  children,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  returnFocus,
}: {
  children?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  returnFocus?: React.RefObject<HTMLElement | null>;
}) {
  const id = useId();
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const [ownOpen, setOwnOpen] = useState(false);
  const open = openProp ?? ownOpen;
  const [type, setType] = useState<FeedbackType>("bug");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState<{ text: string; field?: "message" } | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onOpenChange(next: boolean) {
    setOwnOpen(next);
    onOpenChangeProp?.(next);
    if (!next) {
      setType("bug");
      setMessage("");
      setReply("");
      setError(null);
      setDone(null);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = message.trim();
    if (!text) return setError({ text: FEEDBACK_ERRORS.empty, field: "message" });
    if (text.length > FEEDBACK_MAX) return setError({ text: FEEDBACK_ERRORS.tooLong, field: "message" });
    setError(null);
    if (!WRITES_ENABLED) return setDone(PREVIEW_ONLY);
    startTransition(async () => {
      const res = await sendFeedback({ type, message: text, reply, path: pathname });
      if (res.ok) return setDone(FEEDBACK_SENT);
      if (res.signedOut) return router.push(`/login?next=${encodeURIComponent(pathname)}`);
      setError({ text: res.error, field: res.field });
    });
  }

  const messageId = `${id}-message`;
  const replyId = `${id}-reply`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className="md:max-w-md"
        onCloseAutoFocus={
          returnFocus
            ? (e) => {
                e.preventDefault();
                returnFocus.current?.focus();
              }
            : undefined
        }
      >
        {done ? (
          <>
            <DialogHeader>
              <DialogTitle>{t("Send feedback")}</DialogTitle>
              <DialogDescription role="status" className="font-bold text-foreground">
                {t(done)}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>{t("Close")}</Button>
            </DialogFooter>
          </>
        ) : (
          <form className="space-y-4" onSubmit={submit} noValidate>
            <DialogHeader>
              <DialogTitle>{t("Send feedback")}</DialogTitle>
              <DialogDescription>
                {t.rich("{site} is pre-alpha, so your notes really help. Tell us what's broken, confusing, or missing.", {
                  site: <bdi>{SITE_NAME}</bdi>,
                })}
              </DialogDescription>
            </DialogHeader>

            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as FeedbackType)}
              aria-label={t("Type")}
              className="flex flex-wrap gap-x-5 gap-y-1"
            >
              {FEEDBACK_TYPES.map((k) => (
                <label key={k} className="flex min-h-11 cursor-pointer items-center gap-2 font-bold md:min-h-10">
                  <RadioGroupItem value={k} /> {t(TYPE_LABEL[k])}
                </label>
              ))}
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor={messageId}>{t("What's on your mind?")}</Label>
              <Textarea
                id={messageId}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error?.field) setError(null);
                }}
                maxLength={FEEDBACK_MAX}
                rows={5}
                placeholder={t(PLACEHOLDER[type])}
                aria-invalid={error?.field === "message"}
                aria-describedby={`${messageId}-count${error?.field ? ` ${messageId}-error` : ""}`}
              />
              <p id={`${messageId}-count`} className="text-end text-xs">
                {t.number(message.length)} / {t.number(FEEDBACK_MAX)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={replyId}>{t("How can we reply? (optional)")}</Label>
              <Input
                id={replyId}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                maxLength={REPLY_MAX}
                autoComplete="off"
                aria-describedby={`${replyId}-help`}
              />
              <p id={`${replyId}-help`} className="text-xs">
                {t(
                  "Only fill this in if you'd like an answer. We won't use it for anything else. Don't include passwords or payment details. Your account email is never shown here. If you want a reply by email, type the address you'd like us to use.",
                )}
              </p>
            </div>

            {error && (
              <p id={`${messageId}-error`} role="alert" className="text-sm font-bold text-destructive">
                {t(error.text)}
              </p>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("Cancel")}
              </Button>
              <Button type="submit" disabled={pending}>
                {t("Send feedback")}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
