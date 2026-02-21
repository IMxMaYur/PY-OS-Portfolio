"use client"

import { useState, useEffect } from "react"

interface Props { onDismiss: () => void }

const LINES = [
    "A fatal exception 0E has occurred at 0028:PY-CORE+0xDEAD.",
    "The current application will be terminated.",
    "",
    "* Press any key to terminate the current application.",
    "* Press CTRL+ALT+DEL again to restart your computer.",
    "  You will lose any unsaved information in all applications.",
    "",
    "* Press CTRL+V to vibe. (unrelated but noted)",
]

export function BSODScreen({ onDismiss }: Props) {
    const [count, setCount] = useState(8)

    useEffect(() => {
        if (count <= 0) { onDismiss(); return }
        const t = setTimeout(() => setCount(c => c - 1), 1000)
        return () => clearTimeout(t)
    }, [count, onDismiss])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { e.preventDefault(); onDismiss() }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onDismiss])

    return (
        <div
            onClick={onDismiss}
            style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "#0000aa", color: "#fff",
                fontFamily: "var(--pyos-font)", fontSize: 20,
                padding: "8vh 8vw", display: "flex", flexDirection: "column",
                cursor: "pointer", userSelect: "none",
            }}
            aria-live="assertive"
            aria-label="Blue Screen of Death"
        >
            {/* Title bar */}
            <div style={{
                alignSelf: "flex-start",
                background: "#aaa", color: "#0000aa",
                padding: "1px 10px", marginBottom: 28, fontSize: 20,
            }}>
                PY-OS — Fatal Error
            </div>

            {LINES.map((l, i) => (
                <div key={i} style={{ marginBottom: l === "" ? 12 : 4 }}>{l}</div>
            ))}

            <div style={{ marginTop: 32 }}>
                Press any key to continue <span className="pyos-cursor-blink">_</span>
                <span style={{ color: "#aaa" }}> ({count})</span>
            </div>
        </div>
    )
}
