"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/hero", label: "Hero Video", exact: false },
  { href: "/admin/fabrics", label: "Fabrics", exact: false },
  { href: "/admin/blogs", label: "Journal", exact: false },
  { href: "/admin/feedback", label: "Feedback", exact: false },
];

export default function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    window.location.assign("/admin/login");
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-ink text-stone-300">
      <div className="px-6 py-7">
        <Link
          href="/admin"
          className="text-lg font-extralight tracking-[0.35em] text-ivory"
        >
          FANAAR
        </Link>
        <p className="mt-1 text-[11px] uppercase tracking-widest text-stone-500">
          Admin portal
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-clay text-ivory"
                  : "hover:bg-stone-800 hover:text-ivory"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-stone-800 px-6 py-5">
        <p className="truncate text-[11px] text-stone-500" title={adminEmail}>
          {adminEmail}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <Link href="/" className="text-xs text-stone-500 transition-colors hover:text-ivory">
            ← View site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="text-xs text-stone-400 transition-colors hover:text-ivory"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
