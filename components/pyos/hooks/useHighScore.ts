"use client"
import { useState, useCallback } from "react"

export function useHighScore(gameId: string) {
    const [best, setBest] = useState<number>(() => {
        if (typeof window === "undefined") return 0
        return parseInt(localStorage.getItem(`pyos-best-${gameId}`) ?? "0", 10)
    })

    const update = useCallback((score: number) => {
        setBest(prev => {
            if (score > prev) {
                localStorage.setItem(`pyos-best-${gameId}`, String(score))
                return score
            }
            return prev
        })
    }, [gameId])

    return { best, update }
}
