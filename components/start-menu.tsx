"use client"

import { User, Folder, Monitor, Mail, FileText, Power, Settings, Search, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StartMenuProps {
  onClose: () => void
  onOpenWindow: (windowId: string) => void
}

export function StartMenu({ onClose, onOpenWindow }: StartMenuProps) {
  const pinnedApps = [
    { id: "about", name: "Sobre Mim", icon: User, color: "bg-blue-500" },
    { id: "projects", name: "Projetos", icon: Folder, color: "bg-yellow-500" },
    { id: "skills", name: "Habilidades", icon: Monitor, color: "bg-green-500" },
    { id: "contact", name: "Contato", icon: Mail, color: "bg-red-500" },
    { id: "resume", name: "Currículo", icon: FileText, color: "bg-purple-500" },
    { id: "terminal", name: "Terminal", icon: Terminal, color: "bg-slate-600" },
  ]

  const handleAppClick = (appId: string) => {
    onOpenWindow(appId)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu Iniciar */}
      <div className="fixed bottom-12 left-2 z-50 w-80 h-96 bg-black/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
        <div className="p-4 h-full flex flex-col">
          {/* Busca */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <Input
              placeholder="Digite aqui para pesquisar"
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-lg"
            />
          </div>

          {/* Aplicativos Fixados */}
          <div className="flex-1">
            <h3 className="text-white text-sm font-medium mb-3">Fixados</h3>
            <div className="grid grid-cols-3 gap-3">
              {pinnedApps.map((app) => (
                <Button
                  key={app.id}
                  variant="ghost"
                  className="h-20 flex flex-col items-center justify-center hover:bg-white/10 rounded-lg p-2"
                  onClick={() => handleAppClick(app.id)}
                >
                  <div className={`w-8 h-8 ${app.color} rounded-lg flex items-center justify-center mb-1`}>
                    <app.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-xs text-center leading-tight">{app.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Parte inferior */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="/images/flaviojr.jpg"
                  alt="Foto de Flávio Ferreira"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white text-sm font-medium">Flávio Ferreira</span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10 rounded">
                <Settings className="w-4 h-4 text-white" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10 rounded">
                <Power className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
