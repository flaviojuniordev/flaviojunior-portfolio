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
    }
    return titles[windowId] || windowId
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex items-center h-full px-2">
        {/* Botão Iniciar */}
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-white/10 rounded-lg" onClick={onStartClick}>
          <Windows className="w-5 h-5 text-white" />
        </Button>

        {/* Busca */}
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-white/10 rounded-lg ml-1">
          <Search className="w-4 h-4 text-white" />
        </Button>

        {/* Janelas abertas */}
        <div className="flex items-center ml-4 gap-1">
          {openWindows.map((windowId) => (
            <Button
              key={windowId}
              variant="ghost"
              size="sm"
              className={`h-10 px-3 hover:bg-white/10 rounded-lg text-white text-xs ${activeWindow === windowId ? "bg-white/20" : ""
                }`}
              onClick={() => onWindowClick(windowId)}
            >
              {getWindowTitle(windowId)}
            </Button>
          ))}
        </div>

        {/* Área direita */}
        <div className="ml-auto flex items-center gap-2">
          {/* Ícones do sistema */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10 rounded">
              <Wifi className="w-4 h-4 text-white" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10 rounded">
              <Volume2 className="w-4 h-4 text-white" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10 rounded">
              <Battery className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Data e Hora */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 hover:bg-white/10 rounded-lg text-white text-xs flex flex-col items-end leading-tight"
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
