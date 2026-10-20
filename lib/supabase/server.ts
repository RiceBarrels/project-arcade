import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createPlainClient } from "@supabase/supabase-js";
import { supabaseEnv } from "./env";

/**
 * Per-request client bound to the signed-in user's cookies. Reading cookies is
 * runtime data: only call this inside a <Suspense> boundary, a Server Action or
 * a Route Handler. Never share it across requests.
 */
export async function createClient() {
  const { url, key } = supabaseEnv();
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Called from a Server Component, which can't set cookies. Safe to
          // ignore: proxy.ts refreshes the session on every request.
        }
      },
    },
  });
}

/**
 * Cookie-less client for public reads (catalogue, public profiles) inside
 * "use cache" scopes. Runs as the anon role, so RLS shows only public rows.
 */
export function createPublicClient() {
  const { url, key } = supabaseEnv();
  return createPlainClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
