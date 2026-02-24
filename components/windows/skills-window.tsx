import type React from "react"
import { WindowBase } from "./window-base"
import { Code, Database, Server, Smartphone, Globe } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SkillsWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function SkillsWindow(props: SkillsWindowProps) {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "text-blue-600",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
      ],
    },
    {
      title: "Backend",
      icon: Server,
      color: "text-green-600",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Python", level: 90 },
        { name: "Spring Boot", level: 85 },
        { name: "API REST", level: 90 },
      ],
    },
    {
      title: "Database",
      icon: Database,
      color: "text-purple-600",
      skills: [
        { name: "SQL", level: 80 },
        { name: "NoSQL", level: 30 },
        { name: "AWS", level: 60 },
        { name: "Azure", level: 75 },
      ],
    },
    {
      title: "Mobile",
      icon: Smartphone,
      color: "text-orange-600",
      skills: [
        { name: "React Native", level: 70 },
        { name: "Flutter", level: 60 },
        { name: "Expo", level: 70 },
      ],
    },
  ]

  return (
    <WindowBase title="Minhas Habilidades" {...props}>
      <div className="p-4 sm:p-6 space-y-6">
        <h1 className="text-xl font-bold text-gray-800">Tecnologias & Ferramentas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div className="flex items-center gap-2">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                <h2 className="font-semibold text-gray-800">{category.title}</h2>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Outras habilidades */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            Outras Competências
          </h2>
          <div className="flex flex-wrap gap-2">
            {[".NET", "Django", "Ruby on Rails", "Git", "Docker", "AWS", "Vercel", "Figma", "Photoshop", "Agile", "Scrum"].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
