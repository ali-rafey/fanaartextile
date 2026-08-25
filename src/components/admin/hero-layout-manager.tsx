"use client";

import { useState } from "react";
import ImageField from "@/components/admin/image-field";
import type { HeroLayout } from "@/lib/storage/types";
import { saveHeroLayout } from "@/app/admin/(dashboard)/hero/actions";

/**
 * Which hero the homepage renders.
 *
 * Two scenes, one chosen: the full-bleed film, or the editorial spread. The
 * spread's left-hand plate is uploaded here too and takes a still or a clip —
 * everything else about the spread is fixed, because it is a layout rather
 * than a page builder.
 */
export default function HeroLayoutManager({ layout }: { layout: HeroLayout }) {
  const [mode, setMode] = useState<HeroLayout["mode"]>(layout.mode);
  const [plateUrl, setPlateUrl] = useState(layout.plate?.url ?? "");

  const option = (value: HeroLayout["mode"], title: string, blurb: string) => (
    <label
      className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
        mode === value
          ? "border-neutral-900 bg-neutral-50"
          : "border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      <input
        type="radio"
        name="mode"
        value={value}
        checked={mode === value}
        onChange={() => setMode(value)}
        className="mt-0.5"
      />
      <span>
        <span className="block text-sm font-semibold text-neutral-900">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-neutral-500">{blurb}</span>
      </span>
    </label>
  );

  return (
    <form action={saveHeroLayout} className="mt-8 rounded-2xl border border-neutral-200 p-6">
      <h2 className="text-sm font-semibold text-neutral-900">Homepage hero</h2>
      <p className="mt-1 text-xs text-neutral-500">
        Pick the scene the homepage opens with.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {option(
          "spread",
          "Editorial spread",
          "A plate down the left — image or video, your choice — with the headline, detail shots and credits beside it."
        )}
        {option(
          "video",
          "Full-screen video",
          "The hero video uploaded below plays full-bleed, with the navbar over it."
        )}
      </div>

      {mode === "spread" ? (
        <div className="mt-6 border-t border-neutral-200 pt-6">
          <ImageField
            name="plateUrl"
            folder="hero"
            label="Plate — upload an image or a video"
            allowVideo
            defaultValue={layout.plate?.url ?? ""}
            onChange={setPlateUrl}
          />
          <div className="mt-4">
            <label htmlFor="plateAlt" className="block text-xs font-semibold text-neutral-600">
              Plate description
            </label>
            <input
              id="plateAlt"
              name="plateAlt"
              defaultValue={layout.plate?.alt ?? ""}
              placeholder="Running through a meadow in loose cloth"
              className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
            />
            <p className="mt-2 text-xs text-neutral-500">
              Describes the plate for screen readers. Leave the upload empty to use the
              image the site ships with. A video plate plays muted and on a loop, and
              is stored exactly as uploaded — never compressed or resized.
            </p>
          </div>
        </div>
      ) : (
        <input type="hidden" name="plateUrl" value={plateUrl} />
      )}

      <button className="mt-6 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
        Save hero
      </button>
    </form>
  );
}
