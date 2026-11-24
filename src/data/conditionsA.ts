import type { Condition } from './conditionTypes'

// General, educational information only. It is not medical advice.
export const CONDITIONS_A: Condition[] = [
  {
    id: 'digital-eye-strain',
    name: 'Digital eye strain',
    tagline: 'Tired, uncomfortable eyes after long screen time',
    group: 'comfort',
    overview:
      'Looking at phones, computers and tablets for long stretches can leave your eyes tired and uncomfortable. We blink less when we stare at screens, and we focus up close for hours. It is very common, and it usually eases with rest and better screen habits.',
    signs: [
      'Tired, heavy or sore eyes',
      'Dry, burning or watery eyes',
      'Blurry vision that clears after a break',
      'Headache around the eyes or forehead',
      'Tight neck and shoulders',
    ],
    care: [
      'Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.',
      'Blink fully and often. Slow, complete blinks help.',
      "Keep your screen about an arm's length away, with the top at or just below eye level.",
      'Match screen brightness to the room and reduce glare from windows and lamps.',
      'Make text bigger instead of leaning closer.',
      'Keep your glasses prescription up to date.',
    ],
    foods: [
      'Drink water through the day',
      'Colorful vegetables and leafy greens such as palak',
      'Enough sleep, so your eyes can recover',
    ],
    exercises: ['twenty-20-20', 'blink-training', 'near-far-focus', 'palming', 'neck-shoulder'],
    doctorSoon: [
      'Symptoms keep coming back even when you take breaks',
      'Frequent headaches, or blurry or double vision that does not clear',
      'You have not had an eye test for a long time',
    ],
    doctorUrgent: [],
  },
  {
    id: 'screen-headache',
    name: 'Screen headaches',
    tagline: 'Headaches that seem to follow screen time',
    group: 'comfort',
    overview:
      'Some headaches show up after long screen sessions. Eye strain, glare, poor posture, tense neck muscles or glasses that need updating can all play a part. Headaches have many causes, though, so a headache that keeps coming back deserves a proper check.',
    signs: [
      'A dull ache around the eyes, forehead or temples',
      'Aching that builds the longer you use a screen',
      'Neck or shoulder tension alongside the headache',
      'Eyes that feel sensitive to light',
    ],
    care: [
      'Take regular screen breaks and look into the distance.',
      'Sit with your back supported and your screen at a comfortable height.',
      'Reduce glare and keep brightness comfortable.',
      'Drink water, eat regular meals and aim for steady sleep.',
      'Loosen your neck and shoulders during the day.',
      'Check whether your glasses prescription is current.',
    ],
    foods: [
      'Water through the day',
      'Regular, balanced meals, since skipping meals can trigger headaches in some people',
      'Limit late-day caffeine, which can disturb sleep',
    ],
    exercises: ['neck-shoulder', 'palming', 'box-breathing', 'twenty-20-20'],
    doctorSoon: [
      'Headaches are frequent or getting worse',
      'Rest and breaks do not help',
      'Headaches come with vision changes, or wake you from sleep',
    ],
    doctorUrgent: [
      'A sudden, severe headache, or a headache with weakness, confusion or trouble speaking (get emergency care)',
      'A headache with eye pain, nausea and halos around lights (this can be an eye emergency)',
    ],
  },
  {
    id: 'myopia',
    name: 'Myopia (short-sightedness)',
    tagline: 'Near things are clear, far things are blurry',
    group: 'focus',
    overview:
      'In myopia, distant objects look blurry while close ones stay clear. It often starts in childhood or the teen years and is very common. An eye doctor can correct it with glasses or contact lenses, and may suggest other options.',
    signs: [
      'Squinting to read signs or the board',
      'Sitting very close to the TV or holding things close',
      'Eye strain or headaches',
      'A child who complains they cannot see far, or avoids distance tasks',
    ],
    care: [
      'Have regular eye tests, especially for children and teens.',
      'Wear your prescribed glasses or lenses as advised.',
      'Spend time outdoors in daylight. Research links more outdoor time in childhood with a lower chance of developing myopia.',
      'Take screen and reading breaks, and keep good light and a comfortable distance.',
    ],
    foods: ['A balanced diet with fruit, vegetables and enough water'],
    exercises: ['twenty-20-20', 'near-far-focus', 'palming'],
    exerciseNote:
      'Eye exercises do not correct myopia or slow it down. These are only for comfort and rest.',
    doctorSoon: [
      'Distance vision seems blurrier than before',
      'A child squints, sits close to screens, or complains of headaches',
      'Your prescription seems to change quickly',
    ],
    doctorUrgent: [
      'Flashes of light, a sudden shower of floaters, or a shadow or curtain across your vision. People who are very short-sighted have a higher risk of a retinal tear or detachment.',
    ],
  },
  {
    id: 'hyperopia-astigmatism',
    name: 'Hyperopia and astigmatism',
    tagline: 'Long-sightedness and uneven focus',
    group: 'focus',
    overview:
      'In hyperopia (long-sightedness), close objects can look blurry, and the eyes may work hard to focus, which causes tiredness. In astigmatism, the front of the eye is shaped a little unevenly, so things can look slightly blurred or stretched at any distance. Both are common and usually corrected with glasses or contact lenses.',
    signs: [
      'Tired eyes or headaches after reading or close work',
      'Blurry near vision, or blur at all distances',
      'Squinting, or eye rubbing',
      'Glare or ghosting around lights at night',
      'A child who avoids reading, or whose eye turns inward or outward',
    ],
    care: [
      'Have an eye test to find out what you need. Glasses or lenses are the usual answer.',
      'Wear your prescription as advised.',
      'Use good, even lighting for reading.',
      'Take regular breaks from close work.',
    ],
    foods: ['A balanced diet and enough water'],
    exercises: ['twenty-20-20', 'near-far-focus', 'palming'],
    exerciseNote:
      'Eye exercises do not correct hyperopia or astigmatism. These are only for comfort and rest.',
    doctorSoon: [
      'Blurry vision that does not go away, or headaches with reading',
      'A child avoids reading, squints, or has an eye that turns',
      'You have never had an eye test, or it has been a long time',
    ],
    doctorUrgent: [],
  },
  {
    id: 'presbyopia',
    name: 'Presbyopia',
    tagline: 'Near focus getting harder with age',
    group: 'focus',
    overview:
      'Presbyopia is a normal change that usually starts in the early to mid 40s. The eye lens becomes less flexible, so focusing on close things gets harder. It is not a disease, and reading glasses or other lenses from an eye doctor are the usual solution.',
    signs: [
      'Holding phones, menus or books further away to read',
      'Small print looks blurry',
      'Needing brighter light for reading',
      'Tired eyes after close work',
    ],
    care: [
      'Have an eye test. The right reading glasses or lenses make a big difference.',
      'Use good light when you read.',
      'Increase text size on your phone and computer.',
      'Take breaks from close work.',
    ],
    foods: ['A balanced diet, plenty of colorful produce and water'],
    exercises: ['twenty-20-20', 'near-far-focus', 'blink-training', 'palming'],
    exerciseNote: 'Eye exercises do not reverse presbyopia. These are only for comfort and rest.',
    doctorSoon: [
      'Near vision is getting worse, or your reading glasses seem to need frequent changes',
      'You also notice other changes, like glare or cloudy vision',
    ],
    doctorUrgent: [],
  },
  {
    id: 'dry-eye',
    name: 'Dry eye',
    tagline: 'Gritty, burning or tired eyes',
    group: 'surface',
    overview:
      'Dry eye happens when your eyes do not make enough tears, or the tears evaporate too quickly. Screens, dry or windy air, air conditioning, contact lenses, some medicines and age can all contribute. Often it is mild, but it can be uncomfortable.',
    signs: [
      'A gritty, sandy or burning feeling',
      'Redness, or a stinging sensation',
      'Eyes that water (the eye sometimes over-reacts to dryness)',
      'Blur that clears when you blink',
      'Sensitivity to light',
    ],
    care: [
      'Blink fully and often, especially at a screen.',
      'Take regular screen breaks.',
      'Keep fans and air conditioning from blowing on your face. A humidifier can help in dry rooms.',
      'Avoid smoke and wear sunglasses outdoors in wind and sun.',
      'Ask a pharmacist or eye doctor which lubricating drops suit you, and how often to use them.',
      'A warm compress can be soothing. Use it only if your doctor agrees, and never if your eyes are infected or injured.',
    ],
    foods: [
      'Drink enough water through the day',
      'Foods with omega-3, like fish, walnuts and flaxseed. Research on omega-3 and dry eye is mixed, so ask your eye doctor.',
    ],
    exercises: ['blink-training', 'twenty-20-20', 'palming', 'warm-compress'],
    exerciseNote:
      'Skip the warm compress and palming if your eyes are red, painful or sticky. See a doctor instead.',
    doctorSoon: [
      'Symptoms last more than a couple of weeks',
      'You need drops many times a day',
      'Contact lenses have become uncomfortable',
      'You also have a very dry mouth or joint pain',
    ],
    doctorUrgent: ['Eye pain, or a whitish spot on the clear front of the eye'],
  },
]