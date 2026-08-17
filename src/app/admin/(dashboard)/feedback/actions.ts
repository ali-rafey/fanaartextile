"use server";

import { revalidatePath } from "next/cache";
import { isAdminRequest } from "@/lib/admin-guard";
import {
  deleteFeedback,
  setFeedbackStatus,
  type FeedbackStatus,
} from "@/lib/db/feedback";

/** Server actions are callable endpoints — re-check admin on every one. */
async function assertAdmin() {
  if (!(await isAdminRequest())) throw new Error("Unauthorized.");
}

export async function markFeedback(id: string, status: FeedbackStatus) {
  await assertAdmin();
  await setFeedbackStatus(id, status);
  revalidatePath("/admin/feedback");
}

export async function removeFeedback(id: string) {
  await assertAdmin();
  await deleteFeedback(id);
  revalidatePath("/admin/feedback");
}
