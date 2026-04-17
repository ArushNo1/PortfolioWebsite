import { securitySkills, devSkills } from '@/data/skills'

interface SkillsProps {
  id?: string
}

function SkillList({ skills }: { skills: string[] }) {
  return (
    <div>
      {skills.map((skill) => (
        <div
          key={skill}
          className="flex items-center gap-3 py-2 border-b border-terminal-border-dim text-sm text-terminal-white"
        >
          <span className="text-terminal-green text-xs">▸</span>
          {skill}
        </div>
      ))}
    </div>
  )
}

export default function Skills({ id }: SkillsProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-terminal-green text-xs tracking-widest mb-8">
          {'// TACTICS_TECHNIQUES_PROCEDURES'}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-terminal-green-muted text-xs tracking-widest mb-4">
              {'// OFFENSIVE / SECURITY'}
            </div>
            <SkillList skills={securitySkills} />
          </div>
          <div>
            <div className="text-terminal-green-muted text-xs tracking-widest mb-4">
              {'// DEVELOPMENT'}
            </div>
            <SkillList skills={devSkills} />
          </div>
        </div>
      </div>
    </section>
  )
}
