import { skillCategories } from "@/data/skills"

export function SkillsWindow() {
    return (
        <div>
            <div className="pyos-section-title">// SKILLS.DAT</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 14 }}>
                FORMAT: [SKILL_NAME] ... [LEVEL%]
            </div>

            {skillCategories.map(cat => (
                <div key={cat.id} style={{ marginBottom: 20 }}>
                    <div className="pyos-yellow-text" style={{ fontSize: 17, marginBottom: 8, letterSpacing: 1 }}>
                        ╔═ {cat.name.toUpperCase()} ═
                    </div>
                    {cat.skills.map(skill => (
                        <div key={skill.name} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
                                <span className="pyos-accent-text">▸ {skill.name}</span>
                                <span className="pyos-yellow-text">{skill.level}%</span>
                            </div>
                            <div className="pyos-bar-wrap">
                                <div className="pyos-bar-fill" style={{ width: `${skill.level}%` }} />
                            </div>
                            <div className="pyos-dim" style={{ fontSize: 13, marginTop: 2 }}>
                                {skill.useCase}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
