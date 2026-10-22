import { hasUrl, type Project } from '@/data/projects'

interface ProjectArchiveProps {
  projects: Project[]
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  return (
    <ul>
      {projects.map((p) => (
        <li
          key={p.id}
          className="grid gap-x-4 gap-y-1 md:grid-cols-[220px_1fr_auto] md:items-baseline py-3 border-t border-terminal-border text-sm"
        >
          <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            {p.id}
            {p.award && (
              <span className="text-terminal-bg bg-terminal-amber text-xs font-semibold px-1.5 py-px">
                ★ {p.award}
              </span>
            )}
          </span>
          <span>
            {p.tagline ?? p.description}
            <span className="text-terminal-green-dim"> · {p.tags.join(' · ').toLowerCase()}</span>
          </span>
          <span className="flex gap-4 md:justify-end">
            {hasUrl(p.github) && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green-dim hover:text-terminal-green transition-colors duration-200"
              >
                [source →]
              </a>
            )}
            {hasUrl(p.website) && (
              <a
                href={p.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-amber hover:underline"
              >
                [live →]
              </a>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
