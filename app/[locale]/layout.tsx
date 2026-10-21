import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Space_Mono } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BottomNav, BottomNavBar } from "@/components/mobile/bottom-nav";
import { MobileTopBar } from "@/components/mobile/mobile-top-bar";
import { NavEffects } from "@/components/mobile/nav-effects";
import { Onboarding } from "@/components/mobile/onboarding";
import { getCurrentUser } from "@/lib/data/session";
import { LOCALES, SITE_DESCRIPTION, SITE_NAME, SITE_STAGE, SITE_TAGLINE } from "@/lib/site";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} (${SITE_STAGE}) - ${SITE_TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  // Home-screen install (app/manifest.ts is linked automatically). "default"
  // status bar: iOS keeps its own bar above the page, so the clock stays readable
  // over both the red top bar and the white back bar.
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// viewport-fit=cover lets the bars reach under the notch and home indicator;
// they pad themselves with env(safe-area-inset-*). Pinch zoom stays allowed.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Browser / installed-app status bar colour: the top bar's red.
  themeColor: "#ff3333",
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
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  return (
    <html lang={locale} className={`${dmSans.variable} ${spaceMono.variable} h-full antialiased`}>
      {/* Phones: app layout. The body is exactly one screen tall and never
          scrolls; the top bar and the fixed bottom bar stay put and only the
          content area in between scrolls (relative, so absolutely positioned
          bits like sr-only headings stay inside it). md and up: a normal page. */}
      <body className="flex min-h-full flex-col bg-background text-foreground max-md:h-dvh max-md:overflow-hidden">
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
      </body>
    </html>
  );
}

/** First-sign-in walkthrough for signed-in members only. */
async function OnboardingGate() {
  const user = await getCurrentUser().catch(() => null);
  return user ? <Onboarding userId={user.id} /> : null;
}
