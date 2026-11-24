import { Home, Eye, Gamepad2, Salad, LayoutGrid } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { MessageKey } from '../../i18n/en'

// What TabBar and SideBar need
export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

// What we define once
export interface NavItemDef {
  id: string
  labelKey: MessageKey
  icon: LucideIcon
  path: string
}

export const NAV_ITEMS: NavItemDef[] = [
  { id: 'home', labelKey: 'nav.home', icon: Home, path: '/' },
  { id: 'exercises', labelKey: 'nav.exercises', icon: Eye, path: '/exercises' },
  { id: 'games', labelKey: 'nav.games', icon: Gamepad2, path: '/games' },
  { id: 'nutrition', labelKey: 'nav.nutrition', icon: Salad, path: '/nutrition' },
  { id: 'more', labelKey: 'nav.more', icon: LayoutGrid, path: '/more' },
]