"use client";

import { useId, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import { WRITES_ENABLED } from "@/lib/domain";
import { path } from "@/lib/paths";
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
// submit shows the preview notice and nothing is stored.
export function FeedbackDialog({ children }: { children: React.ReactElement }) {
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>("bug");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState<{ text: string; field?: "message" } | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onOpenChange(next: boolean) {
    setOpen(next);
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
      if (res.signedOut) return router.push(`${path("/login")}?next=${encodeURIComponent(pathname)}`);
      setError({ text: res.error, field: res.field });
    });
  }

  const messageId = `${id}-message`;
  const replyId = `${id}-reply`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:max-w-md">
        {done ? (
          <>
            <DialogHeader>
              <DialogTitle>Send feedback</DialogTitle>
              <DialogDescription role="status" className="font-bold text-foreground">
                {done}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <form className="space-y-4" onSubmit={submit} noValidate>
            <DialogHeader>
              <DialogTitle>Send feedback</DialogTitle>
              <DialogDescription>
                project-arcade is pre-alpha, so your notes really help. Tell us what&apos;s broken, confusing, or missing.
              </DialogDescription>
            </DialogHeader>

            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as FeedbackType)}
              aria-label="Type"
              className="flex flex-wrap gap-x-5 gap-y-1"
            >
              {FEEDBACK_TYPES.map((t) => (
                <label key={t} className="flex min-h-11 cursor-pointer items-center gap-2 font-bold md:min-h-10">
                  <RadioGroupItem value={t} /> {TYPE_LABEL[t]}
                </label>
              ))}
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor={messageId}>What&apos;s on your mind?</Label>
              <Textarea
                id={messageId}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error?.field) setError(null);
                }}
                maxLength={FEEDBACK_MAX}
                rows={5}
                placeholder={PLACEHOLDER[type]}
                aria-invalid={error?.field === "message"}
                aria-describedby={`${messageId}-count${error?.field ? ` ${messageId}-error` : ""}`}
              />
              <p id={`${messageId}-count`} className="text-right text-xs">
                {message.length.toLocaleString("en-US")} / {FEEDBACK_MAX.toLocaleString("en-US")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={replyId}>How can we reply? (optional)</Label>
              <Input
                id={replyId}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                maxLength={REPLY_MAX}
                autoComplete="off"
                aria-describedby={`${replyId}-help`}
              />
              <p id={`${replyId}-help`} className="text-xs">
                Only fill this in if you&apos;d like an answer. We won&apos;t use it for anything else. Don&apos;t include
                passwords or payment details. Your account email is never shown here. If you want a reply by email, type
                the address you&apos;d like us to use.
              </p>
            </div>

            {error && (
              <p id={`${messageId}-error`} role="alert" className="text-sm font-bold text-destructive">
                {error.text}
              </p>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                Send feedback
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
