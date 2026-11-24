export type Level = 'easy' | 'medium' | 'hard'

export const LEVELS: Level[] = ['easy', 'medium', 'hard']

export interface GameDef {
  id: string
  name: string
  tagline: string
  howTo: string[]
  scoreHint: string
}

export const GAME_SAFETY =
  'Play gently. Blink often, sit comfortably, and stop if your eyes feel tired, dry or achy, or if you get a headache or feel dizzy. These games are for fun and relaxation. They do not train your vision or treat any eye condition.'

export const GAME_DEFS: GameDef[] = [
  {
    id: 'firefly',
    name: 'Follow the Firefly',
    tagline: 'Glide your finger or mouse along with a gentle glowing firefly.',
    howTo: [
      'Watch the firefly drift slowly across the garden.',
      'Keep your finger (or mouse) close to it. Move smoothly and softly.',
      'The round lasts 30 seconds.',
    ],
    scoreHint: '10 points for every second you stay close.',
  },
  {
    id: 'garden',
    name: 'Zen Focus Garden',
    tagline: 'Watch the flowers bloom, then bloom them back in the same order.',
    howTo: [
      'Watch carefully as the flowers glow, one at a time.',
      'When it is your turn, tap the flowers in the same order.',
      'Each success adds one more flower to remember. You have 3 gentle retries.',
    ],
    scoreHint: '10 points for each flower in every sequence you complete.',
  },
  {
    id: 'peripheral',
    name: 'Peripheral Stars',
    tagline: 'Rest your gaze in the middle and notice soft stars appearing around it.',
    howTo: [
      'Keep looking at the glowing dot in the center.',
      'When a soft star fades in near the edge, tap it.',
      'Try not to move your eyes away from the center.',
    ],
    scoreHint: '10 points for each star you catch.',
  },
  {
    id: 'colors',
    name: 'Color Calm Match',
    tagline: 'Turn over calm colored cards and find the matching pairs.',
    howTo: [
      'Tap a card to turn it over, then tap a second one.',
      'If the colors match, the pair stays open.',
      'Match every pair using as few turns as you can.',
    ],
    scoreHint: 'Fewer turns means a higher score.',
  },
  {
    id: 'schulte',
    name: 'Schulte Table',
    tagline: 'Find the numbers in order, with your gaze resting near the center.',
    howTo: [
      'Look for 1, then 2, then 3, all the way up.',
      'Tap each number in order.',
      'Try resting your gaze near the middle and spotting numbers with your side vision. It is fine to look around.',
    ],
    scoreHint: 'Faster and fewer mistakes means a higher score.',
  },
  {
    id: 'bubbles',
    name: 'Blink Bubble Pop',
    tagline: 'Soft bubbles drift upward. Pop them gently, and remember to blink.',
    howTo: [
      'Tap the bubbles as they float up.',
      'Every few seconds a soft reminder asks you to blink slowly.',
      'The round lasts about a minute.',
    ],
    scoreHint: '10 points for every bubble you pop.',
  },
  {
    id: 'hidden',
    name: 'Hidden Object Hunt',
    tagline: 'Search a peaceful garden for little hidden treasures.',
    howTo: [
      'Look closely at the garden scene.',
      'Tap the hidden treasures when you spot them.',
      'Take your time. There is no rush.',
    ],
    scoreHint: 'Points for every treasure found, plus a calm-pace bonus.',
  },
  {
    id: 'maze',
    name: 'Maze Glow',
    tagline: 'Guide a soft light through a gentle maze to the glowing exit.',
    howTo: [
      'Use the arrow buttons (or your keyboard arrows) to move the light.',
      'Find the way to the glowing exit.',
      'Each round is a new maze.',
    ],
    scoreHint: 'Fewer steps and less time means a higher score.',
  },
]

export function getGameDef(id: string): GameDef | undefined {
  return GAME_DEFS.find((game) => game.id === id)
}