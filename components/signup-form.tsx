"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckField } from "@/components/check-field";
import { FormError, TextField, submitWith } from "@/components/auth/form-bits";
import { useT } from "@/i18n/client";
import { Link } from "@/i18n/link";
import { signUp, type FormState } from "@/lib/auth/actions";

// Email + password sign-up. The checkboxes are Radix buttons, so their state
// is mirrored into hidden inputs for the Server Action.
export function SignupForm() {
  const t = useT();
  const [state, action, pending] = useActionState<FormState, FormData>(signUp, {});
  const [adult, setAdult] = useState(false);
  const [terms, setTerms] = useState(false);
  const f = state.fields ?? {};

  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <input type="hidden" name="locale" value={t.locale} />
      <TextField name="display_name" label={t("Display name")} autoComplete="nickname" maxLength={60} error={f.display_name} required />
      <TextField name="city" label={t("City (optional)")} autoComplete="address-level2" maxLength={80} error={f.city} />
      <TextField name="email" label={t("Email")} type="email" autoComplete="email" error={f.email} required />
      <TextField
        name="password"
        label={t("Password")}
        type="password"
        autoComplete="new-password"
        hint={t("At least 8 characters.")}
        minLength={8}
        error={f.password}
        required
      />
      {adult && <input type="hidden" name="adult" value="on" />}
      {terms && <input type="hidden" name="terms" value="on" />}
      <CheckField
        id="signup-adult"
        checked={adult}
        onChange={setAdult}
        error={f.adult && t(f.adult)}
        helper={t("You must be at least 18 to use this site.")}
      >
        {t("I'm 18 or older.")}
      </CheckField>
      <CheckField id="signup-terms" checked={terms} onChange={setTerms} error={f.terms && t(f.terms)}>
        {t.rich("I agree to the <terms>Terms of use</terms> and <privacy>Privacy policy</privacy>.", {
          terms: (c) => <Link href="/terms" className="underline underline-offset-4">{c}</Link>,
          privacy: (c) => <Link href="/privacy" className="underline underline-offset-4">{c}</Link>,
        })}
      </CheckField>
      <FormError message={state.error} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? t("Creating account…") : t("Create account")}
      </Button>
      <p className="text-sm font-bold">
        <Link href="/login" className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
          {t("Already have an account? Sign in")}
        </Link>
      </p>
    </form>
  );
}
