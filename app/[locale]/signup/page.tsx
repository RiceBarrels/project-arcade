import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/signup-form";
import { alternates, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Sign up"), alternates: await alternates("/signup") };
}

export default async function SignupPage() {
  const t = await getT();
  return (
    <AuthShell title={t("Join the arcade")} intro={t("Non-profit, no ads, no site fees.")}>
      <SignupForm />
    </AuthShell>
  );
}
