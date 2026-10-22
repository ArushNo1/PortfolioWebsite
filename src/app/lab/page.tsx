import Navbar from '@/components/nav/Navbar'
import TerminalDrawer from '@/components/challenges/TerminalDrawer'
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
      <TerminalDrawer />
    </>
  )
}
