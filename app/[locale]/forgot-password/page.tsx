import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailOnlyForm } from "@/components/auth/email-only-form";

export const metadata: Metadata = { title: "Reset your password" };

async function ExpiredNote({ searchParams }: { searchParams: PageProps<"/[locale]/forgot-password">["searchParams"] }) {
  const { expired } = await searchParams;
  if (!expired) return null;
  return (
    <p role="alert" className="rounded-lg border-2 border-border bg-background p-3 font-bold text-destructive">
      That link has expired. Request a new one below.
    </p>
  );
}

export default function ForgotPasswordPage({ searchParams }: PageProps<"/[locale]/forgot-password">) {
  return (
    <AuthShell title="Reset your password" intro="Enter your email and we'll send you a link to set a new one.">
      <Suspense fallback={null}>
        <ExpiredNote searchParams={searchParams} />
      </Suspense>
      <section className="rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
        <EmailOnlyForm kind="reset" button="Send reset link" />
      </section>
    </AuthShell>
  );
}
