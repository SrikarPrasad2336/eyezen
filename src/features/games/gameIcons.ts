import { Droplets, Flower2, LayoutGrid, Palette, Route, Search, Sparkles, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const GAME_ICONS: Record<string, LucideIcon> = {
  firefly: Sparkles,
  garden: Flower2,
  peripheral: Star,
  colors: Palette,
  schulte: LayoutGrid,
  bubbles: Droplets,
  hidden: Search,
  maze: Route,
}