"use client"

import { useState, useEffect } from "react"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { StartMenu } from "@/components/start-menu"
import { WindowManager } from "@/components/window-manager"
import { NotificationCenter } from "@/components/notification-center"
import { LoginScreen } from "@/components/login-screen"

export default function Windows11Portfolio() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId])
    }
    setActiveWindow(windowId)
    setIsStartMenuOpen(false)
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter((id) => id !== windowId))
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter((id) => id !== windowId)
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1] : null)
    }
  }

  const minimizeWindow = (windowId: string) => {
    if (activeWindow === windowId) {
      setActiveWindow(null)
    }
  }

  // Mostrar tela de login se não estiver logado
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Mostrar desktop após login
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative">
      <Desktop onOpenWindow={openWindow} />

      <WindowManager
        openWindows={openWindows}
        activeWindow={activeWindow}
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
        onWindowClick={setActiveWindow}
      />
    </div>
  )
}
