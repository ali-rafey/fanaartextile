import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/db/blogs";
import { listPublishedFabrics } from "@/lib/db/fabrics";
import { absoluteUrl } from "@/lib/seo";

// Content comes from the database, so regenerate hourly rather than at build.
export const revalidate = 3600;

/**
 * Served at /sitemap.xml — every indexable URL, including one entry per
 * fabric detail page so the catalogue is discovered without deep crawling.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/fabrics"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/threads"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blogs"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/feedback"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  let fabricRoutes: MetadataRoute.Sitemap = [];
  try {
    const fabrics = await listPublishedFabrics();
    fabricRoutes = fabrics.map((fabric) => ({
      url: absoluteUrl(`/fabrics/${fabric.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // Sitemap must never fail the build — skip the dynamic section.
  }

  // Journal posts do not have detail pages yet; add them here when they ship.
  try {
    await listPublishedPosts();
  } catch {
    /* noop */
  }

  return [...staticRoutes, ...fabricRoutes];
}
