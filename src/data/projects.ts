export interface Project {
  id: string
  name: string
  tags: string[]
  description: string
  github: string | null
  website: string | null
  image: string | null
  featured: boolean
}

// Edit this array to add, remove, or reorder projects.
// Images must exist in public/ for next/image to serve them.
export const projects: Project[] = [
  {
    id: 'winter-warzone',
    name: 'Winter Warzone',
    tags: ['Unity', 'Networking', 'C#'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/WinterWarzone.webp',
    featured: true,
  },
  {
    id: 'ecospark',
    name: 'EcoSpark',
    tags: ['Unity', 'C#'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/ecospark.png',
    featured: true,
  },
  {
    id: 'xl-chess',
    name: 'XL Chess',
    tags: ['Java', 'JavaFX'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/xlchess.png',
    featured: true,
  },
  {
    id: 'falcon9',
    name: 'Falcon 9',
    tags: ['Java', 'AWT'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/Falcon9.png',
    featured: false,
  },
  {
    id: 'programming-templates',
    name: 'Programming Templates',
    tags: ['C++'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/Templates.png',
    featured: false,
  },
  {
    id: 'strategic-tictactoe',
    name: 'Strategic Tic Tac Toe',
    tags: ['C#', '.NET'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/StrategicTicTacToe.png',
    featured: false,
  },
  {
    id: 'winter-wonderland',
    name: 'Winter Wonderland',
    tags: ['Java', 'AWT'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: null,
    image: '/WinterScene.png',
    featured: false,
  },
  {
    id: 'portfolio-site',
    name: 'Portfolio Site',
    tags: ['Next.js', 'Tailwind CSS'],
    description: 'TODO: short description',
    github: 'TODO: github url or null',
    website: 'https://arushbodla.vercel.app',
    image: '/PortfolioSite.png',
    featured: false,
  },
]
