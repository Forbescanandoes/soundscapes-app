import { createClient } from '@/utils/supabase/client'

let currentSessionId: string | null = null

export async function trackPlay(songId: string, songName: string, category: string, userId?: string) {
  const supabase = createClient()
  if (!supabase) return

  try {
    await supabase.from('soundscape_plays').insert({
      user_id: userId || null,
      soundscape_id: songId,
      soundscape_name: songName,
      category: category,
    })
  } catch (error) {
    console.error('Analytics tracking failed:', error)
  }
}

export async function startSession(songId: string, songName: string, category: string, userId?: string) {
  const supabase = createClient()
  if (!supabase) return

  try {
    const { data } = await supabase
      .from('soundscape_sessions')
      .insert({
        user_id: userId || null,
        soundscape_id: songId,
        soundscape_name: songName,
        category: category,
      })
      .select('id')
      .single()

    if (data) {
      currentSessionId = data.id
    }
  } catch (error) {
    console.error('Session start failed:', error)
  }
}

export async function endSession() {
  const supabase = createClient()
  if (!supabase || !currentSessionId) return

  try {
    // Get the session to calculate duration
    const { data: session } = await supabase
      .from('soundscape_sessions')
      .select('started_at')
      .eq('id', currentSessionId)
      .single()

    if (session) {
      const startTime = new Date(session.started_at).getTime()
      const endTime = Date.now()
      const durationSeconds = Math.round((endTime - startTime) / 1000)

      await supabase
        .from('soundscape_sessions')
        .update({
          ended_at: new Date().toISOString(),
          duration_seconds: durationSeconds,
        })
        .eq('id', currentSessionId)
    }

    currentSessionId = null
  } catch (error) {
    console.error('Session end failed:', error)
  }
}

