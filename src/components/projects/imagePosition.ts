import type { Project } from '@/data/projects'

// Full class names so Tailwind can see them. The named side is the part that stays visible.
const POSITION_CLASS: Record<NonNullable<Project['imagePosition']>, string> = {
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  center: 'object-center',
}

export function imagePositionClass(p: Project): string {
  return POSITION_CLASS[p.imagePosition ?? 'top']
}
