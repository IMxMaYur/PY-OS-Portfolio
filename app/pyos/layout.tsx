import type React from "react"
import { VT323 } from "next/font/google"
import "../../components/pyos/pyos.css"

const vt323 = VT323({ weight: "400", subsets: ["latin"], display: "swap" })

export const metadata = {
    title: "PY-OS v2.6 – Mayur Giri",
    description: "Retro OS Portfolio – Mayur Giri · AI Engineer & Full-Stack Developer",
}

export default function PyOSLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`pyos-root ${vt323.className}`}>
            {children}
        </div>
    )
}
