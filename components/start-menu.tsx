"use client"

import { useState, useMemo } from "react"
import { User, Folder, Monitor, Mail, FileText, Power, Settings, Search, Terminal, Palette, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDesktopTheme } from "@/contexts/desktop-theme-context"
import { DESKTOP_THEMES, type DesktopThemeId } from "@/contexts/desktop-theme-context"

interface StartMenuProps {
  onClose: () => void
  onOpenWindow: (windowId: string) => void
}

function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
}

export function StartMenu({ onClose, onOpenWindow }: StartMenuProps) {
  const { themeId, setThemeId } = useDesktopTheme()
  const [searchQuery, setSearchQuery] = useState("")

  const pinnedApps = useMemo(
    () => [
      { id: "about", name: "Sobre", icon: User, color: "bg-blue-500" },
      { id: "projects", name: "Projetos", icon: Folder, color: "bg-amber-500" },
      { id: "skills", name: "Habilidades", icon: Monitor, color: "bg-emerald-500" },
      { id: "contact", name: "Contato", icon: Mail, color: "bg-rose-500" },
      { id: "resume", name: "Currículo", icon: FileText, color: "bg-violet-500" },
      { id: "terminal", name: "Terminal", icon: Terminal, color: "bg-slate-600" },
      { id: "music", name: "Music", icon: Music2, color: "bg-emerald-600" },
    ],
    []
  )

  const filteredApps = useMemo(() => {
    const query = normalizeForSearch(searchQuery)
    if (!query) return pinnedApps
    return pinnedApps.filter((app) => normalizeForSearch(app.name).includes(query))
  }, [pinnedApps, searchQuery])

  const handleAppClick = (appId: string) => {
    onOpenWindow(appId)
    onClose()
  }

  const handleThemeSelect = (id: DesktopThemeId) => {
    setThemeId(id)
  }

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden />

      {/* Container estilo Windows 11: centralizado acima da barra de tarefas */}
      <div
        className="fixed left-1/2 -translate-x-1/2 bottom-14 z-50 w-[min(36rem,calc(100vw-1rem))] rounded-2xl shadow-2xl overflow-hidden flex flex-col border"
        style={{
          backgroundColor: "var(--panel-bg)",
          borderColor: "var(--panel-border)",
          maxHeight: "min(32rem, calc(100vh - 6rem))",
          minHeight: "24rem",
        }}
      >
        {/* Barra de pesquisa - topo fixo */}
        <div className="p-3 pb-2 flex-shrink-0">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70"
              style={{ color: "var(--desktop-text)" }}
              aria-hidden
            />
            <Input
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 h-11 rounded-xl border-0 bg-white/10 text-[var(--desktop-text)] placeholder:opacity-60 focus-visible:ring-2 focus-visible:ring-[var(--desktop-accent)]"
              style={{ color: "var(--desktop-text)" }}
              aria-label="Pesquisar aplicativos"
            />
          </div>
        </div>

        {/* Área rolável: Fixados + Personalização */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3 min-h-0">
          {/* Fixados / Resultados da pesquisa */}
          <div className="mb-4">
            <p
              className="text-xs font-medium uppercase tracking-wide opacity-80 mb-2 px-1"
              style={{ color: "var(--desktop-text)" }}
            >
              {searchQuery ? "Resultados" : "Fixados"}
            </p>
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-4 gap-1">
                {filteredApps.map((app) => (
                  <Button
                    key={app.id}
                    variant="ghost"
                    className="h-auto flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl hover:bg-white/10 transition-colors"
                    style={{ color: "var(--desktop-text)" }}
                    onClick={() => handleAppClick(app.id)}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${app.color}`}
                    >
                      <app.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-center leading-tight line-clamp-2">
                      {app.name}
                    </span>
                  </Button>
                ))}
              </div>
            ) : (
              <p
                className="text-sm py-4 text-center opacity-70"
                style={{ color: "var(--desktop-text)" }}
              >
                Nenhum resultado para &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {/* Personalização - temas */}
          <div>
            <p
              className="text-xs font-medium uppercase tracking-wide opacity-80 mb-2 px-1 flex items-center gap-1.5"
              style={{ color: "var(--desktop-text)" }}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: "var(--desktop-accent)" }} />
              Personalização
            </p>
            <div className="grid grid-cols-3 gap-2">
              {DESKTOP_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeSelect(theme.id)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[var(--desktop-accent)] focus:ring-offset-2 focus:ring-offset-[var(--panel-bg)]"
                  style={{
                    borderColor: themeId === theme.id ? "var(--desktop-accent)" : "var(--panel-border)",
                    backgroundColor: themeId === theme.id ? "var(--desktop-icon-bg)" : "transparent",
                  }}
                  title={theme.name}
                >
                  <div className="flex gap-0.5">
                    {theme.preview.map((color, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-md shrink-0"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[10px] font-medium truncate w-full text-center"
                    style={{ color: "var(--desktop-text)" }}
                  >
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé estilo Win11: usuário à esquerda, energia à direita */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-t"
          style={{ borderColor: "var(--panel-border)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20">
              <img
                src="/images/flaviojr.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="text-sm font-medium truncate"
              style={{ color: "var(--desktop-text)" }}
            >
              Flávio Ferreira
            </span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-white/10"
              style={{ color: "var(--desktop-text)" }}
              aria-label="Configurações"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg hover:bg-white/10"
              style={{ color: "var(--desktop-text)" }}
              aria-label="Encerrar"
            >
              <Power className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
