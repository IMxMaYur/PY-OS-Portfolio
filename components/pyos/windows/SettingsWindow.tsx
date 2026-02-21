"use client"

import type { PyOSState, Theme, Wallpaper } from "@/app/pyos/page"

const THEMES: { id: Theme; label: string }[] = [
    { id: "phosphor", label: "Green Phosphor (Default)" },
    { id: "amber", label: "Amber CRT" },
    { id: "white", label: "White Monochrome" },
    { id: "matrix", label: "Matrix Green" },
]

const WALLPAPERS: { id: Wallpaper; label: string }[] = [
    { id: "none", label: "None (Default)" },
    { id: "matrix", label: "Matrix Rain" },
    { id: "starfield", label: "Starfield" },
    { id: "retrogrid", label: "Retro Grid" },
    { id: "binary", label: "Binary" },
    { id: "solid", label: "Solid Fill" },
]

function RadioGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string
    options: { id: T; label: string }[]
    value: T
    onChange: (v: T) => void
}) {
    return (
        <div className="pyos-settings-group">
            <div className="pyos-section-title">// {label}</div>
            {options.map(opt => (
                <div
                    key={opt.id}
                    className={`pyos-option-row${value === opt.id ? " sel" : ""}`}
                    onClick={() => onChange(opt.id)}
                    role="radio"
                    aria-checked={value === opt.id}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onChange(opt.id) }}
                >
                    <span className="pyos-radio">{value === opt.id ? "●" : " "}</span>
                    {opt.label}
                </div>
            ))}
        </div>
    )
}

export function SettingsWindow({ state }: { state: PyOSState }) {
    return (
        <div>
            <div className="pyos-section-title">// SETTINGS.EXE</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 16 }}>
                Changes apply instantly. Click an option to select.
            </div>

            <RadioGroup
                label="DISPLAY THEME"
                options={THEMES}
                value={state.theme}
                onChange={state.setTheme}
            />

            <RadioGroup
                label="WALLPAPER"
                options={WALLPAPERS}
                value={state.wallpaper}
                onChange={state.setWallpaper}
            />

            <hr className="pyos-divider" />
            <div className="pyos-dim" style={{ fontSize: 14 }}>
                [SYSTEM INFO]<br />
                OS: PY-OS v2.6.0<br />
                Build: Portfolio Edition 2026<br />
                Memory: 640KB Conventional<br />
                Font: VT323 (Bitmap)
            </div>
        </div>
    )
}
