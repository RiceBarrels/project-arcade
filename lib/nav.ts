import { msg } from "@/i18n/msg";
import { isLocale } from "./site";

// Mobile navigation model (docs/copy-en.md 18.2). Top-level "tab" pages sit at
// level 1; anything opened from them (an item, a thread, settings) is level 2+.
// The level decides the slide direction of page transitions.

export type TabKey = "home" | "browse" | "list" | "queue" | "me";

export const TABS: { key: TabKey; href: string; label: string }[] = [
  { key: "home", href: "/", label: msg("Home") },
  { key: "browse", href: "/browse", label: msg("Browse") },
  { key: "list", href: "/list", label: msg("List") },
  { key: "queue", href: "/queue", label: msg("Queue") },
  { key: "me", href: "/profile", label: msg("Me") },
];

/** Path segments after the locale, e.g. "/zh/item/abc" -> ["item", "abc"]. */
function segments(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return isLocale(parts[0]) ? parts.slice(1) : parts;
}

/** Which bottom tab a path belongs to (null for pages outside the tabs, like /login). */
export function activeTab(pathname: string): TabKey | null {
  const [first = ""] = segments(pathname);
  switch (first) {
    case "":
      return "home";
    case "browse":
    case "item":
      return "browse";
    case "list":
      return "list";
    case "queue":
      return "queue";
    case "profile":
    case "messages":
    case "settings":
      return "me";
    default:
      return null;
  }
}

// Pages reached from a tab rather than being one (one level deeper than their segment count says).
const SUBPAGES = new Set(["messages", "settings", "terms", "privacy", "forgot-password", "reset-password", "check-email", "verify-failed", "welcome"]);

/** Navigation depth: tab pages are 1, pages opened from them 2+. */
export function navLevel(pathname: string) {
  const s = segments(pathname);
  if (s.length === 0) return 1;
  return s.length + (SUBPAGES.has(s[0]) ? 1 : 0);
}
