import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/**
 * Refreshes the auth session for this request (getClaims verifies the JWT and
 * refreshes it when needed) and returns:
 * - `response`: a pass-through response carrying any refreshed auth cookies and
 *   the no-store cache headers @supabase/ssr asks for,
 * - `userId`: the verified user id, or null,
 * - `supabase`: the request-scoped client (for cheap existence checks),
 * - `finalize(res)`: copies those cookies/headers onto a different response
 *   (redirect or rewrite), so a refresh is never lost.
 */
export async function updateSession(request: NextRequest) {
  const { url, key } = supabaseEnv();
  let response = NextResponse.next({ request });
  let cacheHeaders: Record<string, string> = {};

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        cacheHeaders = { ...cacheHeaders, ...headers };
        for (const [h, v] of Object.entries(headers)) response.headers.set(h, v);
      },
    },
  });

  // Do not put code between createServerClient and getClaims: the refresh
  // must happen before anything reads the session.
  const { data } = await supabase.auth.getClaims();
  const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;

  function finalize<T extends NextResponse>(res: T): T {
    for (const c of response.cookies.getAll()) res.cookies.set(c);
    for (const [h, v] of Object.entries(cacheHeaders)) res.headers.set(h, v);
    return res;
  }

  return { response: () => response, userId, supabase, finalize };
}
