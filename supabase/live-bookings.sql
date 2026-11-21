-- Живая запись на выступление.
-- Supabase → SQL Editor → вставить целиком → Run.
-- Файл можно запускать повторно.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_slug text not null,
  name text not null,
  created_at timestamptz not null default now(),
  constraint bookings_name_length check (char_length(btrim(name)) between 1 and 40)
);

create index if not exists bookings_tour_created_idx
  on public.bookings (tour_slug, created_at);

alter table public.bookings replica identity full;
alter table public.bookings enable row level security;

grant select, insert on table public.bookings to anon, authenticated;

drop policy if exists "demo read bookings" on public.bookings;
create policy "demo read bookings"
  on public.bookings
  for select
  to anon, authenticated
  using (true);

drop policy if exists "demo insert bookings" on public.bookings;
create policy "demo insert bookings"
  on public.bookings
  for insert
  to anon, authenticated
  with check (
    tour_slug = 'final'
    and char_length(btrim(name)) between 1 and 40
  );

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'bookings'
  ) then
    alter publication supabase_realtime add table public.bookings;
  end if;
end $$;

-- Перед выступлением очистить зал:
-- delete from public.bookings where tour_slug = 'final';
