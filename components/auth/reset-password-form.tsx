"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormError, TextField, submitWith } from "@/components/auth/form-bits";
import { updatePassword, type FormState } from "@/lib/auth/actions";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(updatePassword, {});
  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <TextField
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
        error={state.fields?.password}
        required
      />
      <FormError message={state.error} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Saving…" : "Save new password"}
      </Button>
    </form>
  );
}
