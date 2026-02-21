"use client"

import { useEffect, useState, useCallback, useRef } from "react"

const CELL = 14
const COLS = 20
const ROWS = 20
const TICK = 120

type Dir = "U" | "D" | "L" | "R"
type Pt = { x: number; y: number }

import { useHighScore } from "@/components/pyos/hooks/useHighScore"

function rand(n: number) { return Math.floor(Math.random() * n) }
function newFood(snake: Pt[]): Pt {
    let f: Pt
    do { f = { x: rand(COLS), y: rand(ROWS) } } while (snake.some(s => s.x === f.x && s.y === f.y))
    return f
}

export function SnakeGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const stateRef = useRef({
        snake: [{ x: 10, y: 10 }],
        dir: "R" as Dir, next: "R" as Dir,
        food: { x: 15, y: 10 } as Pt,
        score: 0, dead: false,
    })
    const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const [score, setScore] = useState(0)
    const [dead, setDead] = useState(false)
    const { best, update } = useHighScore("snake")

    const draw = useCallback(() => {
        const canvas = canvasRef.current; if (!canvas) return
        const ctx = canvas.getContext("2d"); if (!ctx) return
        const s = stateRef.current
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)
        ctx.strokeStyle = "rgba(0,80,0,0.3)"; ctx.lineWidth = 0.5
        for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke() }
        for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke() }
        ctx.fillStyle = "#ff4444"
        ctx.fillRect(s.food.x * CELL + 2, s.food.y * CELL + 2, CELL - 4, CELL - 4)
        s.snake.forEach((pt, i) => {
            ctx.fillStyle = i === 0 ? "#00ff41" : "#00aa20"
            ctx.fillRect(pt.x * CELL + 1, pt.y * CELL + 1, CELL - 2, CELL - 2)
        })
    }, [])

    const tick = useCallback(() => {
        const s = stateRef.current
        if (s.dead) return
        s.dir = s.next
        const head = s.snake[0]
        const next: Pt = {
            x: (head.x + (s.dir === "R" ? 1 : s.dir === "L" ? -1 : 0) + COLS) % COLS,
            y: (head.y + (s.dir === "D" ? 1 : s.dir === "U" ? -1 : 0) + ROWS) % ROWS,
        }
        if (s.snake.some(pt => pt.x === next.x && pt.y === next.y)) {
            s.dead = true; setDead(true); update(s.score); return
        }
        s.snake.unshift(next)
        if (next.x === s.food.x && next.y === s.food.y) {
            s.score++; setScore(s.score); s.food = newFood(s.snake)
        } else { s.snake.pop() }
        draw()
    }, [draw, update])

    const restart = useCallback(() => {
        const s = stateRef.current
        s.snake = [{ x: 10, y: 10 }]; s.dir = "R"; s.next = "R"
        s.food = { x: 15, y: 10 }; s.score = 0; s.dead = false
        setScore(0); setDead(false); draw()
    }, [draw])

    useEffect(() => {
        draw()
        tickRef.current = setInterval(tick, TICK)
        const onKey = (e: KeyboardEvent) => {
            const s = stateRef.current
            const map: Record<string, Dir> = { ArrowUp: "U", w: "U", ArrowDown: "D", s: "D", ArrowLeft: "L", a: "L", ArrowRight: "R", d: "R" }
            const d = map[e.key]; if (!d) return
            const opp: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" }
            if (d !== opp[s.dir]) s.next = d
            e.preventDefault()
        }
        window.addEventListener("keydown", onKey)
        return () => { if (tickRef.current) clearInterval(tickRef.current); window.removeEventListener("keydown", onKey) }
    }, [draw, tick])

    const turn = (d: Dir) => {
        const s = stateRef.current
        const opp: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" }
        if (d !== opp[s.dir]) s.next = d
    }

    return (
        <div className="pyos-game-wrap">
            <div className="pyos-game-hud">
                SCORE: {score}
                {best > 0 && <span className="pyos-yellow-text">  ·  BEST: {best}</span>}
                {dead && <span style={{ color: "#ff4444" }}> · GAME OVER</span>}
            </div>
            <canvas ref={canvasRef} className="pyos-game-canvas" width={COLS * CELL} height={ROWS * CELL} />
            {dead && <button className="pyos-btn" onClick={restart}>▶ RESTART</button>}
            <div className="pyos-touch-controls">
                <div className="pyos-touch-row">
                    <button className="pyos-touch-btn" onPointerDown={() => turn("U")} aria-label="Up">▲</button>
                </div>
                <div className="pyos-touch-row">
                    <button className="pyos-touch-btn" onPointerDown={() => turn("L")} aria-label="Left">◄</button>
                    <button className="pyos-touch-btn" onPointerDown={() => turn("D")} aria-label="Down">▼</button>
                    <button className="pyos-touch-btn" onPointerDown={() => turn("R")} aria-label="Right">►</button>
                </div>
            </div>
            <div className="pyos-dim" style={{ fontSize: 13 }}>Arrow keys / WASD on desktop</div>
        </div>
    )
}
