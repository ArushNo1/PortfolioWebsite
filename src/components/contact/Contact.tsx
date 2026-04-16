'use client'

import React, { useState } from 'react'

// Email displayed as hex bytes with a [decode] button
// On click: convert hex to ASCII string, replace display with mailto link
// Encode your actual email in hex — update the hex string here:
const EMAIL_HEX = 'TODO: hex-encode your email address here'
// e.g. 'a@b.com' → '61 40 62 2e 63 6f 6d'

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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})
  const [decoded, setDecoded] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setErrors({})

    if (!formData.email || !formData.message) {
      const newErrors: { email?: string; message?: string } = {}
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.message) newErrors.message = 'Message is required'
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
        setFormData({ name: '', email: '', message: '' })
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
    <section className="px-6 md:px-12 py-16" id="contact">
      <div className="max-w-2xl mx-auto">
        <div className="text-terminal-green text-xs tracking-widest mb-8">
          {'// ESTABLISH_CONTACT'}
        </div>

        <div className="border border-terminal-border bg-terminal-surface p-5 mb-8">
          <div className="text-terminal-green-muted text-xs tracking-widest mb-2">
            {'// DIRECT_CHANNEL'}
          </div>
          {!decoded ? (
            <div className="flex flex-wrap items-center gap-3">
              <pre className="text-terminal-white text-xs break-all whitespace-pre-wrap">
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

        <form onSubmit={handleSubmit} className="space-y-5">
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
              EMAIL
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
              MESSAGE
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

          {status === 'loading' && (
            <p className="text-terminal-green-dim text-xs">{'// TRANSMITTING...'}</p>
          )}
          {status === 'success' && (
            <p className="text-terminal-green text-xs">{'// MESSAGE RECEIVED'}</p>
          )}
          {status === 'error' && (
            <p className="text-terminal-red text-xs">{'// TRANSMISSION FAILED — try direct email'}</p>
          )}
        </form>
      </div>
    </section>
  )
}
