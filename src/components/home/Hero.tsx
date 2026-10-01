import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  id?: string
}

const credentials: Array<[string, string]> = [
  ['MANTECH', 'Digital Forensics Intern, Summer 2026'],
  ['CYBERPATRIOT', '13th of 4,787 teams nationally'],
  ['COMPTIA', 'Security+'],
  ['ACL-IT', 'Co-Founder & Tournament Director'],
]

export default function Hero({ id }: HeroProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-20 md:py-28">
      <div>
        <div
          className="hero-typewriter overflow-hidden whitespace-nowrap text-terminal-green-muted text-xs tracking-widest mb-6"
          style={{ animation: 'typewriter 1.2s steps(24, end) forwards', width: 0 }}
        >
          {'> IDENTIFYING SUBJECT...'}
        </div>

        <div
          className="fade-up flex flex-col-reverse gap-10 md:flex-row md:items-center md:gap-20"
          style={{ animationDelay: '1.2s', opacity: 0 }}
        >
          <div className="max-w-3xl">
            <div className="text-terminal-green-muted text-xs tracking-widest mb-4">
              {'// SUBJECT IDENTIFIED'}
            </div>

            <h1 className="text-5xl md:text-7xl text-terminal-green font-bold tracking-tight">
              ARUSH BODLA
            </h1>

            <div className="text-terminal-green-muted my-6 overflow-hidden whitespace-nowrap">
              ─────────────────────────────────────────────
            </div>

            <div className="space-y-1 mb-6 text-sm">
              <p className="text-terminal-green-muted text-xs">
                {'> ERR: I ran out of Claude tokens generating some tagline.'}
              </p>
              <p className="text-terminal-amber">
                {'> I build security tools, play CTFs, and win the occasional hackathon.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {credentials.map(([title, event]) => (
                <span
                  key={title}
                  className="border border-terminal-border bg-terminal-surface px-2.5 py-1 text-xs tracking-wide"
                >
                  <span className="text-terminal-amber">{title}</span>
                  <span className="text-terminal-green-muted"> · {event}</span>
                </span>
              ))}
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

          {/* Subject photo: green-tinted + scanlined until hovered */}
          <div className="group w-40 md:w-56 shrink-0">
            <div className="relative aspect-square overflow-hidden border border-terminal-border-bright bg-terminal-bg">
              <Image
                src="/SuitPic.png"
                alt="Arush Bodla"
                fill
                priority
                sizes="(min-width: 768px) 224px, 160px"
                className="object-cover grayscale contrast-125 brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
              />
              <div className="absolute inset-0 bg-terminal-green mix-blend-multiply opacity-50 transition-opacity duration-500 group-hover:opacity-0" />
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgba(0,0,0,0.35)_2px,rgba(0,0,0,0.35)_3px)]" />
            </div>
            <div className="mt-2 flex justify-between text-terminal-green-muted text-[10px] tracking-widest">
              <span>SUBJECT: AB</span>
              <span>ID: CONFIRMED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
