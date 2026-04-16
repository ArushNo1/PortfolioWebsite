'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import ChallengeGate from '@/components/challenges/ChallengeGate'
import TerminalBox from '@/components/ui/TerminalBox'
import { deadProjects } from '@/data/graveyard'
import { TIER2_KEY } from '@/data/challenges'

export default function GraveyardPage() {
  const [state, setState] = useState<'checking' | 'locked' | 'unlocked'>('checking')

  useEffect(() => {
    setState(localStorage.getItem(TIER2_KEY) === 'true' ? 'unlocked' : 'locked')
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {state === 'checking' && null}
        {state === 'locked' && (
          <ChallengeGate tier={2} message="TIER 2 CLEARANCE REQUIRED" />
        )}
        {state === 'unlocked' && (
          <section className="px-6 md:px-12 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-terminal-green text-xs tracking-widest mb-8">
                {'// INCIDENT_REPORTS — ABANDONED_OPERATIONS'}
              </div>
              <div className="flex flex-col gap-8">
                {deadProjects.map((p, i) => (
                  <TerminalBox
                    key={p.id}
                    label={`INCIDENT_REPORT_00${i + 1}`}
                  >
                    <dl className="space-y-3">
                      <Row k="PROJECT" v={p.name} />
                      <Row k="STATUS" v={p.status} />
                      <Row k="STACK" v={p.stack.join(' · ')} />
                      <Row k="CAUSE" v={p.cause} />
                      <Row k="LEARNED" v={p.learned} />
                    </dl>
                  </TerminalBox>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-4">
      <dt className="text-terminal-green-muted text-xs w-24 shrink-0 tracking-widest">
        {k}
      </dt>
      <dd className="text-terminal-white text-sm">{v}</dd>
    </div>
  )
}
