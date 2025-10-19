import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = createClient()
  
  if (!supabase) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text-primary flex items-center justify-center p-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl mb-4">Supabase not configured</h1>
          <p className="text-brand-text-secondary">Add your Supabase credentials to .env.local</p>
        </div>
      </div>
    )
  }

  // Get play counts
  const { data: plays } = await supabase
    .from('soundscape_plays')
    .select('soundscape_name, category')

  // Get session durations
  const { data: sessions } = await supabase
    .from('soundscape_sessions')
    .select('soundscape_name, duration_seconds')
    .not('duration_seconds', 'is', null)

  // Aggregate data
  const stats: Record<string, { name: string; plays: number; totalMinutes: number }> = {}

  // Count plays
  plays?.forEach((play: { soundscape_name: string; category: string }) => {
    if (!stats[play.soundscape_name]) {
      stats[play.soundscape_name] = { name: play.soundscape_name, plays: 0, totalMinutes: 0 }
    }
    stats[play.soundscape_name].plays++
  })

  // Sum durations
  sessions?.forEach((session: { soundscape_name: string; duration_seconds: number }) => {
    if (!stats[session.soundscape_name]) {
      stats[session.soundscape_name] = { name: session.soundscape_name, plays: 0, totalMinutes: 0 }
    }
    stats[session.soundscape_name].totalMinutes += Math.round(session.duration_seconds / 60)
  })

  // Convert to array and sort by plays
  const sortedStats = Object.values(stats).sort((a, b) => b.plays - a.plays)

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary p-6">
      <div className="max-w-4xl mx-auto">
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

        {/* Stats Table */}
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
              {sortedStats.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-brand-text-muted lowercase">
                    no data yet - waiting for users to play songs
                  </td>
                </tr>
              ) : (
                sortedStats.map((stat) => (
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

        {/* Summary */}
        {sortedStats.length > 0 && (
          <div className="mt-6 flex gap-8 text-sm">
            <div>
              <span className="text-brand-text-muted lowercase">total plays: </span>
              <span className="text-brand-text-primary">
                {sortedStats.reduce((sum, s) => sum + s.plays, 0)}
              </span>
            </div>
            <div>
              <span className="text-brand-text-muted lowercase">total minutes: </span>
              <span className="text-brand-text-primary">
                {sortedStats.reduce((sum, s) => sum + s.totalMinutes, 0)}
              </span>
            </div>
            <div>
              <span className="text-brand-text-muted lowercase">tracks played: </span>
              <span className="text-brand-text-primary">{sortedStats.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

