'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import Navbar from '@/components/nav/Navbar'
import Footer from '@/components/ui/Footer'
import { TIER1_KEY } from '@/data/challenges'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function LabPostPage({ params }: PageProps) {
  const { slug } = use(params)
  const router = useRouter()
  const [unlocked, setUnlocked] = useState<boolean | null>(null)
  const [Post, setPost] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (localStorage.getItem(TIER1_KEY) !== 'true') {
      router.replace('/lab')
      return
    }
    setUnlocked(true)
  }, [router])

  useEffect(() => {
    if (!unlocked) return
    const Dyn = dynamic(() => import(`@/content/posts/${slug}.mdx`))
    setPost(() => Dyn)
  }, [unlocked, slug])

  if (!unlocked) return null

  return (
    <>
      <Navbar />
      <main className="px-6 md:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/lab"
            className="text-terminal-amber text-xs tracking-widest hover:underline"
          >
            [← BACK TO LAB]
          </Link>
          <article className="prose prose-invert mt-8 text-terminal-white">
            {Post ? <Post /> : <div className="text-terminal-green-muted text-xs">{'// loading...'}</div>}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
