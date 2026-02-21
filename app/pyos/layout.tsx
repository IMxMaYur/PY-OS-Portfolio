import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import "../../components/pyos/pyos.css"

const vt323 = VT323({ weight: "400", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
    title: "Mayur Giri – AI Engineer & Full-Stack Developer | Interactive Portfolio",
    description:
        "Mayur Giri's interactive portfolio — an AI Engineer & Full-Stack Developer. Explore projects, skills, career timeline, and get in touch. Runs as a retro OS experience.",
    alternates: {
        canonical: "https://mayurgiri.vercel.app",
    },
}

export default function PyOSLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`pyos-root ${vt323.className}`}>
            {children}
        </div>
    )
}
