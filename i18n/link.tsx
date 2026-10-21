"use client";

import NextLink from "next/link";
import { localePath } from "./config";
import { useLocale } from "./client";

/**
 * next/link that adds the page's locale to site paths: <Link href="/browse">
 * goes to /zh/browse on Chinese pages. Paths that already start with a locale,
 * /auth links and external URLs pass through unchanged.
 */
export function Link({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localePath(href, locale) : href} {...props} />;
}
