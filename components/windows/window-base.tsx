"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

const WINDOW_ANIMATION_MS = 220
const MIN_WIDTH = 320
const MIN_HEIGHT = 220
const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 500

type ResizeHandle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

interface WindowBaseProps {
  title: string
  children: ReactNode
  isActive: boolean
  isMinimized?: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function WindowBase({ title, children, isActive, isMinimized: isMinimizedProp = false, onClose, onMinimize, onActivate, style }: WindowBaseProps) {
  const isMobile = useIsMobile()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isEntering, setIsEntering] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [isMinimizing, setIsMinimizing] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeHandle, setResizeHandle] = useState<ResizeHandle | null>(null)
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const closeDoneRef = useRef(false)
  const minimizeDoneRef = useRef(false)

  useEffect(() => {
    if (isMobile) {
      setIsFullscreen(true)
    }
  }, [isMobile])

  const isMinimized = isMinimizedProp

  useEffect(() => {
    if (!isMinimized) {
      minimizeDoneRef.current = false
    } else {
      setIsMinimizing(false)
    }
  }, [isMinimized])

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsEntering(false))
    })
    return () => cancelAnimationFrame(t)
  }, [])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (closeDoneRef.current) return
    setIsClosing(true)
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (minimizeDoneRef.current) return
    setIsMinimizing(true)
  }

  const handleAnimationEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity") return
    if (isClosing && !closeDoneRef.current) {
      closeDoneRef.current = true
      onClose()
    }
    if (isMinimizing && !minimizeDoneRef.current) {
      minimizeDoneRef.current = true
      onMinimize()
    }
  }

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
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "move";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, isFullscreen, isMinimized])

  useEffect(() => {
    if (!resizeHandle || isFullscreen || isMinimized) return

    const handleMouseMove = (e: MouseEvent) => {
      const { x: startX, y: startY, width: startW, height: startH, left: startLeft, top: startTop } = resizeStartRef.current
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      let newWidth = startW
      let newHeight = startH
      let newLeft = startLeft
      let newTop = startTop

      if (resizeHandle.includes("e")) newWidth = startW + deltaX
      if (resizeHandle.includes("w")) {
        newWidth = startW - deltaX
        newLeft = startLeft + deltaX
      }
      if (resizeHandle.includes("s")) newHeight = startH + deltaY
      if (resizeHandle.includes("n")) {
        newHeight = startH - deltaY
        newTop = startTop + deltaY
      }

      newWidth = Math.max(MIN_WIDTH, Math.min(window.innerWidth, newWidth))
      newHeight = Math.max(MIN_HEIGHT, Math.min(window.innerHeight - 48, newHeight))

      if (resizeHandle.includes("w")) newLeft = startLeft + (startW - newWidth)
      if (resizeHandle.includes("n")) newTop = startTop + (startH - newHeight)

      setSize({ width: newWidth, height: newHeight })
      setPosition((prev) => ({
        x: resizeHandle.includes("w") ? newLeft : prev.x,
        y: resizeHandle.includes("n") ? newTop : prev.y,
      }))
    }

    const handleMouseUp = () => {
      setResizeHandle(null)
      document.body.style.cursor = "default"
      document.body.style.userSelect = "auto"
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    const cursors: Record<ResizeHandle, string> = {
      n: "ns-resize",
      s: "ns-resize",
      e: "ew-resize",
      w: "ew-resize",
      ne: "nesw-resize",
      sw: "nesw-resize",
      nw: "nwse-resize",
      se: "nwse-resize",
    }
    document.body.style.cursor = cursors[resizeHandle]
    document.body.style.userSelect = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [resizeHandle, isFullscreen, isMinimized])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLButtonElement ||
      (e.target as HTMLElement).closest("button") ||
      isFullscreen ||
      isMobile
    ) {
      return
    }

    e.preventDefault()
    if (!windowRef.current) return

    const rect = windowRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    setDragOffset({ x: offsetX, y: offsetY })
    setIsDragging(true)
    onActivate()
  }

  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.stopPropagation()
    if (isFullscreen || isMobile || !windowRef.current) return
    onActivate()
    const rect = windowRef.current.getBoundingClientRect()
    const usePixelPosition = position.x === 0 && position.y === 0
    if (usePixelPosition) setPosition({ x: rect.left, y: rect.top })
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height,
      left: usePixelPosition ? rect.left : position.x,
      top: usePixelPosition ? rect.top : position.y,
    }
    setResizeHandle(handle)
  }

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFullscreen(!isFullscreen)
  }

  const defaultStyle = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "95%" : `${size.width}px`,
    height: isMobile ? "80%" : `${size.height}px`,
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
    width: isMobile ? "95%" : `${size.width}px`,
    height: isMobile ? "80%" : `${size.height}px`,
    ...style,
  }

  const customPositionStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: "none",
    width: isMobile ? "95%" : `${size.width}px`,
    height: isMobile ? "80%" : `${size.height}px`,
    maxWidth: "95vw",
    maxHeight: "85vh",
    ...style,
  }

  let currentStyle = defaultStyle;
  if (isMinimized && !isActive) {
    currentStyle = minimizedStyle;
  } else if (isFullscreen) {
    currentStyle = fullscreenStyle;
  } else if (isDragging || (position.x !== 0 || position.y !== 0)) {
    currentStyle = customPositionStyle;
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

  // Quando minimizada E ativa (clicou na taskbar), mostrar normal para restaurar; senão esconder
  const appliedStyle = isFullscreen
    ? fullscreenStyle
    : isMinimized && !isActive
      ? { ...minimizedStyle, visibility: "hidden" as const, pointerEvents: "none" as const }
      : (position.x === 0 && position.y === 0)
        ? defaultStyle
        : {
            ...defaultStyle,
            left: position.x,
            top: position.y,
            transform: "none",
          }

  const isAnimatingOut = isClosing || isMinimizing
  const animOpacity = isEntering ? 0 : isAnimatingOut ? 0 : 1
  const animScale = isEntering ? 0.92 : isAnimatingOut ? 0.92 : 1

  const positionTransform =
    isFullscreen || position.x !== 0 || position.y !== 0 ? "" : "translate(-50%, -50%) "
  const transformWithScale = `${positionTransform}scale(${animScale})`

  const isInteracting = isDragging || resizeHandle !== null

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-visible ease-out ${!isInteracting ? "transition-[box-shadow] duration-200" : ""}`}
      style={{
        ...appliedStyle,
        transform: transformWithScale,
        opacity: animOpacity,
        transitionProperty: isInteracting ? "none" : "opacity, transform, box-shadow",
        transitionDuration: `${WINDOW_ANIMATION_MS}ms`,
        ...(isActive ? { boxShadow: "0 0 0 2px var(--desktop-ring)" } : {}),
      }}
      onClick={onActivate}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Resize handles - bordas e cantos (estilo Windows) */}
      {!isFullscreen && !isMobile && (
        <>
          <div className="absolute left-0 top-0 w-full h-1.5 cursor-n-resize z-10" onMouseDown={(e) => handleResizeStart(e, "n")} />
          <div className="absolute right-0 top-0 w-1.5 h-full cursor-e-resize z-10" onMouseDown={(e) => handleResizeStart(e, "e")} />
          <div className="absolute left-0 bottom-0 w-full h-1.5 cursor-s-resize z-10" onMouseDown={(e) => handleResizeStart(e, "s")} />
          <div className="absolute left-0 top-0 w-1.5 h-full cursor-w-resize z-10" onMouseDown={(e) => handleResizeStart(e, "w")} />
          <div className="absolute right-0 top-0 w-3 h-3 cursor-ne-resize z-20" onMouseDown={(e) => handleResizeStart(e, "ne")} />
          <div className="absolute right-0 bottom-0 w-3 h-3 cursor-se-resize z-20" onMouseDown={(e) => handleResizeStart(e, "se")} />
          <div className="absolute left-0 bottom-0 w-3 h-3 cursor-sw-resize z-20" onMouseDown={(e) => handleResizeStart(e, "sw")} />
          <div className="absolute left-0 top-0 w-3 h-3 cursor-nw-resize z-20" onMouseDown={(e) => handleResizeStart(e, "nw")} />
        </>
      )}

      {/* Conteúdo da janela com overflow para os handles não cortarem */}
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden rounded-xl">
      {/* Cabeçalho fixo: título + botões */}
      <div
        className={`flex flex-shrink-0 items-center justify-between h-12 px-4 bg-white/50 backdrop-blur-sm rounded-t-xl border-b border-white/20 ${!isMobile && !isFullscreen ? "cursor-move" : ""}`}
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
            onClick={handleClose}
            title="Close"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Área de conteúdo */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col overflow-auto min-w-0">{children}</div>
      </div>
      </div>
    </div>
  )
}
