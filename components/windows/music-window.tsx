"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { WindowBase } from "./window-base"
import { Play, Pause, SkipBack, SkipForward, Music2, Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useYouTubePlayer } from "@/hooks/use-youtube-player"
import { DEFAULT_TRACKS, parseYouTubeVideoId, type Track } from "@/data/tracks"
import { cn } from "@/lib/utils"

interface MusicWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function MusicWindow(props: MusicWindowProps) {
  const [tracks, setTracks] = useState<Track[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("portfolio-music-tracks")
        if (saved) {
          const parsed = JSON.parse(saved) as Track[]
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_TRACKS
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addUrl, setAddUrl] = useState("")
  const [addError, setAddError] = useState("")

  const currentTrack = tracks[currentIndex] ?? null

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % Math.max(1, tracks.length))
  }, [tracks.length])
  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + tracks.length) % Math.max(1, tracks.length))
  }, [tracks.length])

  const playRef = useRef<() => void>(() => {})
  const onEnded = useCallback(() => {
    goNext()
    setTimeout(() => playRef.current(), 300)
  }, [goNext])

  const {
    isReady,
    isPlaying,
    currentTime,
    duration,
    error: playerError,
    containerId,
    loadVideo,
    play,
    pause,
    togglePlay,
    seek,
  } = useYouTubePlayer({ onEnded })

  playRef.current = play

  useEffect(() => {
    if (!currentTrack || !isReady) return
    loadVideo(currentTrack.videoId)
  }, [currentTrack?.id, isReady, loadVideo])

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-music-tracks", JSON.stringify(tracks))
    } catch {
      // ignore
    }
  }, [tracks])

  const handleSelectTrack = (index: number) => {
    setCurrentIndex(index)
  }

  const handleAddTrack = () => {
    setAddError("")
    const videoId = parseYouTubeVideoId(addUrl)
    if (!videoId) {
      setAddError("Cole um link do YouTube (ex: youtube.com/watch?v=...) ou só o ID do vídeo.")
      return
    }
    const newTrack: Track = {
      id: `yt-${videoId}-${Date.now()}`,
      title: "Sem título",
      artist: "YouTube",
      videoId,
    }
    setTracks((prev) => [...prev, newTrack])
    setAddUrl("")
    setCurrentIndex(tracks.length)
  }

  const handleRemoveTrack = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTracks((prev) => {
      const next = prev.filter((t) => t.id !== id)
      setCurrentIndex((i) => Math.min(Math.max(0, i), next.length - 1))
      return next
    })
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <WindowBase title="Music" {...props}>
      <div className="h-full flex flex-col min-h-0 bg-[#121212] text-white rounded-b-xl overflow-hidden">
        <div className="flex flex-1 min-h-0">
          {/* Lista de músicas */}
          <div className="w-72 flex-shrink-0 border-r border-white/10 flex flex-col">
            <div className="p-3 border-b border-white/10 flex items-center gap-2">
              <Music2 className="w-5 h-5 text-[#1db954]" />
              <span className="font-semibold">Playlist</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(index)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-white/10 transition-colors group",
                    currentIndex === index && "bg-white/15 text-[#1db954]"
                  )}
                >
                  <span className="w-6 text-center text-sm text-white/70 tabular-nums">
                    {currentIndex === index && isPlaying ? (
                      <span className="text-[#1db954]">▶</span>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <img
                    src={track.coverUrl ?? `https://img.youtube.com/vi/${track.videoId}/default.jpg`}
                    alt=""
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm truncate">{track.title}</div>
                    <div className="text-xs text-white/60 truncate">{track.artist}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 text-white/70 hover:text-red-400 hover:bg-red-500/20"
                    onClick={(e) => handleRemoveTrack(track.id, e)}
                    title="Remover"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            {/* Adicionar por link */}
            <div className="p-3 border-t border-white/10 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Link ou ID do YouTube"
                  value={addUrl}
                  onChange={(e) => setAddUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTrack()}
                  className="flex-1 min-w-0 rounded-lg bg-white/10 px-3 py-2 text-sm placeholder:text-white/50 border-0 focus:ring-2 focus:ring-[#1db954]"
                />
                <Button
                  size="sm"
                  className="bg-[#1db954] hover:bg-[#1ed760] text-black flex-shrink-0"
                  onClick={handleAddTrack}
                  title="Adicionar música"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {addError && <p className="text-xs text-red-400">{addError}</p>}
            </div>
          </div>

          {/* Área "Now Playing" + controles */}
          <div className="flex-1 flex flex-col min-w-0 p-6">
            {playerError && (
              <div className="rounded-lg bg-red-500/20 text-red-300 px-4 py-2 text-sm mb-4">{playerError}</div>
            )}
            <div className="flex-1 flex flex-col items-center justify-center text-center min-h-0">
              {/* Container do YouTube sempre no DOM para o player inicializar; visível para o áudio tocar */}
              <div className="rounded-xl overflow-hidden shadow-2xl flex-shrink-0 mb-4 ring-1 ring-white/10 bg-black">
                <div id={containerId} className="bg-black" style={{ width: 320, height: 180 }} />
              </div>
              {currentTrack ? (
                <>
                  <h3 className="font-bold text-xl truncate w-full max-w-md">{currentTrack.title}</h3>
                  <p className="text-white/60 text-sm truncate w-full max-w-md mb-1">{currentTrack.artist}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-white/50">Nenhuma música na playlist. Adicione pelo link do YouTube.</p>
                </>
              )}
            </div>

            {/* Barra de progresso */}
            <div className="flex items-center gap-3 text-xs text-white/60 mb-2">
              <span className="tabular-nums w-10">{formatTime(currentTime)}</span>
              <button
                type="button"
                className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden group cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const pct = rect.width > 0 ? x / rect.width : 0
                  seek(pct * duration)
                }}
                title="Clique para buscar na faixa"
                aria-label="Barra de progresso da música"
              >
                <div
                  className="h-full bg-[#1db954] rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </button>
              <span className="tabular-nums w-10">{formatTime(duration)}</span>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-center gap-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 text-white/80 hover:text-white hover:bg-white/10"
                onClick={goPrev}
                disabled={tracks.length === 0}
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-14 w-14 bg-[#1db954] hover:bg-[#1ed760] text-black"
                onClick={togglePlay}
                disabled={!currentTrack || !isReady}
              >
                {!isReady ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-0.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10 text-white/80 hover:text-white hover:bg-white/10"
                onClick={goNext}
                disabled={tracks.length === 0}
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
