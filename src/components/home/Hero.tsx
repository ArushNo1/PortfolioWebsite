import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  id?: string
}

const stats: Array<{ value: string; label: string }> = [
  { value: '13 / 4,787', label: 'CyberPatriot Nationals' },
  { value: '5 wins', label: 'Hackathon placements' },
  { value: 'Security+', label: 'CompTIA certified' },
]

const btn =
  'rounded-md px-5 py-3 text-[15px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terminal-green'

export default function Hero({ id }: HeroProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 md:px-12">
      <div className="flex flex-col-reverse gap-10 pt-16 pb-12 md:grid md:grid-cols-[1fr_200px] md:items-center md:gap-16 md:pt-24 md:pb-14">
        <div>
          <div
            className="hero-typewriter mb-3 overflow-hidden whitespace-nowrap font-mono text-sm text-terminal-green"
            style={{ animation: 'typewriter 0.6s steps(8, end) forwards', width: 0 }}
            aria-hidden
          >
            {'> whoami'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-[-.03em] leading-[1.05] text-terminal-bright">
            Arush Bodla
          </h1>
          <p className="mt-5 max-w-[640px] text-xl md:text-[22px] leading-[1.45] text-terminal-white text-pretty">
            I'm interested in making things deterministic, scalable, and able to fail safely. Lately that's meant CI/CD, sandboxing, and harnesses + AI tools.
          </p>
          <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-terminal-green-dim text-pretty">
            I study computer science at the University of Maryland. When I&apos;m not building, I&apos;m
            probably grinding a Geometry Dash level, watching Kurzgesagt, or scrolling through Wikipedia links.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={`${btn} bg-terminal-green text-terminal-bg hover:bg-terminal-bright`}>
              View projects
            </Link>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-terminal-border-bright text-terminal-white hover:border-terminal-green`}
            >
              Résumé
            </a>
            <Link
              href="/contact"
              className={`${btn} text-terminal-green-dim hover:text-terminal-white`}
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative aspect-square w-36 overflow-hidden rounded-lg border border-terminal-border md:w-auto">
          <Image
            src="/SuitPic.png"
            alt="Arush Bodla"
            fill
            priority
            sizes="(min-width: 768px) 200px, 144px"
            className="object-cover"
          />
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-terminal-border bg-terminal-border sm:grid-cols-3">
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-terminal-surface px-5 py-5">
            <dd className="text-2xl md:text-[28px] font-bold tracking-[-.02em] text-terminal-bright">{value}</dd>
            <dt className="mt-1 text-sm text-terminal-green-dim">{label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
