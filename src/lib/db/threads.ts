import "server-only";
import { THREADS, type Thread } from "@/content/threads";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Stitching-thread catalogue. Mirrors lib/db/fabrics.ts — published reads fall
 * back to the static list in src/content/threads.ts until the table is filled.
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
    if (error || !data?.length) return THREADS;
    return (data as ThreadRow[]).map(rowToThread);
  } catch {
    return THREADS;
  }
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
