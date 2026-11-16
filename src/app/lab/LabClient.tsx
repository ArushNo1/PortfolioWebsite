'use client'

import { useEffect, useState } from 'react'
import ChallengeGate from '@/components/challenges/ChallengeGate'
import PostList from '@/components/lab/PostList'
import PageHeader from '@/components/ui/PageHeader'
import { TIER1_KEY } from '@/data/challenges'
import type { PostMeta } from '@/lib/posts'

interface LabClientProps {
  posts: PostMeta[]
}

export default function LabClient({ posts }: LabClientProps) {
  const [state, setState] = useState<'checking' | 'locked' | 'unlocked'>('checking')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    setState(localStorage.getItem(TIER1_KEY) === 'true' ? 'unlocked' : 'locked')
  }, [])

  if (state === 'checking') return null
  if (state === 'locked')
    return <ChallengeGate tier={1} message="TIER 1 CLEARANCE REQUIRED" />

  // Categories come from each post's first tag
  const categories = Array.from(new Set(posts.map((p) => p.tags[0]).filter(Boolean)))
  const shown = category === 'all' ? posts : posts.filter((p) => p.tags[0] === category)

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-14 md:pt-20 pb-12">
      <div className="mb-10">
        <PageHeader title="Lab" command="cd ~/lab">
          Writeups, notes, and whatever I was thinking about at the time.
        </PageHeader>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm mb-4">
          {['all', ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={
                `rounded-full border px-3 py-1 transition-colors duration-200 ${
                  category === c
                    ? 'border-terminal-green text-terminal-green'
                    : 'border-terminal-border text-terminal-green-dim hover:text-terminal-white hover:border-terminal-border-bright'
                }`
              }
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <PostList posts={shown} />
    </section>
  )
}
