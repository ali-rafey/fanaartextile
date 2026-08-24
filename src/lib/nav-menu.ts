import "server-only";
import { cache } from "react";
import { ABOUT_FIGURES, ABOUT_HERO } from "@/content/about";
import type { BlogPost } from "@/content/blogs";
import type { Fabric } from "@/content/fabrics";
import type { Thread } from "@/content/threads";
import { listPublishedPosts } from "@/lib/db/blogs";
import { listPublishedFabrics } from "@/lib/db/fabrics";
import { listPublishedThreads } from "@/lib/db/threads";

/** One entry in the Fabrics panel's left-hand index. */
export interface FabricsMenuItem {
  slug: string;
  name: string;
  family: string;
  category: string;
  tagline: string;
  intro: string;
  image: string;
  alt: string;
}

export interface ThreadsMenuItem {
  id: string;
  name: string;
  description: string;
  properties: string[];
  image: string | null;
  alt: string;
}

export interface JournalMenuCategory {
  label: string;
  href: string;
}

export interface NavMenus {
  fabrics: FabricsMenuItem[];
  threads: ThreadsMenuItem[];
  journal: { categories: JournalMenuCategory[]; featured: BlogPost[] };
  about: {
    statement: string;
    links: { label: string; href: string; note: string }[];
    figures: { value: string; label: string }[];
  };
}

/**
 * Everything behind the navbar's hover panels, gathered in one cached call so
 * the header costs a single round of queries no matter how many panels it
 * renders — and shares that result with the page below it.
 */
export const getNavMenus = cache(async (): Promise<NavMenus> => {
  const [fabrics, threads, posts] = await Promise.all([
    listPublishedFabrics(),
    listPublishedThreads(),
    listPublishedPosts(),
  ]);

  return {
    fabrics: fabrics.map(toFabricsItem),
    threads: threads.slice(0, 6).map(toThreadsItem),
    journal: {
      categories: journalCategories(posts),
      featured: posts.slice(0, 4),
    },
    about: {
      statement: ABOUT_HERO.statement,
      links: [
        { label: "Why Fanaar exists", href: "/about#why", note: "The thinking behind the house" },
        { label: "How cloth is judged", href: "/about#perception", note: "Hand, weight and drape" },
        { label: "The person behind it", href: "/about#founder", note: "A note in the first person" },
      ],
      figures: ABOUT_FIGURES.map((figure) => ({ value: figure.value, label: figure.label })),
    },
  };
});

function toFabricsItem(fabric: Fabric): FabricsMenuItem {
  return {
    slug: fabric.slug,
    name: fabric.name,
    family: fabric.family,
    category: fabric.category,
    tagline: fabric.tagline,
    intro: fabric.intro,
    image: fabric.image,
    alt: fabric.alt,
  };
}

function toThreadsItem(thread: Thread): ThreadsMenuItem {
  return {
    id: thread.id,
    name: thread.name,
    description: thread.description,
    properties: thread.properties,
    image: thread.image,
    alt: thread.alt,
  };
}

function journalCategories(posts: BlogPost[]): JournalMenuCategory[] {
  const seen = new Set<string>();
  const categories: JournalMenuCategory[] = [{ label: "All posts", href: "/blogs" }];
  for (const post of posts) {
    const name = post.category?.trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    categories.push({ label: name, href: `/blogs?category=${encodeURIComponent(name)}` });
  }
  return categories;
}
