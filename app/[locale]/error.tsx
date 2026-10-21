"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/client";
import { Link } from "@/i18n/link";

// Shown inside the site layout when a page section fails (e.g. the database
// is unreachable). No error details are shown to visitors.
export default function Error({ retry }: { error: unknown; retry: () => void }) {
  const t = useT();
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg border-4 border-border bg-card p-6 shadow">
      <h1 className="text-2xl font-black uppercase">{t("Something went wrong")}</h1>
      <p className="font-medium">{t("We couldn't load this page right now. Please try again in a moment.")}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => retry()}>{t("Try again")}</Button>
        <Link href="/" className="inline-flex min-h-11 md:min-h-10 items-center font-bold underline underline-offset-4">
          {t("Back to home")}
        </Link>
      </div>
    </div>
  );
}
