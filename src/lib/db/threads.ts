import "server-only";
import { THREADS, type Thread } from "@/content/threads";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Stitching-thread catalogue.
 *
 * Unlike fabrics and the journal, threads are read from Supabase only: the
 * table is the source of truth, and src/content/threads.ts survives purely as
 * the seed the admin "Seed from content" action writes in. A publish or an
 * unpublish in the portal is therefore the whole story on the storefront —
 * no static list quietly filling in behind it.
 */

export interface ThreadRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  properties: string[];
  image: string | null;
  alt: string;
  sort_order: number;
  published: boolean;
}

export function rowToThread(row: ThreadRow): Thread {
  return {
    id: row.slug as Thread["id"],
    name: row.name,
    description: row.description,
    properties: row.properties ?? [],
    image: row.image,
    alt: row.alt || row.name,
  };
}

export async function listPublishedThreads(): Promise<Thread[]> {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("threads")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    // An unreachable table is the only case worth swallowing — an empty one is
    // a real answer, and the page says so rather than inventing stock.
    if (error) return [];
    return (data as ThreadRow[]).map(rowToThread);
  } catch {
    return [];
  }
}

/** One published thread by slug — the detail page's only query. */
export async function getPublishedThread(slug: string): Promise<Thread | undefined> {
  const all = await listPublishedThreads();
  return all.find((thread) => thread.id === slug);
}

export async function listAllThreads(): Promise<ThreadRow[]> {
  const { data, error } = await getSupabaseAdminClient()
    .from("threads")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ThreadRow[];
}

export async function getThreadRow(id: string): Promise<ThreadRow | null> {
  const { data, error } = await getSupabaseAdminClient()
    .from("threads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as ThreadRow) ?? null;
}

export async function upsertThread(row: Partial<ThreadRow> & { slug: string; name: string }) {
  const { error } = await getSupabaseAdminClient()
    .from("threads")
    .upsert({ ...row, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function deleteThread(id: string) {
  const { error } = await getSupabaseAdminClient().from("threads").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function seedThreadsFromContent(): Promise<number> {
  const rows = THREADS.map((t, i) => ({
    slug: t.id,
    name: t.name,
    description: t.description,
    properties: t.properties,
    image: t.image,
    alt: t.alt,
    sort_order: i,
    published: true,
  }));
  const { error } = await getSupabaseAdminClient()
    .from("threads")
    .upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  return rows.length;
}
