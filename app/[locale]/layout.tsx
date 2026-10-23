import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "../fonts";
import { SiteAnalytics } from "@/components/analytics";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeSync } from "@/components/theme";
import { BottomNav, BottomNavBar } from "@/components/mobile/bottom-nav";
import { MobileTopBar } from "@/components/mobile/mobile-top-bar";
import { NavEffects } from "@/components/mobile/nav-effects";
import { Onboarding } from "@/components/mobile/onboarding";
import { getCurrentUser } from "@/lib/data/session";
import { I18nProvider } from "@/i18n/client";
import { LOCALE_INFO } from "@/i18n/config";
import { alternates, getClientMessages, getT } from "@/i18n/server";
import { ALLOW_SEARCH_INDEXING, isLocale, LOCALES, SITE_DESCRIPTION, SITE_NAME, SITE_STAGE, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { THEME_COLOR, THEME_SCRIPT } from "@/lib/theme";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${SITE_NAME} (${SITE_STAGE}) - ${t(SITE_TAGLINE)}`, template: `%s | ${SITE_NAME}` },
    description: t(SITE_DESCRIPTION),
    // Pages set their own; this covers the home page.
    alternates: await alternates("/"),
    // Pre-alpha: no indexing (lib/site.ts). Pages don't set robots, so this applies everywhere.
    robots: { index: ALLOW_SEARCH_INDEXING, follow: ALLOW_SEARCH_INDEXING },
    // Home-screen install (app/manifest.ts is linked automatically). "default"
    // status bar: iOS keeps its own bar above the page, so the clock stays readable
    // over both the red top bar and the white back bar.
    appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

// viewport-fit=cover lets the bars reach under the notch and home indicator;
// they pad themselves with env(safe-area-inset-*). Pinch zoom stays allowed.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Browser / installed-app status bar colour: the top bar's red in each theme.
  // These follow the device setting; THEME_SCRIPT adds one for a manual choice.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  // Backstop for the proxy check: unknown locales never render.
  if (!isLocale(locale)) notFound();
  const info = LOCALE_INFO[locale];
  return (
    // suppressHydrationWarning: THEME_SCRIPT adds class="dark" and data-theme-pref
    // before hydration (lib/theme.ts); React keeps them.
    <html lang={info.htmlLang} dir={info.dir} className={`${fontVariables} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      {/* Phones: app layout. The body is exactly one screen tall and never
          scrolls; the top bar and the fixed bottom bar stay put and only the
          content area in between scrolls (relative, so absolutely positioned
          bits like sr-only headings stay inside it). md and up: a normal page. */}
      <body className="flex min-h-full flex-col bg-background text-foreground max-md:h-dvh max-md:overflow-hidden">
        <I18nProvider locale={locale} messages={getClientMessages(locale)}>
          <MobileTopBar />
          <div
            data-app-scroll=""
            className="relative flex flex-1 flex-col max-md:mb-(--bottom-nav-h) max-md:min-h-0 max-md:overflow-y-auto max-md:overscroll-contain"
          >
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-8 md:pt-8">{children}</main>
            <SiteFooter />
          </div>
          <Suspense fallback={<BottomNavBar active={null} />}>
            <BottomNav />
          </Suspense>
          <NavEffects />
          <Suspense fallback={null}>
            <OnboardingGate />
          </Suspense>
        </I18nProvider>
        <ThemeSync />
        <SiteAnalytics />
      </body>
    </html>
  );
}

/** First-sign-in walkthrough for signed-in members only. */
async function OnboardingGate() {
  const user = await getCurrentUser().catch(() => null);
  return user ? <Onboarding userId={user.id} /> : null;
}
