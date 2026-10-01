import { hasUrl, type Project } from '@/data/projects'

interface ProjectArchiveProps {
  projects: Project[]
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  return (
    <ul className="border border-terminal-border bg-terminal-surface divide-y divide-terminal-border">
      {projects.map((p) => (
        <li
          key={p.id}
          className="grid gap-2 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-6 px-5 py-4 hover:bg-terminal-bg transition-colors duration-200"
        >
          <div>
            <div className="text-terminal-amber text-sm font-bold">{p.name}</div>
            <div className="text-terminal-green-muted text-xs mt-0.5">
              {p.tags.join(' · ')}
            </div>
          </div>
          <p className="text-terminal-white text-xs leading-relaxed">{p.description}</p>
          <div className="flex gap-4">
            {hasUrl(p.github) && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green-dim text-xs tracking-widest hover:text-terminal-green transition-colors duration-200"
              >
                [GITHUB →]
              </a>
            )}
            {hasUrl(p.website) && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-amber text-xs tracking-widest hover:text-terminal-green transition-colors duration-200"
              >
                [LIVE →]
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
