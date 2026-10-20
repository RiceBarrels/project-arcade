import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "Set a new password" };

// Reached from the reset email via /auth/confirm, which signs the user in with
// a recovery session. proxy.ts sends signed-out visitors to /login.
export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set a new password">
      <ResetPasswordForm />
    </AuthShell>
  );
}
