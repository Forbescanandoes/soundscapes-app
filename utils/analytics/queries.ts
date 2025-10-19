/**
 * Helper functions to query soundscape analytics
 * Use these in your admin dashboard or analytics pages
 */

import { createClient } from '@/utils/supabase/client'

export async function getTopSoundscapes(limit = 10) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('soundscape_analytics')
    .select('*')
    .order('total_plays', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Failed to get top soundscapes:', error)
    return []
  }

  return data || []
}

export async function getSoundscapeStats(soundscapeId: string) {
  const supabase = createClient()
  
  // Get total plays
  const { count: playCount } = await supabase
    .from('soundscape_plays')
    .select('*', { count: 'exact', head: true })
    .eq('soundscape_id', soundscapeId)

  // Get sessions with duration
  const { data: sessions } = await supabase
    .from('soundscape_sessions')
    .select('duration_seconds')
    .eq('soundscape_id', soundscapeId)
    .not('duration_seconds', 'is', null)

  const avgDuration = sessions && sessions.length > 0
    ? sessions.reduce((sum: number, s: { duration_seconds: number | null }) => sum + (s.duration_seconds || 0), 0) / sessions.length
    : 0

  return {
    totalPlays: playCount || 0,
    totalSessions: sessions?.length || 0,
    averageDurationSeconds: Math.floor(avgDuration),
    averageDurationMinutes: Math.floor(avgDuration / 60),
  }
}

export async function getRecentPlays(limit = 50) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('soundscape_plays')
    .select('*')
    .order('played_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Failed to get recent plays:', error)
    return []
  }

  return data || []
}

export async function getCategoryStats() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('soundscape_plays')
    .select('category')

  if (error) {
    console.error('Failed to get category stats:', error)
    return {}
  }

  // Count by category
  const categoryCount: Record<string, number> = {}
  data?.forEach((play: { category: string }) => {
    categoryCount[play.category] = (categoryCount[play.category] || 0) + 1
  })

  return categoryCount
}

export async function getActiveSessions() {
  const supabase = createClient()
  
  // Sessions that haven't ended yet
  const { data, error } = await supabase
    .from('soundscape_sessions')
    .select('*')
    .is('ended_at', null)
    .order('started_at', { ascending: false })

  if (error) {
    console.error('Failed to get active sessions:', error)
    return []
  }

  return data || []
}

/**
 * Get comprehensive analytics summary
 */
export async function getAnalyticsSummary() {
  const supabase = createClient()

  // Total plays
  const { count: totalPlays } = await supabase
    .from('soundscape_plays')
    .select('*', { count: 'exact', head: true })

  // Total sessions
  const { count: totalSessions } = await supabase
    .from('soundscape_sessions')
    .select('*', { count: 'exact', head: true })

  // Unique users (approximate - counts unique user_id values including null as one)
  const { data: uniqueUserData } = await supabase
    .from('soundscape_plays')
    .select('user_id')

  const uniqueUsers = new Set(uniqueUserData?.map((d: { user_id: string | null }) => d.user_id || 'anonymous')).size

  // Top soundscapes
  const topSoundscapes = await getTopSoundscapes(5)

  // Category breakdown
  const categoryStats = await getCategoryStats()

  return {
    totalPlays: totalPlays || 0,
    totalSessions: totalSessions || 0,
    uniqueUsers,
    topSoundscapes,
    categoryStats,
  }
}

