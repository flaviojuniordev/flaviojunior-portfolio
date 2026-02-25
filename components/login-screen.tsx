"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Power, Wifi, Volume2, ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onLogin: () => void
}

const ENTER_DURATION_MS = 600

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginScreen, setShowLoginScreen] = useState(false)
  const [isEntering, setIsEntering] = useState(true)
  const [cardVisible, setCardVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const exitDoneRef = useRef(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsEntering(false))
    })
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    if (showLoginScreen && !cardVisible) {
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setCardVisible(true))
      })
      return () => cancelAnimationFrame(t)
    }
  }, [showLoginScreen, cardVisible])

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
    setCardVisible(false)
    setShowLoginScreen(true)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular carregamento do sistema operacional
    await new Promise((resolve) => setTimeout(resolve, 1500))

    exitDoneRef.current = false
    setIsExiting(true)
  }

  const handleExitTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || e.propertyName !== "opacity" || !isExiting || exitDoneRef.current) return
    exitDoneRef.current = true
    onLogin()
  }

  const handleBack = () => {
    setShowLoginScreen(false)
  }

  const opacity = isEntering ? 0 : isExiting ? 0 : 1
  const exitDuration = 500

  return (
    <div
      className="h-screen w-full overflow-hidden relative ease-out"
      style={{
        opacity,
        transitionDuration: isExiting ? `${exitDuration}ms` : "600ms",
        transitionProperty: "opacity",
      }}
      onTransitionEnd={handleExitTransitionEnd}
    >
      {/* Background minimalista */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 100%)`,
          filter: showLoginScreen ? "blur(8px)" : "none",
        }}
      />

      {/* Overlay escuro quando mostra tela de login */}
      {showLoginScreen && <div className="absolute inset-0 bg-black/30" />}

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
        {!showLoginScreen ? (
          /* Seleção de usuário - aparência de sistema operacional */
          <div className="text-center">
            <div className="cursor-pointer group" onClick={handleUserClick}>
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto group-hover:scale-105 transition-transform duration-200 shadow-2xl border-2 border-white/20">
                <img
                  src="/images/flaviojr.jpg"
                  alt="Foto de Flávio Ferreira"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-2xl font-light mb-2">Flávio Ferreira</h2>
              <p className="text-white/80 text-sm">Desenvolvedor de Software</p>
              <p className="text-white/60 text-xs mt-6 animate-pulse">Clique para entrar</p>
            </div>
          </div>
        ) : (
          /* Tela de login - estilo sistema operacional */
          <div
            className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 w-96 shadow-2xl border border-white/10 transition-all duration-300 ease-out"
            style={{
              opacity: cardVisible ? 1 : 0,
              transform: cardVisible ? "scale(1)" : "scale(0.96)",
            }}
          >
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
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 mx-auto border-2 border-white/20">
                <img
                  src="/images/flaviojr.jpg"
                  alt="Foto de Flávio Ferreira"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-xl font-light">Flávio Ferreira</h2>
            </div>

            {/* Formulário */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                <p className="text-center text-white/90 text-sm">
                  Bem-vindo ao FlaviOS
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Iniciando sessão...
                  </div>
                ) : (
                  <>
                    <Power className="w-4 h-4" />
                    Iniciar Sessão
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
