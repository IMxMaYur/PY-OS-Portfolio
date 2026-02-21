"use client"

import { useGitHubStats } from "@/components/pyos/hooks/useGitHubStats"

export function AboutWindow() {
    const gh = useGitHubStats("IMxMaYur")

    return (
        <div>
            <div className="pyos-section-title">// ABOUT_ME.INFO</div>

            <div className="pyos-kv-grid" style={{ marginBottom: 16 }}>
                <span className="pyos-key">NAME</span>      <span className="pyos-val">Mayur Giri</span>
                <span className="pyos-key">ROLE</span>      <span className="pyos-val">AI Engineer &amp; Full-Stack Developer</span>
                <span className="pyos-key">LOCATION</span>  <span className="pyos-val">Mumbai, India</span>
                <span className="pyos-key">STATUS</span>    <span className="pyos-accent-text">AVAILABLE FOR WORK ●</span>
                <span className="pyos-key">FOCUS</span>     <span className="pyos-val">NLP · Computer Vision · MLOps</span>
                <span className="pyos-key">EDUCATION</span> <span className="pyos-val">BE – AI &amp; Data Science, Univ. of Mumbai</span>
            </div>

            <div className="pyos-dim" style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                Building intelligent systems at the intersection of AI and real-world engineering.
                From insider threat detection to full-stack ML pipelines — I bridge research and production.
            </div>

            <hr className="pyos-divider" />
            <div className="pyos-section-title">// GITHUB.LIVE</div>

            {gh.loading && (
                <div className="pyos-dim" style={{ fontSize: 15 }}>
                    Connecting to api.github.com<span className="pyos-cursor-blink">█</span>
                </div>
            )}
            {gh.error && (
                <div className="pyos-dim" style={{ fontSize: 14 }}>
                    ⚠ Could not reach GitHub API (rate limit or offline)
                </div>
            )}
            {!gh.loading && !gh.error && (
                <div className="pyos-kv-grid" style={{ marginBottom: 16 }}>
                    <span className="pyos-key">PUBLIC REPOS</span>  <span className="pyos-accent-text">{gh.repos}</span>
                    <span className="pyos-key">FOLLOWERS</span>     <span className="pyos-accent-text">{gh.followers}</span>
                    <span className="pyos-key">PUBLIC GISTS</span>  <span className="pyos-accent-text">{gh.publicGists}</span>
                    <span className="pyos-key">PROFILE</span>
                    <a className="pyos-link" href="https://github.com/IMxMaYur" target="_blank" rel="noopener noreferrer">
                        github.com/IMxMaYur ↗
                    </a>
                </div>
            )}

            <hr className="pyos-divider" />
            <div className="pyos-section-title">// STRENGTHS.DAT</div>
            {["AI systems design", "Real-time ML pipelines", "React/Next.js front-ends", "Cloud-native deployments (GCP/AWS)", "Cross-domain problem solving"].map(s => (
                <div key={s} style={{ fontSize: 16, marginBottom: 4 }}>
                    <span className="pyos-accent-text">▸</span> {s}
                </div>
            ))}
        </div>
    )
}
