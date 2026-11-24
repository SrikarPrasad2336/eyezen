// What the guide should show / say at each moment
export type Cue =
  | 'inhale'
  | 'hold'
  | 'exhale'
  | 'hold-empty'
  | 'rest'
  | 'close'
  | 'open'
  | 'near'
  | 'far'
  | 'trace'
  | 'trace-reverse'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'center'

// Which animated picture is used
export type GuideKind =
  | 'breath'
  | 'blink'
  | 'focus'
  | 'calm'
  | 'trace-eight'
  | 'trace-circle'
  | 'tracking'

export interface ExerciseStep {
  text: string
  seconds: number
  cue: Cue
}

export interface Exercise {
  id: string
  name: string
  tagline: string
  guide: GuideKind
  immersive?: boolean // dark, dim screen
  howTo: string[]
  safety?: string
  intro: ExerciseStep[] // played once at the start
  cycle: ExerciseStep[] // repeated "rounds" times
  rounds: number
  outro: ExerciseStep[] // played once at the end
  steps: ExerciseStep[] // everything in order (built automatically)
}

type ExerciseDef = Omit<Exercise, 'steps'>

// A short way to write one step
function s(text: string, seconds: number, cue: Cue = 'rest'): ExerciseStep {
  return { text, seconds, cue }
}

function buildSteps(def: ExerciseDef, rounds: number): ExerciseStep[] {
  const middle = Array.from({ length: rounds }, () => def.cycle).flat()
  return [...def.intro, ...middle, ...def.outro]
}

function build(def: ExerciseDef, rounds: number = def.rounds): Exercise {
  return { ...def, rounds, steps: buildSteps(def, rounds) }
}

const DEFS: ExerciseDef[] = [
  {
    id: 'twenty-20-20',
    name: '20-20-20 Break',
    tagline: 'Look 20 feet away for 20 seconds. The classic screen-break rule.',
    guide: 'focus',
    howTo: [
      'Look away from your screen.',
      'Find something about 20 feet (6 metres) away. A window or a far wall is fine.',
      'Keep looking at it for 20 seconds, blinking naturally.',
    ],
    safety: 'Never look at the sun or any bright light. Pick something comfortable to look at.',
    intro: [s('Pause what you are doing and relax your shoulders.', 4)],
    cycle: [s('Look at something about 20 feet (6 metres) away. Blink naturally.', 20, 'far')],
    rounds: 1,
    outro: [s('Blink slowly a few times, then return to your work.', 6)],
  },
  {
    id: 'blink-training',
    name: 'Blink Training',
    tagline: 'Full, gentle blinks to refresh tired, screen-weary eyes.',
    guide: 'blink',
    howTo: [
      'Look ahead at something comfortable.',
      'Close your eyes softly, like lowering a curtain.',
      'Open slowly, then repeat.',
    ],
    safety: 'Keep your face relaxed. Do not squeeze your eyes tightly.',
    intro: [s('Sit comfortably and look at something ahead of you.', 5)],
    cycle: [
      s('Close your eyes softly.', 2, 'close'),
      s('Open slowly and look ahead.', 3, 'open'),
    ],
    rounds: 10,
    outro: [],
  },
  {
    id: 'palming',
    name: 'Palming',
    tagline: 'Warm, dark stillness for tired eyes.',
    guide: 'breath',
    immersive: true,
    howTo: [
      'Rub your palms together to warm them.',
      'Cup them over your closed eyes, with no pressure on the eyeballs.',
      'Breathe slowly and enjoy the darkness.',
    ],
    safety:
      'Never press on your eyeballs. Let your palms rest on the bones around your eyes, like gentle cups.',
    intro: [
      s('Rub your palms together until they feel warm.', 8),
      s('Cup your warm palms over your closed eyes. Do not press on the eyeballs.', 8),
    ],
    cycle: [
      s('Breathe in slowly through your nose.', 4, 'inhale'),
      s('Breathe out softly. Let your shoulders drop.', 6, 'exhale'),
    ],
    rounds: 6,
    outro: [
      s('Slowly lower your hands. Keep your eyes closed for a moment.', 6),
      s('Open your eyes gently.', 4),
    ],
  },
  {
    id: 'near-far-focus',
    name: 'Near-Far Focus',
    tagline: 'A gentle change of focus for eyes that stare at screens.',
    guide: 'focus',
    howTo: [
      "Hold your thumb out at a comfortable distance, about an arm's length.",
      'Look at your thumb, then at something far away.',
      'Switch slowly every 5 seconds.',
    ],
    safety:
      'Keep glasses or contact lenses on as you normally wear them. Stop if you feel dizzy or get a headache.',
    intro: [s('Hold your thumb out at a comfortable distance in front of you.', 6)],
    cycle: [
      s('Look at your thumb. Keep it comfortably clear.', 5, 'near'),
      s('Now look at something far away, like a tree or the sky.', 5, 'far'),
    ],
    rounds: 6,
    outro: [],
  },
  {
    id: 'figure-8',
    name: 'Figure-8 Tracing',
    tagline: 'Trace a slow, sideways 8 with your eyes.',
    guide: 'trace-eight',
    howTo: [
      'Sit comfortably and keep your head still.',
      'Follow the glowing dot with only your eyes.',
      'Move slowly. The dot changes direction halfway.',
    ],
    safety:
      'Keep your head still and move only your eyes, slowly. Stop if you feel dizzy or get a headache.',
    intro: [s('Keep your head still. Follow the dot with only your eyes.', 6)],
    cycle: [
      s('Follow the dot along the figure 8.', 10, 'trace'),
      s('Now follow it the other way.', 10, 'trace-reverse'),
    ],
    rounds: 3,
    outro: [s('Close your eyes softly and rest.', 5)],
  },
  {
    id: 'tracking',
    name: 'Up-Down-Left-Right',
    tagline: 'Gentle eye tracking in four directions.',
    guide: 'tracking',
    howTo: [
      'Keep your head still.',
      'Move only your eyes to follow the dot.',
      'Return to the center between each direction.',
    ],
    safety:
      'Move your eyes slowly and only as far as is comfortable. Stop if you feel dizzy or get a headache.',
    intro: [s('Keep your head still. Move only your eyes to follow the dot.', 6, 'center')],
    cycle: [
      s('Look up, gently.', 4, 'up'),
      s('Back to the center.', 2, 'center'),
      s('Look down, gently.', 4, 'down'),
      s('Back to the center.', 2, 'center'),
      s('Look to your left, gently.', 4, 'left'),
      s('Back to the center.', 2, 'center'),
      s('Look to your right, gently.', 4, 'right'),
      s('Back to the center.', 2, 'center'),
    ],
    rounds: 2,
    outro: [s('Close your eyes softly and rest.', 4)],
  },
  {
    id: 'circles',
    name: 'Eye Circles',
    tagline: 'Slow circles to loosen up your eye movements.',
    guide: 'trace-circle',
    howTo: [
      'Sit comfortably and keep your head still.',
      'Follow the glowing dot around the circle with only your eyes.',
      'The dot changes direction halfway.',
    ],
    safety:
      'Keep your head still and move only your eyes, slowly. Stop if you feel dizzy or get a headache.',
    intro: [s('Keep your head still. Follow the dot with only your eyes.', 6)],
    cycle: [
      s('Follow the dot around the circle, clockwise.', 10, 'trace'),
      s('Now follow it the other way around.', 10, 'trace-reverse'),
    ],
    rounds: 3,
    outro: [s('Close your eyes softly and rest.', 5)],
  },
  {
    id: 'neck-shoulder',
    name: 'Neck and Shoulder Release',
    tagline: 'Let go of the tension that builds up while you look at screens.',
    guide: 'breath',
    howTo: [
      'Sit or stand tall with your arms loose.',
      'Lift your shoulders as you breathe in, drop them as you breathe out.',
      'Then tilt your head gently side to side and roll your shoulders.',
    ],
    safety:
      'Move slowly. Never force or jerk your neck. Stop if you feel pain, tingling or dizziness. If you have a neck or spine condition, ask your doctor first.',
    intro: [s('Sit or stand tall. Let your arms hang loosely.', 6)],
    cycle: [
      s('Breathe in and lift your shoulders toward your ears.', 4, 'inhale'),
      s('Breathe out and let them drop completely.', 6, 'exhale'),
    ],
    rounds: 4,
    outro: [
      s('Gently tilt your right ear toward your right shoulder. Do not force it.', 10),
      s('Slowly return to the center.', 4),
      s('Gently tilt your left ear toward your left shoulder. Do not force it.', 10),
      s('Slowly return to the center.', 4),
      s('Slowly roll your shoulders backward in big, easy circles.', 10),
    ],
  },
  {
    id: 'eye-massage',
    name: 'Gentle Eye Massage',
    tagline: 'A feather-light massage on the bones around your eyes.',
    guide: 'calm',
    howTo: [
      'Make sure your hands are clean and your contact lenses are out.',
      'Use the lightest touch, on the bones around your eyes only.',
      'Move in slow, tiny circles.',
    ],
    safety:
      'NEVER press on your eyeball. Touch only the bones around the eye. Skip this if you have an eye infection, a recent eye injury or surgery, or an eye condition your doctor told you to be careful with. Stop if anything hurts.',
    intro: [
      s('Make sure your hands are clean and your contact lenses are out.', 6),
      s('Rub your palms together to warm them.', 5),
    ],
    cycle: [
      s('Very lightly circle your fingertips along the bone above your eyebrows.', 10),
      s('Now circle gently along your cheekbones, below your eyes. Stay on the bone.', 10),
      s('Make tiny, light circles on your temples.', 10),
      s('Lightly rest your fingers on the bridge of your nose for one slow breath.', 8),
    ],
    rounds: 1,
    outro: [s('Rest your hands in your lap and close your eyes. Breathe slowly.', 8)],
  },
  {
    id: 'warm-compress',
    name: 'Warm Compress',
    tagline: 'Soothing warmth for tired eyes.',
    guide: 'calm',
    howTo: [
      'Soak a clean cloth in warm water and wring it out.',
      'Test it on your wrist. It should feel comfortably warm, never hot.',
      'Rest it gently over your closed eyes and breathe slowly.',
    ],
    safety:
      'Use warm, never hot. Do not use a compress if you have an eye infection, a recent eye injury or surgery, or if your doctor advised against it. Stop if it hurts or irritates your eyes.',
    intro: [
      s('Check that your cloth is clean and comfortably warm, not hot. Test it on your wrist.', 10),
    ],
    cycle: [
      s('Rest the warm cloth over your closed eyes. Breathe slowly and let your face soften.', 30),
    ],
    rounds: 6,
    outro: [
      s('Lift the cloth away. Keep your eyes closed for a moment.', 6),
      s('Open your eyes gently.', 4),
    ],
  },
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    tagline: 'Breathe in a calm square: in, hold, out, hold.',
    guide: 'breath',
    howTo: [
      'Sit comfortably with relaxed shoulders.',
      'Follow the circle as it grows and shrinks.',
      'Breathe in, hold, breathe out, hold, each for 4 counts.',
    ],
    safety: 'If you feel light-headed, skip the holds and return to normal, easy breathing.',
    intro: [s('Sit comfortably and relax your shoulders.', 6)],
    cycle: [
      s('Breathe in slowly...', 4, 'inhale'),
      s('Hold gently.', 4, 'hold'),
      s('Breathe out slowly...', 4, 'exhale'),
      s('Rest with your lungs comfortably empty.', 4, 'hold-empty'),
    ],
    rounds: 4,
    outro: [],
  },
]

export const EXERCISES: Exercise[] = DEFS.map((def) => build(def))

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((exercise) => exercise.id === id)
}

// The same exercise, but with more or fewer repeats (used by routines)
export function getExerciseWithRounds(id: string, rounds: number): Exercise | undefined {
  const def = DEFS.find((item) => item.id === id)
  return def ? build(def, Math.max(1, Math.round(rounds))) : undefined
}

export function getTotalSeconds(exercise: Exercise): number {
  return exercise.steps.reduce((sum, step) => sum + step.seconds, 0)
}

// Which step are we in, and how far (0 to 1) through that step?
export function getStepAt(steps: ExerciseStep[], elapsedSeconds: number) {
  let start = 0
  for (let index = 0; index < steps.length; index++) {
    const end = start + steps[index].seconds
    if (elapsedSeconds < end) {
      return { index, progress: (elapsedSeconds - start) / steps[index].seconds }
    }
    start = end
  }
  return { index: steps.length - 1, progress: 1 }
}