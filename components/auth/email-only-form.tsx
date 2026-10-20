"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormError, FormOk, TextField, submitWith } from "@/components/auth/form-bits";
import { requestPasswordReset, resendVerification, type FormState } from "@/lib/auth/actions";

const ACTIONS = { resend: resendVerification, reset: requestPasswordReset };

// One email field + button: resend verification, or request a password reset.
// The success message is the same whether or not the address has an account.
export function EmailOnlyForm({ kind, button, helper }: { kind: keyof typeof ACTIONS; button: string; helper?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(ACTIONS[kind], {});
  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-4">
      <TextField name="email" label="Email" type="email" autoComplete="email" hint={helper} error={state.fields?.email} required />
      <FormError message={state.error} />
      <FormOk message={state.ok} />
      <Button type="submit" disabled={pending}>{pending ? "Sending…" : button}</Button>
    </form>
  );
}
