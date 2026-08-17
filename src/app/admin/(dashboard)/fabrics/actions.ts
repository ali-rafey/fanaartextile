"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-guard";
import { deleteFabric, seedFabricsFromContent, upsertFabric } from "@/lib/db/fabrics";

async function assertAdmin() {
  if (!(await isAdminRequest())) throw new Error("Unauthorized.");
}

const str = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

/** Textarea with one item per line → string[] */
const lines = (data: FormData, key: string) =>
  str(data, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function refresh(slug?: string) {
  revalidatePath("/admin/fabrics");
  revalidatePath("/fabrics");
  if (slug) revalidatePath(`/fabrics/${slug}`);
}

export async function saveFabric(formData: FormData) {
  await assertAdmin();

  const id = str(formData, "id");
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required.");
  const slug = slugify(str(formData, "slug") || name);

  await upsertFabric({
    ...(id ? { id } : {}),
    slug,
    name,
    family: str(formData, "family") || "Knit",
    category: str(formData, "category"),
    tagline: str(formData, "tagline"),
    intro: str(formData, "intro"),
    image: str(formData, "image") || null,
    alt: str(formData, "alt"),
    specs: {
      composition: str(formData, "composition"),
      construction: str(formData, "construction"),
      weight: str(formData, "weight"),
      dyeClass: str(formData, "dyeClass"),
      finish: str(formData, "finish"),
      width: str(formData, "width"),
    },
    best_for_intro: str(formData, "best_for_intro"),
    best_for: lines(formData, "best_for"),
    root: lines(formData, "root"),
    sort_order: Number(formData.get("sort_order")) || 0,
    published: formData.get("published") === "on",
  });

  refresh(slug);
  redirect("/admin/fabrics");
}

export async function removeFabric(id: string) {
  await assertAdmin();
  await deleteFabric(id);
  refresh();
}

export async function seedFabrics() {
  await assertAdmin();
  await seedFabricsFromContent();
  refresh();
}
