import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectArchive from '@/components/projects/ProjectArchive'
import { projects } from '@/data/projects'

const featured = projects.filter((p) => p.featured)
const standard = projects.filter((p) => !p.featured && !p.archive)
const archive = projects.filter((p) => p.archive)

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <section>
            <div className="text-terminal-green text-xs tracking-widest mb-8">
              {'// INCIDENT_LOG — CONFIRMED_OPERATIONS'}
            </div>
            <div className="grid gap-4">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} variant="featured" />
              ))}
            </div>
          </section>

          <section>
            <div className="text-terminal-green text-xs tracking-widest mb-8">
              {'// SIDE_OPERATIONS'}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {standard.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>

          <section>
            <div className="text-terminal-green text-xs tracking-widest mb-8">
              {'// ARCHIVE'}
            </div>
            <ProjectArchive projects={archive} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
