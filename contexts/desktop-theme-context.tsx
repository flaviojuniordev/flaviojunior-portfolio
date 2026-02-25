"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type DesktopThemeId = "blue" | "dark" | "forest" | "sunset" | "purple" | "ocean"

export const DESKTOP_THEMES: { id: DesktopThemeId; name: string; preview: string[] }[] = [
  { id: "blue", name: "FlaviOS", preview: ["#2563eb", "#1d4ed8", "#3730a3"] },
  { id: "dark", name: "Escuro", preview: ["#1f2937", "#111827", "#030712"] },
  { id: "forest", name: "Floresta", preview: ["#166534", "#14532d", "#052e16"] },
  { id: "sunset", name: "Pôr do sol", preview: ["#ea580c", "#c2410c", "#9a3412"] },
  { id: "purple", name: "Lilás", preview: ["#7c3aed", "#6d28d9", "#4c1d95"] },
  { id: "ocean", name: "Oceano", preview: ["#0e7490", "#0f766e", "#134e4a"] },
]

const STORAGE_KEY = "desktop-theme"

type DesktopThemeContextType = {
  themeId: DesktopThemeId
  setThemeId: (id: DesktopThemeId) => void
}

const DesktopThemeContext = createContext<DesktopThemeContextType | null>(null)

function getInitialTheme(): DesktopThemeId {
  if (typeof window === "undefined") return "blue"
  const stored = localStorage.getItem(STORAGE_KEY) as DesktopThemeId | null
  return stored && DESKTOP_THEMES.some((t) => t.id === stored) ? stored : "blue"
}

export function DesktopThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<DesktopThemeId>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-desktop-theme", themeId)
    localStorage.setItem(STORAGE_KEY, themeId)
  }, [themeId])

  const setThemeId = (id: DesktopThemeId) => setThemeIdState(id)

  return (
    <DesktopThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </DesktopThemeContext.Provider>
  )
}

export function useDesktopTheme() {
  const ctx = useContext(DesktopThemeContext)
  if (!ctx) throw new Error("useDesktopTheme must be used within DesktopThemeProvider")
  return ctx
}
