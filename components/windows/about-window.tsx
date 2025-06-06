import type React from "react"
import { WindowBase } from "./window-base"
import { User, MapPin, Calendar, Heart } from "lucide-react"

interface AboutWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function AboutWindow(props: AboutWindowProps) {
  return (
    <WindowBase title="Sobre Mim" {...props}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/images/flaviojr.jpg"
              alt="Foto de Flávio Júnior"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Flávio Júnior</h1>
            <p className="text-gray-600">Desenvolvedor Full Stack</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Belo Horizonte, Brasil</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>20 anos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Sobre mim
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Sou um desenvolvedor full stack em formação, apaixonado por tecnologia e resolução de problemas. Tenho experiência prática com Flutter, Spring Boot, Ruby on Rails e inteligência artificial aplicada, além de já ter atuado em projetos reais nos setores público, privado e acadêmico. Gosto de aprender na prática e transformar ideias em soluções úteis.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Quando não estou codando, gosto de estudar novas tecnologias, jogar videogames e passar tempo com minha
            família. Sempre em busca de novos desafios e oportunidades de crescimento profissional.
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">30+</div>
            <div className="text-sm text-gray-600">Projetos</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">3+</div>
            <div className="text-sm text-gray-600">Anos Exp.</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">20+</div>
            <div className="text-sm text-gray-600">Tecnologias</div>
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
