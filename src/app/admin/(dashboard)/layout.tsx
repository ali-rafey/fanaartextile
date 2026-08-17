import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { isAdminEmail } from "@/lib/auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Authenticated admin chrome. Middleware already redirects non-admins to the
 * login page; this is the server-side backstop (and where we read the signed-in
 * admin's email for the sidebar). Every page under /admin except /admin/login
 * renders inside here.
 */
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let email: string | null | undefined;
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email;
  } catch {
    // Supabase not configured (e.g. env vars missing on the host) or no
    // session — send to login rather than crashing the route.
    redirect("/admin/login");
  }

  if (!isAdminEmail(email)) {
    // Signed in but not on the ADMIN_EMAILS allowlist → explain it; otherwise
    // it's simply a missing session.
    redirect(email ? "/admin/login?error=forbidden" : "/admin/login");
  }

  return (
    <div className="flex min-h-svh bg-stone-100">
      <AdminSidebar adminEmail={email!} />
      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  );
}
