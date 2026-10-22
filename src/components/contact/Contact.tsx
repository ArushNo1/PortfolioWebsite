'use client'

import React, { useState } from 'react'
import { socialLinks } from '@/data/socials'

const EMAIL = 'abodla@umd.edu'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const OPEN_TO = ['internships', 'security research', 'startups', 'project ideas']

// 'https://www.github.com/ArushNo1' -> 'github.com/ArushNo1'
const displayUrl = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '')

const inputClass =
  'bg-transparent border border-terminal-border focus:border-terminal-green outline-none font-mono text-sm p-2.5 w-full text-terminal-bright placeholder:text-terminal-green-muted'
const labelClass = 'block mb-2 text-terminal-green-dim text-sm'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'limited'>('idle')
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({})

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

  return (
    <section className="relative overflow-hidden mx-auto w-full max-w-6xl px-6 md:px-12 pt-14 md:pt-20 pb-12" id="contact">
      <div className="max-w-3xl">
        <h1 className="text-terminal-green text-3xl md:text-4xl leading-none font-bold mb-3">
          CONTACT
        </h1>
        <p className="text-base max-w-[640px] mb-10">
          Email is the fastest way to reach me. I&apos;m open to{' '}
          {OPEN_TO.slice(0, -1).join(', ')}, and {OPEN_TO[OPEN_TO.length - 1]}, and I usually
          reply within a couple of days.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="block text-terminal-amber text-xl md:text-2xl font-semibold mb-10 break-all hover:underline underline-offset-8"
        >
          {EMAIL}
        </a>

        <div className="text-[15px] leading-[2.2] border-t border-terminal-border pt-3 mb-16">
          {socialLinks.map(({ href, label }) => (
            <p key={label} className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr]">
              <span className="text-terminal-green-dim">{label}</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green hover:underline truncate"
              >
                {displayUrl(href)} →
              </a>
            </p>
          ))}
          <p className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr]">
            <span className="text-terminal-green-dim">resume</span>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:underline"
            >
              resume.pdf →
            </a>
          </p>
        </div>

        <p className="text-base mb-5">
          <span className="text-terminal-green">$</span> ./send-message{' '}
          <span className="text-terminal-green-muted"># or leave one here</span>
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
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
            <label htmlFor="name" className={labelClass}>
              name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="enter name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              email <span className="text-terminal-amber">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="enter email"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-terminal-red text-sm mt-1">{'# '}{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              message <span className="text-terminal-amber">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="enter message"
              className={`${inputClass} resize-y`}
            />
            {errors.message && (
              <p className="text-terminal-red text-sm mt-1">{'# '}{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="border border-terminal-amber text-terminal-amber text-sm tracking-[.04em] px-4 py-2 hover:bg-terminal-amber hover:text-terminal-bg transition-colors disabled:opacity-50"
          >
            [SEND →]
          </button>

          <div role="status" aria-live="polite">
            {status === 'loading' && (
              <p className="text-terminal-green-dim text-sm">{'# sending...'}</p>
            )}
            {status === 'success' && (
              <p className="text-terminal-green text-sm">{'# message received'}</p>
            )}
            {status === 'limited' && (
              <p className="text-terminal-red text-sm">{'# rate limited, try again later or email directly'}</p>
            )}
            {status === 'error' && (
              <p className="text-terminal-red text-sm">{'# send failed, try email instead'}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
