import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessPassword, hasAccess } from "@/lib/access";
import { isUuid, safeNextPath } from "@/lib/domain";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "@/lib/site";
import { updateSession } from "@/lib/supabase/proxy";

// Runs before every page request:
// 0. Private beta gate (lib/access.ts): while SITE_ACCESS_PASSWORD is set,
//    every page, link prefetch and Server Action needs the pa_access cookie;
//    without it the visitor gets a redirect to /<locale>/access?next=...
//    and no page content. Email links (/auth/...) and the access page pass.
// 1. Refreshes the Supabase session (cookies) so Server Components see a valid user.
// 2. Sends signed-out visitors on private pages to /login?next=...
// 3. Sends "/" and locale-less page paths (/browse, /item/<id>) to the language
//    picked in the switcher (pa_locale cookie), else English. No Accept-Language
//    guessing: the language only changes when the visitor picks one.
// 4. Returns a real 404 for unknown locales and unknown item/profile ids.
//    With Cache Components a page's own notFound() streams after a 200 shell,
//    so the status check has to happen here. The existence checks are
//    single-row HEAD queries under the visitor's own RLS.

// Matches no route, so global-not-found renders with a 404 status. The
// x-pa-locale request header tells it which language to use (set on every
// locale request, so unmatched paths like /zh/nope get it too).
const NOT_FOUND_PATH = "/_not-found/_/_/_";

function rewriteNotFound(request: NextRequest, locale: string) {
  const headers = new Headers(request.headers);
  headers.set("x-pa-locale", locale);
  return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url), { status: 404, request: { headers } });
}

// Paths outside the locale tree that still need the session (email links).
const NON_LOCALE_PREFIXES = new Set(["auth"]);

// Page sections that also work without a locale in front (old or hand-typed links).
const BARE_SECTIONS = new Set([
  "browse", "queue", "list", "profile", "signup", "login", "terms", "privacy", "messages", "settings", "item", "changelog",
]);

// Private pages (first segment after the locale). "profile" is private only
// without an id (/en/profile is "my profile"; /en/profile/<id> is public).
const PRIVATE_SECTIONS = new Set(["list", "queue", "settings", "messages", "reset-password"]);
const SIGNED_OUT_ONLY = new Set(["login", "signup"]);

// Id routes: the row must exist and be visible to this visitor under RLS
// (messages: the visitor must be a party to the loan; "preview" is the sample thread).
const ID_TABLES: Record<string, string> = { item: "items", profile: "profiles", messages: "loans" };

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return null; // malformed percent-encoding, e.g. a truncated share link
  }
}

/**
 * The beta gate's answer for a visitor without a valid access cookie: the
 * access page itself (GET only) and its form's POST pass (null); everything
 * else goes to the access page, remembering where the visitor was headed.
 * 303 for other methods, so a gated POST (a Server Action from an old tab)
 * is never re-sent to the access page.
 */
function gate(request: NextRequest, locale: string, next: string | null, isAccessPage: boolean, isAccessCheck: boolean) {
  const { method } = request;
  const read = method === "GET" || method === "HEAD";
  if ((isAccessPage && read) || (isAccessCheck && method === "POST")) return null;
  const to = new URL(`/${locale}/access`, request.url);
  if (next) to.searchParams.set("next", next);
  const res = NextResponse.redirect(to, read ? 307 : 303);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [first, section, id, ...rest] = pathname.split("/").filter(Boolean);

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const savedLocale = isLocale(saved) ? saved : DEFAULT_LOCALE;

  const password = accessPassword();
  const isAccess = isLocale(first) && section === "access";
  const isAccessPage = isAccess && id === undefined;
  const isAccessCheck = isAccess && id === "check" && rest.length === 0;
  if (!password) {
    // Gate off: the access page doesn't exist, as before the gate was added.
    if (isAccess) return rewriteNotFound(request, first);
  } else if (first !== "auth") {
    const allowed = await hasAccess(request.cookies.get(ACCESS_COOKIE)?.value, password);
    if (!allowed) {
      const locale = isLocale(first) ? first : savedLocale;
      const target = !first || BARE_SECTIONS.has(first) ? `/${locale}${pathname === "/" ? "" : pathname}${search}` : pathname + search;
      const next = isAccess ? request.nextUrl.searchParams.get("next") : target;
      const blocked = gate(request, locale, safeNextPath(next, "") || null, isAccessPage, isAccessCheck);
      if (blocked) return blocked;
    } else if (isAccessPage) {
      // Already in: skip the form.
      return NextResponse.redirect(new URL(safeNextPath(request.nextUrl.searchParams.get("next"), `/${first}`), request.url));
    }
  }

  if (!first || BARE_SECTIONS.has(first)) {
    const locale = savedLocale;
    const to = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url);
    return NextResponse.redirect(to);
  }

  const localeSegment = isLocale(first);
  if (!localeSegment && !NON_LOCALE_PREFIXES.has(first)) {
    return rewriteNotFound(request, savedLocale);
  }

  const session = await updateSession(request, localeSegment ? { "x-pa-locale": first } : {});
  if (!localeSegment) return session.response();

  const notFound = () => session.finalize(rewriteNotFound(request, first));
  const redirectTo = (path: string) => session.finalize(NextResponse.redirect(new URL(path, request.url)));

  const isPrivate = (section !== undefined && PRIVATE_SECTIONS.has(section)) || (section === "profile" && id === undefined);
  if (isPrivate && !session.userId) {
    return redirectTo(`/${first}/login?next=${encodeURIComponent(pathname + search)}`);
  }
  if (section !== undefined && SIGNED_OUT_ONLY.has(section) && session.userId && id === undefined) {
    return redirectTo(safeNextPath(request.nextUrl.searchParams.get("next"), `/${first}/profile`));
  }

  if (id !== undefined && rest.length === 0 && section !== undefined && Object.hasOwn(ID_TABLES, section)) {
    const key = safeDecode(id);
    if (section === "messages" && key === "preview") return session.response();
    if (key === null || !isUuid(key)) return notFound();
    let lookup = session.supabase.from(ID_TABLES[section]).select("id", { head: true, count: "exact" }).eq("id", key);
    // Pages render hidden items as not found (public reads), so match that here,
    // even for the owner, to keep the status code and the page in agreement.
    if (section === "item") lookup = lookup.neq("status", "hidden");
    const { count, error } = await lookup;
    // On a lookup error, let the page render (its own notFound() still guards
    // the content) rather than turning an outage into a wall of 404s.
    if (!error && count === 0) return notFound();
  }

  return session.response();
}

export const config = {
  matcher: [
    {
      // Skip Next internals and top-level static files only (e.g. /favicon.ico,
      // /robots.txt): nothing under /en/... can skip the checks, whatever its
      // extension. Link prefetches run proxy too: they return page content, so
      // the beta gate has to see them, and Proxy can't tell them apart (Next
      // strips the prefetch headers). Before the gate they skipped it (cost);
      // see docs/PROJECT.md, "Before going public".
      source: "/((?!_next/|_vercel/|[^/]+\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|txt|xml|webmanifest|woff2?|map)$).*)",
    },
  ],
};
