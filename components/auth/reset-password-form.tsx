"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormError, TextField, submitWith } from "@/components/auth/form-bits";
import { useT } from "@/i18n/client";
import { updatePassword, type FormState } from "@/lib/auth/actions";

export function ResetPasswordForm() {
  const t = useT();
  const [state, action, pending] = useActionState<FormState, FormData>(updatePassword, {});
  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <input type="hidden" name="locale" value={t.locale} />
      <TextField
        name="password"
        label={t("New password")}
        type="password"
        autoComplete="new-password"
        hint={t("At least 8 characters.")}
        minLength={8}
        error={state.fields?.password}
        required
      />
      <FormError message={state.error} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? t("Saving…") : t("Save new password")}
      </Button>
    </form>
  );
}
