import Link from 'next/link'
import TerminalBox from '@/components/ui/TerminalBox'
import type { PostMeta } from '@/lib/posts'

interface PostListProps {
  posts: PostMeta[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-terminal-green-muted text-xs">
        {'// No posts published yet.'}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, i) => (
        <TerminalBox
          key={post.slug}
          label={`// POST_${String(i + 1).padStart(3, '0')} — ${post.date}`}
        >
          <div className="space-y-2">
            <div className="flex gap-4">
              <span className="text-terminal-green-muted text-xs w-28 shrink-0 tracking-widest">
                TITLE
              </span>
              <span className="text-terminal-white text-sm">{post.title}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-terminal-green-muted text-xs w-28 shrink-0 tracking-widest">
                DESCRIPTION
              </span>
              <span className="text-terminal-white text-sm">{post.description}</span>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href={`/lab/${post.slug}`}
              className="text-terminal-amber text-xs tracking-widest hover:underline"
            >
              [READ →]
            </Link>
          </div>
        </TerminalBox>
      ))}
    </div>
  )
}
