"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import type { WindowId } from "@/app/pyos/page"
import { useSound } from "@/components/pyos/hooks/useSound"

interface Line { text: string; type: "out" | "err" | "cmd" }

const HELP = `Available commands:
  help           - show this message
  ls             - list portfolio files
  whoami         - system info
  cat <file>     - display file contents
  open <app>     - launch an application
  clear          - clear terminal
  crash          - ...do not run this
  exit           - close terminal`

const LS_OUT = `Directory: C:\\USERS\\MAYUR\\PORTFOLIO

💻 TERMINAL.EXE     👤 ABOUT_ME.INFO     📁 PROJECTS.EXE
📋 CAREER.LOG       ⚡ SKILLS.DAT        🏆 CERTIFICATIONS.SYS
📄 RESUME.EXE       📧 CONTACT.INI       ⚙️  SETTINGS.EXE
🐍 SNAKE.EXE        🎮 TETRIS.EXE        🏓 PONG.EXE`

const CAT_FILES: Record<string, string> = {
    "about_me": "NAME=Mayur Giri\nROLE=AI Engineer & Full-Stack Developer\nLOC=Mumbai, IN\nSTATUS=AVAILABLE",
    "skills": "Deep Learning: 90%\nPython: 95%\nReact/Next.js: 90%\nNLP: 85%\nDocker: 80%\nKubernetes: 75%",
    "career": "2025-Present: AI & Full-Stack Engineer (Freelance)\n2024 Jul-Dec: Google Cloud Certified Scholar\n2024 May-Jul: DevOps Intern @ Accenture UK\n2024 Feb-Apr: Cybersecurity Intern @ Tata Groups",
    "contact": "[CONTACT]\nGITHUB=github.com/IMxMaYur\nLINKEDIN=linkedin.com/in/mayurgiri\nWEB=mayurgiri.vercel.app",
    "activity": "Fetching github.com/IMxMaYur activity...\n[████████████] Done!\n\n> 2026-02-15  Pushed to Insider-Threat-Detection (3 commits)\n> 2026-02-12  Opened PR: feat/model-optimisation\n> 2026-02-10  Starred: langchain-ai/langchain\n> 2026-02-07  Pushed to Portfolio-V01 (PY-OS rewrite)\n> 2026-01-30  Created repo: sentinel-uba-v2\n> 2026-01-22  Pushed to speech-to-text-app (8 commits)",
}

const OPEN_MAP: Partial<Record<string, WindowId>> = {
    "about": "about", "projects": "projects", "skills": "skills",
    "career": "experience", "certifications": "certifications",
    "resume": "resume", "contact": "contact", "settings": "settings",
    "snake": "snake", "tetris": "tetris", "pong": "pong", "terminal": "terminal",
}

interface Props { openWindow: (id: WindowId) => void; onCrash: () => void }

export function TerminalWindow({ openWindow, onCrash }: Props) {
    const [lines, setLines] = useState<Line[]>([
        { text: "PY-OS Terminal v2.6.0 - Type 'help' for commands", type: "out" },
        { text: "Tip: Try 'cat activity.log' or 'crash'", type: "out" },
        { text: "", type: "out" },
    ])
    const [input, setInput] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const { playClick, playError } = useSound()

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [lines])

    const push = (text: string, type: Line["type"] = "out") =>
        setLines(l => [...l, ...text.split("\n").map(t => ({ text: t, type }))])

    const run = (cmd: string) => {
        push(`C:\\MAYUR> ${cmd}`, "cmd")
        const [verb, ...args] = cmd.trim().toLowerCase().split(/\s+/)
        const arg = args.join(" ")

        switch (verb) {
            case "help": push(HELP); break
            case "ls": push(LS_OUT); break
            case "whoami": push("Mayur Giri - AI Engineer & Full-Stack Developer\nOS: PY-OS v2.6  |  Build: Portfolio Edition 2026\nSYSTEM: localhost  |  MEM: 640KB free"); break
            case "clear": setLines([]); break
            case "crash": push("\u26a0\ufe0f  WARNING: Initiating system fault..."); setTimeout(onCrash, 800); break
            case "exit": push("Use the [X] button to close this window."); break
            case "cat": {
                const key = arg.replace(/\.[a-z]+$/, "").toLowerCase()
                const match = Object.entries(CAT_FILES).find(([k]) => k.includes(key))
                if (match) push(match[1])
                else { push(`cat: ${arg}: No such file`, "err"); playError() }
                break
            }
            case "open": {
                const wid = OPEN_MAP[arg.replace(/\..+$/, "").toLowerCase()]
                if (wid) { push(`Launching ${arg.toUpperCase()}...`); openWindow(wid) }
                else { push(`open: '${arg}': not found. Try ls for file list.`, "err"); playError() }
                break
            }
            default: push(`'${verb}': command not found. Type 'help'.`, "err"); playError()
        }
    }

    const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
        playClick()
        if (e.key === "Enter" && input.trim()) { run(input.trim()); setInput("") }
    }

    return (
        <div className="pyos-terminal" onClick={() => inputRef.current?.focus()}>
            <div className="pyos-terminal-out">
                {lines.map((l, i) => (
                    <div key={i} className={`pyos-terminal-line${l.type === "err" ? " pyos-terminal-err" : l.type === "cmd" ? " pyos-terminal-cmd" : ""}`}>
                        {l.text}
                    </div>
                ))}
            </div>
            <div className="pyos-terminal-row">
                <span className="pyos-terminal-ps1">C:\MAYUR&gt;</span>
                <input
                    ref={inputRef}
                    className="pyos-terminal-inp"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKey}
                    autoFocus
                    spellCheck={false}
                    aria-label="Terminal input"
                />
                <span className="pyos-cursor-blink" aria-hidden="true">█</span>
            </div>
            <div ref={bottomRef} />
        </div>
    )
}
