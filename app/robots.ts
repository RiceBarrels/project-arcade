import type { MetadataRoute } from "next";
import { ALLOW_SEARCH_INDEXING } from "@/lib/site";

// /robots.txt. Pre-alpha: the whole site is closed to crawlers (with
// ALLOW_SEARCH_INDEXING in lib/site.ts). At the public launch this opens up;
// add the sitemap here then, once there is one.
export default function robots(): MetadataRoute.Robots {
  return ALLOW_SEARCH_INDEXING
    ? { rules: { userAgent: "*", allow: "/" } }
    : { rules: { userAgent: "*", disallow: "/" } };
}
