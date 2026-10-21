import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { fontVariables } from "./fonts";
import { BottomNavBar } from "@/components/mobile/bottom-nav";
import { MobileTopBar } from "@/components/mobile/mobile-top-bar";
import { I18nProvider } from "@/i18n/client";
import { LOCALE_INFO, localePath } from "@/i18n/config";
import { getClientMessages, getTFor } from "@/i18n/server";
import { DEFAULT_LOCALE, isLocale, SITE_NAME } from "@/lib/site";

// Renders per request (it reads the x-pa-locale header), so no static shell.
// It's a small page with no data fetching, so blocking on it costs nothing.
export const instant = false;

// Same as app/[locale]/layout.tsx: bars reach under the notch, pinch zoom stays allowed.
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ff3333" };

/** Language of the dead link: proxy.ts passes it in x-pa-locale; English otherwise. */
async function notFoundLocale() {
  const l = (await headers()).get("x-pa-locale");
  return isLocale(l) ? l : DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = getTFor(await notFoundLocale());
  return {
    title: `${t("Page not found")} | ${SITE_NAME}`,
    description: t("The page or item you were looking for doesn't exist, or it's been taken down."),
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
  };
}

// Renders outside the [locale] layout, so it brings its own phone chrome
// (top bar + bottom bar) to keep the app feel on a dead link.
export default async function GlobalNotFound() {
  const locale = await notFoundLocale();
  const t = getTFor(locale);
  const info = LOCALE_INFO[locale];
  return (
    <html lang={info.htmlLang} dir={info.dir} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground max-md:h-dvh max-md:overflow-hidden">
        <I18nProvider locale={locale} messages={getClientMessages(locale)}>
          <MobileTopBar />
          <div className="flex flex-1 items-center justify-center p-4 max-md:mb-(--bottom-nav-h) max-md:min-h-0 max-md:overflow-y-auto max-md:overscroll-contain">
            <main className="w-full max-w-md space-y-4 rounded-lg border-4 border-border bg-accent p-8 text-accent-foreground shadow">
              <p className="text-6xl font-black">404</p>
              <h1 className="text-2xl font-black uppercase">{t("Nothing on this shelf")}</h1>
              <p className="font-medium">{t("That page or item doesn't exist, or it's been taken down.")}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={localePath("/browse", locale)}
                  className="inline-flex min-h-11 items-center rounded-lg border-2 border-border bg-background px-4 font-bold uppercase text-foreground shadow-xs"
                >
                  {t("Browse the catalogue")}
                </a>
                <a href={localePath("/", locale)} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                  {t("Back to home")}
                </a>
              </div>
            </main>
          </div>
          <BottomNavBar active={null} />
        </I18nProvider>
      </body>
    </html>
  );
}
