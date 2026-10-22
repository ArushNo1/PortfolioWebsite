import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface PostListProps {
  posts: PostMeta[]
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-terminal-green-muted"># no posts here yet</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="border-t border-terminal-border">
          <Link
            href={`/lab/${post.slug}`}
            className="group grid gap-x-6 gap-y-1 md:grid-cols-[120px_1fr_180px] md:items-baseline py-5"
          >
            <span className="text-terminal-green-dim text-sm">{post.date}</span>
            <span>
              <span className="block text-terminal-amber text-base font-semibold mb-1 group-hover:underline underline-offset-4">
                {post.title}
              </span>
              {post.description && (
                <span className="block text-[15px] max-w-[640px]">{post.description}</span>
              )}
            </span>
            <span className="text-terminal-green-dim text-[13px] md:text-right">
              {post.tags.join(' · ')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
