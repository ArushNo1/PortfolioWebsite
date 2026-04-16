import Link from 'next/link'

interface HeroProps {
  id?: string
}

export default function Hero({ id }: HeroProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-4xl">
        <div
          className="overflow-hidden whitespace-nowrap text-terminal-green-muted text-xs tracking-widest mb-6"
          style={{ animation: 'typewriter 1.2s steps(24, end) forwards', width: 0 }}
        >
          {'> IDENTIFYING SUBJECT...'}
        </div>

        <div className="fade-up" style={{ animationDelay: '1.2s', opacity: 0 }}>
          <div className="text-terminal-green-muted text-xs tracking-widest mb-4">
            {'// SUBJECT IDENTIFIED'}
          </div>

          <h1 className="text-5xl md:text-7xl text-terminal-green font-bold tracking-tight">
            ARUSH BODLA
          </h1>

          <div className="text-terminal-green-muted my-6">
            ─────────────────────────────────────────────
          </div>

          <div className="text-terminal-green-dim text-sm tracking-wide space-y-1 mb-6">
            <p>CS @ University of Maryland</p>
            <p>ACES Cyber Honors LLC · Banneker/Key Scholar</p>
            <p>Incoming Freshman · Fall 2026</p>
          </div>

          <div className="text-terminal-amber text-sm space-y-1 mb-10">
            {/* TODO: one line, first person, no "passionate developer" language */}
            <p>{'> TODO: one line, first person, no "passionate developer" language'}</p>
            <p>{'> Competitive programmer. CTF player. Ships things.'}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="border border-terminal-green text-terminal-green text-xs tracking-widest px-4 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
            >
              [VIEW INCIDENTS →]
            </Link>
            <Link
              href="/contact"
              className="border border-terminal-green-muted text-terminal-green-muted text-xs tracking-widest px-4 py-2 hover:bg-terminal-green-muted hover:text-terminal-bg transition-colors"
            >
              [CONTACT]
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
