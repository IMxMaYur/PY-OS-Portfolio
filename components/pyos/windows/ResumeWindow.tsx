export function ResumeWindow() {
    return (
        <div className="pyos-resume-box">
            <div className="pyos-resume-art">
                {`┌──────────────────────────────┐
│   MAYUR GIRI  –  RESUME.PDF  │
│   AI Engineer | Full-Stack   │
│   Mumbai, IN  ·  2026        │
└──────────────────────────────┘`}
            </div>

            <div className="pyos-dim" style={{ marginBottom: 20, fontSize: 16 }}>
                File: MAYUR-GIRI-RESUME.pdf<br />
                Size: ~93 KB  ·  Format: PDF v1.7
            </div>

            <a href="/MAYUR-GIRI-RESUME.pdf" target="_blank" rel="noopener noreferrer" download>
                <button className="pyos-btn" style={{ fontSize: 20 }}>
                    ▼ DOWNLOAD RESUME
                </button>
            </a>

            <div className="pyos-dim" style={{ marginTop: 16, fontSize: 14 }}>
                Opens in new tab · PDF format
            </div>
        </div>
    )
}
