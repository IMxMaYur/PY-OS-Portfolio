"use client"

import { useState, useEffect, useCallback } from "react"
import { BootScreen } from "@/components/pyos/BootScreen"
import { WelcomeScreen } from "@/components/pyos/WelcomeScreen"
import { Desktop } from "@/components/pyos/Desktop"
import { MobileShell } from "@/components/pyos/MobileShell"
import { BSODScreen } from "@/components/pyos/BSODScreen"
import { HackerMode } from "@/components/pyos/HackerMode"

export type Phase = "boot" | "welcome" | "os"
export type Theme = "phosphor" | "amber" | "white" | "matrix"
export type Wallpaper = "matrix" | "starfield" | "retrogrid" | "binary" | "solid" | "none"
export type Tab = "portfolio" | "games" | "system"
export type WindowId =
    | "about" | "projects" | "skills" | "experience"
    | "certifications" | "resume" | "contact" | "terminal"
    | "settings" | "games" | "snake" | "tetris" | "pong"

export interface PyOSState {
    theme: Theme
    wallpaper: Wallpaper
    openWindows: WindowId[]
    activeWindow: WindowId | null
    minimizedWindows: WindowId[]
    activeTab: Tab
    openWindow: (id: WindowId) => void
    closeWindow: (id: WindowId) => void
    focusWindow: (id: WindowId) => void
    minimizeWindow: (id: WindowId) => void
    restoreWindow: (id: WindowId) => void
    setTheme: (t: Theme) => void
    setWallpaper: (w: Wallpaper) => void
    setActiveTab: (t: Tab) => void
    onCrash: () => void
    onBack: () => void
}

export default function PyOSPage() {
    const [phase, setPhase] = useState<Phase>("boot")
    const [isMobile, setIsMobile] = useState(false)
    const [theme, setTheme] = useState<Theme>("phosphor")
    const [wallpaper, setWallpaper] = useState<Wallpaper>("none")
    const [openWindows, setOpenWindows] = useState<WindowId[]>([])
    const [activeWindow, setActiveWindow] = useState<WindowId | null>(null)
    const [minimizedWindows, setMinimizedWindows] = useState<WindowId[]>([])
    const [activeTab, setActiveTab] = useState<Tab>("portfolio")
    const [showBSOD, setShowBSOD] = useState(false)
    const [showHacker, setShowHacker] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // Ctrl+H → Hacker Mode
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "h") { e.preventDefault(); setShowHacker(h => !h) }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    const openWindow = useCallback((id: WindowId) => {
        setMinimizedWindows(prev => prev.filter(w => w !== id))
        setOpenWindows(prev => prev.includes(id) ? prev : [...prev, id])
        setActiveWindow(id)
    }, [])

    const closeWindow = useCallback((id: WindowId) => {
        setMinimizedWindows(prev => prev.filter(w => w !== id))
        setOpenWindows(prev => {
            const next = prev.filter(w => w !== id)
            setActiveWindow(next.length > 0 ? next[next.length - 1] : null)
            return next
        })
    }, [])

    const focusWindow = useCallback((id: WindowId) => setActiveWindow(id), [])

    const minimizeWindow = useCallback((id: WindowId) => {
        setMinimizedWindows(prev => prev.includes(id) ? prev : [...prev, id])
        setActiveWindow(prev => {
            if (prev === id) {
                const remaining = openWindows.filter(w => w !== id)
                return remaining.length > 0 ? remaining[remaining.length - 1] : null
            }
            return prev
        })
    }, [openWindows])

    const restoreWindow = useCallback((id: WindowId) => {
        setMinimizedWindows(prev => prev.filter(w => w !== id))
        setActiveWindow(id)
    }, [])

    const onCrash = useCallback(() => setShowBSOD(true), [])

    const state: PyOSState = {
        theme, wallpaper, openWindows, activeWindow, minimizedWindows, activeTab,
        openWindow, closeWindow, focusWindow, minimizeWindow, restoreWindow,
        setTheme, setWallpaper, setActiveTab, onCrash,
        onBack: () => setPhase("welcome"),
    }

    const handleGames = useCallback(() => {
        setPhase("os")
        setActiveTab("games")
    }, [])

    return (
        <div
            data-theme={theme !== "phosphor" ? theme : undefined}
            onKeyDown={(e) => { if (e.key === "Escape" && activeWindow) closeWindow(activeWindow) }}
            tabIndex={-1}
            style={{ outline: "none" }}
        >
            {phase === "boot" && <BootScreen onDone={() => setPhase("welcome")} />}
            {phase === "welcome" && <WelcomeScreen onEnter={() => setPhase("os")} onGames={handleGames} />}
            {phase === "os" && (
                isMobile
                    ? <MobileShell state={state} />
                    : <Desktop state={state} />
            )}
            {showBSOD && <BSODScreen onDismiss={() => setShowBSOD(false)} />}
            {showHacker && <HackerMode onDismiss={() => setShowHacker(false)} />}
        </div>
    )
}
