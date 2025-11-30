-- Fix security definer issue on soundscape_analytics view
-- This recreates the view with SECURITY INVOKER to run with querying user's permissions

-- Drop the existing view
drop view if exists public.soundscape_analytics;

-- Recreate with SECURITY INVOKER (safer option)
create or replace view public.soundscape_analytics
with (security_invoker = true)
as
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

-- Add comment explaining the security model
comment on view public.soundscape_analytics is 
  'Analytics view using SECURITY INVOKER - runs with querying user permissions and respects RLS policies';

