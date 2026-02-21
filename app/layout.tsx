import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PY-OS v2.6 – Mayur Giri",
  description: "Retro OS portfolio of Mayur Giri – AI Engineer & Full-Stack Developer. Built with Next.js.",
  metadataBase: new URL("https://mayurgiri.vercel.app"),
  authors: [{ name: "Mayur Giri" }],
  keywords: ["Mayur Giri", "AI Engineer", "Full Stack Developer", "Portfolio", "PY-OS"],
  openGraph: {
    type: "website",
    url: "https://mayurgiri.vercel.app",
    title: "PY-OS v2.6 – Mayur Giri",
    description: "Retro OS portfolio – AI Engineer & Full-Stack Developer",
    images: [{ url: "/mayurg.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PY-OS v2.6 – Mayur Giri",
    description: "Retro OS portfolio – AI Engineer & Full-Stack Developer",
    images: ["/mayurg.webp"],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#000080", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  )
}
