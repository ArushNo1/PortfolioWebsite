export interface Commit {
  hash: string // short sha, e.g. 'e41b9a0'
  repo: string // e.g. 'umd-ccdc/linux'
  message: string // first line of the commit message
  when: string // already formatted, e.g. '30 min ago'
}

// TODO: fetch recent commits for ArushNo1 from GitHub (server-side only).
// GitLog renders whatever this returns, newest first; return [] on failure and it shows an empty state.
export async function getRecentCommits(limit = 5): Promise<Commit[]> {
  void limit
  return []
}
