"use client"

import { Monitor, Folder, FileText, User, Mail, Github, Linkedin, Terminal, Gamepad2, Music2, Globe } from "lucide-react"

interface DesktopProps {
  onOpenWindow: (windowId: string) => void
}

export function Desktop({ onOpenWindow }: DesktopProps) {
  const desktopIcons = [
    { id: "about", name: "Sobre", icon: User },
    { id: "projects", name: "Projetos", icon: Folder },
    { id: "skills", name: "Habilidades", icon: Monitor },
    { id: "contact", name: "Contato", icon: Mail },
    { id: "resume", name: "Currículo", icon: FileText },
    { id: "terminal", name: "Terminal", icon: Terminal },
    { id: "jogos", name: "Jogos", icon: Gamepad2 },
    { id: "music", name: "Music", icon: Music2 },
    { id: "browser", name: "Navegador", icon: Globe },
  ]

  // Barra de tarefas = h-12 (3rem). Usamos 4rem como margem segura para qualquer tela/zoom.
  const safeBottom = "4rem"
  const safeTop = "2rem"

  return (
    <div className="absolute inset-0 p-4" style={{ paddingBottom: safeBottom }}>
      {/* Wallpaper (paleta do tema) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom right, var(--desktop-from), var(--desktop-via), var(--desktop-to))`,
          backgroundImage: `
          linear-gradient(to bottom right, var(--desktop-from), var(--desktop-via), var(--desktop-to)),
          radial-gradient(circle at 20% 80%, var(--desktop-overlay-1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, var(--desktop-overlay-2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, var(--desktop-overlay-3) 0%, transparent 50%)
        `,
        }}
      />

      {/* Área dos ícones: fluxo em colunas (preenche de cima pra baixo, depois coluna ao lado) */}
      <div
        className="absolute left-8 top-8 flex flex-col flex-wrap content-start gap-6"
        style={{
          height: `calc(100vh - ${safeTop} - ${safeBottom})`,
        }}
      >
        {desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="cursor-pointer group flex-shrink-0 w-20"
            onDoubleClick={() => onOpenWindow(icon.id)}
          >
            <div className="flex flex-col items-center p-3 rounded-lg transition-colors duration-200 w-20 hover:bg-[var(--desktop-icon-bg-hover)]" style={{ backgroundColor: "transparent" }}>
              <div className="w-12 h-12 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 transition-colors duration-200 group-hover:bg-[var(--desktop-icon-bg-hover)]" style={{ backgroundColor: "var(--desktop-icon-bg)" }}>
                <icon.icon className="w-6 h-6 text-[var(--desktop-text)]" />
              </div>
              <span className="text-xs font-medium text-center leading-tight text-[var(--desktop-text)]">{icon.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Links sociais no canto superior direito */}
      <div className="absolute top-4 right-4 flex gap-2">
        <a
          href="https://github.com/flaviojuniordev"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="w-10 h-10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-[var(--desktop-icon-bg-hover)]"
          style={{ backgroundColor: "var(--desktop-icon-bg)" }}
        >
          <Github className="w-5 h-5 text-[var(--desktop-text)]" />
        </a>
        <a
          href="https://www.linkedin.com/in/flaviojrdev/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="w-10 h-10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-[var(--desktop-icon-bg-hover)]"
          style={{ backgroundColor: "var(--desktop-icon-bg)" }}
        >
          <Linkedin className="w-5 h-5 text-[var(--desktop-text)]" />
        </a>
      </div>
    </div>
  )
}
