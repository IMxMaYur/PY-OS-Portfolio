import type { WindowId } from "@/app/pyos/page"

interface Props { openWindow: (id: WindowId) => void }

const GAMES = [
    { id: "snake" as WindowId, emoji: "🐍", name: "SNAKE.EXE", desc: "Classic snake — collect food, grow, don't bite yourself!", controls: "Arrows / WASD  ·  Touch D-pad on mobile" },
    { id: "tetris" as WindowId, emoji: "🎮", name: "TETRIS.EXE", desc: "Stack blocks, clear lines, climb the leaderboard.", controls: "Arrows + Z to rotate  ·  Touch buttons on mobile" },
    { id: "pong" as WindowId, emoji: "🏓", name: "PONG.EXE", desc: "Classic Pong — you vs CPU. First to 7 wins.", controls: "↑ / ↓ or W / S  ·  Touch to drag paddle" },
]

export function GamesWindow({ openWindow }: Props) {
    return (
        <div>
            <div className="pyos-section-title">// GAMES.EXE</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 16 }}>
                3 GAMES AVAILABLE  ·  High scores saved locally
            </div>
            <div className="pyos-game-launcher">
                {GAMES.map(g => (
                    <button
                        key={g.id}
                        className="pyos-game-card"
                        onClick={() => openWindow(g.id)}
                        aria-label={`Launch ${g.name}`}
                    >
                        <div className="pyos-accent-text" style={{ fontSize: 20 }}>{g.emoji} {g.name}</div>
                        <div className="pyos-dim" style={{ fontSize: 15, marginTop: 4 }}>{g.desc}</div>
                        <div style={{ color: "var(--pyos-yellow)", fontSize: 13, marginTop: 4 }}>
                            CONTROLS: {g.controls}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
