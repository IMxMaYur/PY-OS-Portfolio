# 🖥️ PY-OS Portfolio — Mayur Giri

> *A retro operating system simulation built as a personal portfolio.*

**PY-OS v2.6** mimics the look and feel of a classic 80s/90s terminal OS — with a boot sequence, draggable windows, a taskbar, and a full mobile shell — all built as a modern Next.js app with zero UI libraries; just custom CSS and pure React.

🔗 **Live:** [mayurgiri-py-os.vercel.app](https://mayurgiri-py-os.vercel.app) &nbsp;|&nbsp; 📄 **Resume:** available via `RESUME.EXE` in the OS

---

## ✨ Features

| Feature | Details |
|---|---|
| 🖥️ **Boot Screen** | Animated 0→100% progress bar with live % counter and "BOOT COMPLETE" message |
| 🪟 **Draggable Windows** | Fully draggable, closeable windows on desktop |
| 📱 **Mobile Shell** | Dedicated mobile UI with full-screen app view |
| 🎨 **4 CRT Themes** | Green Phosphor, Amber, White Monochrome, Matrix Green |
| 🌌 **5 Wallpapers** | Matrix Rain, Starfield, Retro Grid, Binary, Solid |
| 🕹️ **3 Playable Games** | Snake, Tetris, Pong — with high-score tracking |
| 🔙 **Back Navigation** | `[← HOME]` button on desktop and mobile returns to welcome screen |
| 💾 **Resume Download** | Direct PDF download from `RESUME.EXE` |
| 📡 **Live GitHub Stats** | `ABOUT.INFO` fetches real-time GitHub API data |
| ⌨️ **Terminal** | Interactive terminal with typed commands |

---

## �️ Windows / Apps

```
ABOUT.EXE       — Bio, GitHub live stats, strengths
PROJECTS.EXE    — 6 projects with screenshots & case studies
SKILLS.DAT      — Skill bars by category
CAREER.LOG      — Timeline of experience & education
CERTIFICATIONS  — Certificates & learning credentials
RESUME.EXE      — Download MAYUR-GIRI-RESUME.pdf
CONTACT.INI     — Contact form (opens mailto)
TERMINAL.EXE    — Interactive command-line interface
SETTINGS.EXE    — Switch themes and wallpapers
GAMES.EXE       — Launch Snake, Tetris, or Pong
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS (`pyos.css`) — zero Tailwind classes |
| Font | VT323 (Google Fonts — bitmap terminal font) |
| State | React `useState` / `useEffect` hooks |
| Deployment | Vercel |

---

## 🚀 Run Locally

```bash
git clone https://github.com/IMxMaYur/PY-OS-Portfolio.git
cd PY-OS-Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/pyos`.

---

## 📁 Project Structure

```
app/
  pyos/           # Main PY-OS page + layout
  layout.tsx      # Root layout (SEO metadata)
  page.tsx        # Redirects / → /pyos

components/pyos/
  BootScreen.tsx      # Boot animation
  WelcomeScreen.tsx   # Welcome / login screen
  Desktop.tsx         # Desktop with taskbar & windows
  MobileShell.tsx     # Mobile-optimized UI
  Window.tsx          # Draggable window component
  windows/            # Individual app windows
  hooks/              # useHighScore, useGitHubStats

data/
  projects.ts         # Project details & thumbnails
  skills.tsx          # Skill categories & levels
  experience.tsx      # Career timeline data
  certifications.ts   # Certificates list

public/
  MAYUR-GIRI-RESUME.pdf
  *.webp              # Project screenshots
```

---

## 📞 Contact

| | |
|---|---|
| 📧 Email | work.mayurgiri@gmail.com |
| � LinkedIn | [linkedin.com/in/mayurgiri](https://linkedin.com/in/mayurgiri) |
| 🐙 GitHub | [github.com/IMxMaYur](https://github.com/IMxMaYur) |
| 🌐 Portfolio | [mayurgiri.vercel.app](https://mayurgiri.vercel.app) |
| 🌐 Portfolio-2 | [mayurgiri-py-os.vercel.app](https://mayurgiri-py-os.vercel.app) |

---

## 📜 License

© 2026 Mayur Giri · All rights reserved.
