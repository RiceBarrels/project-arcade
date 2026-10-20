"use client";

import { startTransition, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Small shared pieces for the auth forms.

export function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  error,
  hint,
  maxLength,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
  required?: boolean;
}) {
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
        maxLength={maxLength}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy}
      />
      {hint && <p id={`${id}-hint`} className="text-xs">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="text-sm font-bold text-destructive">{error}</p>}
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg border-2 border-border bg-background p-3 text-sm font-bold text-destructive">
      {message}
    </p>
  );
}

export function FormOk({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="status" className="rounded-lg border-2 border-border bg-secondary p-3 text-sm font-bold text-secondary-foreground">
      {message}
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
