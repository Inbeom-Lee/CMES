-- Results table for saved CMES assessment results
create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  primary_type text not null check (primary_type in ('C', 'M', 'E', 'S')),
  scores jsonb not null default '{"C":0,"M":0,"E":0,"S":0}',
  created_at timestamptz not null default now()
);

-- RLS: users can only see and insert their own rows
alter table public.results enable row level security;

create policy "Users can read own results"
  on public.results for select
  using (auth.uid() = user_id);

create policy "Users can insert own results"
  on public.results for insert
  with check (auth.uid() = user_id);

-- Optional: index for listing by user and date
create index if not exists results_user_id_created_at_idx
  on public.results (user_id, created_at desc);
