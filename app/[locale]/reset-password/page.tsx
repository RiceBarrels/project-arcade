import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { alternates, getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Set a new password"), alternates: await alternates("/reset-password") };
}

// Reached from the reset email via /auth/confirm, which signs the user in with
// a recovery session. proxy.ts sends signed-out visitors to /login.
export default async function ResetPasswordPage() {
  const t = await getT();
  return (
    <AuthShell title={t("Set a new password")}>
      <ResetPasswordForm />
    </AuthShell>
  );
}
