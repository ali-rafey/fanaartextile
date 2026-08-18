import Image from "next/image";
import Link from "next/link";
import { listAllFabrics, type FabricRow } from "@/lib/db/fabrics";
import { removeFabric, seedFabrics } from "./actions";

export const dynamic = "force-dynamic";

/** Image-forward card grid — the catalogue reads like a board, not a table. */
export default async function AdminFabricsPage() {
  let fabrics: FabricRow[] = [];
  let error: string | null = null;

  try {
    fabrics = await listAllFabrics();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load fabrics.";
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Fabrics</h1>
          <p className="mt-1.5 text-sm text-neutral-500">
            Products and categories behind /fabrics.
          </p>
        </div>
        <Link
          href="/admin/fabrics/new"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          New fabric
        </Link>
      </div>

      {error ? (
        <div className="mt-8 rounded-3xl bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-semibold">Could not load fabrics.</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2">
            Run the v2 section of{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code> in
            the Supabase SQL editor.
          </p>
        </div>
      ) : fabrics.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-neutral-50 p-12 text-center">
          <p className="text-sm text-neutral-500">
            No fabrics yet — the site is showing its built-in catalogue.
          </p>
          <form action={seedFabrics} className="mt-5">
            <button className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
              Import built-in catalogue
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fabrics.map((fabric) => (
            <div key={fabric.id} className="group">
              <Link
                href={`/admin/fabrics/${fabric.id}`}
                prefetch
                className="block overflow-hidden rounded-3xl bg-neutral-100"
              >
                <div className="relative aspect-[4/5]">
                  {fabric.image ? (
                    <Image
                      src={fabric.image}
                      alt={fabric.alt || fabric.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}

                  {!fabric.published && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-neutral-700 shadow-sm">
                      Draft
                    </span>
                  )}

                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/55 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Edit fabric
                  </span>
                </div>
              </Link>

              <div className="mt-3 flex items-start justify-between gap-3 px-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-neutral-900">{fabric.name}</p>
                  <p className="mt-0.5 truncate text-xs text-neutral-500">
                    {fabric.family}
                    {fabric.specs?.weight ? ` · ${fabric.specs.weight}` : ""}
                  </p>
                </div>
                <form action={removeFabric.bind(null, fabric.id)}>
                  <button
                    aria-label={`Delete ${fabric.name}`}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
