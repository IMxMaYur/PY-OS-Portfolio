"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface Props {
    title: string
    isActive: boolean
    isMinimized: boolean
    onClose: () => void
    onMinimize: () => void
    onFocus: () => void
    defaultPos: { top: number; left: number }
    width: number
    maxHeight: number
    children: React.ReactNode
}

export function PyOSWindow({
    title, isActive, isMinimized, onClose, onMinimize, onFocus,
    defaultPos, width, maxHeight, children,
}: Props) {
    const [pos, setPos] = useState({ x: defaultPos.left, y: defaultPos.top })
    const [loaded, setLoaded] = useState(false)
    const [progress, setProgress] = useState(0)
    const dragging = useRef(false)
    const origin = useRef({ mx: 0, my: 0, wx: 0, wy: 0 })

    // ASCII loader on first mount
    useEffect(() => {
        let p = 0
        const id = setInterval(() => {
            p += Math.floor(Math.random() * 25 + 15)
            if (p >= 100) { p = 100; clearInterval(id); setLoaded(true) }
            setProgress(p)
        }, 60)
        return () => clearInterval(id)
    }, [])

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        dragging.current = true
        origin.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y }
        const onMove = (ev: MouseEvent) => {
            if (!dragging.current) return
            setPos({ x: origin.current.wx + ev.clientX - origin.current.mx, y: origin.current.wy + ev.clientY - origin.current.my })
        }
        const onUp = () => { dragging.current = false; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp) }
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", onUp)
        e.preventDefault()
    }, [pos])

    if (isMinimized) return null

    const filled = Math.floor(progress / 10)
    const bar = "█".repeat(filled) + "░".repeat(10 - filled)

    return (
        <div
            className={`pyos-window${isActive ? " active" : ""}`}
            style={{ top: pos.y, left: pos.x, width, maxHeight, zIndex: isActive ? 200 : 100 }}
            onClick={onFocus}
            role="dialog"
            aria-label={title}
        >
            {/* Title bar */}
            <div className="pyos-window-titlebar" onMouseDown={onMouseDown}>
                <span className="pyos-window-title">{title}</span>
                <div style={{ display: "flex", gap: 4 }}>
                    <button
                        className="pyos-window-min"
                        onClick={e => { e.stopPropagation(); onMinimize() }}
                        aria-label="Minimize"
                        title="Minimize"
                    >_</button>
                    <button
                        className="pyos-window-close"
                        onClick={e => { e.stopPropagation(); onClose() }}
                        aria-label="Close"
                        title="Close"
                    >X</button>
                </div>
            </div>

            {/* Body — show loader until ready */}
            <div className="pyos-window-body">
                {!loaded ? (
                    <div style={{ padding: "24px 16px", textAlign: "center" }}>
                        <div className="pyos-accent-text" style={{ fontSize: 20, letterSpacing: 1 }}>
                            [{bar}] {progress}%
                        </div>
                        <div className="pyos-dim" style={{ marginTop: 8, fontSize: 15 }}>
                            Loading {title}...
                        </div>
                    </div>
                ) : children}
            </div>
        </div>
    )
}
