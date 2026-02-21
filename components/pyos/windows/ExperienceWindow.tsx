"use client"

import { useEffect, useState } from "react"
import { timelineItems } from "@/data/experience"

export function ExperienceWindow() {
    const [visible, setVisible] = useState(0)

    // Stagger each entry appearing (150ms apart) on component mount
    useEffect(() => {
        let i = 0
        const id = setInterval(() => {
            i++
            setVisible(i)
            if (i >= timelineItems.length + 1) clearInterval(id)
        }, 180)
        return () => clearInterval(id)
    }, [])

    return (
        <div>
            <div className="pyos-section-title">// CAREER.LOG</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 14 }}>
                Parsing career timeline... {timelineItems.length} ENTRIES FOUND
            </div>

            {timelineItems.map((item, i) => (
                <div
                    key={i}
                    style={{
                        marginBottom: 20,
                        borderLeft: "2px solid var(--pyos-border)",
                        paddingLeft: 14,
                        opacity: visible > i ? 1 : 0,
                        transform: visible > i ? "translateX(0)" : "translateX(-12px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >
                    <div className="pyos-yellow-text" style={{ fontSize: 16, marginBottom: 2 }}>◆ {item.year}</div>
                    <div className="pyos-accent-text" style={{ fontSize: 18, marginBottom: 2 }}>{item.role}</div>
                    <div style={{ color: "var(--pyos-fg-dim)", fontSize: 15, marginBottom: 6 }}>@ {item.company}</div>
                    <div style={{ color: "var(--pyos-fg)", fontSize: 15, lineHeight: 1.5 }}>{item.description}</div>
                </div>
            ))}

            <div style={{
                borderLeft: "2px solid var(--pyos-border)", paddingLeft: 14,
                opacity: visible > timelineItems.length ? 1 : 0,
                transform: visible > timelineItems.length ? "translateX(0)" : "translateX(-12px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
                <hr className="pyos-divider" />
                <div className="pyos-section-title">// EDUCATION.SYS</div>
                <div className="pyos-yellow-text" style={{ fontSize: 16 }}>◆ 2022 – 2026</div>
                <div className="pyos-accent-text" style={{ fontSize: 18 }}>BE – Artificial Intelligence &amp; Data Science</div>
                <div className="pyos-dim" style={{ fontSize: 15 }}>@ University of Mumbai, India</div>
                <div className="pyos-val" style={{ fontSize: 15, marginTop: 4 }}>CGPA: 7.0 / 10  ·  Focus: NLP, Computer Vision</div>
            </div>
        </div>
    )
}
