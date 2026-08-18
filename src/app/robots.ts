import type { MetadataRoute } from "next";
import { ALLOWED_BOTS, BLOCKED_BOTS } from "@/lib/bots";
import { SITE_URL } from "@/lib/seo";

/**
 * Served at /robots.txt.
 *
 * Search engines, AI assistants and social unfurlers are allowed; commercial
 * SEO scrapers are asked to stay out (and are hard-blocked in middleware,
 * since robots.txt is only a request). The admin portal and APIs are off
 * limits to everyone.
 */
export default function robots(): MetadataRoute.Robots {
  const offLimits = ["/admin", "/admin/", "/api/"];

  return {
    rules: [
      // Explicit welcome for the crawlers we want.
      ...ALLOWED_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: offLimits,
      })),
      // Scrapers: nothing at all.
      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
      // Everyone else: welcome, minus the private areas.
      { userAgent: "*", allow: "/", disallow: offLimits },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
