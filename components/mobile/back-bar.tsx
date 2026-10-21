"use client";

import { ArrowLeft } from "lucide-react";
import { canGoBackInApp, setNavDirection } from "@/components/mobile/nav-effects";
import { useRouter, useT } from "@/i18n/client";

/**
 * Phone-only back bar for pages opened from a tab (item, thread, settings...).
 * Fixed to the top with a same-height spacer in the flow; while it is on the
 * page the layout hides the mobile top bar (globals.css, [data-back-bar]).
 * Back goes through history when we came from inside the site, otherwise to `fallback`.
 */
export function BackBar({ title, fallback = "/" }: { title: string; fallback?: string }) {
  const router = useRouter();
  const t = useT();

  function goBack() {
    if (!canGoBackInApp()) {
      setNavDirection("back");
      router.push(fallback);
      return;
    }
    // Next restores the previous page from its cache on history.back(), outside
    // a React transition, so <ViewTransition> doesn't fire. Wrap it in a plain
    // document view transition instead (globals.css: data-nav="back-root").
    const canAnimate =
      typeof document.startViewTransition === "function" &&
      window.matchMedia("(width < 48rem) and (prefers-reduced-motion: no-preference)").matches;
    if (!canAnimate) {
      router.back();
      return;
    }
    setNavDirection("back-root");
    const vt = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          // Rendering is paused inside this callback (so no requestAnimationFrame):
          // give React a moment to commit the restored page after popstate, and
          // never hold the screen frozen for long.
          const done = () => {
            window.removeEventListener("popstate", onPop);
            resolve();
          };
          const onPop = () => setTimeout(done, 50);
          window.addEventListener("popstate", onPop);
          setTimeout(done, 400);
          router.back();
        }),
    );
    vt.finished.finally(() => setNavDirection(null));
  }

  return (
    <div data-back-bar="" className="-mt-6 mb-4 h-[calc(2.75rem+env(safe-area-inset-top,0px))] md:hidden">
      <div className="fixed inset-x-0 top-0 z-40 border-b-2 border-border bg-background pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] [view-transition-name:back-bar]">
        <div className="flex h-11 items-center gap-1 pe-4">
          <button
            type="button"
            onClick={goBack}
            aria-label={t("Back")}
            className="flex size-11 shrink-0 items-center justify-center outline-none focus-visible:bg-muted"
          >
            <ArrowLeft aria-hidden className="size-5 rtl:-scale-x-100" strokeWidth={2.5} />
          </button>
          {/* dir="auto": a title in another script (an item name) keeps its own direction and is cut at its end. */}
          <p dir="auto" className="min-w-0 flex-1 truncate font-black ltr:text-left rtl:text-right">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
