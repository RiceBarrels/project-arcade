"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormError, TextField, submitWith } from "@/components/auth/form-bits";
import { signIn, type FormState } from "@/lib/auth/actions";
import { path } from "@/lib/paths";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});
  return (
    <form onSubmit={submitWith(action)} noValidate className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
      <input type="hidden" name="next" value={next ?? ""} />
      <TextField name="email" label="Email" type="email" autoComplete="email" required />
      <TextField name="password" label="Password" type="password" autoComplete="current-password" required />
      <FormError message={state.error} />
      {state.fields?.unverified && (
        <p className="text-sm">
          <Link href={path("/check-email")} className="inline-flex min-h-10 items-center font-bold underline underline-offset-4">
            Resend verification email
          </Link>
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <div className="flex flex-wrap justify-between gap-2 text-sm font-bold">
        <Link href={path("/forgot-password")} className="inline-flex min-h-10 items-center underline underline-offset-4">
          Forgot your password?
        </Link>
        <Link href={path("/signup")} className="inline-flex min-h-10 items-center underline underline-offset-4">
          New here? Create an account
        </Link>
      </div>
    </form>
  );
}
