"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useHighScore } from "@/components/pyos/hooks/useHighScore"

const W = 480, H = 280
const PAD_H = 60, PAD_W = 10, BALL_R = 7
const PAD_SPEED = 4, CPU_SPEED = 3.2

interface GameState {
    ball: { x: number; y: number; vx: number; vy: number }
    p1y: number
    p2y: number
    score: [number, number]
    over: boolean
}

function init(): GameState {
    return {
        ball: { x: W / 2, y: H / 2, vx: 4 * (Math.random() > 0.5 ? 1 : -1), vy: 3 * (Math.random() > 0.5 ? 1 : -1) },
        p1y: H / 2 - PAD_H / 2,
        p2y: H / 2 - PAD_H / 2,
        score: [0, 0],
        over: false,
    }
}

export function PongGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gRef = useRef<GameState>(init())
    const rafRef = useRef<number>(0)
    const keysRef = useRef<Set<string>>(new Set())
    const [score, setScore] = useState<[number, number]>([0, 0])
    const [over, setOver] = useState(false)
    const { best, update } = useHighScore("pong-p1")

    const draw = useCallback(() => {
        const canvas = canvasRef.current; if (!canvas) return
        const ctx = canvas.getContext("2d"); if (!ctx) return
        const g = gRef.current

        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, W, H)
        // dashed centre
        ctx.setLineDash([6, 6]); ctx.strokeStyle = "rgba(0,255,65,0.3)"; ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
        ctx.setLineDash([])
        // paddles
        ctx.fillStyle = "#00ff41"
        ctx.fillRect(8, g.p1y, PAD_W, PAD_H)
        ctx.fillRect(W - 8 - PAD_W, g.p2y, PAD_W, PAD_H)
        // ball
        ctx.beginPath(); ctx.arc(g.ball.x, g.ball.y, BALL_R, 0, Math.PI * 2)
        ctx.fillStyle = "#fff"; ctx.fill()
    }, [])

    const tick = useCallback(() => {
        const g = gRef.current
        if (g.over) return

        // player movement
        if (keysRef.current.has("ArrowUp") || keysRef.current.has("w")) g.p1y = Math.max(0, g.p1y - PAD_SPEED)
        if (keysRef.current.has("ArrowDown") || keysRef.current.has("s")) g.p1y = Math.min(H - PAD_H, g.p1y + PAD_SPEED)

        // CPU tracking
        const cpuCenter = g.p2y + PAD_H / 2
        if (cpuCenter < g.ball.y - 5) g.p2y = Math.min(H - PAD_H, g.p2y + CPU_SPEED)
        if (cpuCenter > g.ball.y + 5) g.p2y = Math.max(0, g.p2y - CPU_SPEED)

        // ball movement
        g.ball.x += g.ball.vx; g.ball.y += g.ball.vy

        // top/bottom bounce
        if (g.ball.y - BALL_R < 0) { g.ball.y = BALL_R; g.ball.vy *= -1 }
        if (g.ball.y + BALL_R > H) { g.ball.y = H - BALL_R; g.ball.vy *= -1 }

        // paddle collisions
        if (g.ball.x - BALL_R < 8 + PAD_W && g.ball.y > g.p1y && g.ball.y < g.p1y + PAD_H) {
            g.ball.vx = Math.abs(g.ball.vx) * 1.04
            g.ball.vy += (g.ball.y - (g.p1y + PAD_H / 2)) * 0.1
        }
        if (g.ball.x + BALL_R > W - 8 - PAD_W && g.ball.y > g.p2y && g.ball.y < g.p2y + PAD_H) {
            g.ball.vx = -Math.abs(g.ball.vx) * 1.02
            g.ball.vy += (g.ball.y - (g.p2y + PAD_H / 2)) * 0.1
        }

        // scoring
        if (g.ball.x < 0) {
            g.score[1]++; setScore([...g.score])
            if (g.score[1] >= 7) { g.over = true; setOver(true); return }
            Object.assign(g.ball, { x: W / 2, y: H / 2, vx: -4, vy: 3 * (Math.random() > 0.5 ? 1 : -1) })
        }
        if (g.ball.x > W) {
            g.score[0]++; setScore([...g.score])
            update(g.score[0])
            if (g.score[0] >= 7) { g.over = true; setOver(true); return }
            Object.assign(g.ball, { x: W / 2, y: H / 2, vx: 4, vy: 3 * (Math.random() > 0.5 ? 1 : -1) })
        }

        draw()
        rafRef.current = requestAnimationFrame(tick)
    }, [draw, update])

    const restart = useCallback(() => {
        gRef.current = init(); setScore([0, 0]); setOver(false)
        rafRef.current = requestAnimationFrame(tick)
    }, [tick])

    useEffect(() => {
        draw()
        rafRef.current = requestAnimationFrame(tick)
        const onKey = (e: KeyboardEvent) => {
            keysRef.current.add(e.key)
            if (["ArrowUp", "ArrowDown", "w", "s"].includes(e.key)) e.preventDefault()
        }
        const offKey = (e: KeyboardEvent) => keysRef.current.delete(e.key)
        window.addEventListener("keydown", onKey)
        window.addEventListener("keyup", offKey)
        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener("keydown", onKey)
            window.removeEventListener("keyup", offKey)
        }
    }, [draw, tick])

    // Touch: move player paddle
    const onTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current; if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const y = e.touches[0].clientY - rect.top
        const scaleY = H / rect.height
        gRef.current.p1y = Math.max(0, Math.min(H - PAD_H, y * scaleY - PAD_H / 2))
    }, [])

    return (
        <div className="pyos-game-wrap">
            <div className="pyos-game-hud">
                YOU: {score[0]}  ·  CPU: {score[1]}
                {best > 0 && <span className="pyos-yellow-text">  ·  BEST: {best}</span>}
                {over && (score[0] >= 7 ? "  🏆 YOU WIN!" : "  CPU WINS!")}
            </div>
            <canvas
                ref={canvasRef}
                className="pyos-game-canvas"
                width={W} height={H}
                onTouchMove={onTouch}
                style={{ touchAction: "none" }}
            />
            {over && <button className="pyos-btn" onClick={restart}>▶ REMATCH</button>}
            <div className="pyos-dim" style={{ fontSize: 13 }}>
                ↑ / ↓ or W / S to move  ·  Touch to drag paddle  ·  First to 7 wins
            </div>
        </div>
    )
}
