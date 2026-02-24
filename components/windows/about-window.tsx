import type React from "react"
import { useState } from "react"
import { WindowBase } from "./window-base"
import { User, MapPin, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AboutWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function AboutWindow(props: AboutWindowProps) {
  const [language, setLanguage] = useState<'pt-BR' | 'en-US'>('pt-BR')

  // Translations object
  const translations = {
    'pt-BR': {
      title: 'Sobre Mim',
      role: 'Desenvolvedor Full Stack',
      location: 'Belo Horizonte, Brasil',
      age: '20 anos',
      aboutMeTitle: 'Sobre mim',
      aboutMeP1: 'Sou um desenvolvedor full stack em formação, apaixonado por tecnologia e resolução de problemas. Tenho experiência prática com Flutter, Spring Boot, Ruby on Rails e inteligência artificial aplicada, além de já ter atuado em projetos reais nos setores público, privado e acadêmico. Gosto de aprender na prática e transformar ideias em soluções úteis.',
      aboutMeP2: 'Quando não estou codando, gosto de estudar novas tecnologias, jogar videogames e passar tempo com minha família. Sempre em busca de novos desafios e oportunidades de crescimento profissional.',
      projects: 'Projetos',
      experience: 'Anos Exp.',
      technologies: 'Tecnologias'
    },
    'en-US': {
      title: 'About Me',
      role: 'Full Stack Developer',
      location: 'Belo Horizonte, Brazil',
      age: '20 years old',
      aboutMeTitle: 'About me',
      aboutMeP1: 'I am a full stack developer in training, passionate about technology and problem solving. I have practical experience with Flutter, Spring Boot, Ruby on Rails and applied artificial intelligence, and have already worked on real projects in the public, private and academic sectors. I like to learn by doing and transform ideas into useful solutions.',
      aboutMeP2: 'When I\'m not coding, I enjoy studying new technologies, playing video games, and spending time with my family. Always looking for new challenges and professional growth opportunities.',
      projects: 'Projects',
      experience: 'Yrs Exp.',
      technologies: 'Technologies'
    }
  }

  // Translation function
  const t = (key: keyof typeof translations['pt-BR']) => {
    return translations[language][key]
  }

  return (
    <WindowBase title={t('title')} {...props}>
      <div className="relative p-4 sm:p-6 space-y-6">
        {/* Language Selector */}
        <div className="absolute top-14 right-8 flex space-x-2">
          <Button
            onClick={() => setLanguage('pt-BR')}
            className={`p-1 h-8 w-8 rounded-full overflow-hidden ${language === 'pt-BR' ? 'ring-2 ring-blue-500' : 'opacity-70'}`}
            variant="ghost"
            title="Português"
          >
            <img
              src="https://flagcdn.com/br.svg"
              alt="Bandeira do Brasil"
              className="w-full h-full object-cover"
            />
          </Button>
          <Button
            onClick={() => setLanguage('en-US')}
            className={`p-1 h-8 w-8 rounded-full overflow-hidden ${language === 'en-US' ? 'ring-2 ring-blue-500' : 'opacity-70'}`}
            variant="ghost"
            title="English"
          >
            <img
              src="https://flagcdn.com/us.svg"
              alt="USA Flag"
              className="w-full h-full object-cover"
            />
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="/images/flaviojr.jpg"
              alt="Foto de Flávio Ferreira"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Flávio Ferreira</h1>
            <p className="text-gray-600">{t('role')}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{t('location')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{t('age')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            {t('aboutMeTitle')}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {t('aboutMeP1')}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {t('aboutMeP2')}
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">30+</div>
            <div className="text-sm text-gray-600">{t('projects')}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">3+</div>
            <div className="text-sm text-gray-600">{t('experience')}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">20+</div>
            <div className="text-sm text-gray-600">{t('technologies')}</div>
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
