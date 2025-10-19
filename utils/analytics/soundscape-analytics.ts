"use client"

import { createClient } from '@/utils/supabase/client'

export interface PlayEvent {
  soundscapeId: string
  soundscapeName: string
  category: string
  userId?: string
}

export interface Session {
  id: string
  soundscapeId: string
  soundscapeName: string
  category: string
  userId?: string
  startedAt: Date
}

class SoundscapeAnalytics {
  private supabase = createClient()
  private currentSession: Session | null = null
  private sessionStartTime: number | null = null

  /**
   * Track when a soundscape is played (clicked)
   */
  async trackPlay(event: PlayEvent): Promise<void> {
    if (!this.supabase) return // Skip if Supabase not configured
    
    try {
      const { error } = await this.supabase
        .from('soundscape_plays')
        .insert({
          soundscape_id: event.soundscapeId,
          soundscape_name: event.soundscapeName,
          category: event.category,
          user_id: event.userId || null,
          session_id: this.currentSession?.id || null,
        })

      if (error) {
        console.error('Failed to track play:', error)
      }
    } catch (err) {
      console.error('Error tracking play:', err)
    }
  }

  /**
   * Start a listening session
   */
  async startSession(event: PlayEvent): Promise<void> {
    if (!this.supabase) return // Skip if Supabase not configured
    
    try {
      // End any existing session first
      if (this.currentSession) {
        await this.endSession()
      }

      // Create new session
      const { data, error } = await this.supabase
        .from('soundscape_sessions')
        .insert({
          soundscape_id: event.soundscapeId,
          soundscape_name: event.soundscapeName,
          category: event.category,
          user_id: event.userId || null,
        })
        .select()
        .single()

      if (error) {
        console.error('Failed to start session:', error)
        return
      }

      if (data) {
        this.currentSession = {
          id: data.id,
          soundscapeId: event.soundscapeId,
          soundscapeName: event.soundscapeName,
          category: event.category,
          userId: event.userId,
          startedAt: new Date(data.started_at),
        }
        this.sessionStartTime = Date.now()
      }
    } catch (err) {
      console.error('Error starting session:', err)
    }
  }

  /**
   * End the current listening session
   */
  async endSession(): Promise<void> {
    if (!this.currentSession || !this.sessionStartTime) return
    if (!this.supabase) {
      // Just clear the session if no Supabase
      this.currentSession = null
      this.sessionStartTime = null
      return
    }

    try {
      const durationSeconds = Math.floor((Date.now() - this.sessionStartTime) / 1000)

      const { error } = await this.supabase
        .from('soundscape_sessions')
        .update({
          ended_at: new Date().toISOString(),
          duration_seconds: durationSeconds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', this.currentSession.id)

      if (error) {
        console.error('Failed to end session:', error)
      }

      // Clear current session
      this.currentSession = null
      this.sessionStartTime = null
    } catch (err) {
      console.error('Error ending session:', err)
    }
  }

  /**
   * Track when user switches to a different soundscape
   */
  async switchSoundscape(event: PlayEvent): Promise<void> {
    // End current session
    await this.endSession()
    
    // Track the new play
    await this.trackPlay(event)
    
    // Start new session
    await this.startSession(event)
  }

  /**
   * Get current session info
   */
  getCurrentSession(): Session | null {
    return this.currentSession
  }

  /**
   * Get analytics summary for a soundscape
   */
  async getSoundscapeStats(soundscapeId: string) {
    try {
      // Get total plays
      const { count: playCount, error: playError } = await this.supabase
        .from('soundscape_plays')
        .select('*', { count: 'exact', head: true })
        .eq('soundscape_id', soundscapeId)

      if (playError) {
        console.error('Failed to get play count:', playError)
      }

      // Get average duration
      const { data: sessions, error: sessionError } = await this.supabase
        .from('soundscape_sessions')
        .select('duration_seconds')
        .eq('soundscape_id', soundscapeId)
        .not('duration_seconds', 'is', null)

      if (sessionError) {
        console.error('Failed to get sessions:', sessionError)
      }

      const avgDuration = sessions && sessions.length > 0
        ? sessions.reduce((sum: number, s: { duration_seconds: number | null }) => sum + (s.duration_seconds || 0), 0) / sessions.length
        : 0

      return {
        totalPlays: playCount || 0,
        averageDurationSeconds: Math.floor(avgDuration),
        totalSessions: sessions?.length || 0,
      }
    } catch (err) {
      console.error('Error getting soundscape stats:', err)
      return {
        totalPlays: 0,
        averageDurationSeconds: 0,
        totalSessions: 0,
      }
    }
  }

  /**
   * Get top soundscapes by play count
   */
  async getTopSoundscapes(limit = 10) {
    try {
      const { data, error } = await this.supabase
        .from('soundscape_analytics')
        .select('*')
        .order('total_plays', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Failed to get top soundscapes:', error)
        return []
      }

      return data || []
    } catch (err) {
      console.error('Error getting top soundscapes:', err)
      return []
    }
  }
}

// Export singleton instance
export const soundscapeAnalytics = new SoundscapeAnalytics()

