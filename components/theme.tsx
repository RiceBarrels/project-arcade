"use client";

import { useId, useLayoutEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun, SunMoon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useT } from "@/i18n/client";
import { msg } from "@/i18n/msg";
import { applyTheme, keepThemeMeta, readThemePref, setThemePref, subscribeTheme, THEME_PREFS, type ThemePref } from "@/lib/theme";

// Theme controls (lib/theme.ts). Copy: docs/copy-en.md section 24.

const LABEL: Record<ThemePref, string> = { system: msg("System"), light: msg("Light"), dark: msg("Dark") };
const HINT: Record<ThemePref, string> = {
  system: msg("System follows your device setting."),
  light: msg("Light always uses the light theme."),
  dark: msg("Dark always uses the dark theme."),
};
const ICON = { system: Monitor, light: Sun, dark: Moon };
/** Header button order. */
const NEXT: Record<ThemePref, ThemePref> = { system: "light", light: "dark", dark: "system" };

/** The stored choice. Renders as "system" until hydrated (the server can't know it). */
function useThemePref() {
  return useSyncExternalStore(subscribeTheme, readThemePref, () => "system" as const);
}

/**
 * Keeps <html> in step with the choice: when the device switches light/dark,
 * when another tab changes it, and after React's dev-only remount of <html>
 * drops the class the head script set; and keeps the theme-color meta across
 * client-side navigations. In the root layouts.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme();
    const stopMeta = keepThemeMeta();
    const stopTheme = subscribeTheme(() => applyTheme());
    return () => {
      stopMeta();
      stopTheme();
    };
  }, []);
  return null;
}

/**
 * The current choice's icon, picked by CSS from <html data-theme-pref> (set by
 * the head script), so it is right on the first paint, before hydration.
 */
function CurrentIcon({ className }: { className: string }) {
  return (
    <>
      <Monitor aria-hidden className={`${className} [[data-theme-pref=dark]_&]:hidden [[data-theme-pref=light]_&]:hidden`} />
      <Sun aria-hidden className={`${className} hidden [[data-theme-pref=light]_&]:block`} />
      <Moon aria-hidden className={`${className} hidden [[data-theme-pref=dark]_&]:block`} />
    </>
  );
}

/** Icon button that steps System → Light → Dark. Desktop header and the footer. */
export function ThemeToggle({ variant }: { variant: "header" | "footer" }) {
  const t = useT();
  const pref = useThemePref();
  const stateId = useId();
  const state = t("Theme: {theme}", { theme: t(LABEL[pref]) });
  const face =
    variant === "header"
      ? "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-border bg-background px-2.5 text-foreground shadow-xs transition-transform outline-none hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:ring-3 focus-visible:ring-ring/60 md:min-h-10 md:min-w-10"
      : "inline-flex min-h-11 min-w-11 items-center justify-center px-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/60 md:min-h-10 md:min-w-10";
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={t("Change theme")}
            aria-describedby={stateId}
            onClick={() => setThemePref(NEXT[pref])}
            className={face}
          >
            <CurrentIcon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6} className="border-2 border-border text-sm font-bold">
          {state}
        </TooltipContent>
      </Tooltip>
      <span id={stateId} hidden>
        {state}
      </span>
    </TooltipProvider>
  );
}

/** Settings and the phone "Me" page: the three choices as one radio group. */
export function AppearanceSettings({ className = "" }: { className?: string }) {
  const t = useT();
  const pref = useThemePref();
  const id = useId();
  return (
    <section aria-labelledby={`${id}-h`} className={`rounded-lg border-4 border-border bg-card p-5 text-card-foreground shadow sm:p-6 ${className}`}>
      <h2 id={`${id}-h`} className="flex items-center gap-2 text-2xl font-black">
        <SunMoon aria-hidden className="size-6" /> {t("Appearance")}
      </h2>
      <p className="mt-1 mb-4 text-sm">{t("Choose how the site looks on this device.")}</p>
      <RadioGroup
        aria-label={t("Theme")}
        value={pref}
        onValueChange={(v) => setThemePref(v as ThemePref)}
        className="gap-3 sm:grid-cols-3"
      >
        {THEME_PREFS.map((p) => {
          const Icon = ICON[p];
          return (
            <label
              key={p}
              htmlFor={`${id}-${p}`}
              className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border-2 border-border bg-background p-3 text-foreground shadow-xs has-focus-visible:ring-3 has-focus-visible:ring-ring/60 has-[[data-state=checked]]:bg-secondary has-[[data-state=checked]]:text-secondary-foreground"
            >
              <RadioGroupItem
                id={`${id}-${p}`}
                value={p}
                aria-labelledby={`${id}-${p}-l`}
                aria-describedby={`${id}-${p}-d`}
                className="mt-0.5 border-2 border-border"
              />
              <span className="min-w-0">
                <span id={`${id}-${p}-l`} className="flex items-center gap-1.5 font-black">
                  <Icon aria-hidden className="size-4 shrink-0" /> {t(LABEL[p])}
                </span>
                <span id={`${id}-${p}-d`} className="mt-0.5 block text-sm">
                  {t(HINT[p])}
                </span>
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </section>
  );
}
