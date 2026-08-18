import Link from "next/link";
import { Icon, type IconName } from "@/components/admin/icons";
import { describeResolution, formatBytes } from "@/lib/constants";
import { listAllPosts } from "@/lib/db/blogs";
import { listAllFabrics } from "@/lib/db/fabrics";
import { countNewFeedback } from "@/lib/db/feedback";
import { getStorage } from "@/lib/storage";

export const dynamic = "force-dynamic";

/** Counts never break the dashboard — a missing table just reads as zero. */
async function safeCount(load: () => Promise<{ length: number }>) {
  try {
    return (await load()).length;
  } catch {
    return 0;
  }
}

export default async function AdminDashboardPage() {
  const [heroVideo, fabricCount, postCount, unread] = await Promise.all([
    getStorage().getHeroVideo().catch(() => null),
    safeCount(listAllFabrics),
    safeCount(listAllPosts),
    countNewFeedback().catch(() => 0),
  ]);

  const tiles: {
    href: string;
    icon: IconName;
    label: string;
    value: string;
    hint: string;
  }[] = [
    {
      href: "/admin/hero",
      icon: "play",
      label: "Hero video",
      value: heroVideo ? "Live" : "Not set",
      hint: heroVideo
        ? [
            describeResolution(heroVideo.width, heroVideo.height),
            formatBytes(heroVideo.size),
          ]
            .filter(Boolean)
            .join(" · ")
        : "Upload the homepage film",
    },
    {
      href: "/admin/fabrics",
      icon: "layers",
      label: "Fabrics",
      value: String(fabricCount),
      hint: fabricCount ? "in the catalogue" : "import the starter set",
    },
    {
      href: "/admin/blogs",
      icon: "book",
      label: "Journal",
      value: String(postCount),
      hint: postCount ? "articles" : "import starter articles",
    },
    {
      href: "/admin/feedback",
      icon: "chat",
      label: "Feedback",
      value: String(unread),
      hint: unread ? "unread messages" : "inbox is clear",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
      <p className="mt-1.5 text-sm text-neutral-500">Everything on the Fanaar storefront.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            prefetch
            className="group rounded-3xl bg-neutral-50 p-6 transition-colors duration-200 hover:bg-neutral-100"
          >
            <div className="flex items-center gap-3 text-neutral-500">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm">
                <Icon name={tile.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-semibold text-neutral-700">{tile.label}</span>
            </div>

            <p className="mt-5 text-3xl font-bold tracking-tight text-neutral-900">
              {tile.value}
            </p>
            <p className="mt-1 text-sm text-neutral-500">{tile.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
