"use client"

import { useEffect, useRef } from "react"
import type { Wallpaper } from "@/app/pyos/page"

function MatrixRain() {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = ref.current; if (!canvas) return
        const ctx = canvas.getContext("2d"); if (!ctx) return
        let animId: number
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
        resize()
        window.addEventListener("resize", resize)
        const cols = Math.floor(canvas.width / 16)
        const drops: number[] = Array(cols).fill(1)
        const draw = () => {
            ctx.fillStyle = "rgba(0,0,0,0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = "#00ff41"
            ctx.font = "14px monospace"
            drops.forEach((y, x) => {
                const ch = String.fromCharCode(0x30a0 + Math.random() * 96)
                ctx.fillText(ch, x * 16, y * 16)
                if (y * 16 > canvas.height && Math.random() > 0.975) drops[x] = 0
                drops[x]++
            })
            animId = requestAnimationFrame(draw)
        }
        let last = 0
        const throttle = (t: number) => {
            if (t - last > 50) { last = t; draw() }
            animId = requestAnimationFrame(throttle)
        }
        animId = requestAnimationFrame(throttle)
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
    }, [])
    return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
}

function Starfield() {
    const ref = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        const canvas = ref.current; if (!canvas) return
        const ctx = canvas.getContext("2d"); if (!ctx) return
        let animId: number
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        const stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            s: Math.random() * 2 + 0.3,
            v: Math.random() * 0.4 + 0.1,
        }))
        const draw = () => {
            ctx.fillStyle = "#00001a"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            stars.forEach(st => {
                ctx.fillStyle = `rgba(255,255,255,${0.4 + st.s * 0.2})`
                ctx.fillRect(st.x, st.y, st.s, st.s)
                st.y += st.v
                if (st.y > canvas.height) { st.y = 0; st.x = Math.random() * canvas.width }
            })
            animId = requestAnimationFrame(draw)
        }
        animId = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(animId)
    }, [])
    return <canvas ref={ref} style={{ width: "100%", height: "100%" }} />
}

function BinaryBg() {
    const BITS = "01".repeat(2000)
    return (
        <div className="wp-binary" style={{ width: "100%", height: "100%", overflow: "hidden", padding: 8, boxSizing: "border-box" }}>
            <div style={{ color: "rgba(0,100,0,0.25)", fontFamily: "monospace", fontSize: 11, lineHeight: 1.1, wordBreak: "break-all", userSelect: "none" }}>
                {BITS}
            </div>
        </div>
    )
}

export function Wallpapers({ wallpaper }: { wallpaper: Wallpaper }) {
    if (wallpaper === "none") return null
    const base: React.CSSProperties = { position: "absolute", inset: 0, overflow: "hidden" }

    if (wallpaper === "matrix") return <div className="pyos-wallpaper" style={base}><MatrixRain /></div>
    if (wallpaper === "starfield") return <div className="pyos-wallpaper" style={base}><Starfield /></div>
    if (wallpaper === "retrogrid") return <div className="pyos-wallpaper wp-retrogrid" style={base} />
    if (wallpaper === "binary") return <div className="pyos-wallpaper" style={base}><BinaryBg /></div>
    if (wallpaper === "solid") return <div className="pyos-wallpaper" style={{ ...base, background: "var(--pyos-desktop)" }} />
    return null
}
