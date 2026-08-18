import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { getAdminUser } from "@/lib/admin-guard";

/**
 * Authenticated admin chrome. Middleware already redirects non-admins to the
 * login page; this is the server-side backstop. The user lookup is deduped
 * (see getAdminUser) so navigating between admin tabs costs one auth call,
 * not one per layout + page.
 */
export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login?error=forbidden");

  return (
    <div className="flex min-h-svh bg-white">
      <AdminSidebar adminEmail={admin.email} />
      <main className="flex-1 px-8 py-8 lg:px-12">{children}</main>
    </div>
  );
}
