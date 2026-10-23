"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
  HeroIllustration,
  OnboardingDamageIllustration,
  OnboardingQueueIllustration,
  OnboardingSafetyIllustration,
} from "@/components/illustrations";
import { stripLocale } from "@/i18n/config";
import { useRouter, useT } from "@/i18n/client";
import { msg } from "@/i18n/msg";
import { SITE_NAME } from "@/lib/site";

// First-sign-in walkthrough, docs/copy-en.md 18.1. Shown once per account per
// browser: the "seen" flag is in localStorage, so a blocked storage means it
// simply shows again next time (never an error). Skippable from every screen.

const SCREENS = [
  {
    Art: HeroIllustration,
    // {site} is the brand (SITE_NAME), filled in where shown.
    title: msg("Welcome to {site}"),
    text: msg("A non-profit library for gear, run by neighbours. The site itself charges nothing. It's pre-alpha, so things may change."),
  },
  {
    Art: OnboardingQueueIllustration,
    title: msg("Queue up, borrow, return"),
    text: msg("Add what you want to your queue. When it's your turn you have 48 hours to respond, then pick it up and bring it back."),
  },
  {
    Art: OnboardingDamageIllustration,
    title: msg("What's a damage price?"),
    text: msg("It's what you'd owe the lender if an item comes back damaged or lost. You settle it directly with them; the site never takes money."),
  },
  {
    Art: OnboardingSafetyIllustration,
    title: msg("Stay safe"),
    text: msg("You must be 18 or older. Chat through site messages only; your email is never shown to anyone."),
  },
];

// Pages (without the locale prefix) where a walkthrough would get in the way of finishing a task.
const SKIP_ON = ["/reset-password"];

const seenKey = (userId: string) => `pa:onboarded:${userId}`;

function hasSeen(userId: string) {
  try {
    return localStorage.getItem(seenKey(userId)) === "1";
  } catch {
    return false;
  }
}

function markSeen(userId: string) {
  try {
    localStorage.setItem(seenKey(userId), "1");
  } catch {
    // Storage blocked: it will show again next time, which is harmless.
  }
}

export function Onboarding({ userId }: { userId: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useT();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Storage is only readable after hydration; this effect is the earliest point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!SKIP_ON.includes(stripLocale(pathname)) && !hasSeen(userId)) setOpen(true);
  }, [userId, pathname]);

  function close() {
    markSeen(userId);
    setOpen(false);
  }

  const last = step === SCREENS.length - 1;
  const { Art, title, text } = SCREENS[step];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70" />
        <DialogPrimitive.Content
          aria-describedby="onboarding-text"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right)] pb-[max(env(safe-area-inset-bottom),1rem)] pl-[env(safe-area-inset-left)] outline-none md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[calc(100dvh-2rem)] md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:border-4 md:border-border md:pb-5 md:shadow"
        >
          <div className="flex items-center justify-between px-4 pt-2">
            <ol aria-label={t("Screen {step} of {total}", { step: step + 1, total: SCREENS.length })} className="flex gap-2">
              {SCREENS.map((s, i) => (
                <li
                  key={s.title}
                  aria-hidden
                  className={`size-3 rounded-full border-2 border-border ${i === step ? "bg-foreground" : "bg-background"}`}
                />
              ))}
            </ol>
            <DialogPrimitive.Close asChild>
              <button type="button" className="inline-flex min-h-11 items-center px-2 font-bold underline underline-offset-4">
                {t("Skip")}
              </button>
            </DialogPrimitive.Close>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-6">
            <div className="mx-auto w-full max-w-72 rounded-lg border-4 border-border bg-muted p-3 shadow">
              <Art className="h-auto w-full" />
            </div>
            <div className="space-y-3 text-center">
              <DialogPrimitive.Title className="text-3xl font-black">
                {t.rich(title, { site: <bdi>{SITE_NAME}</bdi> })}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description id="onboarding-text" className="text-lg font-medium">
                {t(text)}
              </DialogPrimitive.Description>
            </div>
          </div>

          <div className="px-6">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                if (!last) return setStep(step + 1);
                close();
                router.push("/browse");
              }}
            >
              {last ? t("Start browsing") : t("Next")}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
