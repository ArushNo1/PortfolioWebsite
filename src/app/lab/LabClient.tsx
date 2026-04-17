'use client'

import { useEffect, useState } from 'react'
import ChallengeGate from '@/components/challenges/ChallengeGate'
import PostList from '@/components/lab/PostList'
import { TIER1_KEY } from '@/data/challenges'
import type { PostMeta } from '@/lib/posts'

interface LabClientProps {
  posts: PostMeta[]
}

export default function LabClient({ posts }: LabClientProps) {
  const [state, setState] = useState<'checking' | 'locked' | 'unlocked'>('checking')

  useEffect(() => {
    setState(localStorage.getItem(TIER1_KEY) === 'true' ? 'unlocked' : 'locked')
  }, [])

  if (state === 'checking') return null
  if (state === 'locked')
    return <ChallengeGate tier={1} message="TIER 1 CLEARANCE REQUIRED" />

  return (
    <section className="px-6 md:px-12 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-terminal-green text-xs tracking-widest mb-8">
          {'// THE_LAB — ANALYST READING MATERIAL'}
        </div>
        <PostList posts={posts} />
      </div>
    </section>
  )
}
