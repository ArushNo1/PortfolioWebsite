export interface Commit {
  hash: string // short sha, e.g. 'e41b9a0'
  repo: string // e.g. 'umd-ccdc/linux'
  message: string // first line of the commit message
  when: string // already formatted, e.g. '30 min ago'
}

const USER = 'ArushNo1'

interface SearchItem {
  sha: string
  repository: { full_name: string }
  commit: { message: string; committer: { date: string } }
}

function ago(iso: string): string {
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

// Commit search, not the events API: PushEvent payloads no longer include commits.
// Only indexes default branches of public repos. Server-side only; revalidates every 15 min.
export async function getRecentCommits(limit = 5): Promise<Commit[]> {
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  try {
    const res = await fetch(
      `https://api.github.com/search/commits?q=author:${USER}+merge:false&sort=committer-date&order=desc&per_page=${limit}`,
      { headers, next: { revalidate: 900 } },
    )
    if (!res.ok) return []
    const { items } = (await res.json()) as { items: SearchItem[] }
    return items.map((i) => ({
      hash: i.sha.slice(0, 7),
      repo: i.repository.full_name.replace(`${USER}/`, ''),
      message: i.commit.message.split('\n')[0],
      when: ago(i.commit.committer.date),
    }))
  } catch {
    return []
  }
}
