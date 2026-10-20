import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { safeNextPath } from "@/lib/domain";

export const metadata: Metadata = { title: "Sign in" };

async function LoginBody({ searchParams }: { searchParams: PageProps<"/[locale]/login">["searchParams"] }) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const next = safeNextPath(one(sp.next), "/en/profile");
  return (
    <>
      {one(sp.signed_out) && (
        <p role="status" className="rounded-lg border-2 border-border bg-secondary p-3 font-bold text-secondary-foreground">
          You&apos;re signed out. See you next time.
        </p>
      )}
      <LoginForm next={next} />
    </>
  );
}

export default function LoginPage({ searchParams }: PageProps<"/[locale]/login">) {
  return (
    <AuthShell title="Welcome back" intro="Sign in to see your queue and requests.">
      <Suspense fallback={<LoginForm />}>
        <LoginBody searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}
