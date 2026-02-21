"use client"

import { useState, useEffect } from "react"
import type { PyOSState, WindowId, Tab } from "@/app/pyos/page"
import { PyOSWindow } from "@/components/pyos/Window"
import { Wallpapers } from "@/components/pyos/Wallpapers"
import { useSound } from "@/components/pyos/hooks/useSound"
import { AboutWindow } from "@/components/pyos/windows/AboutWindow"
import { ProjectsWindow } from "@/components/pyos/windows/ProjectsWindow"
import { SkillsWindow } from "@/components/pyos/windows/SkillsWindow"
import { ExperienceWindow } from "@/components/pyos/windows/ExperienceWindow"
import { CertificationsWindow } from "@/components/pyos/windows/CertificationsWindow"
import { ResumeWindow } from "@/components/pyos/windows/ResumeWindow"
import { ContactWindow } from "@/components/pyos/windows/ContactWindow"
import { TerminalWindow } from "@/components/pyos/windows/TerminalWindow"
import { SettingsWindow } from "@/components/pyos/windows/SettingsWindow"
import { GamesWindow } from "@/components/pyos/windows/GamesWindow"
import { SnakeGame } from "@/components/pyos/windows/SnakeGame"
import { TetrisGame } from "@/components/pyos/windows/TetrisGame"
import { PongGame } from "@/components/pyos/windows/PongGame"

const TABS: Tab[] = ["portfolio", "games", "system"]

const ICONS: Record<Tab, { id: WindowId; emoji: string; label: string }[]> = {
    portfolio: [
        { id: "terminal", emoji: "💻", label: "TERMINAL.EXE" },
        { id: "about", emoji: "👤", label: "ABOUT_ME.INFO" },
        { id: "projects", emoji: "📁", label: "PROJECTS.EXE" },
        { id: "experience", emoji: "📋", label: "CAREER.LOG" },
        { id: "skills", emoji: "⚡", label: "SKILLS.DAT" },
        { id: "certifications", emoji: "🏆", label: "CERTS.SYS" },
        { id: "resume", emoji: "📄", label: "RESUME.EXE" },
        { id: "contact", emoji: "📧", label: "CONTACT.INI" },
    ],
    games: [
        { id: "snake", emoji: "🐍", label: "SNAKE.EXE" },
        { id: "tetris", emoji: "🎮", label: "TETRIS.EXE" },
        { id: "pong", emoji: "🏓", label: "PONG.EXE" },
        { id: "games", emoji: "🕹️", label: "GAMES.EXE" },
    ],
    system: [
        { id: "settings", emoji: "⚙️", label: "SETTINGS.EXE" },
        { id: "terminal", emoji: "💻", label: "TERMINAL.EXE" },
    ],
}

const WIN_CFG: Record<WindowId, { title: string; w: number; h: number }> = {
    about: { title: "👤 ABOUT_ME.INFO", w: 500, h: 420 },
    projects: { title: "📁 PROJECTS.EXE", w: 620, h: 520 },
    skills: { title: "⚡ SKILLS.DAT", w: 480, h: 460 },
    experience: { title: "📋 CAREER.LOG", w: 540, h: 480 },
    certifications: { title: "🏆 CERTIFICATIONS.SYS", w: 520, h: 460 },
    resume: { title: "📄 RESUME.EXE", w: 420, h: 380 },
    contact: { title: "📧 CONTACT.INI", w: 460, h: 500 },
    terminal: { title: "💻 TERMINAL.EXE", w: 600, h: 380 },
    settings: { title: "⚙️ SETTINGS.EXE", w: 440, h: 480 },
    games: { title: "🕹️ GAMES.EXE", w: 440, h: 420 },
    snake: { title: "🐍 SNAKE.EXE", w: 340, h: 580 },
    tetris: { title: "🎮 TETRIS.EXE", w: 360, h: 620 },
    pong: { title: "🏓 PONG.EXE", w: 520, h: 440 },
}

function WindowContent({ id, state }: { id: WindowId; state: PyOSState }) {
    switch (id) {
        case "about": return <AboutWindow />
        case "projects": return <ProjectsWindow />
        case "skills": return <SkillsWindow />
        case "experience": return <ExperienceWindow />
        case "certifications": return <CertificationsWindow />
        case "resume": return <ResumeWindow />
        case "contact": return <ContactWindow />
        case "terminal": return <TerminalWindow openWindow={state.openWindow} onCrash={state.onCrash} />
        case "settings": return <SettingsWindow state={state} />
        case "games": return <GamesWindow openWindow={state.openWindow} />
        case "snake": return <SnakeGame />
        case "tetris": return <TetrisGame />
        case "pong": return <PongGame />
        default: return null
    }
}

function Clock() {
    const [time, setTime] = useState("")
    useEffect(() => {
        const tick = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }))
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])
    return <>{time}</>
}

function VisitorCount() {
    const [visits, setVisits] = useState(0)
    useEffect(() => {
        const key = "pyos-visits"
        const n = parseInt(localStorage.getItem(key) ?? "0", 10) + 1
        localStorage.setItem(key, String(n))
        setVisits(n)
    }, [])
    return <span className="pyos-dim" style={{ fontSize: 14 }}>VISITS:{visits}</span>
}

export function Desktop({ state }: { state: PyOSState }) {
    const { openWindows, activeWindow, minimizedWindows, activeTab,
        openWindow, closeWindow, focusWindow, minimizeWindow, restoreWindow, setActiveTab, onBack } = state
    const { playBeep, playClose } = useSound()

    const handleOpen = (id: WindowId) => { openWindow(id); playBeep() }
    const handleClose = (id: WindowId) => { closeWindow(id); playClose() }

    const icons = ICONS[activeTab] ?? ICONS.portfolio

    return (
        <div className="pyos-desktop">
            <Wallpapers wallpaper={state.wallpaper} />

            {/* Taskbar */}
            <div className="pyos-taskbar" role="navigation">
                <div className="pyos-taskbar-brand">PY-OS</div>
                <button
                    className="pyos-tab"
                    onClick={onBack}
                    title="Back to Welcome Screen"
                    aria-label="Back to home"
                >
                    [← HOME]
                </button>
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`pyos-tab${activeTab === tab ? " active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                        aria-pressed={activeTab === tab}
                    >
                        [{tab.toUpperCase()}]
                    </button>
                ))}
                <div className="pyos-taskbar-right">
                    <VisitorCount />
                    <span className="pyos-dim" style={{ fontSize: 14 }}>│</span>
                    <span className="pyos-dim" style={{ fontSize: 14 }}>Ctrl+H=HACK</span>
                    <span className="pyos-dim" style={{ fontSize: 14 }}>│</span>
                    <div className="pyos-clock"><Clock /></div>
                </div>
            </div>

            {/* Icons */}
            <div className="pyos-icon-grid" role="main" aria-label="Desktop icons">
                {icons.map(icon => (
                    <button
                        key={icon.id}
                        className="pyos-icon"
                        onDoubleClick={() => handleOpen(icon.id)}
                        onClick={() => focusWindow(icon.id)}
                        onKeyDown={e => { if (e.key === "Enter") handleOpen(icon.id) }}
                        aria-label={`Open ${icon.label}`}
                        title="Double-click to open"
                    >
                        <span className="pyos-icon-emoji" aria-hidden="true">{icon.emoji}</span>
                        <span className="pyos-icon-label">{icon.label}</span>
                    </button>
                ))}
                <div className="pyos-dim" style={{ width: "100%", fontSize: 13, marginTop: 8, paddingLeft: 4 }}>
                    Double-click to open · ESC to close · Ctrl+H for hacker mode
                </div>
            </div>

            {/* Open Windows */}
            {openWindows.map((id, idx) => {
                const c = WIN_CFG[id]
                const isMinimized = minimizedWindows.includes(id)
                return (
                    <PyOSWindow
                        key={id}
                        title={c.title}
                        isActive={activeWindow === id}
                        isMinimized={isMinimized}
                        onClose={() => handleClose(id)}
                        onMinimize={() => minimizeWindow(id)}
                        onFocus={() => focusWindow(id)}
                        defaultPos={{ top: 60 + idx * 22, left: 80 + idx * 28 }}
                        width={c.w}
                        maxHeight={c.h}
                    >
                        <WindowContent id={id} state={state} />
                    </PyOSWindow>
                )
            })}

            {/* Minimized Dock */}
            {minimizedWindows.length > 0 && (
                <div className="pyos-minimize-dock" role="complementary" aria-label="Minimized windows">
                    {minimizedWindows.map(id => (
                        <button
                            key={id}
                            className="pyos-minimize-chip"
                            onClick={() => { restoreWindow(id); playBeep() }}
                            aria-label={`Restore ${WIN_CFG[id]?.title}`}
                        >
                            {WIN_CFG[id]?.title}
                        </button>
                    ))}
                </div>
            )}

            {/* Copyright Footer */}
            <div className="pyos-footer" role="contentinfo">
                © 2026 Mayur Giri · PY-OS Portfolio Edition · All rights reserved
            </div>
        </div>
    )
}
