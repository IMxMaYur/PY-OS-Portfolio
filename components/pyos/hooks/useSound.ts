"use client"
import { useCallback, useRef } from "react"

export function useSound() {
    const ctxRef = useRef<AudioContext | null>(null)

    const ctx = () => {
        if (typeof window === "undefined") return null
        if (!ctxRef.current) ctxRef.current = new AudioContext()
        if (ctxRef.current.state === "suspended") ctxRef.current.resume()
        return ctxRef.current
    }

    const beep = useCallback((freq: number, dur: number, vol = 0.08, type: OscillatorType = "square") => {
        try {
            const c = ctx(); if (!c) return
            const o = c.createOscillator(), g = c.createGain()
            o.type = type; o.frequency.value = freq
            g.gain.setValueAtTime(vol, c.currentTime)
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur)
            o.connect(g); g.connect(c.destination)
            o.start(); o.stop(c.currentTime + dur)
        } catch { /* silently ignore before user interaction */ }
    }, [])

    const playClick = useCallback(() => beep(600, 0.04, 0.05), [beep])
    const playBeep = useCallback(() => beep(880, 0.08, 0.07), [beep])
    const playError = useCallback(() => beep(180, 0.3, 0.12, "sawtooth"), [beep])
    const playClose = useCallback(() => beep(440, 0.06, 0.05), [beep])

    const playBoot = useCallback(() => {
        try {
            const c = ctx(); if (!c) return
                ;[220, 330, 440, 660].forEach((f, i) => {
                    const o = c.createOscillator(), g = c.createGain()
                    o.frequency.value = f
                    const t = c.currentTime + i * 0.13
                    g.gain.setValueAtTime(0.07, t)
                    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
                    o.connect(g); g.connect(c.destination)
                    o.start(t); o.stop(t + 0.1)
                })
        } catch { }
    }, [])

    return { playClick, playBeep, playError, playClose, playBoot }
}
