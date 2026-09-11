import { socialLinks } from '@/data/socials'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-terminal-border mt-16 py-6 px-6 md:px-12 text-terminal-green-muted text-xs tracking-wide">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        <span className="text-terminal-green-dim">ARUSH BODLA</span>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex items-center justify-center w-9 h-9 border border-terminal-border text-terminal-green-dim hover:text-terminal-green hover:border-terminal-border-bright transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <span>© {year}</span>
      </div>
    </footer>
  )
}
