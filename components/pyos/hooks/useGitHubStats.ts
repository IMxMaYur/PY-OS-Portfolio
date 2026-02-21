"use client"
import { useState, useEffect } from "react"

interface GitHubStats {
    repos: number
    followers: number
    publicGists: number
    loading: boolean
    error: boolean
}

export function useGitHubStats(username: string): GitHubStats {
    const [stats, setStats] = useState<GitHubStats>({
        repos: 0, followers: 0, publicGists: 0, loading: true, error: false,
    })

    useEffect(() => {
        let cancelled = false
        fetch(`https://api.github.com/users/${username}`)
            .then(r => r.json())
            .then(d => {
                if (cancelled) return
                setStats({
                    repos: d.public_repos ?? 0,
                    followers: d.followers ?? 0,
                    publicGists: d.public_gists ?? 0,
                    loading: false,
                    error: false,
                })
            })
            .catch(() => {
                if (!cancelled) setStats(s => ({ ...s, loading: false, error: true }))
            })
        return () => { cancelled = true }
    }, [username])

    return stats
}
