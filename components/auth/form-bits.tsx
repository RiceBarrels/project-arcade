"use client";

import { startTransition, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/i18n/client";

// Small shared pieces for the auth forms. `label` and `hint` arrive translated;
// `error` and `message` are msg() keys from lib/auth/actions.ts, translated here.

export function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  error,
  hint,
  minLength,
  maxLength,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}) {
  const t = useT();
  const id = `field-${name}`;
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-bold">{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
      />
      {hint && <p id={`${id}-hint`} className="text-xs">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="text-sm font-bold text-destructive">{t(error)}</p>}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  const t = useT();
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border-2 border-border bg-background p-3 text-sm font-bold text-destructive">
      {t(message)}
    </p>
  );
}

export function FormOk({ message }: { message?: string }) {
  const t = useT();
  if (!message) return null;
  return (
    <p role="status" className="rounded-lg border-2 border-border bg-secondary p-3 text-sm font-bold text-secondary-foreground">
      {t(message)}
    </p>
  );
}

/**
 * Submit handler that dispatches a useActionState action without React's
 * automatic form reset, so a validation error doesn't wipe what was typed.
 */
export function submitWith(dispatch: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => dispatch(fd));
  };
}
