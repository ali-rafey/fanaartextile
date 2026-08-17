-- ─────────────────────────────────────────────────────────────────────────────
-- Fanaar — Supabase schema (v1: hero video)
-- Run this ONCE in the Supabase SQL editor after creating the project,
-- then set the keys in .env.local and STORAGE_DRIVER=supabase.
-- Later features (products, categories, blogs, feedback, auth) will extend
-- this file with their own migrations.
-- ─────────────────────────────────────────────────────────────────────────────

-- Key/value store for site-wide settings (hero video metadata lives here
-- under the key 'hero_video').
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Hero video metadata is public content — anyone may read it.
-- Writes go through the admin API using the service-role key, which
-- bypasses RLS, so no insert/update/delete policies are needed yet.
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings
  for select
  using (true);

-- Public bucket for site media (hero video now; more site assets later).
-- Objects are written by the admin API (service role); the public URL is
-- what the <video> tag streams from.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────────────────────
-- v2: content modules — fabrics, journal posts, feedback inbox
-- Run this in the Supabase SQL editor (safe to re-run).
-- ─────────────────────────────────────────────────────────────────────────────

-- Fabric catalogue (powers /fabrics and /fabrics/[slug]).
create table if not exists public.fabrics (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  family         text not null default 'Knit',
  category       text not null default '',
  tagline        text not null default '',
  intro          text not null default '',
  image          text,
  alt            text not null default '',
  specs          jsonb not null default '{}'::jsonb,
  best_for_intro text not null default '',
  best_for       jsonb not null default '[]'::jsonb,
  root           jsonb not null default '[]'::jsonb,
  featured_label text,
  sort_order     integer not null default 0,
  published      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Journal posts (powers /blogs and the homepage journal strip).
create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  category     text not null default '',
  excerpt      text not null default '',
  body         text not null default '',
  read_time    text not null default '',
  published_on text not null default '',
  image        text,
  alt          text not null default '',
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Customer feedback + contact messages.
create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  kind       text not null default 'feedback',   -- 'feedback' | 'contact'
  name       text not null,
  email      text not null,
  topic      text,
  subject    text,
  rating     integer,
  message    text not null,
  status     text not null default 'new',        -- 'new' | 'read' | 'archived'
  created_at timestamptz not null default now()
);

alter table public.fabrics     enable row level security;
alter table public.blog_posts  enable row level security;
alter table public.feedback    enable row level security;

-- Published content is public; writes go through the admin API (service role,
-- which bypasses RLS), so no write policies are needed here.
drop policy if exists "fabrics_public_read" on public.fabrics;
create policy "fabrics_public_read" on public.fabrics
  for select using (published = true);

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read" on public.blog_posts
  for select using (published = true);

-- Anyone may submit feedback; only the admin API may read it back.
drop policy if exists "feedback_public_insert" on public.feedback;
create policy "feedback_public_insert" on public.feedback
  for insert with check (true);

create index if not exists fabrics_sort_idx    on public.fabrics (sort_order, name);
create index if not exists blog_posts_sort_idx on public.blog_posts (sort_order, created_at desc);
create index if not exists feedback_recent_idx on public.feedback (created_at desc);
