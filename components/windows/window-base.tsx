"use client"

import type React from "react"

import type { ReactNode } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WindowBaseProps {
  title: string
  children: ReactNode
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function WindowBase({ title, children, isActive, onClose, onMinimize, onActivate, style }: WindowBaseProps) {
  return (
    <div
      className={`fixed bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 transition-all duration-200 ${
        isActive ? "ring-2 ring-blue-500/50" : ""
      }`}
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "500px",
        ...style,
      }}
      onClick={onActivate}
    >
      {/* Barra de título */}
      <div className="flex items-center justify-between h-12 px-4 bg-white/50 backdrop-blur-sm rounded-t-xl border-b border-white/20">
        <h2 className="text-gray-800 font-medium text-sm">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-200 rounded"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-200 rounded">
            <Square className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-red-500 hover:text-white rounded"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 h-[calc(100%-3rem)] overflow-auto">{children}</div>
    </div>
  )
}
