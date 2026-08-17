import Link from "next/link";
import { listAllFabrics, type FabricRow } from "@/lib/db/fabrics";
import { removeFabric, seedFabrics } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminFabricsPage() {
  let fabrics: FabricRow[] = [];
  let error: string | null = null;

  try {
    fabrics = await listAllFabrics();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load fabrics.";
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Fabrics</h1>
          <p className="mt-1 text-sm text-stone-500">
            Products &amp; categories behind /fabrics and each detail page.
          </p>
        </div>
        <Link
          href="/admin/fabrics/new"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep"
        >
          New fabric
        </Link>
      </div>

      {error ? (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-medium">Could not load fabrics.</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-amber-700">
            Run the v2 section of{" "}
            <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code> in the
            Supabase SQL editor to create the tables.
          </p>
        </div>
      ) : fabrics.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
          <p className="text-sm text-stone-500">
            No fabrics in the database yet — the site is showing its built-in catalogue.
          </p>
          <form action={seedFabrics} className="mt-5">
            <button className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay">
              Import built-in catalogue
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Family</th>
                <th className="px-5 py-3">Weight</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {fabrics.map((fabric) => (
                <tr key={fabric.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/fabrics/${fabric.id}`}
                      className="font-medium text-ink hover:text-clay"
                    >
                      {fabric.name}
                    </Link>
                    <p className="text-xs text-stone-400">/fabrics/{fabric.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{fabric.family}</td>
                  <td className="px-5 py-3 text-stone-600">{fabric.specs?.weight || "—"}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        fabric.published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-stone-200 text-stone-600"
                      }`}
                    >
                      {fabric.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <form action={removeFabric.bind(null, fabric.id)}>
                      <button className="text-xs text-red-600 hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
