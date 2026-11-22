'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { completions, run, type Line } from '@/lib/shell'
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
  TIER1_HINT,
  TIER2_HINT,
  TIER3_HINT,
  TIER1_TECHNIQUE,
  TIER2_TECHNIQUE,
  TIER3_TECHNIQUE,
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
  hint: string
  technique: string
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
    hint: TIER1_HINT,
    technique: TIER1_TECHNIQUE,
  },
  {
    tier: 2,
    ciphertext: TIER2_CIPHER,
    flag: TIER2_FLAG,
    storageKey: TIER2_KEY,
    unlockLabel: TIER2_UNLOCK_LABEL,
    unlockHref: '/graveyard',
    acceptedAnswers: [normalizeAnswer(TIER2_PLAINTEXT)],
    hint: TIER2_HINT,
    technique: TIER2_TECHNIQUE,
  },
  {
    tier: 3,
    ciphertext: TIER3_CIPHER,
    flag: TIER3_FLAG,
    storageKey: TIER3_KEY,
    unlockLabel: TIER3_UNLOCK_LABEL,
    unlockHref: '/flag',
    acceptedAnswers: [normalizeAnswer(TIER3_PLAINTEXT)],
    hint: TIER3_HINT,
    technique: TIER3_TECHNIQUE,
  },
]

// A bar pinned to the bottom of the viewport that opens
// upward into a working shell. The three CTF puzzles live inside it. /#challenges opens it.
const WELCOME: Line[] = [
  { kind: 'dim', text: 'arush-sh 1.0. type help to look around, puzzle to start the ctf.' },
]

const teasers = (left: number) => [
  "there's a shell down here. click to open",
  left ? `${left} puzzle${left === 1 ? '' : 's'} hidden on this site` : 'all 3 puzzles solved. nice.',
  'type help once it opens',
]

export default function TerminalDrawer() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [solved, setSolved] = useState<boolean[]>([false, false, false])
  const [active, setActive] = useState(0)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const [teaser, setTeaser] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (open) {
      inputRef.current?.focus({ preventScroll: true })
      // Escape from anywhere, and a click anywhere outside the drawer, closes it
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
      const onPointer = (e: PointerEvent) => {
        if (!sectionRef.current?.contains(e.target as Node)) setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      document.addEventListener('pointerdown', onPointer)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.removeEventListener('pointerdown', onPointer)
      }
    }
    const id = setInterval(() => setTeaser((t) => t + 1), 4000)
    return () => clearInterval(id)
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const solvedCount = solved.filter(Boolean).length
  const teaserLines = teasers(3 - solvedCount)

  const execute = useCallback(
    (cmd: string) => {
      let cleared = false
      const result = run(
        cmd,
        {
          puzzles: puzzles.map((p, i) => ({
            tier: p.tier,
            ciphertext: p.ciphertext,
            flag: p.flag,
            solved: solved[i],
            unlockLabel: p.unlockLabel,
            unlockHref: p.unlockHref,
            hint: p.hint,
            technique: p.technique,
          })),
          active,
          setActive,
          submit: (answer) => {
            const p = puzzles[active]
            if (!p.acceptedAnswers.includes(normalizeAnswer(answer))) return false
            localStorage.setItem(p.storageKey, 'true')
            setSolved((s) => s.map((v, i) => (i === active ? true : v)))
            return true
          },
          navigate: (href) => router.push(href),
          clear: () => {
            cleared = true
          },
        },
        history,
      )
      const echo: Line = { kind: 'in', text: cmd }
      setLines((prev) => (cleared ? [] : [...prev, echo, ...result]))
      if (cmd.trim()) setHistory((h) => [...h, cmd.trim()])
    },
    [active, history, router, solved],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const options = completions(input)
      if (options.length === 1) setInput(options[0] + ' ')
      else if (options.length > 1)
        setLines((prev) => [...prev, { kind: 'in', text: input }, { kind: 'dim', text: options.join('  ') }])
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === null) return
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(null)
        setInput('')
      } else {
        setCursor(next)
        setInput(history[next])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  const lineClass: Record<Line['kind'], string> = {
    in: 'text-terminal-bright',
    out: '',
    dim: 'text-terminal-green-muted',
    accent: 'text-terminal-amber',
    err: 'text-terminal-red',
    link: '',
  }

  return (
    <section
      ref={sectionRef}
      id="challenges"
      aria-label="Terminal"
      // Column-reversed so the bar stays at the bottom and the shell grows upward above it
      className={`sticky bottom-0 z-40 mt-16 flex flex-col-reverse border-t border-terminal-border bg-terminal-surface font-mono ${open ? 'crt' : ''}`}
    >
      <div className={open ? 'border-t border-terminal-border' : ''}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="terminal-shell"
          className="group relative z-10 flex min-h-[40px] items-center gap-3 mx-auto w-full max-w-6xl px-6 md:px-12 py-2 text-left text-[13px] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-terminal-green"
        >
          <span aria-hidden className="text-terminal-amber">{open ? 'v' : '^'}</span>
          {open ? (
            <span className="border-b border-terminal-green pb-0.5">terminal</span>
          ) : (
            <span className="truncate text-terminal-white group-hover:text-terminal-amber transition-colors duration-200">
              &gt; {teaserLines[teaser % teaserLines.length]}
            </span>
          )}
          <span className="flex-1" />
          <span className="shrink-0 text-terminal-green-dim">puzzles {solvedCount}/3</span>
          <span className="shrink-0 text-terminal-green-muted group-hover:text-terminal-green transition-colors duration-200">
            {open ? '[esc]' : '[open]'}
          </span>
        </button>
      </div>

      {open && (
        <div
          id="terminal-shell"
          ref={scrollRef}
          onClick={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
          }}
          className="relative z-10 mx-auto w-full max-w-6xl h-[40vh] max-h-[360px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 md:px-12 pt-4 pb-5 text-sm md:text-[15px] leading-relaxed"
        >
          <div role="log" aria-live="polite">
            {lines.map((l, i) =>
              l.kind === 'link' ? (
                <p key={i}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-terminal-amber hover:underline">
                      {l.text}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-terminal-amber hover:underline">
                      {l.text}
                    </Link>
                  )}
                </p>
              ) : (
                <p key={i} className={`whitespace-pre-wrap break-words ${lineClass[l.kind]}`}>
                  {l.kind === 'in' && <span className="text-terminal-green">❯ </span>}
                  {l.text}
                </p>
              ),
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              execute(input)
              setInput('')
              setCursor(null)
            }}
            className="flex gap-2 items-center"
          >
            <span className="text-terminal-green" aria-hidden>❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 min-w-0 bg-transparent outline-none text-terminal-bright caret-terminal-green"
            />
          </form>
        </div>
      )}
    </section>
  )
}
