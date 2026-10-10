'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { socialLinks } from '@/data/socials'

const links = [
  { label: 'PROFILE', href: '/#home' },
  { label: 'INCIDENTS', href: '/projects' },
  { label: 'TTPs', href: '/#skills' },
  { label: 'LAB', href: '/lab' },
  { label: 'CONTACT', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href)
  const linkClass = (href: string) =>
    `text-xs tracking-widest transition-colors ${
      isActive(href) ? 'text-terminal-green' : 'text-terminal-green-dim hover:text-terminal-green'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-terminal-bg border-b border-terminal-border">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <div className="text-terminal-green-muted text-xs tracking-widest flex items-center gap-2">
          <span>THREAT_INTEL // SUBJECT: AB</span>
          <span className="blink text-terminal-green">▌</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={linkClass(l.href)}
              >
                {isActive(l.href) ? `> ${l.label}` : l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-terminal-border">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="text-terminal-green-dim hover:text-terminal-green transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-terminal-amber text-terminal-amber text-xs tracking-widest px-3 py-1 hover:bg-terminal-amber hover:text-terminal-bg transition-colors"
            >
              [RESUME.PDF]
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="block w-5 h-px bg-terminal-green" />
            <span className="block w-5 h-px bg-terminal-green" />
            <span className="block w-5 h-px bg-terminal-green" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-terminal-border flex flex-col px-4 py-3 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={linkClass(l.href)}
            >
              {isActive(l.href) ? `> ${l.label}` : l.label}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-terminal-green-dim hover:text-terminal-green transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start border border-terminal-amber text-terminal-amber text-xs tracking-widest px-3 py-1 hover:bg-terminal-amber hover:text-terminal-bg transition-colors"
          >
            [RESUME.PDF]
          </a>
        </div>
      )}
    </nav>
  )
}
