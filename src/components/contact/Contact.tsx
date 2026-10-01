'use client'

import React, { useState } from 'react'
import { socialLinks } from '@/data/socials'

// Email displayed as hex bytes with a [decode] button.
// On click: convert hex to ASCII string, replace display with mailto link.
const EMAIL_HEX = '61 62 6f 64 6c 61 40 75 6d 64 2e 65 64 75'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const OPEN_TO = ['internships', 'security research', 'startups', 'project ideas']

function decodeHex(hex: string): string {
  try {
    return hex
      .trim()
      .split(/\s+/)
      .map((h) => String.fromCharCode(parseInt(h, 16)))
      .join('')
  } catch {
    return ''
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'limited'>('idle')
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})
  const [decoded, setDecoded] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setErrors({})

    const newErrors: { email?: string; message?: string } = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!EMAIL_RE.test(formData.email.trim())) newErrors.email = 'Enter a valid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '', company: '' })
      } else if (response.status === 429) {
        setStatus('limited')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const decodedEmail = decoded ? decodeHex(EMAIL_HEX) : ''

  return (
    <section className="relative overflow-hidden px-6 md:px-12 py-16" id="contact">
      <div className="max-w-2xl mx-auto">
        <div className="text-terminal-green text-xs tracking-widest mb-8">
          {'// ESTABLISH_CONTACT'}
        </div>

        <div className="mb-8">
          <p className="text-terminal-white text-sm leading-relaxed mb-3">
            I&apos;m open to {OPEN_TO.slice(0, -1).join(', ')}, and {OPEN_TO[OPEN_TO.length - 1]}.
            If something here caught your eye, say hi. I usually reply within a couple of days.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green-dim text-xs tracking-widest hover:text-terminal-green transition-colors"
              >
                {`[${label.toUpperCase()} →]`}
              </a>
            ))}
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-amber text-xs tracking-widest hover:underline"
            >
              [RESUME.PDF →]
            </a>
          </div>
        </div>

        <div className="border border-terminal-border bg-terminal-surface p-5 mb-8">
          <div className="text-terminal-green-muted text-xs tracking-widest mb-2">
            {'// DIRECT_CHANNEL'}
          </div>
          {!decoded ? (
            <div className="flex flex-wrap items-center gap-3">
              <pre className="text-terminal-white text-sm break-all whitespace-pre-wrap">
                {EMAIL_HEX}
              </pre>
              <button
                type="button"
                onClick={() => setDecoded(true)}
                className="border border-terminal-green text-terminal-green text-xs tracking-widest px-3 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
              >
                [decode]
              </button>
            </div>
          ) : (
            <a
              href={`mailto:${decodedEmail}`}
              className="text-terminal-amber text-sm hover:underline break-all"
            >
              {decodedEmail || '// decode failed'}
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Honeypot: hidden from people, filled in by bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-terminal-green-muted text-xs tracking-widest"
            >
              NAME
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="enter name"
              className="bg-transparent border border-terminal-border focus:border-terminal-green outline-none font-mono text-sm p-2 w-full text-terminal-white placeholder:text-terminal-green-muted"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-terminal-green-muted text-xs tracking-widest"
            >
              EMAIL <span className="text-terminal-amber">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enter email"
              className="bg-transparent border border-terminal-border focus:border-terminal-green outline-none font-mono text-sm p-2 w-full text-terminal-white placeholder:text-terminal-green-muted"
            />
            {errors.email && (
              <p className="text-terminal-red text-xs mt-1">{'// '}{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-terminal-green-muted text-xs tracking-widest"
            >
              MESSAGE <span className="text-terminal-amber">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="enter message"
              className="bg-transparent border border-terminal-border focus:border-terminal-green outline-none font-mono text-sm p-2 w-full text-terminal-white placeholder:text-terminal-green-muted resize-y"
            />
            {errors.message && (
              <p className="text-terminal-red text-xs mt-1">{'// '}{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="border border-terminal-amber text-terminal-amber text-xs tracking-widest px-4 py-2 hover:bg-terminal-amber hover:text-terminal-bg transition-colors disabled:opacity-50"
          >
            [TRANSMIT →]
          </button>

          <div role="status" aria-live="polite">
            {status === 'loading' && (
              <p className="text-terminal-green-dim text-xs">{'// TRANSMITTING...'}</p>
            )}
            {status === 'success' && (
              <p className="text-terminal-green text-xs">{'// MESSAGE RECEIVED'}</p>
            )}
            {status === 'limited' && (
              <p className="text-terminal-red text-xs">{'// RATE LIMITED — try again later or email directly'}</p>
            )}
            {status === 'error' && (
              <p className="text-terminal-red text-xs">{'// TRANSMISSION FAILED — try direct email'}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
