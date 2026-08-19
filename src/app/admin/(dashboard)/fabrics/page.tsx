import { listAllFabrics, type FabricRow } from "@/lib/db/fabrics";
import {
  AddButton,
  EmptyState,
  ErrorState,
  ListHeader,
  ListShell,
  PageHeading,
  RowActions,
  StatusPill,
  Thumb,
} from "@/components/admin/list";
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
      <PageHeading
        title="Fabrics"
        subtitle={`${fabrics.length || "No"} ${fabrics.length === 1 ? "fabric" : "fabrics"} in the catalogue`}
        action={<AddButton href="/admin/fabrics/new">New fabric</AddButton>}
      />

      {error ? (
        <ErrorState message={error} />
      ) : fabrics.length === 0 ? (
        <EmptyState
          message="No fabrics yet — the site is showing its built-in catalogue."
          action={
            <form action={seedFabrics}>
              <button className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
                Import built-in catalogue
              </button>
            </form>
          }
        />
      ) : (
        <ListShell>
          <ListHeader columns={["Fabric", "Construction", "Status"]} />
          {fabrics.map((fabric) => (
            <div
              key={fabric.id}
              className="flex items-center gap-4 border-b border-neutral-100 px-4 py-2.5 last:border-b-0 hover:bg-neutral-50"
            >
              <Thumb src={fabric.image} alt={fabric.alt || fabric.name} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">{fabric.name}</p>
                <p className="truncate text-xs text-neutral-400">/fabrics/{fabric.slug}</p>
              </div>

              <div className="hidden w-40 shrink-0 sm:block">
                <p className="truncate text-xs text-neutral-600">{fabric.family}</p>
                <p className="truncate text-xs text-neutral-400">
                  {fabric.specs?.weight || "—"}
                </p>
              </div>

              <div className="hidden w-24 shrink-0 sm:block">
                <StatusPill published={fabric.published} />
              </div>

              <RowActions
                editHref={`/admin/fabrics/${fabric.id}`}
                onDelete={removeFabric.bind(null, fabric.id)}
                label={fabric.name}
              />
            </div>
          ))}
        </ListShell>
      )}
    </div>
  );
}
