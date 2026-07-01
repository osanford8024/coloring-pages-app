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


create table if not exists public.generation_jobs (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  prompt text not null,
  status text not null default 'paid' check (status in ('paid', 'generating', 'complete', 'failed')),
  image_id uuid references public.images(id) on delete set null,
  image_url text,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists generation_jobs_stripe_session_id_idx
  on public.generation_jobs (stripe_session_id);

create index if not exists generation_jobs_status_idx
  on public.generation_jobs (status);

alter table public.generation_jobs enable row level security;

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


