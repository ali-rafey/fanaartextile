import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Served at /robots.txt. Keeps the admin portal and APIs out of the index. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
