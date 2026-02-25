"use client"

import { useState, useEffect } from "react"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { StartMenu } from "@/components/start-menu"
import { WindowManager } from "@/components/window-manager"
import { NotificationCenter } from "@/components/notification-center"
import { LoginScreen } from "@/components/login-screen"
import { BootScreen } from "@/components/boot-screen"
import { DesktopThemeProvider } from "@/contexts/desktop-theme-context"

export default function FlaviOSPortfolio() {
  const [bootComplete, setBootComplete] = useState(false)
  const [bootOverlayVisible, setBootOverlayVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [desktopVisible, setDesktopVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  useEffect(() => {
    if (isLoggedIn && !desktopVisible) {
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDesktopVisible(true))
      })
      return () => cancelAnimationFrame(t)
    }
  }, [isLoggedIn, desktopVisible])

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
    }
    setActiveWindow(windowId)
    setMinimizedWindows((prev) => prev.filter((id) => id !== windowId))
    setIsStartMenuOpen(false)
  }

  const handleTaskbarWindowClick = (windowId: string) => {
    setActiveWindow(windowId)
    setMinimizedWindows((prev) => prev.filter((id) => id !== windowId))
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== windowId))
    setMinimizedWindows((prev) => prev.filter((id) => id !== windowId))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter((id) => id !== windowId)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1] : null)
    }
  }

  const minimizeWindow = (windowId: string) => {
    setMinimizedWindows((prev) => (prev.includes(windowId) ? prev : [...prev, windowId]))
    if (activeWindow === windowId) {
      setActiveWindow(null)
    }
  }

  // Boot + Login: BootScreen não é desmontado na transição — vira cortina (evita flash branco)
  if (!isLoggedIn) {
    return (
      <>
        {bootComplete && <LoginScreen onLogin={handleLogin} />}
        {(!bootComplete || bootOverlayVisible) && (
          <BootScreen
            onBootComplete={() => {
              setBootComplete(true)
              setBootOverlayVisible(true)
            }}
            isExiting={bootComplete}
            onFadeOutComplete={() => setBootOverlayVisible(false)}
          />
        )}
      </>
    )
  }

  // Mostrar desktop após login
  return (
    <DesktopThemeProvider>
      <div
        className="h-screen w-full overflow-hidden relative transition-opacity duration-500 ease-out"
        style={{
          background: "linear-gradient(to bottom right, var(--desktop-from), var(--desktop-via), var(--desktop-to))",
          opacity: desktopVisible ? 1 : 0,
        }}
      >
        <Desktop onOpenWindow={openWindow} />

        <WindowManager
          openWindows={openWindows}
          activeWindow={activeWindow}
          minimizedWindows={minimizedWindows}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onActivate={setActiveWindow}
          onOpenWindow={openWindow}
        />

        {isStartMenuOpen && <StartMenu onClose={() => setIsStartMenuOpen(false)} onOpenWindow={openWindow} />}

        {isNotificationOpen && <NotificationCenter onClose={() => setIsNotificationOpen(false)} />}

        <Taskbar
          openWindows={openWindows}
          activeWindow={activeWindow}
          currentTime={currentTime}
          onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          onNotificationClick={() => setIsNotificationOpen(!isNotificationOpen)}
          onWindowClick={handleTaskbarWindowClick}
        />
      </div>
    </DesktopThemeProvider>
  )
}
