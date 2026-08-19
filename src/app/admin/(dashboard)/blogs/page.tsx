import { listAllPosts, type BlogRow } from "@/lib/db/blogs";
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
import { removePost, seedPosts } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  let posts: BlogRow[] = [];
  let error: string | null = null;

  try {
    posts = await listAllPosts();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load posts.";
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeading
        title="Journal"
        subtitle={`${posts.length || "No"} ${posts.length === 1 ? "article" : "articles"}`}
        action={<AddButton href="/admin/blogs/new">New post</AddButton>}
      />

      {error ? (
        <ErrorState message={error} />
      ) : posts.length === 0 ? (
        <EmptyState
          message="No posts yet — the site is showing its built-in starter articles."
          action={
            <form action={seedPosts}>
              <button className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700">
                Import starter articles
              </button>
            </form>
          }
        />
      ) : (
        <ListShell>
          <ListHeader columns={["Article", "Category", "Status"]} />
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 border-b border-neutral-100 px-4 py-2.5 last:border-b-0 hover:bg-neutral-50"
            >
              <Thumb src={post.image} alt={post.alt || post.title} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">{post.title}</p>
                <p className="truncate text-xs text-neutral-400">/{post.slug}</p>
              </div>

              <div className="hidden w-40 shrink-0 sm:block">
                <p className="truncate text-xs text-neutral-600">{post.category || "—"}</p>
                <p className="truncate text-xs text-neutral-400">{post.published_on || "—"}</p>
              </div>

              <div className="hidden w-24 shrink-0 sm:block">
                <StatusPill published={post.published} />
              </div>

              <RowActions
                editHref={`/admin/blogs/${post.id}`}
                onDelete={removePost.bind(null, post.id)}
                label={post.title}
              />
            </div>
          ))}
        </ListShell>
      )}
    </div>
  );
}
