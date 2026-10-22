import Navbar from '@/components/nav/Navbar'
import TerminalDrawer from '@/components/challenges/TerminalDrawer'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectArchive from '@/components/projects/ProjectArchive'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects · Arush Bodla',
  description: 'Security tools, hackathon wins, and side projects by Arush Bodla.',
}

const featured = projects.filter((p) => p.featured)
const standard = projects.filter((p) => !p.featured && !p.archive)
const archive = projects.filter((p) => p.archive)

function Ls({ dir }: { dir: string }) {
  return (
    <p className="text-base mb-5">
      <span className="text-terminal-green">$</span> ls {dir}/
    </p>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-14 md:pt-20 pb-12 flex flex-col gap-14 md:gap-20">
        <header>
          <h1 className="text-terminal-green text-3xl md:text-4xl leading-none font-bold">
            PROJECTS
          </h1>
        </header>

        <section>
          <Ls dir="featured" />
          <div className="grid gap-6">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} variant="featured" />
            ))}
          </div>
        </section>

        <section>
          <Ls dir="more" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standard.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section>
          <Ls dir="archive" />
          <ProjectArchive projects={archive} />
        </section>
      </main>
      <TerminalDrawer />
    </>
  )
}
