export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-terminal-border mt-16 py-6 px-6 md:px-12 text-terminal-green-muted text-xs tracking-wide">
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <span className="text-terminal-green-dim">ARUSH BODLA</span>
        <span>·</span>
        <a
          href="https://www.github.com/ArushNo1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-terminal-green transition-colors"
        >
          github
        </a>
        <span>·</span>
        <a
          href="https://www.linkedin.com/in/arush-bodla-2a5797306/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-terminal-green transition-colors"
        >
          linkedin
        </a>
        <span>·</span>
        <a
          href="https://codeforces.com/profile/ArushNo1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-terminal-green transition-colors"
        >
          codeforces
        </a>
        <span>·</span>
        <span>© {year}</span>
      </div>
    </footer>
  )
}
