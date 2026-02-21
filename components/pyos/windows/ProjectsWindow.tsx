"use client"

import { useState } from "react"
import Image from "next/image"
import { projects } from "@/data/projects"

export function ProjectsWindow() {
    const [detail, setDetail] = useState<string | null>(null)
    const proj = projects.find(p => p.id === detail)

    if (proj) {
        return (
            <div>
                <button className="pyos-btn-sm" onClick={() => setDetail(null)} style={{ marginBottom: 14 }}>
                    ← BACK
                </button>

                {/* Screenshot */}
                {proj.image && (
                    <div style={{ marginBottom: 14, border: "1px solid var(--pyos-border)", overflow: "hidden", maxHeight: 160 }}>
                        <Image
                            src={proj.image.split("?")[0]}
                            alt={proj.title}
                            width={600} height={160}
                            style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", filter: "saturate(0.8) contrast(1.1)" }}
                        />
                    </div>
                )}

                <div className="pyos-section-title">// {proj.title.toUpperCase()}</div>
                <div className="pyos-kv"><span className="pyos-key">CATEGORY:</span> <span className="pyos-val">{proj.category.toUpperCase()}</span></div>
                {proj.keyResult && (
                    <div className="pyos-kv"><span className="pyos-key">RESULT:</span>   <span className="pyos-accent-text">{proj.keyResult}</span></div>
                )}
                <div className="pyos-kv">
                    <span className="pyos-key">TAGS:</span>
                    <span>{proj.tags.map(t => <span key={t} className="pyos-tag">{t}</span>)}</span>
                </div>

                <hr className="pyos-divider" />
                <div className="pyos-section-title">// OVERVIEW</div>
                <p style={{ color: "var(--pyos-fg)", fontSize: 15, lineHeight: 1.6 }}>{proj.details.overview}</p>

                <hr className="pyos-divider" />
                <div className="pyos-section-title">// TECH_STACK.DAT</div>
                {proj.details.techStack.map((t, i) => (
                    <div key={i} className="pyos-val" style={{ fontSize: 15, marginBottom: 4 }}>▸ {t}</div>
                ))}

                <hr className="pyos-divider" />
                <div className="pyos-section-title">// CHALLENGES + SOLUTIONS</div>
                {proj.details.challenges.map((c, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                        <div style={{ color: "#ff8800", fontSize: 14 }}>CHALLENGE: {c}</div>
                        {proj.details.solutions[i] && (
                            <div style={{ color: "var(--pyos-accent)", fontSize: 14 }}>SOLUTION:  {proj.details.solutions[i]}</div>
                        )}
                    </div>
                ))}

                <hr className="pyos-divider" />
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer">
                        <button className="pyos-btn-sm">▶ DEMO</button>
                    </a>
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                        <button className="pyos-btn-sm">⌥ GITHUB</button>
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="pyos-section-title">// PROJECTS.EXE  [{projects.length} FILES FOUND]</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 12 }}>Double-click a card to view case study + screenshot</div>
            <div className="pyos-proj-grid">
                {projects.map(p => (
                    <button
                        key={p.id}
                        className="pyos-proj-card"
                        onDoubleClick={() => setDetail(p.id)}
                        aria-label={`Open ${p.title}`}
                        title="Double-click to open"
                    >
                        {/* Thumbnail */}
                        {p.image && (
                            <div style={{ marginBottom: 6, border: "1px solid var(--pyos-border)", overflow: "hidden", height: 70 }}>
                                <Image
                                    src={p.image.split("?")[0]}
                                    alt={p.title}
                                    width={280} height={70}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.7) brightness(0.8)" }}
                                />
                            </div>
                        )}
                        <span className="pyos-proj-name">{p.featured && "★ "}{p.title}</span>
                        <span className="pyos-proj-desc">{p.description.slice(0, 72)}…</span>
                        {p.keyResult && <span className="pyos-proj-badge">▸ {p.keyResult}</span>}
                    </button>
                ))}
            </div>
        </div>
    )
}
