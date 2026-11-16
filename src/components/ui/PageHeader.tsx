interface PageHeaderProps {
  title: string
  /** Shown as a small mono prompt line above the title, e.g. "ls ~/projects". */
  command?: string
  children?: React.ReactNode
}

export default function PageHeader({ title, command, children }: PageHeaderProps) {
  return (
    <header>
      {command && (
        <p className="mb-3 font-mono text-sm text-terminal-green">
          <span aria-hidden>$ </span>
          {command}
        </p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold tracking-[-.03em] leading-[1.05] text-terminal-bright">
        {title}
      </h1>
      {children && (
        <div className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-terminal-green-dim text-pretty">
          {children}
        </div>
      )}
    </header>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-sm font-semibold uppercase tracking-[.06em] text-terminal-green-dim">
      {children}
    </h2>
  )
}
