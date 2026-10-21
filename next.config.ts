import path from "node:path";
import type { NextConfig } from "next";

// Item photos come from this project's public "item-photos" Storage bucket only.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseUrl ? [new URL(`${supabaseUrl}/storage/v1/object/public/item-photos/**`)] : [],
  },
  /* config options here */
  experimental: {
    agentFeedback: false,
    // Real 404 page for proxy-rejected URLs (unknown locale, unknown item/profile id).
    globalNotFound: true,
  },
  cacheComponents: true,
  // Legal pages read their Markdown at render time (lib/legal.ts).
  outputFileTracingIncludes: { "/[locale]/terms": ["./content/legal/**"], "/[locale]/privacy": ["./content/legal/**"] },
  partialPrefetching: true,
  turbopack: {
    // Pin the root to this repo; a stray bun.lock in the home directory otherwise confuses root detection.
    root: path.resolve(import.meta.dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
