// Light tap feedback through the Vibration API. Zero dependencies.
// Works in Chrome, Edge and Samsung Internet on Android. iOS Safari (and every
// iPhone browser, since they all use WebKit) has no Vibration API, so this
// does nothing there. Off switch: /settings ("This device"), stored per browser.

const KEY = "pa:haptics";

export function hapticsSupported() {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

export function hapticsEnabled() {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setHapticsEnabled(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // Storage blocked (private mode): the switch just won't stick.
  }
}

/** One short pulse, only on touch screens, only when supported and switched on. */
export function tapFeedback() {
  if (!hapticsSupported() || !hapticsEnabled()) return;
  if (!window.matchMedia("(pointer: coarse)").matches) return;
  try {
    navigator.vibrate(8);
  } catch {
    // Some browsers throw when vibration is blocked by policy; ignore.
  }
}
