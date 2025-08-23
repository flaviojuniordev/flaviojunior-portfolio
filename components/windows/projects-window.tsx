import type React from "react"
import { useState } from "react"
import { WindowBase } from "./window-base"
import { ExternalLink, Github, Star, ArrowLeft, Calendar, Code, Globe, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectsWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo?: string
  featured: boolean
  detailedDescription?: string
  features?: string[]
  challenges?: string[]
  learnings?: string[]
  status: "completed" | "in-progress" | "planned"
  startDate?: string
  endDate?: string
}

export function ProjectsWindow(props: ProjectsWindowProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Rhapido AI",
      description: "IA que analisa a compatibilidade entre candidatos e vagas com base em similaridade semântica, gerando a porcentagem de match ideal.",
      detailedDescription: "Sistema inteligente que revoluciona o processo de recrutamento utilizando algoritmos de processamento de linguagem natural para analisar currículos e descrições de vagas, calculando a compatibilidade através de análise semântica avançada.",
      image: "/rhapidoai.png",
      technologies: ["Python", "OpenAI API", "Scikit-Learn", "NLP", "Machine Learning"],
      featured: true,
      status: "completed",
      startDate: "2024-01",
      endDate: "2024-03",
      features: [
        "Análise semântica de currículos e vagas",
        "Cálculo de porcentagem de compatibilidade",
        "Interface intuitiva para recrutadores",
        "Relatórios detalhados de matches",
        "Integração com APIs de IA"
      ],
      challenges: [
        "Implementação de algoritmos de NLP precisos",
        "Otimização da performance para análise em lote",
        "Criação de métricas confiáveis de compatibilidade"
      ],
      learnings: [
        "Aprofundamento em Machine Learning",
        "Experiência com APIs de IA",
        "Desenvolvimento de sistemas de recomendação"
      ]
    },
    {
      id: 2,
      title: "Plataforma Gnosi",
      description: "Plataforma completa de cursos online com gerenciamento de usuários, progresso e certificados.",
      detailedDescription: "Sistema educacional robusto desenvolvido para facilitar o aprendizado online, oferecendo uma experiência completa desde o cadastro até a emissão de certificados.",
      image: "/gnosi.png",
      technologies: ["React", "Spring Boot", "Java", "PostgreSQL", "JWT"],
      github: "https://github.com/flaviojuniordev/Plataforma-de-Cursos-Gnosi",
      featured: false,
      status: "completed",
      startDate: "2023-08",
      endDate: "2023-12",
      features: [
        "Cadastro e autenticação de usuários",
        "Catálogo completo de cursos",
        "Sistema de progresso personalizado",
        "Emissão automática de certificados",
        "Dashboard administrativo",
        "Avaliações e quizzes interativos"
      ],
      challenges: [
        "Arquitetura escalável do backend",
        "Integração segura entre frontend e backend",
        "Sistema de certificação confiável"
      ],
      learnings: [
        "Desenvolvimento full-stack completo",
        "Boas práticas de segurança",
        "Arquitetura de microsserviços"
      ]
    },
    {
      id: 3,
      title: "QRCode Generator",
      description: "Gerador de QR Codes com interface desktop em Python.",
      detailedDescription: "Aplicação desktop intuitiva para geração e exportação de QR Codes personalizados, desenvolvida para simplificar a criação de códigos QR para diversos propósitos.",
      image: "/qrcodegen.png",
      technologies: ["Python", "Tkinter", "Pillow", "qrcode"],
      github: "https://github.com/flaviojuniordev/python/tree/main/Projeto%20QRCode%20Generator",
      featured: false,
      status: "completed",
      startDate: "2023-05",
      endDate: "2023-06",
      features: [
        "Interface gráfica intuitiva",
        "Geração de QR Codes personalizados",
        "Exportação em múltiplos formatos",
        "Visualização em tempo real",
        "Configurações de tamanho e qualidade"
      ],
      challenges: [
        "Design de interface amigável",
        "Otimização da qualidade dos QR Codes",
        "Tratamento de diferentes tipos de entrada"
      ],
      learnings: [
        "Desenvolvimento de aplicações desktop",
        "Manipulação de imagens com Pillow",
        "Interface gráfica com Tkinter"
      ]
    },
    {
      id: 4,
      title: "Snake Game",
      description: "Jogo clássico da cobrinha desenvolvido em Python usando Pygame.",
      detailedDescription: "Implementação completa do clássico jogo Snake (Jogo da Cobrinha) utilizando Python e Pygame, com mecânicas tradicionais, sistema de pontuação e interface gráfica responsiva.",
      image: "/snakegame.png",
      technologies: ["Python", "Pygame", "Game Development"],
      github: "https://github.com/flaviojuniordev/snake-game",
      featured: false,
      status: "completed",
      startDate: "2023-03",
      endDate: "2023-04",
      features: [
        "Mecânicas clássicas do jogo Snake",
        "Sistema de pontuação em tempo real",
        "Controles responsivos (WASD/Setas)",
        "Detecção de colisões precisas",
        "Interface gráfica limpa e intuitiva",
        "Game over com opção de reiniciar"
      ],
      challenges: [
        "Implementação da lógica de movimento da cobra",
        "Sistema de colisões eficiente",
        "Controle de framerate e fluidez do jogo",
        "Gerenciamento de estados do jogo"
      ],
      learnings: [
        "Desenvolvimento de jogos com Pygame",
        "Programação orientada a eventos",
        "Algoritmos de detecção de colisão",
        "Game loops e controle de tempo"
      ]
    }
  ]

  // Function to open links in a new tab
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleBackClick = () => {
    setSelectedProject(null)
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700'
      case 'planned':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'in-progress':
        return 'Em Progresso'
      case 'planned':
        return 'Planejado'
      default:
        return 'Desconhecido'
    }
  }

  if (!selectedProject) {
    return (
      <WindowBase title="Projetos - Pasta" {...props}>
        <div className="h-full bg-white">
          {/* Toolbar da pasta */}
          <div className="border-b border-gray-200 p-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Meus Projetos</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                {projects.length} itens
              </Badge>
            </div>
          </div>

          {/* Grid de projetos (simulando arquivos) */}
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
                  onClick={() => handleProjectClick(project)}
                  onDoubleClick={() => handleProjectClick(project)}
                >
                  {/* Ícone do projeto */}
                  <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <div className="absolute top-1 right-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Nome do projeto */}
                  <span className="text-xs text-center text-gray-700 group-hover:text-blue-700 font-medium max-w-full break-words">
                    {project.title}
                  </span>

                  {/* Status badge */}
                  <Badge
                    variant="outline"
                    className={`mt-1 text-xs h-4 ${getStatusColor(project.status)}`}
                  >
                    {getStatusText(project.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WindowBase>
    )
  }

  return (
    <WindowBase title={`Projeto - ${selectedProject.title}`} {...props}>
      <div className="h-full bg-white">
        {/* Header com botão voltar */}
        <div className="border-b border-gray-200 p-3 bg-gray-50">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="h-8 px-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded overflow-hidden">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-800">{selectedProject.title}</span>
              {selectedProject.featured && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo detalhado */}
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Cabeçalho do projeto */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h1>
                <p className="text-gray-600">{selectedProject.detailedDescription}</p>
              </div>
              <Badge className={getStatusColor(selectedProject.status)}>
                {getStatusText(selectedProject.status)}
              </Badge>
            </div>

            {/* Imagem do projeto */}
            <div className="w-full h-64 rounded-lg border border-gray-200 bg-gray-50 p-4 flex items-center justify-center">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="max-w-full max-h-full object-contain rounded-md shadow-sm"
              />
            </div>

            {/* Informações básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Período
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedProject.startDate} - {selectedProject.endDate || 'Em andamento'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Tecnologias
                </h3>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Links do projeto */}
            <div className="flex gap-3">
              {selectedProject.github && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openLink(selectedProject.github!)}
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Código Fonte
                </Button>
              )}
              {selectedProject.demo && (
                <Button
                  size="sm"
                  onClick={() => openLink(selectedProject.demo!)}
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Ver Demo
                </Button>
              )}
            </div>
          </div>

          {/* Seções detalhadas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funcionalidades */}
            {selectedProject.features && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Funcionalidades Principais</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Desafios */}
            {selectedProject.challenges && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Principais Desafios</h3>
                <ul className="space-y-2">
                  {selectedProject.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Aprendizados */}
            {selectedProject.learnings && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Principais Aprendizados</h3>
                <ul className="space-y-2">
                  {selectedProject.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
