"use client"

import { useState, useEffect } from "react"

const LINES = [
    { text: "PY Systems BIOS v2.6.0  (C)2026 PY Systems Inc.", delay: 0 },
    { text: "CPU: PY-Core i7 @ 3.60GHz  [TURBO: ON]", delay: 180 },
    { text: "Installed RAM: 640K  Extended: 32MB", delay: 320 },
    { text: "", delay: 420 },
    { text: "Memory test.................", delay: 550, ok: "PASS" },
    { text: "Detecting storage devices...", delay: 780, ok: "2 FOUND" },
    { text: "Loading PY-OS kernel........", delay: 1020, ok: "OK" },
    { text: "Initialising filesystem.....", delay: 1260, ok: "OK" },
    { text: "Starting system services...", delay: 1480, ok: "OK" },
    { text: "", delay: 1650 },
    { text: "PY-OS v2.6  –  Portfolio Edition", delay: 1720 },
]

interface Props { onDone: () => void }

export function BootScreen({ onDone }: Props) {
    const [visible, setVisible] = useState(0)
    const [progress, setProgress] = useState(0)
    const [done, setDone] = useState(false)

    // Reveal boot text lines on schedule
    useEffect(() => {
        const ts: ReturnType<typeof setTimeout>[] = []
        LINES.forEach((l, i) => ts.push(setTimeout(() => setVisible(i + 1), l.delay)))
        return () => ts.forEach(clearTimeout)
    }, [])

    // Slowly fill progress bar from 0 → 100 over ~2.2s with live % counter
    useEffect(() => {
        const step = setInterval(() => {
            setProgress(prev => {
                const next = prev + (Math.random() * 1.8 + 0.6)
                if (next >= 100) {
                    clearInterval(step)
                    setDone(true)
                    return 100
                }
                return next
            })
        }, 28)
        return () => clearInterval(step)
    }, [])

    // Smoothly transition only after bar reaches 100%
    useEffect(() => {
        if (!done) return
        const t = setTimeout(onDone, 500)
        return () => clearTimeout(t)
    }, [done, onDone])

    return (
        <div className="boot-screen">
            {LINES.slice(0, visible).map((l, i) => (
                <div key={i} className="boot-line">
                    {l.text}
                    {l.ok && <span className="boot-ok"> [{l.ok}]</span>}
                </div>
            ))}

            {visible >= 5 && (
                <div style={{ marginTop: 24 }}>
                    <div style={{ color: "#555", fontSize: 15, marginBottom: 5 }}>
                        Loading PY-OS...&nbsp;
                        <span style={{ color: "#00ff41" }}>{Math.floor(progress)}%</span>
                    </div>
                    <div className="boot-progress-wrap">
                        <div
                            className="boot-progress-bar"
                            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                        />
                    </div>
                    {done && (
                        <div style={{ color: "#00ff41", fontSize: 15, marginTop: 8 }}>
                            [ BOOT COMPLETE — STARTING PY-OS... ]
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
