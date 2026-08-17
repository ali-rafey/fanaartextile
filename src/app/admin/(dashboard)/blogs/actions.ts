"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-guard";
import { deletePost, seedPostsFromContent, upsertPost } from "@/lib/db/blogs";

async function assertAdmin() {
  if (!(await isAdminRequest())) throw new Error("Unauthorized.");
}

const str = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function refresh() {
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  revalidatePath("/");
}

export async function savePost(formData: FormData) {
  await assertAdmin();

  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) throw new Error("Title is required.");

  await upsertPost({
    ...(id ? { id } : {}),
    slug: slugify(str(formData, "slug") || title),
    title,
    category: str(formData, "category"),
    excerpt: str(formData, "excerpt"),
    body: str(formData, "body"),
    read_time: str(formData, "read_time"),
    published_on: str(formData, "published_on"),
    image: str(formData, "image") || null,
    alt: str(formData, "alt"),
    sort_order: Number(formData.get("sort_order")) || 0,
    published: formData.get("published") === "on",
  });

  refresh();
  redirect("/admin/blogs");
}

export async function removePost(id: string) {
  await assertAdmin();
  await deletePost(id);
  refresh();
}

export async function seedPosts() {
  await assertAdmin();
  await seedPostsFromContent();
  refresh();
}
