import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface PostListProps {
  posts: PostMeta[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-terminal-green-muted py-5">No posts here yet.</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="border-t border-terminal-border">
          <Link
            href={`/lab/${post.slug}`}
            className="group grid gap-x-6 gap-y-1 md:grid-cols-[120px_1fr_180px] md:items-baseline py-5"
          >
            <span className="font-mono text-terminal-green-muted text-sm">{post.date}</span>
            <span>
              <span className="block text-terminal-bright text-lg font-semibold mb-1 group-hover:text-terminal-green transition-colors duration-200">
                {post.title}
              </span>
              {post.description && (
                <span className="block text-[15px] text-terminal-green-dim max-w-[640px]">{post.description}</span>
              )}
            </span>
            <span className="font-mono text-terminal-green-muted text-xs md:text-right">
              {post.tags.join(' · ')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
