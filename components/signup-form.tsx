"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckField } from "@/components/check-field";
import { FormError, TextField, submitWith } from "@/components/auth/form-bits";
import { signUp, type FormState } from "@/lib/auth/actions";
import { path } from "@/lib/paths";

// Email + password sign-up. The checkboxes are Radix buttons, so their state
// is mirrored into hidden inputs for the Server Action.
export function SignupForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signUp, {});
  const [adult, setAdult] = useState(false);
  const [terms, setTerms] = useState(false);
  const f = state.fields ?? {};

  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <TextField name="display_name" label="Display name" autoComplete="nickname" maxLength={60} error={f.display_name} required />
      <TextField name="city" label="City (optional)" autoComplete="address-level2" maxLength={80} error={f.city} />
      <TextField name="email" label="Email" type="email" autoComplete="email" error={f.email} required />
      <TextField
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters."
        minLength={8}
        error={f.password}
        required
      />
      {adult && <input type="hidden" name="adult" value="on" />}
      {terms && <input type="hidden" name="terms" value="on" />}
      <CheckField id="signup-adult" checked={adult} onChange={setAdult} error={f.adult} helper="You must be at least 18 to use this site.">
        I&apos;m 18 or older.
      </CheckField>
      <CheckField id="signup-terms" checked={terms} onChange={setTerms} error={f.terms}>
        I agree to the{" "}
        <Link href={path("/terms")} className="underline underline-offset-4">Terms of use</Link> and{" "}
        <Link href={path("/privacy")} className="underline underline-offset-4">Privacy policy</Link>.
      </CheckField>
      <FormError message={state.error} />
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-sm font-bold">
        <Link href={path("/login")} className="inline-flex min-h-11 md:min-h-10 items-center underline underline-offset-4">
          Already have an account? Sign in
        </Link>
      </p>
    </form>
  );
}
