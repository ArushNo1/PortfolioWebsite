import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/home/Hero'
import GitLog from '@/components/home/GitLog'
import Skills from '@/components/home/Skills'
import Featured from '@/components/home/Featured'
import TerminalDrawer from '@/components/challenges/TerminalDrawer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero id="home" />
        <Featured id="work" />
        <GitLog id="activity" />
        <Skills id="skills" />
      </main>
      <TerminalDrawer />
    </>
  )
}
