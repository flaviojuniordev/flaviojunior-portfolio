"use client"

import { useState, useRef, useCallback } from "react"
import { WindowBase } from "./window-base"
import { ArrowLeft, ArrowRight, RefreshCw, Home, ExternalLink, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Página inicial e atalhos: sites que permitem exibição em iframe
const EMBEDDABLE_SITES: { url: string; label: string }[] = [
  { url: "https://flaviojunior-portfolio.vercel.app/", label: "Meu portfolio" },
  { url: "https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal", label: "Wikipedia (PT)" },
  { url: "https://en.wikipedia.org/wiki/Main_Page", label: "Wikipedia (EN)" },
  { url: "https://archive.org", label: "Internet Archive" },
  { url: "https://commons.wikimedia.org/wiki/Main_Page", label: "Wikimedia Commons" },
  { url: "https://www.gutenberg.org", label: "Project Gutenberg" },
  { url: "https://info.cern.ch", label: "Primeiro site da web (CERN)" },
]

function normalizeUrl(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ""
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed
  return "https://" + trimmed
}

function isAllowedUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

interface BrowserWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function BrowserWindow(props: BrowserWindowProps) {
  const [urlInput, setUrlInput] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [reloadKey, setReloadKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleReload = useCallback(() => {
    if (!currentUrl) return
    setReloadKey((k) => k + 1)
    setIsLoading(true)
  }, [currentUrl])

  const goTo = useCallback((url: string) => {
    const normalized = normalizeUrl(url)
    if (!normalized) return
    if (!isAllowedUrl(normalized)) {
      setLoadError("Use apenas endereços http:// ou https://")
      return
    }
    setLoadError(null)
    const trimmed = historyIndex < history.length - 1 ? history.slice(0, historyIndex + 1) : history
    const newHistory = [...trimmed, normalized]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setCurrentUrl(normalized)
    setUrlInput(normalized)
    setIsLoading(true)
  }, [historyIndex, history])

  const goBack = useCallback(() => {
    if (currentUrl !== "") {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentUrl(history[newIndex])
        setUrlInput(history[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentUrl("")
        setUrlInput("")
      }
    } else if (historyIndex >= 0) {
      setCurrentUrl(history[historyIndex])
      setUrlInput(history[historyIndex])
    }
  }, [currentUrl, historyIndex, history])

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCurrentUrl(history[newIndex])
      setUrlInput(history[newIndex])
    }
  }, [historyIndex, history])

  const goHome = useCallback(() => {
    setCurrentUrl("")
    setUrlInput("")
    setLoadError(null)
  }, [])

  const canGoBack = historyIndex >= 0
  const canGoForward = historyIndex < history.length - 1

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    goTo(urlInput)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setLoadError(null)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setLoadError("Não foi possível carregar a página.")
  }

  const openInNewTab = () => {
    if (currentUrl) window.open(currentUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <WindowBase title="Navegador" {...props}>
      <div className="h-full flex flex-col min-h-0 bg-gray-100">
        {/* Barra de ferramentas: em mobile quebra em 2 linhas, toques maiores */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-1 p-2 sm:p-2 bg-white border-b border-gray-200">
          <div className="flex items-center gap-0.5 sm:gap-1 min-h-[44px] sm:min-h-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 sm:h-8 sm:w-8 p-0 rounded touch-manipulation"
              onClick={goBack}
              disabled={!canGoBack}
              title="Voltar"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 sm:h-8 sm:w-8 p-0 rounded touch-manipulation"
              onClick={goForward}
              disabled={!canGoForward}
              title="Avançar"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 sm:h-8 sm:w-8 p-0 rounded touch-manipulation"
              onClick={handleReload}
              disabled={!currentUrl}
              title="Atualizar"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 sm:h-8 sm:w-8 p-0 rounded touch-manipulation"
              onClick={goHome}
              title="Página inicial"
            >
              <Home className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 sm:h-8 sm:w-8 p-0 rounded touch-manipulation ml-auto sm:ml-0"
              onClick={openInNewTab}
              disabled={!currentUrl}
              title="Abrir em nova aba"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 min-w-0 flex items-center gap-2 w-full sm:mx-2">
            <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 hidden sm:block" />
            <Input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Digite o endereço ou pesquise"
              className="h-9 sm:h-8 text-sm flex-1 min-w-0 min-h-[44px] sm:min-h-0"
            />
            <Button type="submit" size="sm" className="h-9 sm:h-8 flex-shrink-0 min-h-[44px] sm:min-h-0 px-4 touch-manipulation">
              Ir
            </Button>
          </form>
        </div>

        {/* Aviso: em mobile texto mais compacto */}
        <div className="flex-shrink-0 px-3 py-2 sm:py-1.5 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-2 sm:line-clamp-none">
            Os atalhos abaixo abrem corretamente aqui. Outros sites podem bloquear a exibição — use &quot;Abrir em nova aba&quot; nesses casos.
          </span>
        </div>

        {/* Conteúdo: iframe ou estado inicial */}
        <div className="flex-1 min-h-0 relative bg-white overflow-hidden">
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-red-50 text-red-700 text-sm text-center">
              {loadError}
            </div>
          )}
          {!currentUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 sm:p-6 text-gray-500 overflow-y-auto">
              <p className="text-sm text-center">Sites que abrem aqui — clique em um atalho:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {EMBEDDABLE_SITES.map(({ url, label }) => (
                  <Button
                    key={url}
                    variant="outline"
                    size="sm"
                    className="text-xs min-h-[44px] sm:min-h-0 px-4 py-3 sm:py-0 touch-manipulation"
                    onClick={() => goTo(url)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <p className="text-xs opacity-75 text-center">Ou digite um endereço na barra acima.</p>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              key={`${currentUrl}-${reloadKey}`}
              src={currentUrl}
              title="Navegador"
              className="w-full h-full min-h-0 border-0 block"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
          {isLoading && currentUrl && (
            <div className="absolute top-2 right-2 pointer-events-none">
              <RefreshCw className="w-5 h-5 sm:w-4 sm:h-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </WindowBase>
  )
}
