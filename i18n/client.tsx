"use client";

import { createContext, useContext, useMemo } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { Direction } from "radix-ui";
import { DEFAULT_LOCALE, LOCALE_INFO, localePath, type Locale } from "./config";
import { createTranslator, type Messages, type Translator } from "./core";

// Client side of i18n. The root layout passes this locale's (client) messages
// in as props, so they arrive with the page and the first render on the
// server and in the browser use the same text (no hydration mismatch).

const I18nContext = createContext<Translator>(createTranslator(DEFAULT_LOCALE, {}));

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const t = useMemo(() => createTranslator(locale, messages), [locale, messages]);
  // Radix reads the direction for keyboard order (tabs, radios, select) and menu sides.
  return (
    <I18nContext.Provider value={t}>
      <Direction.Provider dir={LOCALE_INFO[locale].dir}>{children}</Direction.Provider>
    </I18nContext.Provider>
  );
}

/** const t = useT(); t("Browse"). */
export const useT = () => useContext(I18nContext);

export const useLocale = (): Locale => useContext(I18nContext).locale;

/** (p) => p with this page's locale in front: lp("/browse") -> "/zh/browse". */
export function useLocalePath() {
  const locale = useLocale();
  return (p: string) => localePath(p, locale);
}

/** next/navigation's router with push/replace/prefetch adding the locale prefix. */
export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();
  return useMemo(
    () => ({
      ...router,
      push: (href: string, opts?: Parameters<typeof router.push>[1]) => router.push(localePath(href, locale), opts),
      replace: (href: string, opts?: Parameters<typeof router.replace>[1]) =>
        router.replace(localePath(href, locale), opts),
      prefetch: (href: string, opts?: Parameters<typeof router.prefetch>[1]) =>
        router.prefetch(localePath(href, locale), opts),
    }),
    [router, locale],
  );
}
