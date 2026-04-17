import Image from 'next/image'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

function hasUrl(v: string | null): v is string {
  return !!v && !v.startsWith('TODO')
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative border border-terminal-border hover:border-terminal-border-bright transition-colors duration-200 bg-terminal-surface">
      {project.featured && (
        <span className="absolute top-2 right-3 text-terminal-green-muted text-xs tracking-widest">
          {'// FEATURED'}
        </span>
      )}

      {project.image && (
        <Image
          src={project.image}
          alt={project.name}
          width={600}
          height={180}
          className="w-full h-44 object-cover border-b border-terminal-border"
        />
      )}

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-terminal-green-muted text-xs border border-terminal-border px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="text-terminal-amber text-sm font-bold mb-2">{project.name}</h3>

        <p className="text-terminal-white text-xs leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex gap-4">
          {hasUrl(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green-dim text-xs tracking-widest hover:text-terminal-green transition-colors"
            >
              [GITHUB →]
            </a>
          )}
          {hasUrl(project.website) && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green-dim text-xs tracking-widest hover:text-terminal-green transition-colors"
            >
              [LIVE →]
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
