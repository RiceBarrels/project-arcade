import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailOnlyForm } from "@/components/auth/email-only-form";
import { Link } from "@/i18n/link";
import { alternates, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("That link didn't work"), alternates: await alternates("/verify-failed") };
}

export default async function VerifyFailedPage() {
  const t = await getT();
  return (
    <AuthShell
      title={t("That link didn't work")}
      intro={t("The verification link is expired or no longer valid. Request a new one and try again.")}
    >
      <section className="space-y-3 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
        <EmailOnlyForm kind="resend" button={t("Send a new link")} helper={t("Enter your email and we'll send a fresh link.")} />
      </section>
      <Link href="/login" className="inline-flex min-h-11 md:min-h-10 items-center font-bold underline underline-offset-4">
        {t("Back to sign in")}
      </Link>
    </AuthShell>
  );
}
