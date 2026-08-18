import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // The portal must never appear in search results.
  robots: { index: false, follow: false, nocache: true },
};

// Thin wrapper for everything under /admin. The login page renders bare; the
// authenticated dashboard chrome + guard live in (dashboard)/layout.tsx.
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
