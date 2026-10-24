import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { AccessForm } from "@/components/auth/access-form";
import { getT } from "@/i18n/server";
import { msg } from "@/i18n/msg";
import { safeNextPath } from "@/lib/domain";
import { SITE_NAME } from "@/lib/site";

// Private beta gate (lib/access.ts). Proxy only lets visitors here while the
// gate is on; with it off this path is a 404. Copy: docs/copy-en.md section 25.

const ERRORS: Record<string, string> = {
  wrong: msg("That password isn't right. Please try again."),
  failed: msg("Something went wrong. Please try again."),
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("Private beta"), robots: { index: false, follow: false } };
}

async function AccessBody({ searchParams }: { searchParams: PageProps<"/[locale]/access">["searchParams"] }) {
  const [sp, t] = await Promise.all([searchParams, getT()]);
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const error = one(sp.error);
  return (
    <AccessForm
      next={safeNextPath(one(sp.next), `/${t.locale}`)}
      error={error && Object.hasOwn(ERRORS, error) ? t(ERRORS[error]) : undefined}
    />
  );
}

export default async function AccessPage({ searchParams }: PageProps<"/[locale]/access">) {
  const t = await getT();
  return (
    <AuthShell title={t("Private beta")} intro={t.rich("{site} is in private beta. Enter the access password to continue.", { site: <bdi>{SITE_NAME}</bdi> })}>
      <Suspense fallback={<AccessForm />}>
        <AccessBody searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}
