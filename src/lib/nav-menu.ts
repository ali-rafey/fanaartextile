import "server-only";
import { cache } from "react";
import type { BlogPost } from "@/content/blogs";
import { listPublishedPosts } from "@/lib/db/blogs";

export interface JournalMenu {
  categories: { label: string; href: string }[];
  featured: BlogPost[];
}

/**
 * Data behind the Journal hover panel in the navbar. Cached per request so the
 * header, the page and anything else asking for posts share one query.
 */
export const getJournalMenu = cache(async (): Promise<JournalMenu> => {
  let posts: BlogPost[] = [];
  try {
    posts = await listPublishedPosts();
  } catch {
    posts = [];
  }

  const seen = new Set<string>();
  const categories = [{ label: "All posts", href: "/blogs" }];
  for (const post of posts) {
    const name = post.category?.trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    categories.push({ label: name, href: `/blogs?category=${encodeURIComponent(name)}` });
  }

  return { categories, featured: posts.slice(0, 4) };
});
