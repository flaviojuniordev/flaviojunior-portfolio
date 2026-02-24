"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

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
  const isMobile = useIsMobile()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobile) {
      setIsFullscreen(true)
    }
  }, [isMobile])

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
      (e.target as HTMLElement).closest('button') ||
      isFullscreen ||
      isMobile
    ) {
      return;
    }

    e.preventDefault();

    if (!windowRef.current) return;

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
    width: isMobile ? "95%" : "600px",
    height: isMobile ? "80%" : "500px",
    maxWidth: "95vw",
    maxHeight: "85vh",
    ...style,
  }

  const fullscreenStyle = {
    left: "0",
    top: "0",
    transform: "none",
    width: "100%",
    height: "calc(100% - 48px)",
    borderRadius: "0",
    maxWidth: "100vw",
    maxHeight: "calc(100vh - 48px)",
  }

  const minimizedStyle = {
    left: "50%",
    top: "200%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : "600px",
    height: isMobile ? "80%" : "500px",
    ...style,
  }

  const customPositionStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: "none",
    width: isMobile ? "95%" : "600px",
    height: isMobile ? "80%" : "500px",
    maxWidth: "95vw",
    maxHeight: "85vh",
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

  const appliedStyle = isFullscreen
    ? fullscreenStyle
    : isMinimized
      ? { display: "none" }
      : (position.x === 0 && position.y === 0)
        ? defaultStyle
        : {
          ...defaultStyle,
          left: position.x,
          top: position.y,
          transform: "none",
        };

  return (
    <div
      ref={windowRef}
      className={`fixed bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 ${!isDragging ? "transition-all duration-200" : ""} overflow-hidden`}
      style={isActive ? { boxShadow: "0 0 0 2px var(--desktop-ring)" } : undefined}
      style={appliedStyle}
      onClick={onActivate}
    >
      <div
        className={`flex items-center justify-between h-12 px-4 bg-white/50 backdrop-blur-sm rounded-t-xl border-b border-white/20 ${!isMobile && !isFullscreen ? "cursor-move" : ""}`}
        onMouseDown={handleTitleBarMouseDown}
      >
        <h2 className="text-gray-800 font-medium text-sm select-none truncate">{title}</h2>
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

      <div className="p-4 sm:p-6 h-[calc(100%-3rem)] overflow-auto">{children}</div>
    </div>
  )
}
