import Link from 'next/link'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'

export default function Featured({ id }: { id?: string }) {
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-20">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[.06em] text-terminal-green-dim">Featured work</h2>
        <Link href="/projects" className="text-sm text-terminal-green hover:underline underline-offset-4">
          All projects →
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} variant="featured" />
        ))}
      </div>
    </section>
  )
}
