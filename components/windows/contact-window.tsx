import type React from "react"
import { WindowBase } from "./window-base"
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

export function ContactWindow(props: ContactWindowProps) {
  return (
    <WindowBase title="Entre em Contato" {...props}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Informações de contato */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Vamos conversar!</h2>
            <p className="text-gray-600 text-sm">
              Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato comigo através dos
              canais abaixo.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600 text-sm">devflaviojunior@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Telefone</p>
                <p className="text-gray-600 text-sm">+55 (31) 98877-6303</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Localização</p>
                <p className="text-gray-600 text-sm">Belo Horizonte, Brasil</p>
              </div>
            </div>
          </div>

          {/* Links sociais */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">Redes Sociais</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open('https://www.linkedin.com/in/flaviojrdev/', '_blank')}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open('https://github.com/flaviojuniordev', '_blank')}
              >
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </div>
        </div>

        {/* Formulário de contato */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Envie uma mensagem</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nome
              </Label>
              <Input id="name" placeholder="Seu nome completo" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input id="email" type="email" placeholder="seu@email.com" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Assunto
              </Label>
              <Input id="subject" placeholder="Assunto da mensagem" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Mensagem
              </Label>
              <Textarea id="message" placeholder="Escreva sua mensagem aqui..." className="mt-1 min-h-[100px]" />
            </div>

            <Button className="w-full flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
