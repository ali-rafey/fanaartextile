"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/admin/icons";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const NAV_LINKS: { href: string; label: string; icon: IconName; exact: boolean }[] = [
  { href: "/admin", label: "Dashboard", icon: "grid", exact: true },
  { href: "/admin/hero", label: "Hero Video", icon: "play", exact: false },
  { href: "/admin/fabrics", label: "Fabrics", icon: "layers", exact: false },
  { href: "/admin/threads", label: "Threads", icon: "spool", exact: false },
  { href: "/admin/blogs", label: "Journal", icon: "book", exact: false },
  { href: "/admin/feedback", label: "Feedback", icon: "chat", exact: false },
];

/**
 * Pinterest-style rail: white, borderless, with pill nav items that fill grey
 * on hover and go solid black when active.
 */
export default function AdminSidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();

  async function signOut() {
    await getSupabaseBrowserClient().auth.signOut();
    window.location.assign("/admin/login");
  }

  return (
    <aside className="sticky top-0 flex h-svh w-64 shrink-0 flex-col bg-white px-3 py-5">
      <Link
        href="/admin"
        className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-neutral-100"
      >
        <Image
          src="/images/brand/logo-ink.png"
          alt="Fanaar"
          width={1131}
          height={823}
          className="h-7 w-auto"
        />
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
          Admin
        </span>
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1.5">
        {NAV_LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3.5 rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Icon name={link.icon} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl bg-neutral-50 p-3">
        <p className="truncate px-1 text-xs font-medium text-neutral-500" title={adminEmail}>
          {adminEmail}
        </p>
        <div className="mt-2 flex items-center gap-1">
          <Link
            href="/"
            className="flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-200/70"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex-1 rounded-full px-3 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-200/70"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
