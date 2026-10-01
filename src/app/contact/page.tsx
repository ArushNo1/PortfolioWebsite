import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import type { Metadata } from 'next'
import Contact from '@/components/contact/Contact'

export const metadata: Metadata = {
  title: 'Contact · Arush Bodla',
  description: 'Get in touch with Arush Bodla about internships, security research, startups, or project ideas.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  )
}
