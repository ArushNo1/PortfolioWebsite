'use client'

import React, { useState } from 'react'
import { socialLinks } from '@/data/socials'
import PageHeader, { SectionLabel } from '@/components/ui/PageHeader'

const EMAIL = 'abodla@umd.edu'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const OPEN_TO = ['internships', 'security research', 'startups', 'project ideas']

// 'https://www.github.com/ArushNo1' -> 'github.com/ArushNo1'
const displayUrl = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '')

const inputClass =
  'rounded-md bg-terminal-surface border border-terminal-border focus:border-terminal-green focus:ring-1 focus:ring-terminal-green outline-none text-[15px] px-3 py-2.5 w-full text-terminal-bright placeholder:text-terminal-green-muted transition-colors duration-200'
const labelClass = 'block mb-2 text-terminal-white text-sm font-medium'

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
        <PageHeader title="Contact" command="./contact">
          Email is the fastest way to reach me. I&apos;m open to{' '}
          {OPEN_TO.slice(0, -1).join(', ')}, and {OPEN_TO[OPEN_TO.length - 1]}, and I usually
          reply within a couple of days.
        </PageHeader>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 mb-10 inline-block text-terminal-green text-xl md:text-2xl font-semibold break-all hover:underline underline-offset-8"
        >
          {EMAIL}
        </a>

        <div className="text-[15px] leading-[2.2] border-t border-terminal-border pt-3 mb-16">
          {socialLinks.map(({ href, label }) => (
            <p key={label} className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr]">
              <span className="text-terminal-green-dim capitalize">{label}</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-white hover:text-terminal-green transition-colors duration-200 truncate"
              >
                {displayUrl(href)} →
              </a>
            </p>
          ))}
          <p className="grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr]">
            <span className="text-terminal-green-dim">Résumé</span>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-white hover:text-terminal-green transition-colors duration-200"
            >
              Resume.pdf →
            </a>
          </p>
        </div>

        <SectionLabel>Or leave a message</SectionLabel>

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
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-terminal-amber">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-terminal-red text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Message <span className="text-terminal-amber">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="What are you working on?"
              className={`${inputClass} resize-y`}
            />
            {errors.message && (
              <p className="text-terminal-red text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-md bg-terminal-green px-5 py-3 text-[15px] font-medium text-terminal-bg hover:bg-terminal-bright transition-colors duration-200 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terminal-green"
          >
            Send message
          </button>

          <div role="status" aria-live="polite">
            {status === 'loading' && (
              <p className="text-terminal-green-dim text-sm">Sending…</p>
            )}
            {status === 'success' && (
              <p className="text-terminal-green text-sm">Message sent. I'll get back to you soon.</p>
            )}
            {status === 'limited' && (
              <p className="text-terminal-red text-sm">Too many messages. Try again later, or email me directly.</p>
            )}
            {status === 'error' && (
              <p className="text-terminal-red text-sm">Couldn't send that. Email me directly instead.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
