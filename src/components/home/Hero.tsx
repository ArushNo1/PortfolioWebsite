import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  id?: string
}

const credentials: Array<{ label: string; value: string; sub?: string }> = [
  { label: 'now', value: 'Digital forensics intern, ManTech', sub: 'summer 2026' },
  { label: 'cyberpatriot', value: '13th of 4,787 teams', sub: 'nationals' },
  { label: 'comptia', value: 'Security+' },
  { label: 'acl-it', value: 'Co-founder, tournament director' },
]

const btn = 'border px-4 py-2 text-sm tracking-[.04em] transition-colors duration-200'

export default function Hero({ id }: HeroProps) {
  return (
    <section id={id} className="border-b border-terminal-border">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-16 md:pt-24 pb-14 md:pb-20 flex flex-col-reverse gap-10 md:grid md:grid-cols-[1fr_200px] md:gap-20 md:items-center">
        <div>
          <div
            className="hero-typewriter overflow-hidden whitespace-nowrap text-terminal-green-dim text-sm mb-4"
            style={{ animation: 'typewriter 0.6s steps(8, end) forwards', width: 0 }}
          >
            {'> whoami'}
          </div>

          <div className="fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <h1 className="text-4xl md:text-6xl leading-none text-terminal-green font-bold tracking-[-.02em]">
              ARUSH BODLA
            </h1>

            <div className="text-terminal-green-muted my-6 overflow-hidden whitespace-nowrap">
              ────────────────────────────────────────────────────────
            </div>

            <p className="text-terminal-green-dim text-sm">
              {'> ERR: I ran out of Claude tokens generating some tagline.'}
            </p>
            <p className="text-terminal-bright text-lg md:text-xl leading-snug mt-2">
              I build security tools, play CTFs, and win the occasional hackathon.
            </p>
            <p className="text-[15px] leading-relaxed max-w-[640px] mt-5 text-pretty">
              I&apos;m a CS freshman at Maryland, in ACES. Linux subteam for UMD CCDC. I&apos;m aiming for
              AppSec or CNO, but still exploring ways to combine Cyber and CS. 
              <br /><br />
              Outside of coding, you can catch me playing geometry dash, watching kurzgesagt, or scrolling Wikipedia.
            </p>

            <div className="flex flex-wrap gap-3.5 mt-8">
              <Link
                href="/projects"
                className={`${btn} border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg`}
              >
                [PROJECTS →]
              </Link>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn} border-terminal-amber text-terminal-amber hover:bg-terminal-amber hover:text-terminal-bg`}
              >
                [RESUME.PDF]
              </a>
              <Link
                href="/contact"
                className={`${btn} border-terminal-border-bright text-terminal-white hover:border-terminal-green hover:text-terminal-green`}
              >
                [EMAIL]
              </Link>
            </div>
          </div>
        </div>

        {/* Photo: green-tinted + scanlined until hovered */}
        <div className="group w-40 md:w-auto">
          <div className="relative aspect-square overflow-hidden border border-terminal-border-bright bg-terminal-bg">
            <Image
              src="/SuitPic.png"
              alt="Arush Bodla"
              fill
              priority
              sizes="(min-width: 768px) 200px, 160px"
              className="object-cover grayscale contrast-125 brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
            />
            <div className="absolute inset-0 bg-terminal-green mix-blend-multiply opacity-50 transition-opacity duration-500 group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgba(0,0,0,0.35)_2px,rgba(0,0,0,0.35)_3px)]" />
          </div>
          <p className="mt-2 text-terminal-green-muted text-xs">hover for color</p>
        </div>
      </div>

      <dl className="mx-auto w-full max-w-6xl px-6 md:px-12 pb-14 md:pb-20 grid grid-cols-2 md:grid-cols-4">
        {credentials.map(({ label, value, sub }, i) => (
          <div
            key={label}
            className={`border-t border-terminal-border pt-4 pb-5 pr-6 ${
              i % 2 === 1 ? 'border-l pl-6' : ''
            } ${i > 0 ? 'md:border-l md:pl-6' : ''}`}
          >
            <dt className="text-terminal-amber text-xs mb-1">{label}</dt>
            <dd className="text-sm leading-snug">{value}</dd>
            {sub && <dd className="text-terminal-green-dim text-xs">{sub}</dd>}
          </div>
        ))}
      </dl>
    </section>
  )
}
