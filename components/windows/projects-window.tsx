import type React from "react"
import { WindowBase } from "./window-base"
import { ExternalLink, Github, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectsWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function ProjectsWindow(props: ProjectsWindowProps) {
  const projects = [
    {
      id: 1,
      title: "Rhapido AI",
      description: "IA que analisa a compatibilidade entre candidatos e vagas com base em similaridade semântica, gerando a porcentagem de match ideal.",
      image: "/rhapidoai.png?height=120&width=200",
      technologies: ["Python", "OpenAI API", "Scikit-Learn"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true,
    },
    {
      id: 2,
      title: "Plataforma de Cursos Online",
      description: "Desenvolvida com Spring Boot, React e SQL, permitindo cadastro de usuários, gerenciamento de cursos, progresso e emissão de certificados.",
      image: "/gnosi.png?height=120&width=200",
      technologies: ["React", "Spring Boot", "Java", "SQL"],
      github: "https://github.com/flaviojuniordev/Plataforma-de-Cursos-Gnosi",
      demo: "https://github.com/flaviojuniordev/Plataforma-de-Cursos-Gnosi",
      featured: false,
    },
    {
      id: 3,
      title: "QRCode Generator",
      description: "Gerador de QR Codes com interface em Python usando Tkinter e Pillow para criação e exportação de imagens.",
      image: "/qrcodegen.png?height=120&width=200",
      technologies: ["Python", "Tkinter", "Pillow"],
      github: "https://github.com/flaviojuniordev/python/tree/main/Projeto%20QRCode%20Generator",
      demo: "https://github.com/flaviojuniordev/python/tree/main/Projeto%20QRCode%20Generator",
      featured: false,
    },
  ]

  // Function to open links in a new tab
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <WindowBase title="Meus Projetos" {...props}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Projetos em Destaque</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {projects.length} projetos
          </Badge>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-24 h-16 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{project.title}</h3>
                    {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => openLink(project.github)}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Código
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => openLink(project.demo)}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WindowBase>
  )
}
