import Navbar from '@/components/nav/Navbar'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Skills from '@/components/home/Skills'
import ChallengeSection from '@/components/home/ChallengeSection'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero id="home" />
        <About id="about" />
        <Skills id="skills" />
        <ChallengeSection id="challenges" />
      </main>
      <Footer />
    </>
  )
}
