// Light / dark theme. The choice lives in this browser only (localStorage,
// like pa:haptics); no key means "follow the device". The server never knows
// it, so every page still prerenders the same: THEME_SCRIPT runs in <head>
// before the first paint and sets class="dark" on <html> (globals.css), and
// ThemeSync (components/theme.tsx) keeps it right after that.
// Copy: docs/copy-en.md section 24. Privacy: section 15 lists the key.

export type ThemePref = "system" | "light" | "dark";
export const THEME_PREFS: readonly ThemePref[] = ["system", "light", "dark"];

const KEY = "pa:theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const CHANGE_EVENT = "pa:themechange";
const META_ID = "pa-theme-color";

/** Browser bar colour: the top bar's red in each theme (--primary in globals.css). */
export const THEME_COLOR = { light: "#ff3333", dark: "#ff6666" } as const;

const isPref = (v: unknown): v is "light" | "dark" => v === "light" || v === "dark";

/**
 * Inline <head> script (app/[locale]/layout.tsx, app/global-not-found.tsx).
 * Runs while the HTML is parsed, so a dark page never paints white first. It
 * also adds a theme-color meta ahead of the viewport ones, which only follow
 * the device setting and would be wrong for a manual choice.
 */
export const THEME_SCRIPT = `(function(){try{var d=document.documentElement,p=null;try{p=localStorage.getItem(${JSON.stringify(KEY)})}catch(e){}if(p!=="light"&&p!=="dark")p="system";var k=p==="dark"||(p==="system"&&matchMedia(${JSON.stringify(DARK_QUERY)}).matches);d.classList.toggle("dark",k);d.setAttribute("data-theme-pref",p);var m=document.createElement("meta");m.name="theme-color";m.id=${JSON.stringify(META_ID)};m.content=k?${JSON.stringify(THEME_COLOR.dark)}:${JSON.stringify(THEME_COLOR.light)};document.head.prepend(m)}catch(e){}})()`;

// Used when storage is blocked, so the choice still holds until the page closes.
let unsaved: ThemePref | null = null;

/** The stored choice (browser only). */
export function readThemePref(): ThemePref {
  if (unsaved) return unsaved;
  try {
    const v = localStorage.getItem(KEY);
    return isPref(v) ? v : "system";
  } catch {
    return "system";
  }
}

/** Puts the theme on <html>: class="dark", data-theme-pref (header icon) and the theme-color meta. */
export function applyTheme(pref: ThemePref = readThemePref()) {
  const dark = pref === "dark" || (pref === "system" && matchMedia(DARK_QUERY).matches);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.setAttribute("data-theme-pref", pref);
  let meta = document.getElementById(META_ID) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.id = META_ID;
    document.head.prepend(meta);
  }
  meta.content = dark ? THEME_COLOR.dark : THEME_COLOR.light;
}

export function setThemePref(pref: ThemePref) {
  unsaved = null;
  try {
    if (pref === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    unsaved = pref;
  }
  applyTheme(pref);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * React rebuilds <head> on client-side navigation and drops the theme-color
 * meta it doesn't own; this puts it back (first, so it beats the viewport ones).
 */
export function keepThemeMeta() {
  const observer = new MutationObserver(() => {
    if (!document.getElementById(META_ID)) applyTheme();
  });
  observer.observe(document.head, { childList: true });
  return () => observer.disconnect();
}

/** Calls back when the choice changes (here or in another tab) or the device switches light/dark. */
export function subscribeTheme(onChange: () => void) {
  const media = matchMedia(DARK_QUERY);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return;
    unsaved = null;
    onChange();
  };
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
