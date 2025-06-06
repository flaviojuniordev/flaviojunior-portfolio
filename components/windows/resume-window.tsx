import type React from "react"
import { WindowBase } from "./window-base"
import { Download, Briefcase, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ResumeWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function ResumeWindow(props: ResumeWindowProps) {
  const experiences = [
    {
      title: "Desenvolvedor Full Stack",
      company: "Jedis Tecnologia",
      period: "Março 2025 - Presente",
      description: "Manutenção em sistema ATS com Ruby on Rails, desenvolvimento de IA com Python e NPL",
    },
    {
      title: "Desenvolvedor Back End",
      company: "Agência Experimental de Software da PUC Minas",
      period: "Julho 2024 - Fevereiro 2025",
      description: "Atuação no projeto CuidoBem em parceria com Instituto Mario Penna",
    },
    {
      title: "Desenvolvedor Freelancer Web",
      company: "Alfa Cards",
      period: "Maio 2024 - Dezembro 2024",
      description: "Criação de interfaces responsivas e otimizadas para diversos clientes.",
    },
  ]

  const education = [
    {
      title: "Bacharelado em Engenharia de Software",
      institution: "Pontifícia Universidade Católica de Minas Gerais",
      period: "2024 - 2027",
      description: "Formação em desenvolvimento de software e algoritmos.",
    },
  ]

  const certifications = [
    "Red Hat System Administration I",
    "Huawei Talent AI Overview",
  ]

  return (
    <WindowBase title="Meu Currículo" {...props}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Flávio Júnior</h1>
            <p className="text-gray-600">Desenvolvedor de Software</p>
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() => window.open('/curriculo.pdf', '_blank')}
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>
        </div>

        {/* Experiência Profissional */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Experiência Profissional
          </h2>

          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-blue-600 font-medium text-sm mb-2">{exp.company}</p>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educação */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-green-600" />
            Educação
          </h2>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-green-200 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{edu.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {edu.period}
                  </Badge>
                </div>
                <p className="text-green-600 font-medium text-sm mb-2">{edu.institution}</p>
                <p className="text-gray-600 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificações */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Certificações
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
