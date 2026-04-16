'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import ChallengeGate from '@/components/challenges/ChallengeGate'
import TerminalBox from '@/components/ui/TerminalBox'
import { TIER3_KEY } from '@/data/challenges'

export default function FlagPage() {
  const [state, setState] = useState<'checking' | 'locked' | 'unlocked'>('checking')

  useEffect(() => {
    setState(localStorage.getItem(TIER3_KEY) === 'true' ? 'unlocked' : 'locked')
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {state === 'checking' && null}
        {state === 'locked' && (
          <ChallengeGate tier={3} message="TIER 3 CLEARANCE REQUIRED" />
        )}
        {state === 'unlocked' && (
          <section className="px-6 md:px-12 py-20">
            <div className="max-w-3xl mx-auto space-y-10">
              <div className="text-terminal-amber text-3xl md:text-5xl font-bold tracking-tight break-words">
                FLAG&#123;y0u_actually_did_it&#125;
              </div>

              <TerminalBox label="// CERTIFICATE_OF_COMPLETION">
                <div className="text-terminal-white text-sm leading-relaxed whitespace-pre-line">
                  {`CERTIFICATE OF COMPLETION
─────────────────────────
This document certifies that the analyst has
demonstrated sufficient curiosity to earn
unsupervised access to Arush Bodla's brain.

// TODO: personal note — write something genuine here
// TODO: optional — a recommendation (book, CTF, CF problem set)`}
                </div>
              </TerminalBox>

              <a
                href="mailto:TODO@email.com?subject=[flag submission] i got here"
                className="inline-block border border-terminal-amber text-terminal-amber text-xs tracking-widest px-4 py-2 hover:bg-terminal-amber hover:text-terminal-bg transition-colors"
              >
                [SUBMIT FLAG →]
              </a>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
