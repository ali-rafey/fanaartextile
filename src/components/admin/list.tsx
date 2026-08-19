import Image from "next/image";
import Link from "next/link";

/** Shared chrome for the admin list views — compact rows, not big cards. */
export function ListShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {children}
    </div>
  );
}

export function ListHeader({ columns }: { columns: string[] }) {
  return (
    <div className="hidden items-center gap-4 border-b border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 sm:flex">
      <span className="w-10 shrink-0" />
      <span className="flex-1">{columns[0]}</span>
      <span className="w-40 shrink-0">{columns[1]}</span>
      <span className="w-24 shrink-0">{columns[2]}</span>
      <span className="w-28 shrink-0 text-right">Actions</span>
    </div>
  );
}

export function Thumb({ src, alt }: { src?: string | null; alt: string }) {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
      {src ? <Image src={src} alt={alt} fill sizes="40px" className="object-cover" /> : null}
    </div>
  );
}

export function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        published ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500"
      }`}
    >
      {published ? "Live" : "Draft"}
    </span>
  );
}

export function RowActions({
  editHref,
  onDelete,
  label,
}: {
  editHref: string;
  onDelete: (formData: FormData) => void | Promise<void>;
  label: string;
}) {
  return (
    <div className="flex w-28 shrink-0 items-center justify-end gap-1">
      <Link
        href={editHref}
        prefetch
        className="rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-100"
      >
        Edit
      </Link>
      <form action={onDelete}>
        <button
          aria-label={`Delete ${label}`}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export function PageHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{title}</h1>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export function AddButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
    >
      {children}
    </Link>
  );
}

export function EmptyState({
  message,
  action,
}: {
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
      <p className="text-sm text-neutral-500">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      <p className="font-semibold">Could not load this list.</p>
      <p className="mt-1">{message}</p>
      <p className="mt-2">
        Run the latest section of{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code> in the
        Supabase SQL editor.
      </p>
    </div>
  );
}
