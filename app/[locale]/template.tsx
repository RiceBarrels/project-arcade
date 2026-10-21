"use client";

import { useEffect, ViewTransition } from "react";
import { setNavDirection } from "@/components/mobile/nav-effects";

// A template remounts on every navigation between pages, so the page content
// gets an enter/exit view transition. The animation itself lives in
// globals.css: phones only, only when <html data-nav> says which way to slide,
// and never with prefers-reduced-motion. Browsers without the View
// Transitions API just swap pages as before.
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // The slide has finished by now; clear the direction so a later programmatic
    // navigation (a form redirect, router.refresh) doesn't reuse it.
    const t = setTimeout(() => setNavDirection(null), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
