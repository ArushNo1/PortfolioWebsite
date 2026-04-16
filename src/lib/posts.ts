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
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? 'Untitled',
        date: data.date ?? '',
        description: data.description ?? '',
        published: data.published ?? false,
      }
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
