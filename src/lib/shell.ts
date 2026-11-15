import { projects, hasUrl } from '@/data/projects'
import { socialLinks } from '@/data/socials'

export type Line =
  | { kind: 'in'; text: string }
  | { kind: 'out' | 'err' | 'dim' | 'accent'; text: string }
  | { kind: 'link'; text: string; href: string; external?: boolean }

export interface PuzzleView {
  tier: number
  ciphertext: string
  flag: string
  solved: boolean
  unlockLabel: string
  unlockHref: string
  extraNote?: string
}

export interface ShellContext {
  puzzles: PuzzleView[]
  active: number
  /** Returns true if the answer solved the active puzzle. */
  submit: (answer: string) => boolean
  setActive: (i: number) => void
  navigate: (href: string) => void
  clear: () => void
}

const PAGES: Record<string, string> = {
  home: '/',
  projects: '/projects',
  lab: '/lab',
  contact: '/contact',
}

export const COMMANDS = [
  'help', 'whoami', 'ls', 'cat', 'open', 'puzzle', 'submit', 'socials', 'resume', 'clear', 'history', 'sudo', 'exit',
] as const

const out = (text: string): Line => ({ kind: 'out', text })
const dim = (text: string): Line => ({ kind: 'dim', text })
const err = (text: string): Line => ({ kind: 'err', text })

export function completions(input: string): string[] {
  const parts = input.split(/\s+/)
  if (parts.length <= 1) return COMMANDS.filter((c) => c.startsWith(parts[0] ?? ''))
  const [cmd, arg = ''] = parts
  let pool: string[] = []
  if (cmd === 'cat') pool = projects.map((p) => p.id)
  else if (cmd === 'open') pool = [...Object.keys(PAGES), ...projects.map((p) => p.id)]
  else if (cmd === 'ls') pool = ['projects', 'puzzles', 'pages']
  else if (cmd === 'puzzle') pool = ['1', '2', '3']
  return pool.filter((x) => x.startsWith(arg)).map((x) => `${cmd} ${x}`)
}

function puzzleLines(ctx: ShellContext, i: number): Line[] {
  const p = ctx.puzzles[i]
  const lines: Line[] = [{ kind: 'accent', text: `puzzle ${p.tier}${p.solved ? '  [solved]' : ''}` }, out(`cipher: ${p.ciphertext}`)]
  if (p.extraNote) lines.push(dim(`# ${p.extraNote}`))
  if (p.solved) {
    lines.push(out(`flag: ${p.flag}`), { kind: 'link', text: p.unlockLabel, href: p.unlockHref })
  } else {
    lines.push(dim('# decode it, then: submit <answer>'))
  }
  return lines
}

export function run(raw: string, ctx: ShellContext, history: string[]): Line[] {
  const input = raw.trim()
  if (!input) return []
  const [cmd, ...rest] = input.split(/\s+/)
  const arg = rest.join(' ')

  switch (cmd) {
    case 'help':
      return [
        out('commands:'),
        dim('  whoami              who is this'),
        dim('  ls [projects|puzzles|pages]'),
        dim('  cat <project>       project details'),
        dim('  open <page|project> go somewhere'),
        dim('  puzzle [1-3]        show a cipher'),
        dim('  submit <answer>     answer the active puzzle'),
        dim('  socials, resume, history, clear'),
        dim('tab completes, ↑/↓ walks history'),
      ]
    case 'whoami':
      return [
        out('arush bodla. cs @ umd (aces). forensics intern @ mantech.'),
        dim('ctf player, ccdc linux subteam, 5 hackathon placements.'),
      ]
    case 'ls': {
      const what = arg || '.'
      if (what === '.' || what === '~')
        return [out('projects/  puzzles/  pages/  resume.pdf')]
      if (what.startsWith('projects'))
        return projects
          .filter((p) => !p.archive)
          .map((p) => out(`${p.id.padEnd(20)}${p.award ? `★ ${p.award}` : ''}`))
      if (what.startsWith('puzzles'))
        return ctx.puzzles.map((p) => out(`puzzle ${p.tier}  ${p.solved ? 'solved' : 'locked'}`))
      if (what.startsWith('pages')) return Object.keys(PAGES).map((k) => out(`${k}/`))
      if (what === 'resume.pdf') return [out('resume.pdf')]
      return [err(`ls: ${what}: no such file or directory`)]
    }
    case 'cat': {
      if (!arg) return [err('usage: cat <project>   (try: ls projects)')]
      if (arg === 'resume.pdf') return [{ kind: 'link', text: 'resume.pdf →', href: '/Resume.pdf', external: true }]
      const p = projects.find((x) => x.id === arg.replace(/\/$/, ''))
      if (!p) return [err(`cat: ${arg}: no such project`)]
      const lines: Line[] = [{ kind: 'accent', text: `${p.name}${p.award ? `  ★ ${p.award}` : ''}` }]
      if (p.event) lines.push(dim(`built for ${p.event}`))
      lines.push(out(p.tagline ?? p.description))
      if (p.result) lines.push(dim(`result: ${p.result}`))
      lines.push(dim(p.tags.join(' · ').toLowerCase()))
      if (hasUrl(p.github)) lines.push({ kind: 'link', text: 'github →', href: p.github, external: true })
      if (hasUrl(p.website)) lines.push({ kind: 'link', text: 'live →', href: p.website, external: true })
      return lines
    }
    case 'open': {
      if (!arg) return [err('usage: open <page|project>')]
      if (PAGES[arg]) {
        ctx.navigate(PAGES[arg])
        return [dim(`opening ${arg}...`)]
      }
      const p = projects.find((x) => x.id === arg)
      if (p) {
        const href = hasUrl(p.website) ? p.website : hasUrl(p.github) ? p.github : null
        if (!href) return [err(`open: ${arg} has no public link`)]
        window.open(href, '_blank', 'noopener,noreferrer')
        return [dim(`opening ${href}`)]
      }
      return [err(`open: ${arg}: not found`)]
    }
    case 'puzzle': {
      if (!arg) return puzzleLines(ctx, ctx.active)
      const n = Number(arg) - 1
      if (!(n >= 0 && n < ctx.puzzles.length)) return [err('puzzle: pick 1, 2 or 3')]
      ctx.setActive(n)
      return puzzleLines(ctx, n)
    }
    case 'submit': {
      if (!arg) return [err('usage: submit <answer>')]
      const p = ctx.puzzles[ctx.active]
      if (p.solved) return [dim(`puzzle ${p.tier} is already solved. try: puzzle ${Math.min(p.tier + 1, 3)}`)]
      if (!ctx.submit(arg)) return [err('access denied')]
      return [
        { kind: 'accent', text: 'access granted' },
        out(`flag: ${p.flag}`),
        { kind: 'link', text: p.unlockLabel, href: p.unlockHref },
      ]
    }
    case 'socials':
      return socialLinks.map((s) => ({ kind: 'link', text: `${s.label} →`, href: s.href, external: true }))
    case 'resume':
      return [{ kind: 'link', text: 'resume.pdf →', href: '/Resume.pdf', external: true }]
    case 'history':
      return history.map((h, i) => dim(`${String(i + 1).padStart(3)}  ${h}`))
    case 'clear':
      ctx.clear()
      return []
    case 'sudo':
      return [err('arush is not in the sudoers file. this incident will be reported.')]
    case 'exit':
      return [dim('there is no escape. (use the close button)')]
    case 'rm':
      return [err('nice try.')]
    default:
      return [err(`command not found: ${cmd}. type help`)]
  }
}
