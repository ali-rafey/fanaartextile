/**
 * Editorial form styling shared by the contact and feedback forms: hairline
 * underlines rather than boxed inputs, mono labels, and a rule that darkens on
 * focus. Keeps the forms in the same visual language as the rest of the site.
 *
 * The underline is the control's only boundary, so it is held at 3:1 against
 * ivory — the minimum WCAG asks of a UI component — rather than the near
 * invisible hairline used for decorative rules elsewhere.
 */
export const fieldClass =
  "w-full border-b border-ink/50 bg-transparent px-0 py-3 text-ink outline-none transition-colors duration-300 ease-lux placeholder:text-ink/50 focus:border-ink";

export const labelClass =
  "block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/60";

export function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

/** Full-width submit rule — reads as a line of type, not a chunky button. */
export function SubmitBar({
  pending,
  idle,
  busy,
}: {
  pending: boolean;
  idle: string;
  busy: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-10 flex w-full items-center justify-between border-t border-ink/50 pt-5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 ease-lux hover:text-clay disabled:opacity-40"
    >
      {pending ? busy : idle}
      <span
        aria-hidden
        className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
      >
        →
      </span>
    </button>
  );
}
