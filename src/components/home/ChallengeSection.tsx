'use client'

import ChallengeBox from '@/components/challenges/ChallengeBox'
import {
  TIER1_HINT,
  TIER2_HINT,
  TIER3_HINT,
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
  TIER3_PYTHON_SNIPPET,
} from '@/data/challenges'
import {
  TIER1_CIPHER,
  TIER2_CIPHER,
  TIER3_CIPHER,
  normalizeAnswer,
} from '@/lib/crypto'

interface ChallengeSectionProps {
  id?: string
}

export default function ChallengeSection({ id }: ChallengeSectionProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-terminal-green text-xs tracking-widest mb-2">
          {'// ANALYST_CHALLENGES'}
        </div>
        <div className="text-terminal-green-muted text-xs mb-8">
          {'// The following is non-essential. Curious analysts may proceed.'}
        </div>

        <div className="flex flex-col gap-6">
          <ChallengeBox
            tier={1}
            label="CHALLENGE_01 // IDENTITY VERIFICATION"
            hint={TIER1_HINT}
            ciphertext={TIER1_CIPHER}
            flag={TIER1_FLAG}
            storageKey={TIER1_KEY}
            unlockLabel={TIER1_UNLOCK_LABEL}
            unlockHref="/lab"
            acceptedAnswers={['arush bodla', 'arush']}
          />
          <ChallengeBox
            tier={2}
            label="CHALLENGE_02 // OPERATION CLASSIFICATION"
            hint={TIER2_HINT}
            ciphertext={TIER2_CIPHER}
            flag={TIER2_FLAG}
            storageKey={TIER2_KEY}
            unlockLabel={TIER2_UNLOCK_LABEL}
            unlockHref="/graveyard"
            acceptedAnswers={[normalizeAnswer(TIER2_PLAINTEXT)]}
          />
          <ChallengeBox
            tier={3}
            label="CHALLENGE_03 // SUBJECT_MOTIVATION — CLASSIFIED"
            hint={TIER3_HINT}
            ciphertext={TIER3_CIPHER}
            flag={TIER3_FLAG}
            storageKey={TIER3_KEY}
            unlockLabel={TIER3_UNLOCK_LABEL}
            unlockHref="/flag"
            acceptedAnswers={[normalizeAnswer(TIER3_PLAINTEXT)]}
            extraNote={TIER3_PYTHON_SNIPPET}
          />
        </div>
      </div>
    </section>
  )
}
