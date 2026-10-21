"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FormError, TextField, submitWith } from "@/components/auth/form-bits";
import { useT } from "@/i18n/client";
import { Link } from "@/i18n/link";
import { signIn, type FormState } from "@/lib/auth/actions";

export function LoginForm({ next }: { next?: string }) {
  const t = useT();
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});
  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <input type="hidden" name="locale" value={t.locale} />
      <input type="hidden" name="next" value={next ?? ""} />
      <TextField name="email" label={t("Email")} type="email" autoComplete="email" required />
      <TextField name="password" label={t("Password")} type="password" autoComplete="current-password" required />
      <FormError message={state.error} />
      {state.fields?.unverified && (
        <p className="text-sm">
          <Link href="/check-email" className="inline-flex min-h-11 md:min-h-10 items-center font-bold underline underline-offset-4">
            {t("Resend verification email")}
          </Link>
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? t("Signing in…") : t("Sign in")}
      </Button>
      <div className="flex flex-wrap justify-between gap-2 text-sm font-bold">
        <Link href="/forgot-password" className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
          {t("Forgot your password?")}
        </Link>
        <Link href="/signup" className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
          {t("New here? Create an account")}
        </Link>
      </div>
    </form>
  );
}
