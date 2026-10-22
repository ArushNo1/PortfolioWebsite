import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'src/content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  published: boolean
  tags: string[]      // first tag is the category used by the /lab filter, e.g. ['writeup', 'pwn']
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : 'Untitled',
    // YAML parses unquoted dates into Date objects
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : typeof data.date === 'string' ? data.date : '',
    description: typeof data.description === 'string' ? data.description : '',
    published: data.published === true,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      return toMeta(slug, matter(raw).data)
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostContent(slug: string): string {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return ''
  const raw = fs.readFileSync(filePath, 'utf8')
  const { content } = matter(raw)
  return content
}

// Meta and raw markdown for one post, published or not (direct links to drafts still work).
export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  return { meta: toMeta(slug, data), content }
}
