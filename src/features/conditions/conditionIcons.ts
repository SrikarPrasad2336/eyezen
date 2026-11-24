import {
  BookOpen,
  Brain,
  Cloud,
  Droplets,
  Eye,
  Flower2,
  Focus,
  Gauge,
  Glasses,
  Hand,
  HeartPulse,
  Monitor,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const CONDITION_ICONS: Record<string, LucideIcon> = {
  'digital-eye-strain': Monitor,
  'screen-headache': Brain,
  myopia: Glasses,
  'hyperopia-astigmatism': Focus,
  presbyopia: BookOpen,
  'dry-eye': Droplets,
  'allergic-eye': Flower2,
  conjunctivitis: Hand,
  cataracts: Cloud,
  glaucoma: Gauge,
  'macular-degeneration': Eye,
  'diabetic-eye': HeartPulse,
}