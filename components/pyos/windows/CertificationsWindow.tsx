import { certifications } from "@/data/certifications"

export function CertificationsWindow() {
    return (
        <div>
            <div className="pyos-section-title">// CERTIFICATIONS.SYS</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 14 }}>
                {certifications.length} RECORDS FOUND  ·  SORTED BY DATE DESC
            </div>

            {certifications.map((cert, i) => (
                <div
                    key={cert.id}
                    style={{
                        borderBottom: "1px dashed var(--pyos-border)",
                        paddingBottom: 12,
                        marginBottom: 12,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
                        <span className="pyos-accent-text" style={{ fontSize: 17 }}>
                            [{String(i + 1).padStart(2, "0")}] {cert.title}
                        </span>
                        <span className="pyos-yellow-text" style={{ fontSize: 14 }}>{cert.date}</span>
                    </div>
                    <div className="pyos-dim" style={{ fontSize: 14, marginTop: 2 }}>ISSUER: {cert.issuer}</div>
                    {cert.credentialId && (
                        <div className="pyos-dim" style={{ fontSize: 13 }}>ID: {cert.credentialId}</div>
                    )}
                    <div style={{ marginTop: 4 }}>
                        {cert.skills.map(s => <span key={s} className="pyos-tag">{s}</span>)}
                    </div>
                </div>
            ))}
        </div>
    )
}
