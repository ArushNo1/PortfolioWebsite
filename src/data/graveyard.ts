export interface DeadProject {
  id: string
  name: string
  status: string
  stack: string[]
  cause: string
  learned: string
  image: string | null
}

export const deadProjects: DeadProject[] = [
  {
    id: 'agriscan',
    name: 'AgriScan',
    status: '90% COMPLETE — ABANDONED',
    stack: ['Next.js', 'PyTorch'],
    cause: 'The ML model wasn\'t ready at the TSA deadline, and the entire pipeline was built around a bottleneck that never resolved',
    learned: 'Don\'t build a system around a component that doesn\'t exist yet',
    image: "/AgriScan.png",
  },
  {
    id: 'forgotten-realms',
    name: 'Forgotten Realms',
    status: 'PARTIAL — ABANDONED',
    stack: ['Unity', 'C#'],
    cause: 'I severely underestimated Unity, and several months in all I had was the player movement and some basic sprites.',
    learned: 'Don\'t try for perfection before an MVP exists',
    image: null,
  },
  {
    id: 'imageviewer',
    name: 'ImageViewer',
    status: 'REPO ONLY — NEVER STARTED',
    stack: ['C++'],
    cause: 'I figured learning the theory of file formats was good enough. The time it would take to build wasn\'t worth it.',
    learned: 'Know when to cut your losses on an idea, even if it hasn\'t technically failed yet',
    image: null,
  },
]
