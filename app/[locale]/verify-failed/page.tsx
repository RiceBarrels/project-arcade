import Link from "next/link";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailOnlyForm } from "@/components/auth/email-only-form";
import { path } from "@/lib/paths";

export const metadata: Metadata = { title: "That link didn't work" };

export default function VerifyFailedPage() {
  return (
    <AuthShell title="That link didn't work" intro="The verification link is expired or no longer valid. Request a new one and try again.">
      <section className="space-y-3 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
        <EmailOnlyForm kind="resend" button="Send a new link" helper="Enter your email and we'll send a fresh link." />
      </section>
      <Link href={path("/login")} className="inline-flex min-h-10 items-center font-bold underline underline-offset-4">
        Back to sign in
      </Link>
    </AuthShell>
  );
}
