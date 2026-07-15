import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin",
};

// SECURITY: the admin portal is NOT authenticated yet. Auth ships with the
// Supabase integration (see README roadmap) — do not deploy publicly before it.
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh bg-stone-100">
      <AdminSidebar />
      <main className="flex-1 px-8 py-10">{children}</main>
    </div>
  );
}
