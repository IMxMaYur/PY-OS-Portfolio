"use client"

import { useState } from "react"
import type { PyOSState, WindowId } from "@/app/pyos/page"
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
import { Wallpapers } from "@/components/pyos/Wallpapers"

const MENU_ITEMS: { id: WindowId; emoji: string; label: string; desc: string }[] = [
    { id: "terminal", emoji: "💻", label: "TERMINAL.EXE", desc: "Interactive shell" },
    { id: "about", emoji: "👤", label: "ABOUT_ME.INFO", desc: "Who am I" },
    { id: "projects", emoji: "📁", label: "PROJECTS.EXE", desc: "Case studies" },
    { id: "experience", emoji: "📋", label: "CAREER.LOG", desc: "Work history" },
    { id: "skills", emoji: "⚡", label: "SKILLS.DAT", desc: "Tech stack" },
    { id: "certifications", emoji: "🏆", label: "CERTS.SYS", desc: "Certifications" },
    { id: "resume", emoji: "📄", label: "RESUME.EXE", desc: "Download CV" },
    { id: "contact", emoji: "📧", label: "CONTACT.INI", desc: "Get in touch" },
    { id: "snake", emoji: "🐍", label: "SNAKE.EXE", desc: "Play Snake" },
    { id: "tetris", emoji: "🎮", label: "TETRIS.EXE", desc: "Play Tetris" },
    { id: "pong", emoji: "🏓", label: "PONG.EXE", desc: "Play Pong vs CPU" },
    { id: "settings", emoji: "⚙️", label: "SETTINGS.EXE", desc: "Theme & wallpaper" },
]

function PanelContent({ id, state }: { id: WindowId; state: PyOSState }) {
    switch (id) {
        case "about": return <AboutWindow />
        case "projects": return <ProjectsWindow />
        case "skills": return <SkillsWindow />
        case "experience": return <ExperienceWindow />
        case "certifications": return <CertificationsWindow />
        case "resume": return <ResumeWindow />
        case "contact": return <ContactWindow />
        case "terminal": return <TerminalWindow openWindow={state.openWindow} onCrash={() => { }} />
        case "settings": return <SettingsWindow state={state} />
        case "games": return <GamesWindow openWindow={state.openWindow} />
        case "snake": return <SnakeGame />
        case "tetris": return <TetrisGame />
        case "pong": return <PongGame />
        default: return null
    }
}

const LABELS: Record<WindowId, string> = {
    about: "ABOUT_ME.INFO", projects: "PROJECTS.EXE", skills: "SKILLS.DAT",
    experience: "CAREER.LOG", certifications: "CERTIFICATIONS.SYS", resume: "RESUME.EXE",
    contact: "CONTACT.INI", terminal: "TERMINAL.EXE", settings: "SETTINGS.EXE",
    games: "GAMES.EXE", snake: "SNAKE.EXE", tetris: "TETRIS.EXE", pong: "PONG.EXE",
}

const EMOJIS: Partial<Record<WindowId, string>> = {
    about: "👤", projects: "📁", skills: "⚡", experience: "📋",
    certifications: "🏆", resume: "📄", contact: "📧", terminal: "💻",
    settings: "⚙️", games: "🕹️", snake: "🐍", tetris: "🎮", pong: "🏓",
}

export function MobileShell({ state }: { state: PyOSState }) {
    const [open, setOpen] = useState<WindowId | null>(null)

    return (
        <div className="pyos-mobile-shell">
            <Wallpapers wallpaper={state.wallpaper} />
            <div className="pyos-mobile-header">
                <span className="pyos-mobile-brand">▶ PY-OS v2.6</span>
                <span className="pyos-dim" style={{ fontSize: 15 }}>MAYUR GIRI</span>
                <button
                    className="pyos-btn-sm"
                    onClick={() => state.onBack()}
                    aria-label="Back to welcome screen"
                >
                    [← HOME]
                </button>
            </div>

            {/* Full-screen panel overlay */}
            {open && (
                <div className="pyos-mobile-panel" role="dialog" aria-label={LABELS[open]} aria-modal="true">
                    <div className="pyos-mobile-panel-header">
                        <span className="pyos-mobile-panel-title">
                            {EMOJIS[open]} {LABELS[open]}
                        </span>
                        <button
                            className="pyos-btn-sm"
                            onClick={() => setOpen(null)}
                            aria-label="Close panel"
                        >
                            [X] BACK
                        </button>
                    </div>
                    <div className="pyos-mobile-panel-body">
                        <PanelContent id={open} state={state} />
                    </div>
                </div>
            )}

            <div className="pyos-mobile-prompt">
                C:\USERS\MAYUR&gt; ls -la<br />
                <span className="pyos-dim">Select a file to open:</span>
            </div>

            <ul className="pyos-mobile-list" role="list">
                {MENU_ITEMS.map(item => (
                    <li key={item.id}>
                        <button
                            className="pyos-mobile-item"
                            onClick={() => setOpen(item.id)}
                            aria-label={`Open ${item.label}`}
                        >
                            <span style={{ fontSize: 26, marginRight: 14, lineHeight: 1 }} aria-hidden="true">
                                {item.emoji}
                            </span>
                            <span style={{ flex: 1 }}>
                                <span style={{ display: "block", color: "var(--pyos-accent)", fontSize: 18 }}>
                                    {item.label}
                                </span>
                                <span style={{ display: "block", color: "var(--pyos-fg-dim)", fontSize: 14 }}>
                                    {item.desc}
                                </span>
                            </span>
                            <span style={{ color: "var(--pyos-fg-dim)", fontSize: 18, marginLeft: 8 }}>›</span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* Copyright Footer */}
            <div className="pyos-footer" role="contentinfo">
                © 2026 Mayur Giri · PY-OS Portfolio Edition
            </div>
        </div>
    )
}
