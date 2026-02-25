"use client"

import { useState, useEffect } from "react"
import { Bell, X, Settings, Wifi, Battery } from "lucide-react"
import { Button } from "@/components/ui/button"

const PANEL_ANIMATION_MS = 200

interface NotificationCenterProps {
  onClose: () => void
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [isEntering, setIsEntering] = useState(true)

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsEntering(false))
    })
    return () => cancelAnimationFrame(t)
  }, [])

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

      <div
        className="fixed bottom-12 right-2 z-50 w-80 h-96 backdrop-blur-xl rounded-xl border shadow-2xl ease-out"
        style={{
          backgroundColor: "var(--panel-bg)",
          borderColor: "var(--panel-border)",
          opacity: isEntering ? 0 : 1,
          transform: isEntering ? "translateY(8px) scale(0.96)" : "translateY(0) scale(1)",
          transition: `opacity ${PANEL_ANIMATION_MS}ms ease-out, transform ${PANEL_ANIMATION_MS}ms ease-out`,
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium" style={{ color: "var(--desktop-text)" }}>Notificações</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded hover:bg-white/10"
              style={{ color: "var(--desktop-text)" }}
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button variant="ghost" className="h-16 flex flex-col items-center justify-center rounded-lg hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              <Wifi className="w-5 h-5 mb-1" />
              <span className="text-xs">Wi-Fi</span>
            </Button>
            <Button variant="ghost" className="h-16 flex flex-col items-center justify-center rounded-lg hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              <Battery className="w-5 h-5 mb-1" />
              <span className="text-xs">Bateria</span>
            </Button>
            <Button variant="ghost" className="h-16 flex flex-col items-center justify-center rounded-lg hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              <Settings className="w-5 h-5 mb-1" />
              <span className="text-xs">Config.</span>
            </Button>
          </div>

          <div className="flex-1 space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="backdrop-blur-sm rounded-lg p-3 transition-colors cursor-pointer hover:bg-white/20"
                style={{ backgroundColor: "var(--desktop-icon-bg)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--desktop-accent)" }}>
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate" style={{ color: "var(--desktop-text)" }}>{notification.title}</h4>
                    <p className="text-xs mt-1 line-clamp-2 opacity-80" style={{ color: "var(--desktop-text)" }}>{notification.message}</p>
                    <p className="text-xs mt-1 opacity-60" style={{ color: "var(--desktop-text)" }}>{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t" style={{ borderColor: "var(--panel-border)" }}>
            <Button variant="ghost" className="w-full rounded-lg text-sm hover:bg-white/10" style={{ color: "var(--desktop-text)" }}>
              Ver todas as notificações
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
