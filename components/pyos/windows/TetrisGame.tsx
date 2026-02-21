"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useHighScore } from "@/components/pyos/hooks/useHighScore"

const COLS = 10, ROWS = 20, CELL = 16

const PIECES = [
    { shape: [[1, 1, 1, 1]], color: "#00ffff" },
    { shape: [[1, 1], [1, 1]], color: "#ffff00" },
    { shape: [[0, 1, 0], [1, 1, 1]], color: "#aa00ff" },
    { shape: [[0, 1, 1], [1, 1, 0]], color: "#00ff00" },
    { shape: [[1, 1, 0], [0, 1, 1]], color: "#ff0000" },
    { shape: [[1, 0, 0], [1, 1, 1]], color: "#ff8800" },
    { shape: [[0, 0, 1], [1, 1, 1]], color: "#0088ff" },
]

type Board = (string | null)[][]
function emptyBoard(): Board { return Array.from({ length: ROWS }, () => Array(COLS).fill(null)) }
function rotate(m: number[][]) { return m[0].map((_, i) => m.map(r => r[i]).reverse()) }
interface Piece { shape: number[][]; color: string; x: number; y: number }

function fits(board: Board, piece: Piece, dx = 0, dy = 0, shape = piece.shape) {
    for (let r = 0; r < shape.length; r++)
        for (let c = 0; c < shape[r].length; c++)
            if (shape[r][c]) {
                const nx = piece.x + c + dx, ny = piece.y + r + dy
                if (nx < 0 || nx >= COLS || ny >= ROWS || (ny >= 0 && board[ny][nx])) return false
            }
    return true
}

function randPiece(): Piece {
    const p = PIECES[Math.floor(Math.random() * PIECES.length)]
    return { ...p, shape: p.shape.map(r => [...r]), x: 3, y: -1 }
}

export function TetrisGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const st = useRef({ board: emptyBoard(), piece: randPiece(), next: randPiece(), score: 0, lines: 0, over: false })
    const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const [score, setScore] = useState(0)
    const [over, setOver] = useState(false)
    const { best, update } = useHighScore("tetris")

    const draw = useCallback(() => {
        const canvas = canvasRef.current; if (!canvas) return
        const ctx = canvas.getContext("2d"); if (!ctx) return
        const { board, piece } = st.current
        ctx.fillStyle = "#000"; ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL)
        ctx.strokeStyle = "rgba(0,60,0,0.4)"; ctx.lineWidth = 0.5
        for (let x = 0; x <= COLS; x++) { ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, ROWS * CELL); ctx.stroke() }
        for (let y = 0; y <= ROWS; y++) { ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(COLS * CELL, y * CELL); ctx.stroke() }
        board.forEach((row, r) => row.forEach((cell, c) => {
            if (cell) { ctx.fillStyle = cell; ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2) }
        }))
        piece.shape.forEach((row, r) => row.forEach((v, c) => {
            if (v) { ctx.fillStyle = piece.color; ctx.fillRect((piece.x + c) * CELL + 1, (piece.y + r) * CELL + 1, CELL - 2, CELL - 2) }
        }))
    }, [])

    const lock = useCallback(() => {
        const s = st.current
        s.piece.shape.forEach((row, r) => row.forEach((v, c) => {
            if (v && s.piece.y + r >= 0) s.board[s.piece.y + r][s.piece.x + c] = s.piece.color
        }))
        let cleared = 0
        s.board = s.board.filter(row => { if (row.every(c => c !== null)) { cleared++; return false } return true })
        while (s.board.length < ROWS) s.board.unshift(Array(COLS).fill(null))
        s.score += cleared * 100 * (cleared + 1); s.lines += cleared
        setScore(s.score); update(s.score)
        s.piece = s.next; s.next = randPiece()
        if (!fits(s.board, s.piece)) { s.over = true; setOver(true) }
        draw()
    }, [draw, update])

    const tick = useCallback(() => {
        const s = st.current; if (s.over) return
        if (fits(s.board, s.piece, 0, 1)) { s.piece.y++; draw() } else { lock() }
    }, [draw, lock])

    const restart = useCallback(() => {
        const s = st.current
        s.board = emptyBoard(); s.piece = randPiece(); s.next = randPiece()
        s.score = 0; s.lines = 0; s.over = false
        setScore(0); setOver(false); draw()
    }, [draw])

    useEffect(() => {
        draw()
        tickRef.current = setInterval(tick, 500)
        const onKey = (e: KeyboardEvent) => {
            const s = st.current; if (s.over) return
            if (e.key === "ArrowLeft" && fits(s.board, s.piece, -1)) { s.piece.x--; draw() }
            if (e.key === "ArrowRight" && fits(s.board, s.piece, 1)) { s.piece.x++; draw() }
            if (e.key === "ArrowDown" && fits(s.board, s.piece, 0, 1)) { s.piece.y++; draw() }
            if (e.key === "z" || e.key === "ArrowUp") {
                const rot = rotate(s.piece.shape)
                if (fits(s.board, s.piece, 0, 0, rot)) { s.piece.shape = rot; draw() }
            }
            if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "z"].includes(e.key)) e.preventDefault()
        }
        window.addEventListener("keydown", onKey)
        return () => { if (tickRef.current) clearInterval(tickRef.current); window.removeEventListener("keydown", onKey) }
    }, [draw, tick])

    const move = (action: "L" | "R" | "D" | "ROT") => {
        const s = st.current; if (s.over) return
        if (action === "L" && fits(s.board, s.piece, -1)) { s.piece.x--; draw() }
        if (action === "R" && fits(s.board, s.piece, 1)) { s.piece.x++; draw() }
        if (action === "D" && fits(s.board, s.piece, 0, 1)) { s.piece.y++; draw() }
        if (action === "ROT") { const rot = rotate(s.piece.shape); if (fits(s.board, s.piece, 0, 0, rot)) { s.piece.shape = rot; draw() } }
    }

    return (
        <div className="pyos-game-wrap">
            <div className="pyos-game-hud">
                SCORE: {score}
                {best > 0 && <span className="pyos-yellow-text">  ·  BEST: {best}</span>}
                {over && <span style={{ color: "#ff4444" }}> · GAME OVER</span>}
            </div>
            <canvas ref={canvasRef} className="pyos-game-canvas" width={COLS * CELL} height={ROWS * CELL} />
            {over && <button className="pyos-btn" onClick={restart}>▶ RESTART</button>}
            <div className="pyos-touch-controls">
                <div className="pyos-touch-row">
                    <button className="pyos-touch-btn" onPointerDown={() => move("ROT")} aria-label="Rotate">↻</button>
                </div>
                <div className="pyos-touch-row">
                    <button className="pyos-touch-btn" onPointerDown={() => move("L")} aria-label="Left">◄</button>
                    <button className="pyos-touch-btn" onPointerDown={() => move("D")} aria-label="Down">▼</button>
                    <button className="pyos-touch-btn" onPointerDown={() => move("R")} aria-label="Right">►</button>
                </div>
            </div>
            <div className="pyos-dim" style={{ fontSize: 13 }}>Arrows + Z to rotate on desktop</div>
        </div>
    )
}
