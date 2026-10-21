import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { EmailOnlyForm } from "@/components/auth/email-only-form";
import { alternates, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Reset your password"), alternates: await alternates("/forgot-password") };
}

async function ExpiredNote({ searchParams }: { searchParams: PageProps<"/[locale]/forgot-password">["searchParams"] }) {
  const [{ expired }, t] = await Promise.all([searchParams, getT()]);
  if (!expired) return null;
  return (
    <p role="alert" className="rounded-lg border-2 border-border bg-background p-3 font-bold text-destructive">
      {t("That link has expired. Request a new one below.")}
    </p>
  );
}

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/[locale]/forgot-password">) {
  const t = await getT();
  return (
    <AuthShell title={t("Reset your password")} intro={t("Enter your email and we'll send you a link to set a new one.")}>
      <Suspense fallback={null}>
        <ExpiredNote searchParams={searchParams} />
      </Suspense>
      <section className="rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6">
        <EmailOnlyForm kind="reset" button={t("Send reset link")} />
      </section>
    </AuthShell>
  );
}
