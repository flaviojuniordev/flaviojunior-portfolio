"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive && isMinimized) {
      setIsMinimized(false);
    }
  }, [isActive, isMinimized]);

  useEffect(() => {
    if (isFullscreen || isMinimized) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'move';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isFullscreen, isMinimized]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLButtonElement ||
      (e.target as HTMLElement).closest('button')
    ) {
      return;
    }

    e.preventDefault();

    if (!windowRef.current || isFullscreen) return;

    const rect = windowRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);

    onActivate();
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFullscreen(!isFullscreen)

    if (!isFullscreen) {
      setPosition({ x: 0, y: 0 });
    }
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(true)
    onMinimize()
  }

  const defaultStyle = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "500px",
    ...style,
  }

  const fullscreenStyle = {
    left: "0",
    top: "0",
    transform: "none",
    width: "100%",
    height: "calc(100% - 48px)",
    borderRadius: "0",
  }

  const minimizedStyle = {
    left: "50%",
    top: "200%", 
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "500px",
    ...style,
  }

  const customPositionStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: "none",
    width: "600px",
    height: "500px",
    ...style,
  }

  let currentStyle = defaultStyle;
  if (isMinimized) {
    currentStyle = minimizedStyle;
  } else if (isFullscreen) {
    currentStyle = fullscreenStyle;
  } else if (isDragging || (position.x !== 0 || position.y !== 0)) {
    currentStyle = customPositionStyle;
  }

  if (isMinimized) {
    return null;
  }

  const MaximizeRestoreIcon = () => {
    if (isFullscreen) {
      return (
        <div className="relative w-3 h-3">
          <div className="absolute top-0 right-0 w-2 h-2 border border-current"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border border-current bg-white"></div>
        </div>
      )
    } else {
      return <Square className="w-3 h-3" />
    }
  }

  return (
    <div
      ref={windowRef}
      className={`fixed bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 ${!isDragging ? "transition-all duration-200" : ""
        } ${isActive ? "ring-2 ring-blue-500/50" : ""}`}
      style={currentStyle}
      onClick={onActivate}
    >
      {/* Barra de título */}
      <div
        className={`flex items-center justify-between h-12 px-4 bg-white/50 backdrop-blur-sm rounded-t-xl border-b border-white/20`}
        onMouseDown={handleTitleBarMouseDown}
      >
        <h2 className="text-gray-800 font-medium text-sm select-none">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-200 rounded"
            onClick={handleMinimize}
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-gray-200 rounded"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Restore" : "Maximize"}
          >
            <MaximizeRestoreIcon />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-red-500 hover:text-white rounded"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            title="Close"
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
