import { Suspense } from "react";
import type { Metadata } from "next";
import { ListForm } from "@/components/list-form";
import { requireUser } from "@/lib/data/session";

export const metadata: Metadata = { title: "List your gear" };

export default function ListPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase">List your gear</h1>
        <p>
          Got gear you&apos;re happy to lend? Add it here. It takes a couple of minutes: a title, a few photos,
          the condition it&apos;s in, and your area.
        </p>
        <p className="text-sm font-bold">You approve every request. You can say no, and you can take a listing down at any time.</p>
      </div>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg border-4 border-border bg-muted" aria-hidden />}>
        <SignedInListForm />
      </Suspense>
    </div>
  );
}

// proxy.ts already redirects signed-out visitors; this re-checks on the server.
async function SignedInListForm() {
  await requireUser("/en/list");
  return <ListForm />;
}
