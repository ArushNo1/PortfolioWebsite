'use client'

import { useState } from 'react'
import Image from 'next/image'
import { hasUrl, type Project } from '@/data/projects'
import { imagePositionClass } from './imagePosition'

interface ProjectCardProps {
  project: Project
  variant?: 'featured' | 'standard'
}

function hasDetails(p: Project): boolean {
  return !!(p.problem || p.approach || p.result || p.highlights?.length)
}

function DetailSection({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-terminal-green text-sm mb-1"># {label}</div>
      <p className="text-terminal-white text-sm leading-relaxed">{text}</p>
    </div>
  )
}

export default function ProjectCard({ project, variant = 'standard' }: ProjectCardProps) {
  const [open, setOpen] = useState(false)
  const featured = variant === 'featured'
  const details = hasDetails(project)

  // Reveal on hover only for devices that actually hover; touch uses the toggle.
  const revealed = [
    '[@media(hover:hover)]:group-hover:opacity-100',
    '[@media(hover:hover)]:group-hover:translate-y-0',
    '[@media(hover:hover)]:group-hover:pointer-events-auto',
  ].join(' ')

  const links = (
    // z-30 keeps these above the details overlay (z-20) so they never move on reveal.
    <div className="relative z-30 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {hasUrl(project.github) && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-green hover:underline"
        >
          [github →]
        </a>
      )}
      {hasUrl(project.website) && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-amber hover:underline"
        >
          [live →]
        </a>
      )}
      {details && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="text-terminal-green-dim hover:text-terminal-green transition-colors duration-200"
        >
          [details →]
        </button>
      )}
    </div>
  )

  return (
    <article
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      className={`group relative overflow-hidden border border-terminal-border hover:border-terminal-border-bright transition-colors duration-200 bg-terminal-surface ${
        featured ? 'md:grid md:grid-cols-[1.4fr_1fr]' : 'flex flex-col'
      }`}
    >
      {project.image && (
        <div
          className={`flex flex-col border-b border-terminal-border ${
            featured ? 'md:border-b-0 md:border-r' : ''
          }`}
        >
          <div
            className={`flex items-center gap-1.5 px-3.5 border-b border-terminal-border text-terminal-green-dim text-xs shrink-0 ${
              featured ? 'h-8' : 'h-[30px]'
            }`}
          >
            <span className="w-[7px] h-[7px] bg-terminal-border-bright" />
            <span className="w-[7px] h-[7px] bg-terminal-border-bright" />
            <span className="w-[7px] h-[7px] bg-terminal-border-bright" />
            <span className="ml-2">
              {project.id}
            </span>
          </div>
          <div
            className={`relative bg-terminal-bg ${
              featured ? 'aspect-video md:aspect-auto md:flex-1 md:min-h-[320px]' : 'h-[140px]'
            }`}
          >
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes={featured ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
              className={
                project.imageFit === 'contain'
                  ? 'object-contain p-4'
                  : `object-cover ${imagePositionClass(project)}`
              }
            />
          </div>
        </div>
      )}

      {featured ? (
        <div className="flex flex-col gap-3.5 px-6 py-6 md:px-7">
          <p className="text-terminal-green-dim text-[13px] lowercase">{project.tags.join(' · ')}</p>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-terminal-amber text-xl font-bold">
                {project.name}
              </h3>
              {project.award && (
                <span className="text-terminal-bg bg-terminal-amber text-xs font-semibold px-1.5 py-px">
                  ★ {project.award}
                </span>
              )}
            </div>
            {project.event && (
              <p className="text-terminal-green-dim text-sm mt-1">Built for {project.event}</p>
            )}
          </div>
          <p className="text-terminal-bright text-base text-pretty">
            {project.tagline ?? project.description}
          </p>
          {project.result && (
            <p className="text-terminal-green-muted text-sm leading-[1.7]"># {project.result}</p>
          )}
          <div className="mt-auto pt-2">{links}</div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 gap-1.5 px-[18px] py-4">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="text-terminal-amber text-base font-semibold">{project.name}</h3>
            {project.award && (
              <span className="text-terminal-bg bg-terminal-amber text-xs font-semibold px-1.5 py-px">
                ★ {project.award}
              </span>
            )}
          </div>
          {project.event && (
            <p className="text-terminal-green-dim text-sm">Built for {project.event}</p>
          )}
          <p className="text-sm leading-relaxed mb-2">{project.tagline ?? project.description}</p>
          <p className="mt-auto text-terminal-green-dim text-[13px] lowercase">
            {project.tags.join(' · ')}
          </p>
          <div className="mt-1">{links}</div>
        </div>
      )}

      {details && (
        <div
          aria-hidden={!open}
          className={`absolute inset-0 z-20 overflow-y-auto bg-terminal-bg/95 backdrop-blur-sm px-5 pt-5 pb-16 md:px-6 md:pt-6 md:pb-16 flex flex-col gap-5 transition-all duration-200 ${
            open
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
          } ${revealed}`}
        >
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-terminal-green">{`$ man ${project.id}`}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="text-terminal-green-dim hover:text-terminal-amber transition-colors duration-200"
            >
              [close ×]
            </button>
          </div>

          {(project.problem || project.approach || project.result) && (
            <div className={`grid gap-4 ${featured ? 'md:grid-cols-3' : ''}`}>
              {project.problem && <DetailSection label="problem" text={project.problem} />}
              {project.approach && <DetailSection label="approach" text={project.approach} />}
              {project.result && <DetailSection label="result" text={project.result} />}
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className={`grid gap-x-6 gap-y-2 ${featured ? 'md:grid-cols-2' : ''}`}>
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2 text-terminal-green-dim text-sm leading-relaxed"
                >
                  <span className="text-terminal-green shrink-0">{'>'}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  )
}
