"use client"

import { Search, Wifi, Volume2, Battery, ComputerIcon as Windows } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TaskbarProps {
  openWindows: string[]
  activeWindow: string | null
  currentTime: Date
  onStartClick: () => void
  onNotificationClick: () => void
  onWindowClick: (windowId: string) => void
}

export function Taskbar({
  openWindows,
  activeWindow,
  currentTime,
  onStartClick,
  onNotificationClick,
  onWindowClick,
}: TaskbarProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getWindowTitle = (windowId: string) => {
    const titles: Record<string, string> = {
      about: "Sobre Mim",
      projects: "Projetos",
      skills: "Habilidades",
      contact: "Contato",
      resume: "Currículo",
      terminal: "Terminal",
      jogos: "Jogos",
      "snake-game": "Snake Game",
      music: "Music",
      browser: "Navegador",
    }
    return titles[windowId] || windowId
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-12 backdrop-blur-xl border-t z-50"
      style={{ backgroundColor: "var(--taskbar-bg)", borderColor: "var(--panel-border)" }}
    >
      <div className="flex items-center h-full px-2">
        {/* Botão Iniciar */}
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg hover:bg-white/10" onClick={onStartClick} style={{ color: "var(--desktop-text)" }}>
          <Windows className="w-5 h-5" />
        </Button>

        {/* Busca */}
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg ml-1 hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
          <Search className="w-4 h-4" />
        </Button>

        {/* Janelas abertas */}
        <div className="flex items-center ml-4 gap-1">
          {openWindows.map((windowId) => (
            <Button
              key={windowId}
              variant="ghost"
              size="sm"
              className={`h-10 px-3 rounded-lg text-xs hover:bg-white/10 ${activeWindow === windowId ? "bg-white/20" : ""}`}
              style={{ color: "var(--desktop-text)" }}
              onClick={() => onWindowClick(windowId)}
            >
              {getWindowTitle(windowId)}
            </Button>
          ))}
        </div>

        {/* Área direita */}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              <Wifi className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              <Battery className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 rounded-lg text-xs flex flex-col items-end leading-tight hover:bg-white/10"
            style={{ color: "var(--desktop-text)" }}
            onClick={onNotificationClick}
          >
            <span className="font-medium">{formatTime(currentTime)}</span>
            <span className="text-xs opacity-80">{formatDate(currentTime)}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
