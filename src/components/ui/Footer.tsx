import { EMAIL, socialLinks } from '@/data/socials'

const link = 'hover:text-terminal-green transition-colors duration-200'

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-16 font-mono text-[13px] text-terminal-green-muted">
      <p>
        <span className="text-terminal-green">arush@bodla:~$</span> echo &quot;thanks for scrolling&quot;
      </p>
      <p className="mt-1 text-terminal-green-dim">thanks for scrolling</p>
      <nav aria-label="Footer" className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        <a href={`mailto:${EMAIL}`} className={link}>email</a>
        {socialLinks.map(({ href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={link}>
            {label}
          </a>
        ))}
        <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className={link}>resume.pdf</a>
      </nav>
    </footer>
  )
}
