"use client";

import { useId } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale, useT } from "@/i18n/client";
import { LOCALE_INFO, LOCALES, switchLocalePath } from "@/i18n/config";
import { isLocale, LOCALE_COOKIE } from "@/lib/site";

export type SwitcherVariant = "header" | "footer" | "me";

/** Remember the choice (proxy.ts sends "/" there) and open the same page in that language. */
function switchTo(value: string) {
  if (!isLocale(value)) return;
  document.cookie = `${LOCALE_COOKIE}=${value}; path=/; max-age=31536000; samesite=lax`;
  const { pathname, search, hash } = window.location;
  // A full load, so <html lang/dir> and the language's fonts come with it.
  window.location.assign(switchLocalePath(pathname, value) + search + hash);
}

/**
 * Language switcher: a native select (the phone's own picker on mobile) over a
 * styled face. Each option is written in its own language and tagged with it.
 */
export function LocaleSwitcher({ variant }: { variant: SwitcherVariant }) {
  const id = useId();
  const t = useT();
  const locale = useLocale();
  const info = LOCALE_INFO[locale];

  const select = (
    <select
      id={id}
      value={locale}
      onChange={(e) => switchTo(e.target.value)}
      aria-label={variant === "me" ? undefined : t("Language")}
      className="absolute inset-0 size-full cursor-pointer opacity-0"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l} lang={LOCALE_INFO[l].htmlLang} dir={LOCALE_INFO[l].dir}>
          {LOCALE_INFO[l].nativeName}
        </option>
      ))}
    </select>
  );

  if (variant === "me") {
    return (
      <div className="relative flex min-h-14 w-full items-center gap-3 border-b-2 border-border px-4 py-2 last:border-b-0 has-focus-visible:bg-muted">
        <Globe aria-hidden className="size-5 shrink-0" />
        <label htmlFor={id} className="min-w-0 flex-1 font-black">
          {t("Language")}
        </label>
        <span lang={info.htmlLang} className="text-sm font-bold">
          {info.nativeName}
        </span>
        <ChevronDown aria-hidden className="size-5 shrink-0" />
        {select}
      </div>
    );
  }

  if (variant === "header") {
    return (
      <span className="relative inline-flex min-h-11 items-center gap-1.5 rounded-lg border-2 border-border bg-background px-3 text-foreground shadow-xs transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none has-focus-visible:ring-3 has-focus-visible:ring-ring/60 md:min-h-10">
        <Globe aria-hidden className="size-4" />
        <span lang={info.htmlLang}>{info.short}</span>
        {select}
      </span>
    );
  }

  return (
    <span className="relative inline-flex min-h-11 items-center gap-1.5 px-2 font-bold has-focus-visible:ring-3 has-focus-visible:ring-ring/60 md:min-h-10">
      <Globe aria-hidden className="size-4" />
      <span lang={info.htmlLang} className="underline underline-offset-4">
        {info.nativeName}
      </span>
      <ChevronDown aria-hidden className="size-4" />
      {select}
    </span>
  );
}
