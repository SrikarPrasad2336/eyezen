import {
  Activity,
  CircleDot,
  Eye,
  Flame,
  Flower2,
  Focus,
  Hand,
  Infinity as InfinityIcon,
  Laptop,
  Moon,
  Move,
  Sparkles,
  Timer,
  Wind,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const EXERCISE_ICONS: Record<string, LucideIcon> = {
  'twenty-20-20': Timer,
  'blink-training': Eye,
  palming: Hand,
  'near-far-focus': Focus,
  'figure-8': InfinityIcon,
  tracking: Move,
  circles: CircleDot,
  'neck-shoulder': Activity,
  'eye-massage': Sparkles,
  'warm-compress': Flame,
  'box-breathing': Wind,
}

export const ROUTINE_ICONS: Record<string, LucideIcon> = {
  'quick-reset': Zap,
  'work-break': Laptop,
  bedtime: Moon,
  'deep-relax': Flower2,
}