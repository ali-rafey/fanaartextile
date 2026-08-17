import "server-only";
import { FABRICS, type Fabric } from "@/content/fabrics";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Fabric catalogue data access. Public reads fall back to the static content in
 * src/content/fabrics.ts whenever Supabase is unreachable or the table is still
 * empty, so the storefront never renders blank while content is being migrated.
 */

export interface FabricRow {
  id: string;
  slug: string;
  name: string;
  family: string;
  category: string;
  tagline: string;
  intro: string;
  image: string | null;
  alt: string;
  specs: Record<string, string>;
  best_for_intro: string;
  best_for: string[];
  root: string[];
  featured_label: string | null;
  sort_order: number;
  published: boolean;
}

export function rowToFabric(row: FabricRow): Fabric {
  return {
    slug: row.slug,
    name: row.name,
    family: row.family,
    category: row.category,
    tagline: row.tagline,
    intro: row.intro,
    image: row.image ?? "/images/fabrics/twill.jpg",
    alt: row.alt || row.name,
    specs: {
      composition: row.specs?.composition ?? "",
      construction: row.specs?.construction ?? "",
      weight: row.specs?.weight ?? "",
      dyeClass: row.specs?.dyeClass ?? "",
      finish: row.specs?.finish ?? "",
      width: row.specs?.width ?? "",
    },
    bestForIntro: row.best_for_intro,
    bestFor: row.best_for ?? [],
    root: row.root ?? [],
  };
}

/** Published fabrics for the storefront (static fallback). */
export async function listPublishedFabrics(): Promise<Fabric[]> {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("fabrics")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error || !data?.length) return FABRICS;
    return (data as FabricRow[]).map(rowToFabric);
  } catch {
    return FABRICS;
  }
}

export async function getPublishedFabric(slug: string): Promise<Fabric | undefined> {
  const all = await listPublishedFabrics();
  return all.find((f) => f.slug === slug);
}

/** Every fabric, including drafts — admin only. */
export async function listAllFabrics(): Promise<FabricRow[]> {
  const { data, error } = await getSupabaseAdminClient()
    .from("fabrics")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as FabricRow[];
}

export async function getFabricRow(id: string): Promise<FabricRow | null> {
  const { data, error } = await getSupabaseAdminClient()
    .from("fabrics")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as FabricRow) ?? null;
}

export async function upsertFabric(row: Partial<FabricRow> & { slug: string; name: string }) {
  const payload = { ...row, updated_at: new Date().toISOString() };
  const { error } = await getSupabaseAdminClient().from("fabrics").upsert(payload);
  if (error) throw new Error(error.message);
}

export async function deleteFabric(id: string) {
  const { error } = await getSupabaseAdminClient().from("fabrics").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** One-click import of the built-in catalogue into an empty table. */
export async function seedFabricsFromContent(): Promise<number> {
  const rows = FABRICS.map((f, i) => ({
    slug: f.slug,
    name: f.name,
    family: f.family,
    category: f.category,
    tagline: f.tagline,
    intro: f.intro,
    image: f.image,
    alt: f.alt,
    specs: f.specs as unknown as Record<string, string>,
    best_for_intro: f.bestForIntro,
    best_for: f.bestFor,
    root: f.root,
    sort_order: i,
    published: true,
  }));
  const { error } = await getSupabaseAdminClient()
    .from("fabrics")
    .upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(error.message);
  return rows.length;
}
