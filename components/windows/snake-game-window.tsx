"use client"

import type React from "react"
import { useState, useCallback, useEffect, useRef } from "react"
import { WindowBase } from "./window-base"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

const GRID_SIZE = 18
const CELL_PX = 16
const INITIAL_SPEED_MS = 120

type Dir = "up" | "down" | "left" | "right"

interface SnakeGameWindowProps {
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onActivate: () => void
  style?: React.CSSProperties
}

function randomCell(): { x: number; y: number } {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }
}

function newFood(snake: { x: number; y: number }[]): { x: number; y: number } {
  let f = randomCell()
  while (snake.some((s) => s.x === f.x && s.y === f.y)) {
    f = randomCell()
  }
  return f
}

export function SnakeGameWindow(props: SnakeGameWindowProps) {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
  ])
  const [food, setFood] = useState<{ x: number; y: number }>(() =>
    newFood([{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }])
  )
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [running, setRunning] = useState(true)
  const [paused, setPaused] = useState(false)
  const nextDirRef = useRef<Dir>("right")
  const speedMsRef = useRef(INITIAL_SPEED_MS)
  const foodRef = useRef(food)
  foodRef.current = food

  const resetGame = useCallback(() => {
    const start = { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }
    const initialSnake = [start]
    setSnake(initialSnake)
    setFood(newFood(initialSnake))
    nextDirRef.current = "right"
    setScore(0)
    setGameOver(false)
    setRunning(true)
    setPaused(false)
    speedMsRef.current = INITIAL_SPEED_MS
  }, [])

  // Teclado: setas e WASD
  useEffect(() => {
    if (!props.isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault()
          resetGame()
        }
        return
        }
      if (e.key === " " || e.key === "p" || e.key === "P") {
        e.preventDefault()
        setPaused((p) => !p)
        return
      }

      const keyToDir: Record<string, Dir> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        W: "up",
        a: "left",
        A: "left",
        s: "down",
        S: "down",
        d: "right",
        D: "right",
      }
      const d = keyToDir[e.key]
      if (d) {
        e.preventDefault()
        const prev = nextDirRef.current
        if (d === "up" && prev === "down") return
        if (d === "down" && prev === "up") return
        if (d === "left" && prev === "right") return
        if (d === "right" && prev === "left") return
        nextDirRef.current = d
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [props.isActive, gameOver, resetGame])

  // Game loop
  useEffect(() => {
    if (!running || gameOver || paused || !props.isActive) return

    const id = setInterval(() => {
      setSnake((s) => {
        const head = s[0]
        const d = nextDirRef.current
        let nx = head.x
        let ny = head.y
        if (d === "up") ny--
        if (d === "down") ny++
        if (d === "left") nx--
        if (d === "right") nx++

        if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
          setGameOver(true)
          setRunning(false)
          return s
        }
        if (s.some((seg) => seg.x === nx && seg.y === ny)) {
          setGameOver(true)
          setRunning(false)
          return s
        }

        const currentFood = foodRef.current
        const newSnake = [{ x: nx, y: ny }, ...s]
        if (nx === currentFood.x && ny === currentFood.y) {
          setScore((sc) => sc + 1)
          setFood(newFood(newSnake))
          speedMsRef.current = Math.max(60, speedMsRef.current - 2)
          return newSnake
        }
        newSnake.pop()
        return newSnake
      })
    }, speedMsRef.current)

    return () => clearInterval(id)
  }, [running, gameOver, paused, props.isActive])

  const size = GRID_SIZE * CELL_PX

  return (
    <WindowBase title="Snake Game" {...props}>
      <div
        className="h-full flex flex-col min-h-0 bg-[#1a1a2e] rounded-xl overflow-hidden"
        onClick={props.onActivate}
      >
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="text-green-400 font-mono text-sm">Pontuação: {score}</span>
          {!gameOver && (
            <span className="text-white/60 text-xs">
              {paused ? "Pausado (P)" : "Setas ou WASD · P = pausar"}
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation()
              resetGame()
            }}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reiniciar
          </Button>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center p-4">
          <div
            className="relative rounded-lg overflow-hidden border-2 border-green-500/50 shadow-lg shadow-green-500/20"
            style={{ width: size, height: size }}
          >
            {/* Grid */}
            <div
              className="absolute inset-0 bg-[#16213e]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: `${CELL_PX}px ${CELL_PX}px`,
              }}
            />
            {/* Food */}
            <div
              className="absolute rounded-sm bg-red-500"
              style={{
                left: food.x * CELL_PX + 2,
                top: food.y * CELL_PX + 2,
                width: CELL_PX - 4,
                height: CELL_PX - 4,
              }}
            />
            {/* Snake */}
            {snake.map((seg, i) => (
              <div
                key={`${seg.x}-${seg.y}-${i}`}
                className="absolute rounded-sm"
                style={{
                  left: seg.x * CELL_PX + 1,
                  top: seg.y * CELL_PX + 1,
                  width: CELL_PX - 2,
                  height: CELL_PX - 2,
                  backgroundColor: i === 0 ? "#22c55e" : "#16a34a",
                  boxShadow: i === 0 ? "0 0 8px #22c55e" : undefined,
                }}
              />
            ))}

            {gameOver && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-bold text-white">Game Over</p>
                <p className="text-green-400 font-mono">Pontuação: {score}</p>
                <Button
                  onClick={resetGame}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Jogar de novo
                </Button>
                <p className="text-white/60 text-xs">Ou pressione Espaço / Enter</p>
              </div>
            )}

            {paused && !gameOver && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <p className="text-lg font-semibold text-white">Pausado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </WindowBase>
  )
}
