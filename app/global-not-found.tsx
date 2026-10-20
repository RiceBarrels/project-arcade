import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { path } from "@/lib/paths";
import { SITE_NAME } from "@/lib/site";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Not found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full items-center justify-center bg-background p-4 text-foreground">
        <main className="w-full max-w-md space-y-4 rounded-lg border-4 border-border bg-accent p-8 text-accent-foreground shadow">
          <p className="text-6xl font-black">404</p>
          <h1 className="text-2xl font-black uppercase">Nothing on this shelf</h1>
          <p className="font-medium">That page or item doesn&apos;t exist, or it&apos;s been taken down.</p>
          {/* Plain <a>: this page renders outside the app's root layout. */}
          <a
            href={path("/browse")}
            className="inline-flex min-h-11 items-center rounded-lg border-2 border-border bg-background px-4 font-bold uppercase text-foreground shadow-xs"
          >
            Browse the catalogue
          </a>
        </main>
      </body>
    </html>
  );
}
