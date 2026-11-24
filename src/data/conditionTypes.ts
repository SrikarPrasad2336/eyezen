export type ConditionGroup = 'comfort' | 'focus' | 'surface' | 'longterm'

export interface Condition {
  id: string
  name: string
  tagline: string
  group: ConditionGroup
  overview: string
  signs: string[]
  care: string[]
  foods: string[]
  exercises: string[] // ids from the exercise list
  exerciseNote?: string // extra care about exercises for this condition
  doctorSoon: string[] // book an appointment
  doctorUrgent: string[] // extra urgent signs, on top of the shared list
}