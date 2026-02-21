import type React from "react"
import type { Metadata } from "next"

const BASE_URL = "https://mayurgiri-py-os.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Mayur Giri – AI Engineer & Full-Stack Developer",
    template: "%s | Mayur Giri",
  },
  description:
    "Mayur Giri is an AI Engineer and Full-Stack Developer specialising in machine learning, NLP, deep learning, and end-to-end AI solutions. Explore his interactive retro OS-themed portfolio.",

  authors: [{ name: "Mayur Giri", url: BASE_URL }],
  creator: "Mayur Giri",
  publisher: "Mayur Giri",

  keywords: [
    "Mayur Giri",
    "Mayur Giri portfolio",
    "Mayur Giri developer",
    "Mayur Giri AI engineer",
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "NLP Engineer",
    "Deep Learning",
    "Python Developer",
    "Next.js Developer",
    "Insider Threat Detection",
    "Portfolio",
    "PY-OS",
  ],

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Mayur Giri Portfolio",
    title: "Mayur Giri – AI Engineer & Full-Stack Developer",
    description:
      "Mayur Giri is an AI Engineer and Full-Stack Developer. Explore his interactive retro OS-themed portfolio with projects, skills, and experience.",
    images: [
      {
        url: "/mayurgiri.webp",
        width: 1200,
        height: 630,
        alt: "Mayur Giri – AI Engineer & Full-Stack Developer",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mayur Giri – AI Engineer & Full-Stack Developer",
    description:
      "AI Engineer and Full-Stack Developer. Explore my interactive retro OS-themed portfolio.",
    images: ["/mayurgiri.webp"],
    creator: "@IMxMaYur",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",

  verification: {
    google: "aB91dE5REqHmBeWYWvXX2K9HisOjqY1WXGk2KEz2sKw",
  },
}

// JSON-LD structured data — Person schema for "Mayur Giri" entity recognition
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mayur Giri",
  url: BASE_URL,
  jobTitle: "AI Engineer & Full-Stack Developer",
  description:
    "AI Engineer and Full-Stack Developer specialising in machine learning, NLP, deep learning, and end-to-end AI solutions.",
  image: `${BASE_URL}/mayurgiri.webp`,
  email: "work.mayurgiri@gmail.com",
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Full-Stack Development",
    "Next.js",
    "Python",
    "MLOps",
    "Data Engineering",
  ],
  sameAs: [
    "https://github.com/IMxMaYur",
    "https://linkedin.com/in/mayurgiri",
    BASE_URL,
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mayur Giri Portfolio",
  url: BASE_URL,
  description: "Portfolio of Mayur Giri, AI Engineer & Full-Stack Developer",
  author: {
    "@type": "Person",
    name: "Mayur Giri",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#000080", overflow: "hidden" }}>
        {/* SEO-accessible heading for crawlers — visually hidden */}
        <h1
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            margin: 0,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Mayur Giri – AI Engineer &amp; Full-Stack Developer Portfolio
        </h1>
        {children}
      </body>
    </html>
  )
}
