"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      {/* Not the usual phone bottom sheet: full screen on phones (clear of the
          notch and home indicator), a centred card from md up. */}
      <DialogContent
        showCloseButton={false}
        aria-describedby="onboarding-text"
        className="flex flex-col gap-0 bg-background text-base text-foreground max-md:inset-0 max-md:max-h-none max-md:rounded-none max-md:border-t-0 max-md:p-0 max-md:pt-[env(safe-area-inset-top,0px)] max-md:pr-[env(safe-area-inset-right)] max-md:pb-[max(env(safe-area-inset-bottom),1rem)] max-md:pl-[env(safe-area-inset-left)] max-md:data-open:animate-none max-md:data-closed:animate-none md:max-w-md md:p-0 md:pt-[env(safe-area-inset-top,0px)] md:pr-[env(safe-area-inset-right)] md:pb-5 md:pl-[env(safe-area-inset-left)]"
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
          <DialogClose asChild>
            <button type="button" className="inline-flex min-h-11 items-center px-2 font-bold underline underline-offset-4">
              {t("Skip")}
            </button>
          </DialogClose>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-6">
          <div className="mx-auto w-full max-w-72 rounded-lg border-4 border-border bg-muted p-3 shadow">
            <Art className="h-auto w-full" />
          </div>
          <div className="space-y-3 text-center">
            <DialogTitle className="text-3xl font-black">
              {t.rich(title, { site: <bdi>{SITE_NAME}</bdi> })}
            </DialogTitle>
            <DialogDescription id="onboarding-text" className="text-lg font-medium text-foreground">
              {t(text)}
            </DialogDescription>
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
      </DialogContent>
    </Dialog>
  );
}
