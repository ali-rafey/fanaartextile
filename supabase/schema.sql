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
