import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import LabClient from './LabClient'
import { getAllPosts } from '@/lib/posts'

export default function LabPage() {
  const posts = getAllPosts()
  return (
    <>
      <Navbar />
      <main>
        <LabClient posts={posts} />
      </main>
      <Footer />
    </>
  )
}
