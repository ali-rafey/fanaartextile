import "server-only";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export type FeedbackKind = "feedback" | "contact";
export type FeedbackStatus = "new" | "read" | "archived";

export interface FeedbackRow {
  id: string;
  kind: FeedbackKind;
  name: string;
  email: string;
  topic: string | null;
  subject: string | null;
  rating: number | null;
  message: string;
  status: FeedbackStatus;
  created_at: string;
}

export interface NewFeedback {
  kind: FeedbackKind;
  name: string;
  email: string;
  topic?: string | null;
  subject?: string | null;
  rating?: number | null;
  message: string;
}

/** Store a public submission (contact form or feedback form). */
export async function createFeedback(input: NewFeedback): Promise<void> {
  const { error } = await getSupabaseAdminClient().from("feedback").insert({
    kind: input.kind,
    name: input.name,
    email: input.email,
    topic: input.topic ?? null,
    subject: input.subject ?? null,
    rating: input.rating ?? null,
    message: input.message,
  });
  if (error) throw new Error(error.message);
}

export async function listFeedback(status?: FeedbackStatus): Promise<FeedbackRow[]> {
  let query = getSupabaseAdminClient()
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as FeedbackRow[];
}

export async function countNewFeedback(): Promise<number> {
  const { count, error } = await getSupabaseAdminClient()
    .from("feedback")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");
  if (error) return 0;
  return count ?? 0;
}

export async function setFeedbackStatus(id: string, status: FeedbackStatus) {
  const { error } = await getSupabaseAdminClient()
    .from("feedback")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteFeedback(id: string) {
  const { error } = await getSupabaseAdminClient().from("feedback").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
