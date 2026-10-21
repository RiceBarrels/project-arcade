"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormError, FormOk, TextField, submitWith } from "@/components/auth/form-bits";
import { useT } from "@/i18n/client";
import { requestPasswordReset, resendVerification, type FormState } from "@/lib/auth/actions";

const ACTIONS = { resend: resendVerification, reset: requestPasswordReset };

// One email field + button: resend verification, or request a password reset.
// The success message is the same whether or not the address has an account.
// `button` and `helper` arrive translated.
export function EmailOnlyForm({ kind, button, helper }: { kind: keyof typeof ACTIONS; button: string; helper?: string }) {
  const t = useT();
  const [state, action, pending] = useActionState<FormState, FormData>(ACTIONS[kind], {});
  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-4">
      <input type="hidden" name="locale" value={t.locale} />
      <TextField name="email" label={t("Email")} type="email" autoComplete="email" hint={helper} error={state.fields?.email} required />
      <FormError message={state.error} />
      <FormOk message={state.ok} />
      <Button type="submit" disabled={pending}>{pending ? t("Sending…") : button}</Button>
    </form>
  );
}
