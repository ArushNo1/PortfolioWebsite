interface FlagBadgeProps {
  flag: string
}

export default function FlagBadge({ flag }: FlagBadgeProps) {
  return (
    <span className="inline-block border border-terminal-green text-terminal-green text-xs px-3 py-1 tracking-wider mb-4">
      {flag}
    </span>
  )
}
