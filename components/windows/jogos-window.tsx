import type React from "react"
import type { LucideIcon } from "lucide-react"
import { WindowBase } from "./window-base"
import { Folder, Gamepad2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface JogosWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  onOpenWindow: (windowId: string) => void
  style?: React.CSSProperties
}

interface JogoApp {
  id: string
  name: string
  icon: LucideIcon
  image?: string
}

const jogosApps: JogoApp[] = [
  { id: "snake-game", name: "Snake Game", icon: Gamepad2, image: "/snakegame.png" },
]

export function JogosWindow(props: JogosWindowProps) {
  const { onOpenWindow, ...rest } = props

  return (
    <WindowBase title="Jogos" {...rest}>
      <div className="h-full flex flex-col min-h-0 bg-white">
        <div className="flex-shrink-0 border-b border-gray-200 p-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Jogos</span>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
              {jogosApps.length} {jogosApps.length === 1 ? "item" : "itens"}
            </Badge>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-w-0">
            {jogosApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors group"
                onClick={() => onOpenWindow(app.id)}
                onDoubleClick={() => onOpenWindow(app.id)}
              >
                <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-amber-400 transition-colors bg-gray-100 flex items-center justify-center">
                  {app.image ? (
                    <img
                      src={app.image}
                      alt={app.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <app.icon className="w-8 h-8 text-amber-600" />
                  )}
                </div>
                <span className="text-xs text-center text-gray-700 group-hover:text-amber-700 font-medium max-w-full break-words">
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
