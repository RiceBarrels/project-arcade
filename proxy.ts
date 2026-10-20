import { NextResponse, type NextRequest } from "next/server";
import { isUuid, safeNextPath } from "@/lib/domain";
import { LOCALES } from "@/lib/site";
import { updateSession } from "@/lib/supabase/proxy";

// Runs before every page request:
// 1. Refreshes the Supabase session (cookies) so Server Components see a valid user.
// 2. Sends signed-out visitors on private pages to /login?next=...
// 3. Returns a real 404 for unknown locales and unknown item/profile ids.
//    With Cache Components a page's own notFound() streams after a 200 shell,
//    so the status check has to happen here. The existence checks are
//    single-row HEAD queries under the visitor's own RLS.

// Matches no route, so global-not-found renders with a 404 status.
const NOT_FOUND_PATH = "/_not-found/_/_/_";

// Paths outside the locale tree that still need the session (email links).
const NON_LOCALE_PREFIXES = new Set(["auth"]);

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

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [first, section, id, ...rest] = pathname.split("/").filter(Boolean);
  if (!first) return;

  const isLocale = (LOCALES as readonly string[]).includes(first);
  if (!isLocale && !NON_LOCALE_PREFIXES.has(first)) {
    return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url), { status: 404 });
  }

  const session = await updateSession(request);
  if (!isLocale) return session.response();

  const notFound = () =>
    session.finalize(NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url), { status: 404 }));
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
      // extension. Link prefetches skip proxy too (cost): private pages still
      // re-check the session on the server (requireUser), and the real
      // navigation goes through every check above.
      source: "/((?!_next/|_vercel/|[^/]+\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif|txt|xml|webmanifest|woff2?|map)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
