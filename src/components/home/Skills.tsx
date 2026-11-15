import { skillGroups } from '@/data/skills'

interface SkillsProps {
  id?: string
}

export default function Skills({ id }: SkillsProps) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 md:px-12 py-20">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-[.06em] text-terminal-green-dim">Toolkit</h2>
      <dl className="divide-y divide-terminal-border border-y border-terminal-border">
        {skillGroups.map((group) => (
          <div key={group.label} className="grid gap-2 py-4 md:grid-cols-[160px_1fr] md:gap-6">
            <dt className="font-mono text-xs uppercase tracking-[.06em] text-terminal-green pt-0.5">
              {group.label.replace(/^\/\/\s*/, '')}
            </dt>
            <dd className="text-[15px] leading-relaxed text-terminal-white">
              {group.skills.map((s) => s.name).join(' · ')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
