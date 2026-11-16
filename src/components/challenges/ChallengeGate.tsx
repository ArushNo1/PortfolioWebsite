import Link from 'next/link'

interface ChallengeGateProps {
  tier: 1 | 2 | 3
  message: string
}

export default function ChallengeGate({ tier, message }: ChallengeGateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="crt font-mono max-w-xl w-full rounded-lg border border-terminal-border p-8">
        <div className="text-terminal-red text-sm tracking-widest mb-6">
          {'// ACCESS DENIED — '}{message}
        </div>
        <p className="text-terminal-white text-base mb-6">
          Solve <span className="text-terminal-green">./puzzle {tier}</span> in the terminal at the
          bottom of the home page to unlock this section.
        </p>
        <Link
          href="/#challenges"
          className="relative z-10 text-terminal-amber text-sm hover:underline"
        >
          [← open the terminal]
        </Link>
      </div>
    </div>
  )
}
