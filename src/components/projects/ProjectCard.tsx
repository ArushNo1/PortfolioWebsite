'use client'

import { useState } from 'react'
import Image from 'next/image'
import { hasUrl, type Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  variant?: 'featured' | 'standard'
}

interface LinkButtonsProps {
  project: Project
  tabIndex?: number
}

function hasDetails(p: Project): boolean {
  return !!(p.problem || p.approach || p.result || p.highlights?.length)
}

function LinkButtons({ project, tabIndex }: LinkButtonsProps) {
  const base =
    'border px-3 py-1.5 text-xs tracking-widest transition-all duration-200'
  return (
    <div className="flex flex-wrap gap-3">
      {hasUrl(project.github) && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tabIndex}
          className={`${base} border-terminal-border-bright text-terminal-green-dim hover:border-terminal-green hover:text-terminal-green`}
        >
          [GITHUB →]
        </a>
      )}
      {hasUrl(project.website) && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tabIndex}
          className={`${base} border-terminal-amber text-terminal-amber hover:bg-terminal-amber hover:text-terminal-bg`}
        >
          [LIVE →]
        </a>
      )}
    </div>
  )
}

function DetailSection({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="text-terminal-green text-xs tracking-widest mb-1">
        {`// ${label}`}
      </div>
      <p className="text-terminal-white text-xs leading-relaxed">{text}</p>
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

  return (
    <article
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      className={`group relative overflow-hidden border border-terminal-border hover:border-terminal-border-bright transition-colors duration-200 bg-terminal-surface ${
        featured ? 'md:grid md:grid-cols-5 md:min-h-[24rem]' : ''
      }`}
    >
      {project.image && (
        <div
          className={`flex flex-col border-b border-terminal-border ${
            featured ? 'md:col-span-3 md:border-b-0 md:border-r' : ''
          }`}
        >
          <div className="flex items-center gap-1.5 h-6 px-3 bg-terminal-bg border-b border-terminal-border shrink-0">
            <span className="w-1.5 h-1.5 bg-terminal-border-bright" />
            <span className="w-1.5 h-1.5 bg-terminal-border-bright" />
            <span className="w-1.5 h-1.5 bg-terminal-border-bright" />
            <span className="ml-2 text-terminal-green-muted text-[10px] tracking-widest">
              {project.id}
            </span>
          </div>
          <div
            className={`relative aspect-video bg-terminal-bg ${
              featured ? 'md:aspect-auto md:flex-1' : ''
            }`}
          >
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes={featured ? '(min-width: 768px) 60vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
              className={
                project.imageFit === 'contain'
                  ? 'object-contain p-4'
                  : 'object-cover object-top'
              }
            />
          </div>
        </div>
      )}

      <div
        className={`flex flex-col p-5 ${featured ? 'md:col-span-2 md:p-6' : ''}`}
      >
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

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
          <h3 className={`text-terminal-amber font-bold ${featured ? 'text-base' : 'text-sm'}`}>
            {project.name}
          </h3>
          {project.award && (
            <span className="text-terminal-bg bg-terminal-amber text-[10px] font-bold tracking-widest px-1.5 py-0.5">
              {`★ ${project.award.toUpperCase()}`}
            </span>
          )}
        </div>
        {project.event && (
          <div className="text-terminal-green-muted text-xs mb-3">
            Built for {project.event}
          </div>
        )}

        <p className="text-terminal-white text-xs leading-relaxed mt-2 mb-5">
          {project.tagline ?? project.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <LinkButtons project={project} />
          {details && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="text-terminal-green-muted hover:text-terminal-green text-xs tracking-widest transition-colors duration-200"
            >
              [DETAILS +]
            </button>
          )}
        </div>
      </div>

      {details && (
        <div
          aria-hidden={!open}
          className={`absolute inset-0 z-20 overflow-y-auto bg-terminal-bg/95 backdrop-blur-sm p-5 md:p-6 flex flex-col gap-5 transition-all duration-200 ${
            open
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
          } ${revealed}`}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-terminal-green text-xs tracking-widest">
              {`> man ${project.id}`}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="text-terminal-green-muted hover:text-terminal-amber text-xs tracking-widest transition-colors duration-200"
            >
              [CLOSE ×]
            </button>
          </div>

          {(project.problem || project.approach || project.result) && (
            <div className={`grid gap-4 ${featured ? 'md:grid-cols-3' : ''}`}>
              {project.problem && <DetailSection label="PROBLEM" text={project.problem} />}
              {project.approach && <DetailSection label="APPROACH" text={project.approach} />}
              {project.result && <DetailSection label="RESULT" text={project.result} />}
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className={`grid gap-x-6 gap-y-2 ${featured ? 'md:grid-cols-2' : ''}`}>
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-2 text-terminal-green-dim text-xs leading-relaxed"
                >
                  <span className="text-terminal-green shrink-0">{'>'}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto">
            <LinkButtons project={project} tabIndex={open ? 0 : -1} />
          </div>
        </div>
      )}
    </article>
  )
}
