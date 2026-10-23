"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { TriangleAlert } from "lucide-react";
import { FocusStatus } from "@/components/focus-status";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/i18n/client";
import { WRITES_ENABLED } from "@/lib/domain";
import { deleteMyAccount, type DeleteResult } from "@/components/settings/actions";
import {
  DELETE_CONFIRM_LABEL,
  DELETE_CONFIRM_WORD,
  isDeleteWord,
  DELETE_DIALOG_BODY,
  DELETE_ERROR,
  DELETED_HEADING,
  DELETED_LIST,
  KEPT_HEADING,
  KEPT_LIST,
  DELETE_MISMATCH,
  DELETE_TEXT,
  OPEN_LOANS_WARNING,
  PREVIEW_ONLY,
} from "@/components/settings/shared";

const dangerButton =
  "bg-destructive text-destructive-foreground hover:bg-destructive/85 focus-visible:ring-destructive/40";

function DeleteList({ className }: { className?: string }) {
  const t = useT();
  return (
    <div className={`space-y-3 text-sm font-medium ${className ?? ""}`}>
      {[
        [DELETED_HEADING, DELETED_LIST],
        [KEPT_HEADING, KEPT_LIST],
      ].map(([heading, lines]) => (
        <div key={heading as string}>
          <p className="font-black">{t(heading as string)}</p>
          <ul className="list-disc space-y-1 ps-5">
            {(lines as string[]).map((line) => (
              <li key={line}>{t(line)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function OpenLoansWarning({
  id,
  ref,
  alert,
}: {
  id: string;
  ref?: React.Ref<HTMLParagraphElement>;
  alert?: boolean;
}) {
  const t = useT();
  return (
    <p
      id={id}
      ref={ref}
      role={alert ? "alert" : undefined}
      tabIndex={alert ? -1 : undefined}
      className="flex items-start gap-2 rounded-lg border-2 border-border bg-secondary p-3 text-sm font-bold text-secondary-foreground outline-none"
    >
      <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{t(OPEN_LOANS_WARNING)}</span>
    </p>
  );
}

// Danger zone. Writes are off (WRITES_ENABLED): the dialog validates the
// confirm word, closes, and the preview notice replaces the button. When
// enabled it calls the deleteMyAccount Server Action (removes item-photos/<uid>/,
// rpc('delete_my_account'), signs out, redirects to /<locale>?account=deleted).
// The error state holds an English source string (msg), translated when shown.
export function DeleteAccount({ loanInProgress }: { loanInProgress: boolean }) {
  const t = useT();
  const [blocked, setBlocked] = useState(loanInProgress);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [pending, startTransition] = useTransition();
  const showPreviewAfterClose = useRef(false);
  // After a failed attempt the submit button may be disabled under the user's
  // focus, so focus moves to whichever message explains why.
  const resultRef = useRef<HTMLParagraphElement>(null);
  const [resultTick, setResultTick] = useState(0);
  useEffect(() => {
    if (resultTick > 0) resultRef.current?.focus();
  }, [resultTick]);

  const uid = useId();
  const warningId = `${uid}-loans`;
  const confirmId = `${uid}-confirm`;
  const mismatchId = `${uid}-mismatch`;
  const errorId = `${uid}-error`;

  const matches = isDeleteWord(confirm);
  const mismatch = confirm.length > 0 && !matches;

  function onOpenChange(next: boolean) {
    if (pending) return;
    setOpen(next);
    if (!next) {
      setConfirm("");
      setError("");
    }
  }

  function onConfirm() {
    if (!matches || blocked) return;
    if (!WRITES_ENABLED) {
      showPreviewAfterClose.current = true;
      onOpenChange(false);
      return;
    }
    setError("");
    startTransition(async () => {
      // On success the action signs out and redirects, so it only resolves with an error.
      const res: DeleteResult | undefined = await deleteMyAccount(confirm, t.locale).catch(() => ({
        ok: false as const,
        error: DELETE_ERROR,
      }));
      if (!res) return; // redirected
      if (res.loanInProgress) {
        // The open-loans warning shows in the dialog; don't repeat it as an error.
        setBlocked(true);
        setError("");
      } else {
        setError(res.error);
      }
      setResultTick((n) => n + 1);
    });
  }

  return (
    <div className="space-y-4">
      <p className="font-medium">{t(DELETE_TEXT)}</p>
      <DeleteList />
      {blocked && <OpenLoansWarning id={warningId} />}

      {preview ? (
        <FocusStatus className="rounded-lg border-2 border-border bg-secondary p-4 font-bold text-secondary-foreground shadow">
          {t(PREVIEW_ONLY)}
        </FocusStatus>
      ) : (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
          <AlertDialogTrigger asChild>
            <Button
              size="lg"
              className={dangerButton}
              disabled={blocked}
              aria-describedby={blocked ? warningId : undefined}
            >
              <TriangleAlert aria-hidden /> {t("Delete my account")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            className="md:data-[size=default]:max-w-md"
            onCloseAutoFocus={(e) => {
              // The trigger is about to be replaced by the preview notice, which takes focus itself.
              if (showPreviewAfterClose.current) {
                e.preventDefault();
                showPreviewAfterClose.current = false;
                setPreview(true);
              }
            }}
          >
            <form
              noValidate
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                onConfirm();
              }}
            >
              <AlertDialogHeader className="place-items-start text-start">
                <AlertDialogTitle className="flex items-center gap-2 text-xl font-black">
                  <span className="inline-flex size-8 items-center justify-center rounded-md border-2 border-border bg-destructive text-destructive-foreground">
                    <TriangleAlert aria-hidden className="size-4" />
                  </span>
                  {t("Delete your account?")}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-start font-medium text-foreground">
                  {t(DELETE_DIALOG_BODY)}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <DeleteList />
              {blocked && <OpenLoansWarning id={`${warningId}-dialog`} ref={resultRef} alert />}

              <div className="space-y-2">
                <Label htmlFor={confirmId} className="font-bold">
                  {t(DELETE_CONFIRM_LABEL)}
                </Label>
                <Input
                  id={confirmId}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={DELETE_CONFIRM_WORD}
                  autoComplete="off"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                  disabled={pending || blocked}
                  aria-invalid={mismatch}
                  aria-describedby={[mismatch ? mismatchId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined}
                />
                {/* A hint, not an error: polite and always mounted, so it is read once
                    when it appears instead of interrupting every keystroke. */}
                <p id={mismatchId} aria-live="polite" className="text-sm font-bold text-destructive empty:hidden">
                  {mismatch ? t(DELETE_MISMATCH) : ""}
                </p>
              </div>

              {error && (
                <p
                  id={errorId}
                  ref={resultRef}
                  role="alert"
                  tabIndex={-1}
                  className="rounded-lg border-2 border-border bg-background p-3 text-sm font-bold text-destructive outline-none"
                >
                  {t(error)}
                </p>
              )}

              <AlertDialogFooter className="mx-0 mb-0 rounded-lg border-0 bg-transparent p-0">
                <AlertDialogCancel disabled={pending}>{t("Cancel")}</AlertDialogCancel>
                <Button type="submit" className={dangerButton} disabled={!matches || blocked || pending}>
                  {pending ? t("Deleting…") : t("Delete my account")}
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
