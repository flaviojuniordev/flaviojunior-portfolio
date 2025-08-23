import type React from "react"
import { useState } from "react"
import { WindowBase } from "./window-base"
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import emailjs from 'emailjs-com'

interface ContactWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export function ContactWindow(props: ContactWindowProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: 'error',
        message: 'Por favor, preencha todos os campos obrigatórios.'
      })
      return
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Por favor, insira um email válido.'
      })
      return
    }

    setFormStatus({
      type: 'loading',
      message: 'Enviando mensagem...'
    })

    try {
      // Configuração do EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Contato via Portfólio',
        message: formData.message,
        to_name: 'Flávio Júnior'
      }

      const result = await emailjs.send(
        'service_lat357w',
        'template_nxdp3dc', // Substitua pelo seu Template ID
        templateParams,
        'PTmA3Em5wq7rpSdXo' // Substitua pela sua Public Key
      )

      console.log('Email enviado com sucesso:', result.text)

      setFormStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Retornarei o contato em breve.'
      })

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

    } catch (error) {
      console.error('Erro ao enviar email:', error)
      setFormStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.'
      })
    }
  }

  const resetStatus = () => {
    setFormStatus({
      type: 'idle',
      message: ''
    })
  }

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

          {/* Status do formulário */}
          {formStatus.type !== 'idle' && (
            <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${formStatus.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : formStatus.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
              {formStatus.type === 'success' && <CheckCircle className="w-4 h-4" />}
              {formStatus.type === 'error' && <AlertCircle className="w-4 h-4" />}
              {formStatus.type === 'loading' && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              )}
              <span>{formStatus.message}</span>
              {formStatus.type !== 'loading' && (
                <button
                  onClick={resetStatus}
                  className="ml-auto text-xs underline hover:no-underline"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nome *
              </Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
                className="mt-1"
                value={formData.name}
                onChange={handleInputChange}
                disabled={formStatus.type === 'loading'}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="mt-1"
                value={formData.email}
                onChange={handleInputChange}
                disabled={formStatus.type === 'loading'}
                required
              />
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Assunto
              </Label>
              <Input
                id="subject"
                placeholder="Assunto da mensagem"
                className="mt-1"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={formStatus.type === 'loading'}
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Mensagem *
              </Label>
              <Textarea
                id="message"
                placeholder="Escreva sua mensagem aqui..."
                className="mt-1 min-h-[100px]"
                value={formData.message}
                onChange={handleInputChange}
                disabled={formStatus.type === 'loading'}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full flex items-center gap-2"
              disabled={formStatus.type === 'loading'}
            >
              {formStatus.type === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-2">
            * Campos obrigatórios
          </p>
        </div>
      </div>
    </WindowBase>
  )
}
