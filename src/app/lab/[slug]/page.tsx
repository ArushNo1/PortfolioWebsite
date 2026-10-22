import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/posts'
import PostClient from './PostClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

// '## heading' lines outside code fences, with inline markdown stripped
function getHeadings(markdown: string): string[] {
  const headings: string[] = []
  let inFence = false
  for (const line of markdown.split(/\r?\n/)) {
    if (line.trimStart().startsWith('```')) inFence = !inFence
    const m = !inFence && line.match(/^##\s+(.+)/)
    if (m) headings.push(m[1].replace(/[*_`]|\[([^\]]*)\]\([^)]*\)/g, '$1').trim())
  }
  return headings
}

function readingMinutes(markdown: string): number {
  return Math.max(1, Math.round(markdown.split(/\s+/).filter(Boolean).length / 200))
}

export default async function LabPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  // Posts are sorted newest first, so "previous" is the next index
  const posts = getAllPosts()
  const i = posts.findIndex((p) => p.slug === slug)
  const prev = i === -1 ? null : (posts[i + 1] ?? null)
  const next = i > 0 ? posts[i - 1] : null

  return (
    <PostClient
      slug={slug}
      meta={post.meta}
      headings={getHeadings(post.content)}
      minutes={readingMinutes(post.content)}
      prev={prev}
      next={next}
    />
  )
}
