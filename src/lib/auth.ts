/**
 * Admin allowlist. Only emails listed in ADMIN_EMAILS (comma-separated, set in
 * .env.local) may enter /admin and the /api/admin routes. Each must correspond
 * to a user created in Supabase → Authentication → Users. Server-only.
 */
export const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
