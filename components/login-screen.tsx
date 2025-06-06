"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Power, Wifi, Volume2, ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const handleUserClick = () => {
    setShowPasswordField(true)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular carregamento
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onLogin()
  }

  const handleBack = () => {
    setShowPasswordField(false)
    setPassword("")
  }

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Background minimalista */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 100%)`,
          filter: showPasswordField ? "blur(8px)" : "none",
        }}
      />

      {/* Overlay escuro quando mostra campo de senha */}
      {showPasswordField && <div className="absolute inset-0 bg-black/30" />}

      {/* Data e Hora */}
      <div className="absolute bottom-6 right-6 text-right">
        <div className="text-white text-4xl font-light mb-1">{formatTime(currentTime)}</div>
        <div className="text-white/80 text-lg">{formatDate(currentTime)}</div>
      </div>

      {/* Ícones do sistema (canto inferior esquerdo) */}
      <div className="absolute bottom-6 left-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-white/10 rounded-full text-white">
          <Wifi className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-white/10 rounded-full text-white">
          <Volume2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Card de Login */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!showPasswordField ? (
          /* Seleção de usuário */
          <div className="text-center">
            <div className="cursor-pointer group" onClick={handleUserClick}>
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto group-hover:scale-105 transition-transform duration-200 shadow-2xl">
                <img
                  src="/images/flaviojr.jpg"
                  alt="Foto de Flávio Júnior"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-2xl font-light mb-2">Flávio Júnior</h2>
              <p className="text-white/80 text-sm">Desenvolvedor</p>
            </div>
          </div>
        ) : (
          /* Campo de senha */
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 w-96 shadow-2xl border border-white/10">
            {/* Botão voltar */}
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-white hover:bg-white/10 rounded-lg p-2"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {/* Avatar e nome */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 mx-auto">
                <img
                  src="/images/flaviojr.jpg"
                  alt="Foto de Flávio Júnior"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-xl font-light">Flávio Júnior</h2>
            </div>

            {/* Formulário */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-lg pr-12 h-12"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/10 rounded text-white/60"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            {/* Opções adicionais */}
            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm"
              >
                Esqueci minha senha
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm"
              >
                Opções de entrada
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
