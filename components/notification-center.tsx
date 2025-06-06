"use client"

import { Bell, X, Settings, Wifi, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationCenterProps {
  onClose: () => void
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const notifications = [
    {
      id: 1,
      title: "Novo projeto adicionado",
      message: "Rhapido AI foi adicionado ao portfólio",
      time: "2 min atrás",
      type: "info",
    },
    {
      id: 2,
      title: "Mensagem recebida",
      message: "Você tem uma nova mensagem de Mãe ❤️",
      time: "1 hora atrás",
      type: "message",
    },
  ]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Notification Center */}
      <div className="fixed bottom-12 right-2 z-50 w-80 h-96 bg-black/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Notificações</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-white/10 rounded text-white"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Configurações rápidas */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
              variant="ghost"
              className="h-16 flex flex-col items-center justify-center hover:bg-white/10 rounded-lg text-white"
            >
              <Wifi className="w-5 h-5 mb-1" />
              <span className="text-xs">Wi-Fi</span>
            </Button>
            <Button
              variant="ghost"
              className="h-16 flex flex-col items-center justify-center hover:bg-white/10 rounded-lg text-white"
            >
              <Battery className="w-5 h-5 mb-1" />
              <span className="text-xs">Bateria</span>
            </Button>
            <Button
              variant="ghost"
              className="h-16 flex flex-col items-center justify-center hover:bg-white/10 rounded-lg text-white"
            >
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Config.</span>
            </Button>
          </div>

          {/* Notificações */}
          <div className="flex-1 space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">{notification.title}</h4>
                    <p className="text-white/80 text-xs mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-white/60 text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/20">
            <Button variant="ghost" className="w-full text-white hover:bg-white/10 rounded-lg text-sm">
              Ver todas as notificações
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
