import { skillGroups } from '@/data/skills'

interface SkillsProps {
  id?: string
}

export default function Skills({ id }: SkillsProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-terminal-green text-xs tracking-widest mb-8">
          {'// TACTICS_TECHNIQUES_PROCEDURES'}
        </div>

        <div className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <div className="text-terminal-green-muted text-xs tracking-widest mb-3">
                {group.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {group.skills.map(({ name, detail, Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 px-4 py-3 border border-terminal-border bg-terminal-surface hover:border-terminal-border-bright transition-colors duration-200"
                  >
                    <Icon size={18} className="text-terminal-green shrink-0" aria-hidden />
                    <div className="min-w-0">
                      <div className="text-terminal-white text-sm">{name}</div>
                      {detail && (
                        <div className="text-terminal-green-muted text-xs mt-0.5">{detail}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
