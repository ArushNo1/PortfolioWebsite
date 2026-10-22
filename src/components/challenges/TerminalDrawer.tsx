'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  TIER1_FLAG,
  TIER2_FLAG,
  TIER3_FLAG,
  TIER1_KEY,
  TIER2_KEY,
  TIER3_KEY,
  TIER1_UNLOCK_LABEL,
  TIER2_UNLOCK_LABEL,
  TIER3_UNLOCK_LABEL,
  TIER2_PLAINTEXT,
  TIER3_PLAINTEXT,
  TIER3_HINT,
} from '@/data/challenges'
import {
  TIER1_CIPHER,
  TIER2_CIPHER,
  TIER3_CIPHER,
  normalizeAnswer,
} from '@/lib/crypto'

interface Puzzle {
  tier: 1 | 2 | 3
  ciphertext: string
  flag: string
  storageKey: string
  unlockLabel: string
  unlockHref: string
  acceptedAnswers: string[]
  extraNote?: string
}

const puzzles: Puzzle[] = [
  {
    tier: 1,
    ciphertext: TIER1_CIPHER,
    flag: TIER1_FLAG,
    storageKey: TIER1_KEY,
    unlockLabel: TIER1_UNLOCK_LABEL,
    unlockHref: '/lab',
    acceptedAnswers: ['arush bodla', 'arush'],
  },
  {
    tier: 2,
    ciphertext: TIER2_CIPHER,
    flag: TIER2_FLAG,
    storageKey: TIER2_KEY,
    unlockLabel: TIER2_UNLOCK_LABEL,
    unlockHref: '/graveyard',
    acceptedAnswers: [normalizeAnswer(TIER2_PLAINTEXT)],
  },
  {
    tier: 3,
    ciphertext: TIER3_CIPHER,
    flag: TIER3_FLAG,
    storageKey: TIER3_KEY,
    unlockLabel: TIER3_UNLOCK_LABEL,
    unlockHref: '/flag',
    acceptedAnswers: [normalizeAnswer(TIER3_PLAINTEXT)],
    extraNote: TIER3_HINT,
  },
]

// Replaces the footer on every page: a bar pinned to the bottom of the viewport that opens
// upward into a shell holding the three CTF puzzles. /#challenges opens it.
export default function TerminalDrawer() {
  const [open, setOpen] = useState(false)
  const [solved, setSolved] = useState<boolean[]>([false, false, false])
  const [active, setActive] = useState(0)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const state = puzzles.map((p) => localStorage.getItem(p.storageKey) === 'true')
    setSolved(state)
    const firstUnsolved = state.indexOf(false)
    setActive(firstUnsolved === -1 ? 0 : firstUnsolved)

    const openFromHash = () => {
      if (window.location.hash === '#challenges') setOpen(true)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const puzzle = puzzles[active]
  const solvedCount = solved.filter(Boolean).length

  const select = (i: number) => {
    setActive(i)
    setInput('')
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (puzzle.acceptedAnswers.includes(normalizeAnswer(input))) {
      localStorage.setItem(puzzle.storageKey, 'true')
      setSolved((s) => s.map((v, i) => (i === active ? true : v)))
      setInput('')
      setError('')
    } else if (input.length > 2) {
      setError('access denied')
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <section
      id="challenges"
      // Column-reversed so the bar stays at the bottom and the shell grows upward above it
      className="sticky bottom-0 z-40 mt-16 flex flex-col-reverse border-t border-terminal-border bg-terminal-surface"
    >
      <div className={open ? 'border-t border-terminal-border' : ''}>
        <div className="flex items-center gap-6 mx-auto w-full max-w-6xl px-6 md:px-12 py-2 text-[13px]">
          <span className={open ? 'border-b border-terminal-green pb-0.5' : ''}>terminal</span>
          <span className="text-terminal-green-dim">puzzles {solvedCount}/3</span>
          <span className="flex-1" />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="terminal-shell"
            className="text-terminal-green-muted hover:text-terminal-green transition-colors duration-200"
          >
            {open ? '[close]' : '[open]'}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="terminal-shell"
          className="mx-auto w-full max-w-6xl max-h-[60vh] overflow-y-auto px-6 md:px-12 pt-4 pb-5 grid gap-1 text-sm md:text-[15px]"
        >
          <p>
            <span className="text-terminal-green">~/arush</span> on{' '}
            <span className="text-[#d79bff]">main</span>{' '}
            <span className="text-terminal-red">[?]</span>
          </p>
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span>
              <span className="text-terminal-green">❯</span> ./puzzle
            </span>
            {puzzles.map((p, i) => (
              <button
                key={p.tier}
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === active}
                aria-label={`Puzzle ${p.tier}${solved[i] ? ' (solved)' : ''}`}
                className={`transition-colors duration-200 ${
                  i === active
                    ? 'text-terminal-bright underline underline-offset-4'
                    : solved[i]
                      ? 'text-terminal-amber hover:text-terminal-bright'
                      : 'text-terminal-green-muted hover:text-terminal-bright'
                }`}
              >
                {p.tier}
              </button>
            ))}
          </p>
          <p className="break-all">
            cipher: <span className="text-terminal-amber">{puzzle.ciphertext}</span>
          </p>
          {puzzle.extraNote && (
            <p className="text-terminal-green-muted"># {puzzle.extraNote}</p>
          )}

          {solved[active] ? (
            <>
              <p>
                flag: <span className="text-terminal-green">{puzzle.flag}</span>
              </p>
              <p>
                <Link href={puzzle.unlockHref} className="text-terminal-amber hover:underline">
                  [{puzzle.unlockLabel}]
                </Link>
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2.5 items-center">
              <span className="text-terminal-green">❯</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="answer"
                aria-label={`Answer for puzzle ${puzzle.tier}`}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent outline-none text-terminal-bright placeholder:text-terminal-green-muted caret-terminal-green"
              />
              {error && <span className="text-terminal-red text-sm">{error}</span>}
            </form>
          )}
        </div>
      )}
    </section>
  )
}
