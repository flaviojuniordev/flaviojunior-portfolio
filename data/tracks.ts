/**
 * Playlist manual. Cada música precisa do ID do vídeo do YouTube.
 * Para pegar o ID: abra o vídeo no YouTube, o ID é o que vem depois de "v=" na URL.
 * Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ → id é "dQw4w9WgXcQ"
 */
export interface Track {
  id: string
  title: string
  artist: string
  /** ID do vídeo do YouTube (ex: dQw4w9WgXcQ) */
  videoId: string
  /** Thumbnail opcional; se não passar, usamos a do YouTube (img.youtube.com/vi/VIDEO_ID/default.jpg) */
  coverUrl?: string
}

export const DEFAULT_TRACKS: Track[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    videoId: "fJ9rUzIMcZQ",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    videoId: "4NRXx6U8ABQ",
  },
  {
    id: "3",
    title: "Shape of You",
    artist: "Ed Sheeran",
    videoId: "JGwWNGJdvx8",
  },
  {
    id: "4",
    title: "Someone Like You",
    artist: "Adele",
    videoId: "hLQl3WQQoQ0",
  },
  {
    id: "5",
    title: "Imagine",
    artist: "John Lennon",
    videoId: "YkgkThdzX-8",
  },
]

/** Extrai o videoId de uma URL do YouTube (watch ou youtu.be) */
export function parseYouTubeVideoId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim()
  if (!trimmed) return null
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (watchMatch) return watchMatch[1]
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  return null
}
