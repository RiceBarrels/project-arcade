"use client";

import { useId, useRef, useState } from "react";
import { Send } from "lucide-react";
import { FocusStatus } from "@/components/focus-status";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useT } from "@/i18n/client";
import { msg } from "@/i18n/msg";
import { WRITES_ENABLED } from "@/lib/domain";
import { createClient } from "@/lib/supabase/client";
import { MESSAGE_MAX } from "./types";

// Composer for one loan's thread. Writes are off (WRITES_ENABLED), so a valid
// submit only shows the preview notice and keeps the text. With writes on it
// inserts into public.messages (RLS: sender_id must be auth.uid(), loan open).
// senderId is the session user rendered by the server; it is not trusted, since
// the messages_insert policy rejects any sender_id other than auth.uid().
export function MessageComposer({
  loanId,
  senderId,
  preview = false,
}: {
  loanId: string;
  senderId: string;
  /** Sample thread: never write, even once writes are enabled. */
  preview?: boolean;
}) {
  const router = useRouter();
  const t = useT();
  const id = useId();
  const fieldId = `${id}-body`;
  const countId = `${id}-count`;
  const errorId = `${id}-error`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = useState("");
  // An English source string (msg), translated when shown.
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  // Bumped on each preview-only submit so the notice remounts and takes focus again.
  const [previewShown, setPreviewShown] = useState(0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    const text = body.trim();
    if (text.length === 0) {
      setPreviewShown(0);
      setError(msg("Write a message before sending."));
      textareaRef.current?.focus();
      return;
    }
    if (text.length > MESSAGE_MAX) {
      setPreviewShown(0);
      setError(msg("Messages can be up to 2,000 characters."));
      textareaRef.current?.focus();
      return;
    }
    setError("");

    if (WRITES_ENABLED && !preview) {
      setPending(true);
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("messages")
        .insert({ loan_id: loanId, sender_id: senderId, body: text });
      setPending(false);
      if (insertError) {
        setError(msg("Couldn't send your message. Please try again."));
        textareaRef.current?.focus();
        return;
      }
      setBody("");
      router.refresh();
      textareaRef.current?.focus();
      return;
    }

    setPreviewShown((n) => n + 1);
  }

  const describedBy = [countId, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-2 rounded-lg border-2 border-border bg-card p-3 text-card-foreground shadow-xs sm:p-4">
      <Label htmlFor={fieldId} className="sr-only">
        {t("Message")}
      </Label>
      <Textarea
        ref={textareaRef}
        id={fieldId}
        name="body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          if (error) setError("");
          if (previewShown) setPreviewShown(0);
        }}
        maxLength={MESSAGE_MAX}
        rows={3}
        placeholder={t("Write a message")}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="min-h-24 bg-background"
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p id={countId} className="text-sm font-medium">
          {t.number(body.length, { useGrouping: false })} / {t.number(MESSAGE_MAX)}
        </p>
        <Button type="submit" disabled={pending}>
          <Send aria-hidden className="rtl:-scale-x-100" /> {t("Send")}
        </Button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-sm font-bold text-destructive">
          {t(error)}
        </p>
      )}
      {previewShown > 0 && (
        <FocusStatus
          key={previewShown}
          className="rounded-lg border-2 border-border bg-secondary p-3 font-bold text-secondary-foreground"
        >
          {t("Preview only: nothing was sent or saved yet.")}
        </FocusStatus>
      )}
    </form>
  );
}
