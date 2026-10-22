import { getRecentCommits } from '@/lib/github'

interface GitLogProps {
  id?: string
}

export default async function GitLog({ id }: GitLogProps) {
  const commits = await getRecentCommits(5)

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-6 md:px-12 pt-14 md:pt-20 pb-8">
      <p className="text-[15px] mb-3">
        <span className="text-terminal-green">$</span> git log --all --oneline -5{' '}
        <span className="text-terminal-green-muted"># pulled from github</span>
      </p>
      <div className="border-t border-terminal-border pt-3 text-sm leading-[2.1]">
        {commits.length === 0 ? (
          <p className="text-terminal-green-muted"># nothing pushed recently</p>
        ) : (
          commits.map((c) => (
            <p
              key={`${c.repo}-${c.hash}`}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_190px_1fr_120px] gap-x-4"
            >
              <span className="text-terminal-amber">{c.hash}</span>
              <span className="text-terminal-green-dim truncate">{c.repo}</span>
              <span className="col-span-2 md:col-span-1 leading-snug md:leading-[2.1] mb-2 md:mb-0">
                {c.message}
              </span>
              <span className="hidden md:block text-terminal-green-muted text-right">{c.when}</span>
            </p>
          ))
        )}
      </div>
    </section>
  )
}
