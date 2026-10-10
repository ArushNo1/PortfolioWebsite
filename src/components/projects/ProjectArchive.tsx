import Image from 'next/image'
import { hasUrl, type Project } from '@/data/projects'
import { imagePositionClass } from './imagePosition'

interface ProjectArchiveProps {
  projects: Project[]
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  return (
    <ul className="border border-terminal-border bg-terminal-surface divide-y divide-terminal-border">
      {projects.map((p) => (
        <li
          key={p.id}
          className="grid gap-4 md:grid-cols-[11rem_12rem_1fr_auto] md:items-center md:gap-6 px-5 py-4 hover:bg-terminal-bg transition-colors duration-200"
        >
          {p.image && (
            <div className="relative aspect-video border border-terminal-border bg-terminal-bg">
              <Image
                src={p.image}
                alt={`${p.name} screenshot`}
                fill
                sizes="(min-width: 768px) 11rem, 100vw"
                className={
                  p.imageFit === 'contain'
                    ? 'object-contain p-2'
                    : `object-cover ${imagePositionClass(p)}`
                }
              />
            </div>
          )}
          <div className={p.image ? '' : 'md:col-span-2'}>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-terminal-amber text-sm font-bold">{p.name}</span>
              {p.award && (
                <span className="text-terminal-bg bg-terminal-amber text-[10px] font-bold tracking-widest px-1.5 py-0.5">
                  {`★ ${p.award.toUpperCase()}`}
                </span>
              )}
            </div>
            <div className="text-terminal-green-muted text-xs mt-0.5">
              {p.tags.join(' · ')}
            </div>
            {p.event && (
              <div className="text-terminal-green-muted text-xs mt-0.5">
                Built for {p.event}
              </div>
            )}
          </div>
          <div>
            <p className="text-terminal-white text-xs leading-relaxed">{p.description}</p>
            {p.result && (
              <p className="text-terminal-green-dim text-xs leading-relaxed mt-2">
                <span className="text-terminal-green tracking-widest">{'// RESULT '}</span>
                {p.result}
              </p>
            )}
          </div>
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
