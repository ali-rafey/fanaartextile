import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

// Thin wrapper for everything under /admin. The login page renders bare; the
// authenticated dashboard chrome + guard live in (dashboard)/layout.tsx.
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
