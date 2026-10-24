// Private beta password gate. On only while SITE_ACCESS_PASSWORD is set
// (server-side env, set in Vercel; never NEXT_PUBLIC_). proxy.ts sends
// visitors without a valid pa_access cookie to /<locale>/access, whose form
// posts to app/[locale]/access/check/route.ts. This keeps pages away from
// strangers only: the browser still talks to Supabase directly with the
// publishable key, so data is protected by RLS, not by this gate.
// Copy: docs/copy-en.md section 25; the cookie is listed in section 15.
// Server only (proxy and route handler): nothing here reaches the browser.

export const ACCESS_COOKIE = "pa_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds

// Changing either string signs everyone out of the gate.
const TOKEN_LABEL = "pa-access-v1";
const KEY_SALT = "pa-access-key-v1";

const enc = new TextEncoder();

/** The password, or null when the gate is off (unset or empty). */
export function accessPassword(): string | null {
  return process.env.SITE_ACCESS_PASSWORD || null;
}

// The derived key is slow to make on purpose (someone holding a cookie can't
// cheaply guess the password from it), so it is made once per password.
let cached: { password: string; key: Promise<CryptoKey> } | null = null;

function keyFor(password: string) {
  if (cached?.password !== password) {
    const key = crypto.subtle
      .importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"])
      .then((base) =>
        crypto.subtle.deriveKey(
          { name: "PBKDF2", hash: "SHA-256", salt: enc.encode(KEY_SALT), iterations: 100_000 },
          base,
          { name: "HMAC", hash: "SHA-256", length: 256 },
          false,
          ["sign"],
        ),
      );
    // Don't keep a failed derivation around.
    key.catch(() => {
      if (cached?.key === key) cached = null;
    });
    cached = { password, key };
  }
  return cached.key;
}

async function hmac(key: CryptoKey, data: string) {
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

/** Compares equal-length digests without stopping at the first difference. */
function sameBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

const toBase64Url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function fromBase64Url(s: string) {
  try {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

/** Cookie value for the current password: a MAC, not the password or anything that decodes to it. */
export async function accessToken(password: string) {
  return toBase64Url(await hmac(await keyFor(password), TOKEN_LABEL));
}

/** True when the cookie was made with the current password. */
export async function hasAccess(cookie: string | undefined, password: string) {
  const given = cookie ? fromBase64Url(cookie) : null;
  if (!given) return false;
  return sameBytes(given, await hmac(await keyFor(password), TOKEN_LABEL));
}

/**
 * True when `attempt` is the password. Both sides are MACed first, so the
 * comparison is on equal-length digests and its time says nothing about
 * the password's length or contents.
 */
export async function isAccessPassword(attempt: string, password: string) {
  const key = await keyFor(password);
  const [a, b] = await Promise.all([hmac(key, `try:${attempt}`), hmac(key, `try:${password}`)]);
  return sameBytes(a, b);
}
