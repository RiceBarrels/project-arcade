import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { localePath } from "@/i18n/config";
import { alternates, getT } from "@/i18n/server";
import { safeNextPath } from "@/lib/domain";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Sign in"), alternates: await alternates("/login") };
}

async function LoginBody({ searchParams }: { searchParams: PageProps<"/[locale]/login">["searchParams"] }) {
  const [sp, t] = await Promise.all([searchParams, getT()]);
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const next = safeNextPath(one(sp.next), localePath("/profile", t.locale));
  return (
    <>
      {one(sp.signed_out) && (
        <p role="status" className="rounded-lg border-2 border-border bg-secondary p-3 font-bold text-secondary-foreground">
          {t("You're signed out. See you next time.")}
        </p>
      )}
      <LoginForm next={next} />
    </>
  );
}

export default async function LoginPage({ searchParams }: PageProps<"/[locale]/login">) {
  const t = await getT();
  return (
    <AuthShell title={t("Welcome back")} intro={t("Sign in to see your queue and requests.")}>
      <Suspense fallback={<LoginForm />}>
        <LoginBody searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}
