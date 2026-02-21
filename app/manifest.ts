export const dynamic = "force-static"

import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mayur Giri – AI Engineer & Full-Stack Developer",
    short_name: "Mayur Giri",
    description: "Portfolio of Mayur Giri — AI Engineer & Full-Stack Developer specialising in machine learning and end-to-end AI solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#000080",
    theme_color: "#00ff41",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
