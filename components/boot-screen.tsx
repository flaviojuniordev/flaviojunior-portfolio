"use client"

import { useState, useEffect, useRef } from "react"

const LOGIN_GRADIENT = "linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 100%)"

interface BootScreenProps {
  onBootComplete: () => void
  isExiting?: boolean
  onFadeOutComplete?: () => void
}

const BOOT_DURATION_MS = 2800
const CONTENT_FADE_MS = 350
const OVERLAY_FADE_MS = 1200

export function BootScreen({ onBootComplete, isExiting = false, onFadeOutComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [contentGone, setContentGone] = useState(false)
  const [overlayOpacity, setOverlayOpacity] = useState(1)
  const onBootCompleteRef = useRef(onBootComplete)
  const onFadeOutCompleteRef = useRef(onFadeOutComplete)
  const doneRef = useRef(false)
  onBootCompleteRef.current = onBootComplete
  onFadeOutCompleteRef.current = onFadeOutComplete

  useEffect(() => {
    if (isExiting) return
    const t = setTimeout(() => setShowContent(true), 80)
    return () => clearTimeout(t)
  }, [isExiting])

  useEffect(() => {
    if (isExiting) return
    const start = Date.now()
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const p = Math.min(100, (elapsed / BOOT_DURATION_MS) * 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setContentGone(true)
        timeoutId = setTimeout(() => onBootCompleteRef.current(), CONTENT_FADE_MS)
      }
    }, 32)
    return () => {
      clearInterval(interval)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [isExiting])

  useEffect(() => {
    if (!isExiting || !onFadeOutComplete) return
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayOpacity(0))
    })
    return () => cancelAnimationFrame(t)
  }, [isExiting, onFadeOutComplete])

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity" || doneRef.current) return
    doneRef.current = true
    onFadeOutCompleteRef.current?.()
  }

  const isOverlayFading = isExiting
  const opacity = isOverlayFading ? overlayOpacity : 1

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{
        background: LOGIN_GRADIENT,
        opacity,
        transition: isOverlayFading ? `opacity ${OVERLAY_FADE_MS}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : "none",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {!isExiting && (
        <>
          <div
            className="flex flex-col items-center gap-3 mb-12 transition-opacity duration-300 ease-out"
            style={{ opacity: contentGone ? 0 : 1 }}
          >
            <img
              src="/images/logo.png"
              alt="FlaviOS"
              className={`w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-lg transition-all duration-700 ease-out ${
                showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
            <div
              className={`flex flex-col items-center gap-1 transition-all duration-500 ease-out delay-300 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">FlaviOS</h1>
              <p className="text-sm text-slate-400 tracking-widest uppercase">Portfolio</p>
            </div>
          </div>

          <div
            className={`w-64 sm:w-80 transition-all duration-500 ease-out delay-500 ${showContent ? "opacity-100" : "opacity-0"}`}
            style={{ opacity: contentGone ? 0 : undefined }}
          >
            <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-slate-500 text-sm mt-3 tracking-wide">Iniciando FlaviOS...</p>
          </div>

          <p
            className="absolute bottom-6 left-0 right-0 text-center text-slate-600 text-xs transition-opacity duration-300"
            style={{ opacity: contentGone ? 0 : 1 }}
          >
            Flávio Ferreira · Desenvolvedor de Software
          </p>
        </>
      )}
    </div>
  )
}
