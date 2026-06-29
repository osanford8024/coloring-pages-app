create extension if not exists pgcrypto;

create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  prompt text not null,
  image_url text not null,
  category text not null default 'Uncategorized',
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists images_created_at_idx
  on public.images (created_at desc);

create index if not exists images_category_idx
  on public.images (category);

alter table public.images enable row level security;

drop policy if exists "Anyone can read generated images" on public.images;

create policy "Anyone can read generated images"
  on public.images
  for select
  to anon, authenticated
  using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'coloring-pages',
  'coloring-pages',
  true,
  10485760,
  array['image/png']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can read coloring page files" on storage.objects;

create policy "Anyone can read coloring page files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'coloring-pages');
