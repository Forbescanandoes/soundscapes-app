import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  // Create Supabase client directly with env vars
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex items-center justify-center p-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl mb-4">Supabase not configured</h1>
          <p className="text-brand-text-secondary mb-4">Missing environment variables</p>
        </div>
      </div>
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Get play counts
  const { data: plays, error: playsError } = await supabase
    .from('soundscape_plays')
    .select('soundscape_name, category, user_id')

  // Get session durations
  const { data: sessions, error: sessionsError } = await supabase
    .from('soundscape_sessions')
    .select('soundscape_name, duration_seconds, user_id')
    .not('duration_seconds', 'is', null)

  if (playsError || sessionsError) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex items-center justify-center p-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl mb-4">Database tables not set up</h1>
          <p className="text-brand-text-secondary">Check /admin for setup instructions</p>
        </div>
      </div>
    )
  }

  // Aggregate song stats
  const songStats: Record<string, { name: string; plays: number; totalMinutes: number }> = {}

  plays?.forEach((play: { soundscape_name: string; category: string; user_id: string | null }) => {
    if (!songStats[play.soundscape_name]) {
      songStats[play.soundscape_name] = { name: play.soundscape_name, plays: 0, totalMinutes: 0 }
    }
    songStats[play.soundscape_name].plays++
  })

  sessions?.forEach((session: { soundscape_name: string; duration_seconds: number; user_id: string | null }) => {
    if (!songStats[session.soundscape_name]) {
      songStats[session.soundscape_name] = { name: session.soundscape_name, plays: 0, totalMinutes: 0 }
    }
    songStats[session.soundscape_name].totalMinutes += Math.round(session.duration_seconds / 60)
  })

  const sortedSongStats = Object.values(songStats).sort((a, b) => b.plays - a.plays)

  // Aggregate user stats
  const userStats: Record<string, { 
    userId: string; 
    plays: number; 
    totalMinutes: number; 
    favoriteSong: string;
    songCounts: Record<string, number>;
  }> = {}

  plays?.forEach((play: { soundscape_name: string; user_id: string | null }) => {
    const userId = play.user_id || 'anonymous'
    if (!userStats[userId]) {
      userStats[userId] = { 
        userId, 
        plays: 0, 
        totalMinutes: 0, 
        favoriteSong: '', 
        songCounts: {} 
      }
    }
    userStats[userId].plays++
    userStats[userId].songCounts[play.soundscape_name] = (userStats[userId].songCounts[play.soundscape_name] || 0) + 1
  })

  sessions?.forEach((session: { soundscape_name: string; duration_seconds: number; user_id: string | null }) => {
    const userId = session.user_id || 'anonymous'
    if (!userStats[userId]) {
      userStats[userId] = { 
        userId, 
        plays: 0, 
        totalMinutes: 0, 
        favoriteSong: '', 
        songCounts: {} 
      }
    }
    userStats[userId].totalMinutes += Math.round(session.duration_seconds / 60)
  })

  // Calculate favorite song for each user
  Object.values(userStats).forEach(user => {
    const sortedSongs = Object.entries(user.songCounts).sort((a, b) => b[1] - a[1])
    user.favoriteSong = sortedSongs[0]?.[0] || 'none'
  })

  const sortedUserStats = Object.values(userStats).sort((a, b) => b.plays - a.plays)

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light lowercase">admin dashboard</h1>
          <Link 
            href="/soundscapes"
            className="text-sm text-brand-text-secondary hover:text-brand-accent transition-colors lowercase"
          >
            back to app
          </Link>
        </div>

        {/* Song Stats Table */}
        <div className="mb-12">
          <h2 className="text-xl font-light lowercase mb-4 text-brand-text-secondary">songs</h2>
          <div className="border border-brand-text-muted/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-brand-bg-secondary border-b border-brand-text-muted/20">
                <tr>
                  <th className="text-left p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    song
                  </th>
                  <th className="text-right p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    plays
                  </th>
                  <th className="text-right p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    total minutes
                  </th>
                  <th className="text-right p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    avg minutes/play
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedSongStats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-brand-text-muted lowercase">
                      no data yet
                    </td>
                  </tr>
                ) : (
                  sortedSongStats.map((stat) => (
                    <tr 
                      key={stat.name}
                      className="border-b border-brand-text-muted/10 hover:bg-brand-bg-secondary/50 transition-colors"
                    >
                      <td className="p-4 lowercase font-light">{stat.name}</td>
                      <td className="p-4 text-right">{stat.plays}</td>
                      <td className="p-4 text-right">{stat.totalMinutes}</td>
                      <td className="p-4 text-right text-brand-text-secondary">
                        {stat.plays > 0 ? Math.round(stat.totalMinutes / stat.plays) : 0}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Stats Table */}
        <div>
          <h2 className="text-xl font-light lowercase mb-4 text-brand-text-secondary">users</h2>
          <div className="border border-brand-text-muted/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-brand-bg-secondary border-b border-brand-text-muted/20">
                <tr>
                  <th className="text-left p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    user id
                  </th>
                  <th className="text-right p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    plays
                  </th>
                  <th className="text-right p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    total minutes
                  </th>
                  <th className="text-left p-4 text-sm font-normal lowercase text-brand-text-secondary">
                    favorite song
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUserStats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-brand-text-muted lowercase">
                      no users yet
                    </td>
                  </tr>
                ) : (
                  sortedUserStats.map((user) => (
                    <tr 
                      key={user.userId}
                      className="border-b border-brand-text-muted/10 hover:bg-brand-bg-secondary/50 transition-colors"
                    >
                      <td className="p-4 font-mono text-xs text-brand-text-secondary">
                        {user.userId === 'anonymous' ? (
                          <span className="lowercase italic">anonymous</span>
                        ) : (
                          user.userId.substring(0, 8) + '...'
                        )}
                      </td>
                      <td className="p-4 text-right">{user.plays}</td>
                      <td className="p-4 text-right">{user.totalMinutes}</td>
                      <td className="p-4 lowercase font-light">{user.favoriteSong}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        {sortedSongStats.length > 0 && (
          <div className="mt-8 flex gap-8 text-sm flex-wrap">
            <div>
              <span className="text-brand-text-muted lowercase">total plays: </span>
              <span className="text-brand-text-primary">
                {sortedSongStats.reduce((sum, s) => sum + s.plays, 0)}
              </span>
            </div>
            <div>
              <span className="text-brand-text-muted lowercase">total minutes: </span>
              <span className="text-brand-text-primary">
                {sortedSongStats.reduce((sum, s) => sum + s.totalMinutes, 0)}
              </span>
            </div>
            <div>
              <span className="text-brand-text-muted lowercase">tracks played: </span>
              <span className="text-brand-text-primary">{sortedSongStats.length}</span>
            </div>
            <div>
              <span className="text-brand-text-muted lowercase">total users: </span>
              <span className="text-brand-text-primary">{sortedUserStats.length}</span>
            </div>
            <div>
              <span className="text-brand-text-muted lowercase">signed-in users: </span>
              <span className="text-brand-text-primary">
                {sortedUserStats.filter(u => u.userId !== 'anonymous').length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
