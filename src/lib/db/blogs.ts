import "server-only";
import { BLOG_POSTS, type BlogPost } from "@/content/blogs";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Journal data access. Mirrors lib/db/fabrics.ts: published reads fall back to
 * the static posts in src/content/blogs.ts until the table is populated.
 */

export interface BlogRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  read_time: string;
  published_on: string;
  image: string | null;
  alt: string;
  sort_order: number;
  published: boolean;
}

export function rowToPost(row: BlogRow): BlogPost {
  return {
    id: row.slug as BlogPost["id"],
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    readTime: row.read_time,
    date: row.published_on,
    image: row.image,
    alt: row.alt || row.title,
    href: `/blogs/${row.slug}`,
  };
}

export async function listPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data?.length) return BLOG_POSTS;
    return (data as BlogRow[]).map(rowToPost);
  } catch {
    return BLOG_POSTS;
  }
}

export async function listAllPosts(): Promise<BlogRow[]> {
  const { data, error } = await getSupabaseAdminClient()
    .from("blog_posts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogRow[];
}

export async function getPostRow(id: string): Promise<BlogRow | null> {
  const { data, error } = await getSupabaseAdminClient()
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as BlogRow) ?? null;
}

export async function upsertPost(row: Partial<BlogRow> & { slug: string; title: string }) {
  const { error } = await getSupabaseAdminClient()
    .from("blog_posts")
    .upsert({ ...row, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function deletePost(id: string) {
  const { error } = await getSupabaseAdminClient().from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function seedPostsFromContent(): Promise<number> {
  const rows = BLOG_POSTS.map((p, i) => ({
    slug: p.id,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    body: "",
    read_time: p.readTime,
    published_on: p.date,
    image: p.image,
    alt: p.alt,
    sort_order: i,
    published: true,
  }));
  const { error } = await getSupabaseAdminClient()
    .from("blog_posts")
    .upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  return rows.length;
}
