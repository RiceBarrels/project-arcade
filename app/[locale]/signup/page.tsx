import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <AuthShell title="Join the arcade" intro="Free, non-profit, no ads.">
      <SignupForm />
    </AuthShell>
  );
}
