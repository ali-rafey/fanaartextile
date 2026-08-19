"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-guard";
import { deleteThread, seedThreadsFromContent, upsertThread } from "@/lib/db/threads";

async function assertAdmin() {
  if (!(await isAdminRequest())) throw new Error("Unauthorized.");
}

const str = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

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

function refresh() {
  revalidatePath("/admin/threads");
  revalidatePath("/threads");
}

export async function saveThread(formData: FormData) {
  await assertAdmin();

  const id = str(formData, "id");
  const name = str(formData, "name");
  if (!name) throw new Error("Name is required.");

  await upsertThread({
    ...(id ? { id } : {}),
    slug: slugify(str(formData, "slug") || name),
    name,
    description: str(formData, "description"),
    properties: lines(formData, "properties"),
    image: str(formData, "image") || null,
    alt: str(formData, "alt"),
    sort_order: Number(formData.get("sort_order")) || 0,
    published: formData.get("published") === "on",
  });

  refresh();
  redirect("/admin/threads");
}

export async function removeThread(id: string) {
  await assertAdmin();
  await deleteThread(id);
  refresh();
}

export async function seedThreads() {
  await assertAdmin();
  await seedThreadsFromContent();
  refresh();
}
