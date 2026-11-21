interface TerminalBoxProps {
  label?: string
  children: React.ReactNode
  className?: string
}

export default function TerminalBox({ label, children, className = '' }: TerminalBoxProps) {
  return (
    <div className={`relative border border-terminal-border p-6 md:p-8 bg-terminal-surface ${className}`}>
      {label && (
        <span className="absolute -top-3 left-4 bg-terminal-bg px-2 text-terminal-green text-xs tracking-widest">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
