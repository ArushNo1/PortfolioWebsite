import Navbar from '@/components/nav/Navbar'
import TerminalDrawer from '@/components/challenges/TerminalDrawer'
import Footer from '@/components/ui/Footer'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectArchive from '@/components/projects/ProjectArchive'
import PageHeader, { SectionLabel } from '@/components/ui/PageHeader'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects · Arush Bodla',
  description: 'Security tools, hackathon wins, and side projects by Arush Bodla.',
}

const featured = projects.filter((p) => p.featured)
const standard = projects.filter((p) => !p.featured && !p.archive)
const archive = projects.filter((p) => p.archive)

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-14 md:pt-20 pb-12 flex flex-col gap-14 md:gap-20">
        <PageHeader title="Projects" command="ls ~/projects">
          Security tools, hackathon builds, and fun things I made.
        </PageHeader>

        <section>
          <SectionLabel>Featured</SectionLabel>
          <div className="grid gap-4">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} variant="featured" />
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>More projects</SectionLabel>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {standard.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Archive</SectionLabel>
          <ProjectArchive projects={archive} />
        </section>
      </main>
      <Footer />
      <TerminalDrawer />
    </>
  )
}
