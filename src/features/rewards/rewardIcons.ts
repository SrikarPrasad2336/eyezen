import {
  Clock,
  Compass,
  Droplets,
  Eye,
  Flower2,
  Hand,
  Sparkles,
  Sprout,
  Sun,
  Target,
  Timer,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const BADGE_ICONS: Record<string, LucideIcon> = {
  'first-calm': Sparkles,
  'blink-master': Eye,
  'steady-start': Sprout,
  'seven-day-glow': Sun,
  'month-of-calm': Flower2,
  'palm-peace': Hand,
  'calm-breather': Wind,
  'break-champion': Timer,
  'hydration-hero': Droplets,
  explorer: Compass,
  'hour-of-calm': Clock,
  'weekly-winner': Target,
}