import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailOnlyForm } from "@/components/auth/email-only-form";

export const metadata: Metadata = { title: "Check your email" };

// Shown after sign-up (always, whether or not the address was new) and from
// the "not verified" sign-in error. Never displays the address.
export default function CheckEmailPage() {
  return (
    <AuthShell
      title="Check your email"
      intro={
        <>
          <p>Almost there. If this address can be used to sign up, you&apos;ll get an email from us shortly. Follow the link inside to finish.</p>
          <p className="mt-2 text-sm">Can&apos;t find it? Check your spam or junk folder.</p>
        </>
      }
    >
      <section className="space-y-3 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
        <h2 className="text-xl font-black">Didn&apos;t get it?</h2>
        <EmailOnlyForm kind="resend" button="Resend email" helper="Enter the email you signed up with and we'll send the link again." />
      </section>
    </AuthShell>
  );
}
