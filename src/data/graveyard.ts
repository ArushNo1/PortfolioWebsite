export interface DeadProject {
  id: string
  name: string
  status: string
  stack: string[]
  cause: string
  learned: string
}

// Edit these entries. These appear on /graveyard (Tier 2 unlock).
export const deadProjects: DeadProject[] = [
  {
    id: 'agriscan',
    name: 'AgroScan',
    status: '90% COMPLETE — ABANDONED',
    stack: ['TODO: list stack'],
    cause: 'TODO: fill in — ML model not ready at TSA deadline, built the entire pipeline around a bottleneck that never resolved',
    learned: 'TODO: one line — validate your weakest dependency first',
  },
  {
    id: 'forgotten-realms',
    name: 'Forgotten Realms',
    status: 'PARTIAL — ABANDONED',
    stack: ['Unity', 'C#'],
    cause: 'TODO: fill in — underestimated Unity learning curve, spent all time on movement and player data, never got to implement the vault/loot core',
    learned: 'TODO: one line — infrastructure is not the game',
  },
  {
    id: 'imageviewer',
    name: 'ImageViewer',
    status: 'REPO ONLY — NEVER STARTED',
    stack: ['C++'],
    cause: 'TODO: fill in — correctly assessed it would not teach enough to justify the time',
    learned: 'TODO: one line — killing a bad idea early is a skill',
  },
]
