import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessPassword, accessToken, isAccessPassword } from "@/lib/access";
import { safeNextPath } from "@/lib/domain";
import { isLocale } from "@/lib/site";

// The access form's POST (lib/access.ts). A plain form post, not a Server
// Action: Proxy lets a visitor without the cookie POST only here, and Server
// Actions can be sent to any page path, so allowing them on the access page
// would let every action in its layout through the gate.
// Right password: sets the cookie and goes on to `next`. Anything else: back
// to the form with one general error, after a fixed pause to slow down
// guessing. There is no real rate limit (Vercel functions keep no shared
// state between requests); this is a beta gate, not account security.
// Never log the attempt.

const WRONG_DELAY_MS = 1000;
const MAX_LENGTH = 1024;

export async function POST(request: NextRequest, ctx: RouteContext<"/[locale]/access/check">) {
  const { locale } = await ctx.params;
  const password = accessPassword();
  if (!password || !isLocale(locale)) return new NextResponse(null, { status: 404 });

  const fd = await request.formData().catch(() => null);
  const next = safeNextPath(String(fd?.get("next") ?? ""), `/${locale}`);
  const back = (error: "wrong" | "failed") => {
    const to = new URL(`/${locale}/access`, request.url);
    to.searchParams.set("next", next);
    to.searchParams.set("error", error);
    return NextResponse.redirect(to, 303);
  };
  if (!fd) return back("failed");

  const attempt = fd.get("password");
  let ok = false;
  try {
    ok = typeof attempt === "string" && attempt.length <= MAX_LENGTH && (await isAccessPassword(attempt, password));
  } catch {
    return back("failed");
  }
  if (!ok) {
    await new Promise((r) => setTimeout(r, WRONG_DELAY_MS));
    return back("wrong");
  }

  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(ACCESS_COOKIE, await accessToken(password), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return res;
}
