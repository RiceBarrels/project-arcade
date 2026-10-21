import { Suspense } from "react";
import type { Metadata } from "next";
import { ListForm } from "@/components/list-form";
import { localePath } from "@/i18n/config";
import { alternates, getLocale, getT } from "@/i18n/server";
import { requireUser } from "@/lib/data/session";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("List your gear"), alternates: await alternates("/list") };
}

export default async function ListPage() {
  const t = await getT();
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase">{t("List your gear")}</h1>
        <p>
          {t(
            "Got gear you're happy to lend? Add it here. It takes a couple of minutes: a title, a few photos, the condition it's in, and your area.",
          )}
        </p>
        <p className="text-sm font-bold">
          {t("You approve every request. You can say no, and you can take a listing down at any time.")}
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg border-4 border-border bg-muted" aria-hidden />}>
        <SignedInListForm />
      </Suspense>
    </div>
  );
}

// proxy.ts already redirects signed-out visitors; this re-checks on the server.
async function SignedInListForm() {
  await requireUser(localePath("/list", await getLocale()));
  return <ListForm />;
}
