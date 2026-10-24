"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useT } from "@/i18n/client";

// Private beta password form (app/[locale]/access). A plain form post to
// ./access/check (see that route for why it isn't a Server Action), so it
// also works before hydration. `error` arrives translated.
export function AccessForm({ next, error }: { next?: string; error?: string }) {
  const t = useT();
  const [pending, setPending] = useState(false);
  // Coming back with the browser's Back button can restore the page as it
  // was mid-submit; let the button work again.
  useEffect(() => {
    const reset = () => setPending(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);
  return (
    <form
      method="post"
      action={`/${t.locale}/access/check`}
      onSubmit={() => setPending(true)}
      className="space-y-5 rounded-lg border-4 border-border bg-card p-4 shadow sm:p-6"
    >
      <input type="hidden" name="next" value={next ?? ""} />
      <div className="space-y-2">
        <Label htmlFor="access-password" className="font-bold">
          {t("Access password")}
        </Label>
        <Input
          id="access-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder={t("Enter the password")}
          required
          autoFocus={!!error}
          aria-invalid={!!error}
          aria-describedby={error ? "access-password-error" : undefined}
        />
        {error && (
          <p id="access-password-error" role="alert" className="text-sm font-bold text-destructive">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? t("Checking…") : t("Continue")}
      </Button>
    </form>
  );
}
