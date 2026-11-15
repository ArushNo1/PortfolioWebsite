'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import Navbar from '@/components/nav/Navbar'
import TerminalDrawer from '@/components/challenges/TerminalDrawer'
import { TIER1_KEY } from '@/data/challenges'
import type { PostMeta } from '@/lib/posts'

interface PostClientProps {
  slug: string
  meta: PostMeta
  headings: string[]
  minutes: number
  prev: PostMeta | null
  next: PostMeta | null
}

const prose = [
  'prose prose-terminal max-w-none leading-[1.75]',
  'prose-h2:text-terminal-bright prose-h2:text-2xl prose-h2:font-semibold prose-h2:tracking-[-.01em] prose-h2:mt-12 prose-h2:mb-4',
  'prose-h3:text-terminal-bright prose-p:text-terminal-white prose-li:text-terminal-white',
  'prose-a:text-terminal-green prose-a:underline-offset-4',
  // Inline code only; code blocks keep the highlight.js theme
  '[&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-terminal-border-dim [&_:not(pre)>code]:text-terminal-green [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-px [&_:not(pre)>code]:font-normal',
  'prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:rounded-lg prose-pre:border prose-pre:border-terminal-border prose-pre:bg-terminal-surface',
].join(' ')

export default function PostClient({ slug, meta, headings, minutes, prev, next }: PostClientProps) {
  const router = useRouter()
  const articleRef = useRef<HTMLElement>(null)
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

  const scrollToHeading = (i: number) =>
    articleRef.current?.querySelectorAll('h2')[i]?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-12 md:pt-16 pb-12 grid gap-10 md:grid-cols-[180px_minmax(0,680px)] md:gap-16">
        <aside className="font-mono text-terminal-green-dim text-[13px] leading-[1.9] md:sticky md:top-24 md:self-start">
          <Link href="/lab" className="text-terminal-green hover:underline">
            ← Lab
          </Link>
          <p className="mt-7">{meta.date}</p>
          {meta.tags.length > 0 && <p>{meta.tags.join(' · ')}</p>}
          <p>{minutes} min read</p>
          {headings.length > 0 && (
            <nav aria-label="Contents" className="hidden md:block">
              <p className="text-terminal-green-muted mt-7">contents</p>
              {headings.map((h, i) => (
                <button
                  key={`${i}-${h}`}
                  type="button"
                  onClick={() => scrollToHeading(i)}
                  className="block text-left hover:text-terminal-green transition-colors duration-200"
                >
                  {h}
                </button>
              ))}
            </nav>
          )}
        </aside>

        <article ref={articleRef}>
          <h1 className="text-terminal-bright text-3xl md:text-4xl leading-tight font-bold tracking-[-.02em] mb-8 text-pretty">
            {meta.title}
          </h1>
          <div className={prose}>
            {Post ? <Post /> : <p className="text-terminal-green-muted">Loading…</p>}
          </div>

          {(prev || next) && (
            <div className="border-t border-terminal-border mt-14 pt-5 flex justify-between gap-6 text-sm text-terminal-green-dim">
              {prev ? (
                <Link href={`/lab/${prev.slug}`} className="hover:text-terminal-green">
                  ← {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={`/lab/${next.slug}`} className="text-right hover:text-terminal-green">
                  {next.title} →
                </Link>
              )}
            </div>
          )}
        </article>
      </main>
      <TerminalDrawer />
    </>
  )
}
