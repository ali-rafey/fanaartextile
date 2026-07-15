import Link from "next/link";
import { formatBytes } from "@/lib/constants";
import { getStorage } from "@/lib/storage";

// Always reflect the latest uploaded content in the admin.
export const dynamic = "force-dynamic";

const PLANNED_MODULES = [
  { name: "Products & Categories", blurb: "Catalogue of lounge fabrics." },
  { name: "Blogs", blurb: "Stories and fabric guides." },
  { name: "Feedback", blurb: "Customer feedback inbox." },
];

export default async function AdminDashboardPage() {
  const heroVideo = await getStorage().getHeroVideo();

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-stone-500">
        Manage the Fanaar storefront content.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/hero"
          className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Hero video</h2>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                heroVideo
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {heroVideo ? "Live" : "Not set"}
            </span>
          </div>
          <p className="mt-2 truncate text-sm text-stone-500">
            {heroVideo
              ? `${heroVideo.originalName} · ${formatBytes(heroVideo.size)}`
              : "Upload the full-screen video for the homepage."}
          </p>
          <p className="mt-4 text-sm font-medium text-clay group-hover:text-clay-deep">
            Manage →
          </p>
        </Link>

        {PLANNED_MODULES.map((module) => (
          <div
            key={module.name}
            className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-stone-400">{module.name}</h2>
              <span className="rounded-full border border-stone-300 px-2.5 py-0.5 text-xs text-stone-400">
                Planned
              </span>
            </div>
            <p className="mt-2 text-sm text-stone-400">{module.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
