"use client";

import { useEffect } from "react";
import { tapFeedback } from "@/lib/haptics";
import { navLevel } from "@/lib/nav";

// Page-wide listeners for the phone layout. Renders nothing.
// - Slide direction: sets <html data-nav="forward|back"> just before a
//   navigation so the page transition CSS (globals.css) slides the right way.
//   Deeper page = forward, shallower = back, same level (tab to tab) = none.
// - Tap feedback on buttons and bottom-bar tabs (lib/haptics.ts).
// - On-screen keyboard: <html data-keyboard="open"> hides the bottom bar so it
//   doesn't float over the input being typed in.

let inAppHistory = false;

/** True once this tab has navigated inside the site, so history.back() stays on the site. */
export function canGoBackInApp() {
  return inAppHistory;
}

/** Mark the next page transition's direction (cleared by the page template once it has played). */
export function setNavDirection(dir: "forward" | "back" | "back-root" | null) {
  const root = document.documentElement;
  if (dir) root.dataset.nav = dir;
  else delete root.dataset.nav;
}

function direction(from: string, to: string) {
  const a = navLevel(from);
  const b = navLevel(to);
  return b > a ? "forward" : b < a ? "back" : null;
}

const TAP_TARGETS = "button:not(:disabled), [role='button'], [data-bottom-nav] a";

export function NavEffects() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      if (target.closest(TAP_TARGETS)) tapFeedback();

      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = target.closest("a[href]");
      if (!(a instanceof HTMLAnchorElement) || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      inAppHistory = true;
      setNavDirection(direction(location.pathname, url.pathname));
    }

    function onPopState() {
      inAppHistory = true;
      // Our Back button runs its own slide (BackBar, data-nav="back-root"). Other
      // history moves (browser button, swipe gesture) stay instant, so a swipe the
      // browser already animated never gets a second slide on top.
      if (document.documentElement.dataset.nav !== "back-root") setNavDirection(null);
    }

    // Keyboard: the visual viewport shrinks well below the layout viewport while an input has focus.
    const vv = window.visualViewport;
    function onViewport() {
      if (!vv) return;
      const el = document.activeElement;
      const typing = el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
      const open = typing && window.innerHeight - vv.height > 150;
      if (open) document.documentElement.dataset.keyboard = "open";
      else delete document.documentElement.dataset.keyboard;
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    vv?.addEventListener("resize", onViewport);
    document.addEventListener("focusout", onViewport);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      vv?.removeEventListener("resize", onViewport);
      document.removeEventListener("focusout", onViewport);
    };
  }, []);

  return null;
}
