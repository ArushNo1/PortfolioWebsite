'use client'

import { useState } from 'react'
import PostList from '@/components/lab/PostList'
import PageHeader from '@/components/ui/PageHeader'
import type { PostMeta } from '@/lib/posts'

interface LabClientProps {
  posts: PostMeta[]
}

export default function LabClient({ posts }: LabClientProps) {
  const [category, setCategory] = useState('all')

  // Categories come from each post's first tag
  const categories = Array.from(new Set(posts.map((p) => p.tags[0]).filter(Boolean)))
  const shown = category === 'all' ? posts : posts.filter((p) => p.tags[0] === category)

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-14 md:pt-20 pb-12">
      <div className="mb-10">
        <PageHeader title="Lab" command="cd ~/lab">
          Writeups and notes.
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
