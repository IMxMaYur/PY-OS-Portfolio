"use client"

import { useState, useEffect } from "react"

interface Props { onEnter: () => void; onGames: () => void }

export function WelcomeScreen({ onEnter, onGames }: Props) {
    const [show, setShow] = useState(false)
    useEffect(() => { const t = setTimeout(() => setShow(true), 60); return () => clearTimeout(t) }, [])

    return (
        <div className="welcome-screen">
            <div
                className="welcome-panel"
                style={{ opacity: show ? 1 : 0, transition: "opacity 0.6s ease" }}
            >
                <div className="pyos-dim" style={{ fontSize: 15, marginBottom: 6 }}>
                    ╔══════════════════════════════╗
                </div>

                <h1 className="welcome-title">PY-OS  v2.6</h1>
                <div className="welcome-role">AI Engineer &amp; Full-Stack Developer</div>
                <div style={{ fontSize: 14, color: "var(--pyos-fg-dim)", marginBottom: 10, letterSpacing: 1 }}>
                    — Interactive Retro OS Portfolio —
                </div>
                <p className="welcome-desc">
                    Mayur Giri · Mumbai, IN<br />
                    Specializing in ML/AI, Next.js &amp; Python<br />
                    Building intelligent systems since 2022
                </p>

                <div className="pyos-dim" style={{ fontSize: 15, marginBottom: 20 }}>
                    Select startup option:
                </div>

                <div className="welcome-btns">
                    <button className="pyos-btn" onClick={onEnter}>
                        ▶ Explore Portfolio
                    </button>
                    <button className="pyos-btn-outline" onClick={onGames}>
                        🎮 Play Games
                    </button>
                </div>

                <div className="pyos-dim" style={{ fontSize: 15, marginTop: 20 }}>
                    ╚══════════════════════════════╝
                </div>
                <div style={{ fontSize: 13, color: "var(--pyos-fg-dim)", marginTop: 14 }}>
                    © 2026 Mayur Giri · All rights reserved
                </div>
            </div>
        </div>
    )
}
