"use client"

import { useState, useCallback, useRef, useEffect } from "react"

declare global {
  interface Window {
    YT?: typeof YT
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  stopVideo: () => void
  loadVideoById: (videoId: string) => void
  cueVideoById: (videoId: string) => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  setVolume: (volume: number) => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
}

const YT_PLAYER_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const

function loadYouTubeAPI(): Promise<typeof YT> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"))
  if (window.YT?.Player) return Promise.resolve(window.YT)

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("YouTube API timeout")), 10000)

    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout)
      if (window.YT) resolve(window.YT)
      else reject(new Error("YT not defined"))
    }

    const script = document.createElement("script")
    script.src = "https://www.youtube.com/iframe_api"
    script.async = true
    script.onerror = () => {
      clearTimeout(timeout)
      reject(new Error("Failed to load YouTube script"))
    }
    document.head.appendChild(script)
  })
}

export interface UseYouTubePlayerOptions {
  /** Chamado quando o vídeo termina (para dar play na próxima) */
  onEnded?: () => void
}

export function useYouTubePlayer(options: UseYouTubePlayerOptions = {}) {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const CONTAINER_ID = "youtube-audio-player-container"
  const onEndedRef = useRef(options.onEnded)
  onEndedRef.current = options.onEnded

  const stopProgressPolling = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [])

  const startProgressPolling = useCallback(() => {
    stopProgressPolling()
    progressIntervalRef.current = setInterval(() => {
      const p = playerRef.current
      if (!p) return
      try {
        const t = p.getCurrentTime()
        const d = p.getDuration()
        if (typeof t === "number" && !Number.isNaN(t)) setCurrentTime(t)
        if (typeof d === "number" && !Number.isNaN(d) && d > 0) setDuration(d)
        if (p.getPlayerState() === YT_PLAYER_STATE.ENDED) {
          stopProgressPolling()
          setCurrentTime(0)
          onEndedRef.current?.()
        }
      } catch {
        // ignore
      }
    }, 500)
  }, [stopProgressPolling])

  const loadVideo = useCallback(
    (videoId: string) => {
      if (!playerRef.current || !isReady) return
      setError(null)
      setCurrentTime(0)
      setDuration(0)
      playerRef.current.cueVideoById(videoId)
      setDuration(0)
    },
    [isReady]
  )

  const play = useCallback(() => {
    if (!playerRef.current) return
    playerRef.current.playVideo()
    setIsPlaying(true)
    startProgressPolling()
  }, [startProgressPolling])

  const pause = useCallback(() => {
    if (!playerRef.current) return
    playerRef.current.pauseVideo()
    setIsPlaying(false)
    stopProgressPolling()
  }, [stopProgressPolling])

  const togglePlay = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const seek = useCallback((seconds: number) => {
    if (!playerRef.current) return
    playerRef.current.seekTo(seconds, true)
    setCurrentTime(seconds)
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (!playerRef.current) return
    playerRef.current.setVolume(Math.max(0, Math.min(100, volume)))
  }, [])

  useEffect(() => {
    let mounted = true
    setError(null)
    loadYouTubeAPI()
      .then((YT) => {
        const el = document.getElementById(CONTAINER_ID)
        if (!mounted || !el) return
        // YouTube exige player visível na página para reproduzir; usamos mini player 16:9
        const player = new YT.Player(CONTAINER_ID, {
          height: "180",
          width: "320",
          videoId: "",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
          events: {
            onReady: (event: { target: YTPlayer }) => {
              if (!mounted) return
              playerRef.current = event.target
              setIsReady(true)
            },
            onStateChange: (event: { data: number }) => {
              if (!mounted) return
              if (event.data === YT_PLAYER_STATE.PLAYING) {
                setIsPlaying(true)
                startProgressPolling()
              } else if (event.data === YT_PLAYER_STATE.PAUSED || event.data === YT_PLAYER_STATE.ENDED) {
                setIsPlaying(false)
                if (event.data === YT_PLAYER_STATE.ENDED) {
                  stopProgressPolling()
                  setCurrentTime(0)
                  onEndedRef.current?.()
                } else {
                  stopProgressPolling()
                }
              }
            },
          },
        })
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? "Falha ao carregar o player do YouTube")
      })
    return () => {
      mounted = false
      stopProgressPolling()
      playerRef.current = null
    }
  }, [startProgressPolling, stopProgressPolling])

  return {
    isReady,
    isPlaying,
    currentTime,
    duration,
    error,
    containerId: CONTAINER_ID,
    loadVideo,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
  }
}
