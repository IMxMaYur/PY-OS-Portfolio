"use client"

import { useEffect, useRef } from "react"

export function HackerMode({ onDismiss }: { onDismiss: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const W = canvas.width = window.innerWidth
        const H = canvas.height = window.innerHeight
        const cols = Math.floor(W / 14)
        const drops = Array(cols).fill(1)
        const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]|;:',.<>?/PYOS"

        const draw = () => {
            ctx.fillStyle = "rgba(0,0,0,0.06)"
            ctx.fillRect(0, 0, W, H)
            ctx.fillStyle = "#00ff41"
            ctx.font = "14px monospace"
            drops.forEach((y, x) => {
                ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x * 14, y * 14)
                if (y * 14 > H && Math.random() > 0.975) drops[x] = 0
                drops[x]++
            })
        }

        const interval = setInterval(draw, 40)
        const timeout = setTimeout(onDismiss, 5000)

        return () => { clearInterval(interval); clearTimeout(timeout) }
    }, [onDismiss])

    return (
        <div
            onClick={onDismiss}
            style={{ position: "fixed", inset: 0, zIndex: 9990, cursor: "pointer" }}
            aria-label="Hacker mode — click to exit"
        >
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
            <div style={{
                position: "absolute", bottom: 40, left: 0, right: 0,
                textAlign: "center", color: "#00ff41",
                fontFamily: "var(--pyos-font)", fontSize: 22,
                textShadow: "0 0 10px #00ff41",
                animation: "blink 1s step-end infinite",
            }}>
                [ HACKER MODE ACTIVATED ]  ·  Click or wait to exit
            </div>
        </div>
    )
}
