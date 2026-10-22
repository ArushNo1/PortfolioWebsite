'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { label: 'projects', href: '/projects' },
  { label: 'lab', href: '/lab' },
  { label: 'contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => pathname.startsWith(href)
  const linkClass = (href: string) =>
    `transition-colors duration-200 ${
      isActive(href)
        ? 'text-terminal-green underline underline-offset-[6px]'
        : 'text-terminal-white hover:text-terminal-green'
    }`

  // Prompt shows the top-level directory: /lab/some-post -> ~/lab
  const segment = pathname.split('/')[1]
  const cwd = segment ? `~/${segment}` : '~'

  return (
    <nav className="sticky top-0 z-50 bg-terminal-bg border-b border-terminal-border text-sm">
      <div className="flex items-center justify-between mx-auto w-full max-w-6xl px-6 md:px-12 py-4">
        <Link href="/" className="hover:no-underline">
          <span className="text-terminal-green">arush@bodla</span>
          <span className="text-terminal-green-dim">:{cwd}$</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={linkClass(l.href)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-amber hover:underline underline-offset-[6px]"
          >
            resume.pdf
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

      {menuOpen && (
        <div className="md:hidden border-t border-terminal-border flex flex-col px-6 py-4 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`self-start ${linkClass(l.href)}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-terminal-amber hover:underline underline-offset-[6px]"
          >
            resume.pdf
          </a>
        </div>
      )}
    </nav>
  )
}
