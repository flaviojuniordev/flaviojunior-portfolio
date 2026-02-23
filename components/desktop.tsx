"use client"

import { Monitor, Folder, FileText, User, Mail, Github, Linkedin, Terminal, Gamepad2 } from "lucide-react"

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
  ]

  // Barra de tarefas = h-12 (3rem). Usamos 4rem como margem segura para qualquer tela/zoom.
  const safeBottom = "4rem"
  const safeTop = "2rem"

  return (
    <div className="absolute inset-0 p-4" style={{ paddingBottom: safeBottom }}>
      {/* Wallpaper do Windows 11 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
        style={{
          backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
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
            <div className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 w-20">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2 group-hover:bg-white/30 transition-colors duration-200">
                <icon.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs font-medium text-center leading-tight">{icon.name}</span>
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
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
        >
          <Github className="w-5 h-5 text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/flaviojrdev/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
        >
          <Linkedin className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>
  )
}
