"use client"

import { useState } from "react"

export function ContactWindow() {
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [sent, setSent] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const mailto = `mailto:mayurgiri@example.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`
        window.open(mailto, "_blank")
        setSent(true)
    }

    return (
        <div>
            <div className="pyos-section-title">// CONTACT.INI</div>
            <div className="pyos-dim" style={{ fontSize: 14, marginBottom: 14 }}>
                [CONTACT_FORM]<br />
                ; Fill in the fields below and press SEND
            </div>

            {sent ? (
                <div>
                    <div className="pyos-accent-text" style={{ fontSize: 18, marginBottom: 10 }}>
                        ✓ Message queued for transmission!
                    </div>
                    <div className="pyos-dim" style={{ fontSize: 15 }}>
                        Your email client should open with the draft pre-filled.
                    </div>
                    <button
                        className="pyos-btn-sm"
                        style={{ marginTop: 16 }}
                        onClick={() => { setForm({ name: "", email: "", message: "" }); setSent(false) }}
                    >
                        [NEW MESSAGE]
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="pyos-form-group">
                        <label className="pyos-input-label" htmlFor="c-name">NAME=</label>
                        <input
                            id="c-name"
                            className="pyos-input"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="your_name"
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div className="pyos-form-group">
                        <label className="pyos-input-label" htmlFor="c-email">EMAIL=</label>
                        <input
                            id="c-email"
                            className="pyos-input"
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="pyos-form-group">
                        <label className="pyos-input-label" htmlFor="c-msg">MESSAGE=</label>
                        <textarea
                            id="c-msg"
                            className="pyos-input pyos-textarea"
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            placeholder="Type your message here..."
                            required
                        />
                    </div>
                    <button className="pyos-btn" type="submit">
                        ▶ SEND MESSAGE
                    </button>
                </form>
            )}

            <hr className="pyos-divider" />
            <div className="pyos-dim" style={{ fontSize: 14 }}>
                [LINKS]<br />
                GITHUB=github.com/IMxMaYur<br />
                LINKEDIN=linkedin.com/in/mayurgiri<br />
                WEB=mayurgiri.vercel.app
            </div>
        </div>
    )
}
