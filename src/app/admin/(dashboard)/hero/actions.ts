"use server";

import { revalidatePath } from "next/cache";
import { isAdminRequest } from "@/lib/admin-guard";
import { getStorage } from "@/lib/storage";
import type { HeroLayout } from "@/lib/storage/types";

/** Choose which hero the homepage renders, and what the spread's plate shows. */
export async function saveHeroLayout(formData: FormData) {
  if (!(await isAdminRequest())) throw new Error("Unauthorized.");

  const mode = String(formData.get("mode") ?? "spread") === "video" ? "video" : "spread";
  const url = String(formData.get("plateUrl") ?? "").trim();
  const alt = String(formData.get("plateAlt") ?? "").trim();

  const layout: HeroLayout = {
    mode,
    plate: url
      ? {
          url,
          // The homepage needs to know whether to render <video> or <Image>,
          // and the extension is the only signal a stored URL carries.
          type: /\.(mp4|webm|ogv|mov|m4v)(\?|$)/i.test(url) ? "video" : "image",
          alt,
        }
      : null,
  };

  await getStorage().saveHeroLayout(layout);
  revalidatePath("/");
  revalidatePath("/admin/hero");
}
