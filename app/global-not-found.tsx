import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavBar } from "@/components/mobile/bottom-nav";
import { MobileTopBar } from "@/components/mobile/mobile-top-bar";
import { path } from "@/lib/paths";
import { SITE_NAME } from "@/lib/site";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: `Not found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }] },
};

// Same as app/[locale]/layout.tsx: bars reach under the notch, pinch zoom stays allowed.
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ff3333" };

// Renders outside the [locale] layout, so it brings its own phone chrome
// (top bar + bottom bar) to keep the app feel on a dead link.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground max-md:h-dvh max-md:overflow-hidden">
        <MobileTopBar />
        <div className="flex flex-1 items-center justify-center p-4 max-md:mb-(--bottom-nav-h) max-md:min-h-0 max-md:overflow-y-auto max-md:overscroll-contain">
          <main className="w-full max-w-md space-y-4 rounded-lg border-4 border-border bg-accent p-8 text-accent-foreground shadow">
            <p className="text-6xl font-black">404</p>
            <h1 className="text-2xl font-black uppercase">Nothing on this shelf</h1>
            <p className="font-medium">That page or item doesn&apos;t exist, or it&apos;s been taken down.</p>
            <a
              href={path("/browse")}
              className="inline-flex min-h-11 items-center rounded-lg border-2 border-border bg-background px-4 font-bold uppercase text-foreground shadow-xs"
            >
              Browse the catalogue
            </a>
          </main>
        </div>
        <BottomNavBar active={null} />
      </body>
    </html>
  );
}
