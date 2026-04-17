import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import ProjectCard from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-terminal-green text-xs tracking-widest mb-8">
            {'// INCIDENT_LOG — CONFIRMED_OPERATIONS'}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
