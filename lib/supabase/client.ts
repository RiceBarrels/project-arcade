import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

// Browser client (singleton inside @supabase/ssr). Session lives in cookies so
// the server sees the same user.
export function createClient() {
  const { url, key } = supabaseEnv();
  return createBrowserClient(url, key);
}
