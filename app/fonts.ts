import { Be_Vietnam_Pro, DM_Sans, Inter, Noto_Sans_Arabic, Space_Mono } from "next/font/google";

// Fonts. DM Sans and Space Mono (Latin) are preloaded on every page. The
// others are never preloaded: each is only named in its own language's font
// stack (globals.css, html[lang=...]), so the browser downloads it only on
// those pages, and only the scripts it covers. Chinese and Korean use the
// system's CJK fonts (far too large to self-host). All variable classes go on
// <html> everywhere so every stack is always valid CSS.
//
// The Arabic and Cyrillic fonts come first in their stacks: DM Sans's own
// fallback face (local Arial, for glyphs DM Sans lacks) has Arabic and
// Cyrillic and would otherwise win. Their files only cover their own script
// (unicode-range), so Latin text still falls through to DM Sans / Space Mono.
// They get no fallback face of their own, which would cover Latin text too.

export const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
export const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
  preload: false,
});
const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  preload: false,
  adjustFontFallback: false,
  fallback: [],
});
const interCyrillic = Inter({
  variable: "--font-cyrillic",
  subsets: ["cyrillic"],
  preload: false,
  adjustFontFallback: false,
  fallback: [],
});

export const fontVariables = [dmSans, spaceMono, beVietnam, notoArabic, interCyrillic].map((f) => f.variable).join(" ");
