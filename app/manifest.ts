import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

// Web app manifest (served at /manifest.webmanifest): lets phones "Add to Home
// Screen" and open the site full screen without browser bars. No service
// worker / offline cache in v1, so an installed copy is always the live site.
// Colours are the theme's primary red and page white (app/globals.css).
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/en",
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff3333",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
