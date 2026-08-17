import Link from "next/link";
import { notFound } from "next/navigation";
import { getFabricRow } from "@/lib/db/fabrics";
import { saveFabric } from "../actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-clay focus:ring-2 focus:ring-clay/20";
const label = "block text-xs font-medium text-stone-600";

export default async function FabricEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const fabric = isNew ? null : await getFabricRow(id);
  if (!isNew && !fabric) notFound();

  const specs = fabric?.specs ?? {};

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/fabrics" className="text-xs text-stone-500 hover:text-clay">
        ← Fabrics
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">{isNew ? "New fabric" : "Edit fabric"}</h1>

      <form action={saveFabric} className="mt-8 space-y-5">
        {fabric ? <input type="hidden" name="id" value={fabric.id} /> : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>
              Name
            </label>
            <input id="name" name="name" required defaultValue={fabric?.name ?? ""} className={`mt-1.5 ${field}`} />
          </div>
          <div>
            <label htmlFor="slug" className={label}>
              Slug <span className="text-stone-400">(auto if blank)</span>
            </label>
            <input id="slug" name="slug" defaultValue={fabric?.slug ?? ""} className={`mt-1.5 ${field}`} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="family" className={label}>
              Family
            </label>
            <select id="family" name="family" defaultValue={fabric?.family ?? "Knit"} className={`mt-1.5 ${field}`}>
              <option>Knit</option>
              <option>Woven</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className={label}>
              Category
            </label>
            <input
              id="category"
              name="category"
              placeholder="Single knit, Diagonal twill weave…"
              defaultValue={fabric?.category ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tagline" className={label}>
            Tagline
          </label>
          <input id="tagline" name="tagline" defaultValue={fabric?.tagline ?? ""} className={`mt-1.5 ${field}`} />
        </div>

        <div>
          <label htmlFor="intro" className={label}>
            Intro
          </label>
          <textarea id="intro" name="intro" rows={3} defaultValue={fabric?.intro ?? ""} className={`mt-1.5 ${field}`} />
        </div>

        <fieldset className="rounded-xl border border-stone-200 bg-white p-5">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
            Specification
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                ["composition", "Composition", "100% long-staple cotton"],
                ["construction", "Construction", "Single-jersey circular knit"],
                ["weight", "Weight (GSM)", "140–200 GSM"],
                ["dyeClass", "Dye class", "Reactive"],
                ["finish", "Finish", "Bio-polished, skin-safe"],
                ["width", "Width", "180 cm"],
              ] as const
            ).map(([key, text, placeholder]) => (
              <div key={key}>
                <label htmlFor={key} className={label}>
                  {text}
                </label>
                <input
                  id={key}
                  name={key}
                  placeholder={placeholder}
                  defaultValue={specs[key] ?? ""}
                  className={`mt-1.5 ${field}`}
                />
              </div>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="best_for_intro" className={label}>
            Best-used-for heading
          </label>
          <input
            id="best_for_intro"
            name="best_for_intro"
            defaultValue={fabric?.best_for_intro ?? ""}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label htmlFor="best_for" className={label}>
            Best used for <span className="text-stone-400">(one per line)</span>
          </label>
          <textarea
            id="best_for"
            name="best_for"
            rows={4}
            defaultValue={(fabric?.best_for ?? []).join("\n")}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div>
          <label htmlFor="root" className={label}>
            The root <span className="text-stone-400">(one paragraph per line)</span>
          </label>
          <textarea
            id="root"
            name="root"
            rows={6}
            defaultValue={(fabric?.root ?? []).join("\n")}
            className={`mt-1.5 ${field}`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="image" className={label}>
              Image path
            </label>
            <input
              id="image"
              name="image"
              placeholder="/images/fabrics/jersey.jpg"
              defaultValue={fabric?.image ?? ""}
              className={`mt-1.5 ${field}`}
            />
          </div>
          <div>
            <label htmlFor="alt" className={label}>
              Image alt text
            </label>
            <input id="alt" name="alt" defaultValue={fabric?.alt ?? ""} className={`mt-1.5 ${field}`} />
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 rounded-lg border border-stone-200 bg-white px-4 py-3">
          <div>
            <label htmlFor="sort_order" className={label}>
              Sort order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={fabric?.sort_order ?? 0}
              className="mt-1.5 w-24 rounded-lg border border-stone-300 px-3 py-1.5 text-sm outline-none focus:border-clay"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              name="published"
              defaultChecked={fabric?.published ?? true}
              className="h-4 w-4 accent-clay"
            />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep">
            Save fabric
          </button>
          <Link
            href="/admin/fabrics"
            className="rounded-full border border-stone-300 px-6 py-2.5 text-sm text-stone-600 transition-colors hover:border-stone-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
