-- Create soundscape analytics tables

-- Table to track each time a soundscape is played
create table public.soundscape_plays (
  id uuid default gen_random_uuid() primary key,
  user_id text, -- can be null for anonymous users
  soundscape_id text not null,
  soundscape_name text not null,
  category text not null,
  played_at timestamp with time zone default timezone('utc'::text, now()) not null,
  session_id uuid, -- links to soundscape_sessions for duration tracking
  
  -- indexes for fast queries
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table to track listening sessions and duration
create table public.soundscape_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id text, -- can be null for anonymous users
  soundscape_id text not null,
  soundscape_name text not null,
  category text not null,
  
  -- timestamps
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  
  -- duration in seconds (calculated when session ends)
  duration_seconds integer,
  
  -- metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index soundscape_plays_soundscape_id_idx on public.soundscape_plays(soundscape_id);
create index soundscape_plays_played_at_idx on public.soundscape_plays(played_at desc);
create index soundscape_plays_user_id_idx on public.soundscape_plays(user_id);
create index soundscape_plays_category_idx on public.soundscape_plays(category);

create index soundscape_sessions_soundscape_id_idx on public.soundscape_sessions(soundscape_id);
create index soundscape_sessions_user_id_idx on public.soundscape_sessions(user_id);
create index soundscape_sessions_started_at_idx on public.soundscape_sessions(started_at desc);
create index soundscape_sessions_duration_idx on public.soundscape_sessions(duration_seconds desc nulls last);

-- Enable RLS (Row Level Security)
alter table public.soundscape_plays enable row level security;
alter table public.soundscape_sessions enable row level security;

-- Policies: Allow anyone to insert (for MVP with anonymous tracking)
create policy "Allow public insert on soundscape_plays"
  on public.soundscape_plays
  for insert
  to public
  with check (true);

create policy "Allow public insert on soundscape_sessions"
  on public.soundscape_sessions
  for insert
  to public
  with check (true);

-- Allow users to update their own sessions (for ending them)
create policy "Allow public update on soundscape_sessions"
  on public.soundscape_sessions
  for update
  to public
  using (true)
  with check (true);

-- Allow reading analytics (you can restrict this later)
create policy "Allow public read on soundscape_plays"
  on public.soundscape_plays
  for select
  to public
  using (true);

create policy "Allow public read on soundscape_sessions"
  on public.soundscape_sessions
  for select
  to public
  using (true);

-- Create a view for easy analytics queries
create or replace view public.soundscape_analytics as
select 
  soundscape_id,
  soundscape_name,
  category,
  count(*) as total_plays,
  count(distinct user_id) as unique_users,
  count(distinct date_trunc('day', played_at)) as days_played
from public.soundscape_plays
group by soundscape_id, soundscape_name, category;

-- Grant access to the view
grant select on public.soundscape_analytics to public;

