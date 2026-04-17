'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import FlagBadge from '@/components/ui/FlagBadge'
import { normalizeAnswer } from '@/lib/crypto'

interface ChallengeBoxProps {
  tier: 1 | 2 | 3
  label: string
  hint: string
  ciphertext: string
  flag: string
  storageKey: string
  unlockLabel: string
  unlockHref: string
  acceptedAnswers: string[]
  extraNote?: string
  onSolve?: () => void
}

export default function ChallengeBox({
  tier,
  label,
  hint,
  ciphertext,
  flag,
  storageKey,
  unlockLabel,
  unlockHref,
  acceptedAnswers,
  extraNote,
  onSolve,
}: ChallengeBoxProps) {
  const [input, setInput] = useState('')
  const [solved, setSolved] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(storageKey) === 'true') {
      setSolved(true)
    }
  }, [storageKey])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const answer = normalizeAnswer(input)
    if (acceptedAnswers.includes(answer)) {
      localStorage.setItem(storageKey, 'true')
      setSolved(true)
      setError('')
      onSolve?.()
    } else if (input.length > 2) {
      setError('// ACCESS DENIED')
      setTimeout(() => setError(''), 2000)
    }
  }

  return (
    <div className="relative border border-terminal-border p-6 bg-terminal-surface">
      <span className="absolute -top-3 left-4 bg-terminal-bg px-2 text-terminal-green text-xs tracking-widest">
        {label}
      </span>

      <div className="mt-2 mb-4">
        <div className="text-terminal-green-muted text-xs mb-2">{'// TIER '}{tier}{' CIPHERTEXT'}</div>
        <pre className="text-terminal-white text-xs md:text-sm break-all whitespace-pre-wrap border border-terminal-border-dim p-3 bg-terminal-bg">
          {ciphertext}
        </pre>
        {extraNote && (
          <pre className="text-terminal-green-muted text-xs mt-2 break-all whitespace-pre-wrap">
            {extraNote}
          </pre>
        )}
        <div className="text-terminal-green-dim text-xs mt-2">{hint}</div>
      </div>

      {solved ? (
        <div>
          <FlagBadge flag={flag} />
          <div>
            <Link
              href={unlockHref}
              className="text-terminal-amber text-xs tracking-widest hover:underline"
            >
              [{unlockLabel}]
            </Link>
          </div>
        </div>
      ) : skipped ? (
        <div className="text-terminal-green-muted text-xs">
          {'// challenge skipped — solve it later to unlock bonus content'}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
          <span className="text-terminal-green">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="enter plaintext"
            className="flex-1 min-w-[180px] bg-transparent border border-terminal-border focus:border-terminal-green outline-none font-mono text-sm p-2 text-terminal-white placeholder:text-terminal-green-muted"
          />
          <button
            type="submit"
            className="border border-terminal-green text-terminal-green text-xs px-3 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors tracking-widest"
          >
            [SUBMIT]
          </button>
          <button
            type="button"
            onClick={() => setSkipped(true)}
            className="text-terminal-green-muted text-xs hover:text-terminal-green-dim transition-colors tracking-widest"
          >
            [skip →]
          </button>
          {error && (
            <div className="w-full text-terminal-red text-xs mt-2">{error}</div>
          )}
        </form>
      )}
    </div>
  )
}
