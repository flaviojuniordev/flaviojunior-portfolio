import type React from "react"
import { useState, useRef, useEffect } from "react"
import { WindowBase } from "./window-base"

interface TerminalWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

type CommandOutput = { type: "command"; text: string } | { type: "output"; text: string } | { type: "error"; text: string }

const TERMINAL_DATA = {
  sobre: `
=== SOBRE MIM ===

Flávio Ferreira
Desenvolvedor Full Stack
Belo Horizonte, Brasil | 20 anos

Sobre mim:
Sou um desenvolvedor full stack em formação, apaixonado por tecnologia e resolução de problemas. Tenho experiência prática com Flutter, Spring Boot, Ruby on Rails e inteligência artificial aplicada, além de já ter atuado em projetos reais nos setores público, privado e acadêmico. Gosto de aprender na prática e transformar ideias em soluções úteis.

Quando não estou codando, gosto de estudar novas tecnologias, jogar videogames e passar tempo com minha família. Sempre em busca de novos desafios e oportunidades de crescimento profissional.

Estatísticas: 30+ Projetos | 3+ Anos Exp. | 20+ Tecnologias
`.trim(),

  habilidades: `
=== HABILIDADES & TECNOLOGIAS ===

Frontend: React (90%), Next.js (85%), TypeScript (80%), Tailwind CSS (95%)
Backend: Node.js (80%), Python (90%), Spring Boot (85%), API REST (90%)
Database: SQL (80%), NoSQL (30%), AWS (60%), Azure (75%)
Mobile: React Native (70%), Flutter (60%), Expo (70%)

Outras: .NET, Django, Ruby on Rails, Git, Docker, AWS, Vercel, Figma, Photoshop, Agile, Scrum
`.trim(),

  contato: `
=== CONTATO ===

Email: devflaviojunior@gmail.com
Telefone: +55 (31) 98877-6303
Localização: Belo Horizonte, Brasil

Redes: linkedin.com/in/flaviojrdev | github.com/flaviojuniordev
`.trim(),

  curriculo: `
=== CURRÍCULO ===

Flávio Ferreira - Desenvolvedor de Software

EXPERIÊNCIA:
• Desenvolvedor Full Stack Júnior @ CDC Bank (Ago 2025 - Presente)
  Sistemas de crédito, Crédito Protegido, Leilão de Crédito, CLT Ativo.

• Desenvolvedor Full Stack Estagiário @ Jedis Tecnologia (Mar 2025 - Ago 2025)
  ATS com Ruby on Rails, IA com Python e NPL.

• Desenvolvedor Back End Trainee @ Agência Experimental PUC Minas (Jul 2024 - Fev 2025)
  Projeto CuidoBem - Instituto Mario Penna.

• Desenvolvedor Freelancer Web @ Alfa Cards (Mai 2024 - Dez 2024)

EDUCAÇÃO:
• Bacharelado em Engenharia de Software - PUC Minas (2024 - 2027)

CERTIFICAÇÕES: Red Hat System Administration I | Huawei Talent AI Overview
`.trim(),

  projetos: `
=== PROJETOS ===

1. Rhapido AI (Concluído)
   IA de compatibilidade candidatos/vagas com análise semântica.
   Tech: Python, OpenAI API, Scikit-Learn, NLP, ML.

2. Plataforma Gnosi (Concluído)
   Cursos online, usuários, progresso e certificados.
   Tech: React, Spring Boot, Java, PostgreSQL, JWT.

3. QRCode Generator (Concluído)
   Gerador de QR Codes em Python (desktop).
   Tech: Python, Tkinter, Pillow, qrcode.

4. Snake Game (Concluído)
   Jogo da cobrinha com Pygame.
   Tech: Python, Pygame.
`.trim(),
}

function getOutput(input: string): CommandOutput[] {
  const cmd = input.trim().toLowerCase()
  if (!cmd) return []

  if (cmd === "clear" || cmd === "cls") {
    return [{ type: "command", text: input }]
  }

  if (cmd === "/ajuda" || cmd === "/help") {
    return [
      { type: "command", text: input },
      {
        type: "output",
        text: `
Comandos disponíveis:
  /sobre       - Informações sobre mim
  /habilidades - Tecnologias e habilidades
  /contato     - Email, telefone e redes
  /curriculo   - Experiência e educação
  /projetos    - Lista de projetos
  /ajuda       - Esta mensagem
  clear, cls   - Limpar tela
`.trim(),
      },
    ]
  }

  const key = cmd.replace("/", "") as keyof typeof TERMINAL_DATA
  if (key in TERMINAL_DATA) {
    return [
      { type: "command", text: input },
      { type: "output", text: TERMINAL_DATA[key] },
    ]
  }

  return [
    { type: "command", text: input },
    {
      type: "error",
      text: `Comando não encontrado: ${input}\nDigite /ajuda para ver os comandos disponíveis.`,
    },
  ]
}

export function TerminalWindow(props: TerminalWindowProps) {
  const [history, setHistory] = useState<CommandOutput[]>([
    { type: "output", text: "Terminal do Portfolio — Digite /ajuda para ver os comandos.\n" },
  ])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const newEntries = getOutput(trimmed)
    if (newEntries.length === 1 && (trimmed === "clear" || trimmed === "cls")) {
      setHistory([{ type: "output", text: "Terminal do Portfolio — Digite /ajuda para ver os comandos.\n" }])
    } else {
      setHistory((prev) => [...prev, ...newEntries])
    }
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setHistory([{ type: "output", text: "Terminal do Portfolio — Digite /ajuda para ver os comandos.\n" }])
    }
  }

  return (
    <WindowBase title="Terminal" {...props}>
      <div
        className="h-full flex flex-col min-h-0 bg-[#0c0c0c] text-green-400 font-mono text-sm rounded-xl overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1">
          {history.map((entry, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {entry.type === "command" && (
                <span className="text-green-300">
                  <span className="text-gray-500">$ </span>
                  {entry.text}
                </span>
              )}
              {entry.type === "output" && (
                <span className="text-green-400/90 block mt-1">{entry.text}</span>
              )}
              {entry.type === "error" && (
                <span className="text-red-400 block mt-1">{entry.text}</span>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex-shrink-0 border-t border-green-400/30 p-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder:text-green-400/40"
              placeholder="Digite um comando (ex: /sobre)"
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </form>
      </div>
    </WindowBase>
  )
}
