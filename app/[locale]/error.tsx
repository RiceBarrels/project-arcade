"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { path } from "@/lib/paths";

// Shown inside the site layout when a page section fails (e.g. the database
// is unreachable). No error details are shown to visitors.
export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg border-4 border-border bg-card p-6 shadow">
      <h1 className="text-2xl font-black uppercase">Something went wrong</h1>
      <p className="font-medium">We couldn&apos;t load this page right now. Please try again in a moment.</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => retry()}>Try again</Button>
        <Link href={path("/")} className="inline-flex min-h-10 items-center font-bold underline underline-offset-4">
          Back to home
        </Link>
      </div>
    </div>
  );
}
