import type { Condition } from './conditionTypes'

// General, educational information only. It is not medical advice.
export const CONDITIONS_B: Condition[] = [
  {
    id: 'allergic-eye',
    name: 'Allergic eye irritation',
    tagline: 'Itchy, watery eyes from pollen, dust or pets',
    group: 'surface',
    overview:
      'Allergies can make the eyes itchy, red and watery. Pollen, dust, pet dander and mould are common triggers. It usually affects both eyes and often comes with sneezing or a runny nose. It is not infectious.',
    signs: [
      'Itching, usually the main sign',
      'Red, watery eyes in both eyes',
      'Mild puffiness of the eyelids',
      'Clear, stringy discharge',
      'Sneezing or a runny nose',
    ],
    care: [
      'Try not to rub your eyes. It makes the itch worse.',
      'A cool, clean, damp cloth over closed eyes can feel soothing.',
      'Wash your hands and face after being outdoors, and wash bedding often.',
      'Keep windows closed on high-pollen days and wear sunglasses outdoors.',
      'Take out contact lenses while your eyes are irritated.',
      'Ask a pharmacist or doctor about allergy eye drops. Do not use steroid drops unless a doctor prescribes them.',
    ],
    foods: ['Water, and a balanced diet. No food is known to cure eye allergies.'],
    exercises: ['twenty-20-20', 'box-breathing'],
    exerciseNote:
      'Skip eye massage, palming and the warm compress while your eyes are itchy or irritated. Touching them can make it worse.',
    doctorSoon: [
      'Symptoms are constant or keep returning',
      'You need drops every day',
      'The itch is severe, or you wear contact lenses and your eyes are sore',
    ],
    doctorUrgent: [
      'Swelling of the face, lips or tongue, or trouble breathing (call emergency services)',
    ],
  },
  {
    id: 'conjunctivitis',
    name: 'Conjunctivitis (pink eye)',
    tagline: 'A red, sticky or gritty eye that can spread',
    group: 'surface',
    overview:
      'Conjunctivitis is inflammation of the thin clear layer over the white of the eye. It can be caused by a virus, bacteria, allergies or irritants. Viral and bacterial types spread easily from person to person, so hygiene matters. Only a doctor can tell which type you have.',
    signs: [
      'A pink or red eye',
      'A gritty or sandy feeling',
      'Watery or sticky discharge, sometimes yellow',
      'Crusty eyelids, especially after waking',
      'It may start in one eye and spread to the other',
    ],
    care: [
      'Wash your hands often and avoid touching or rubbing your eyes.',
      'Do not share towels, pillowcases or eye makeup. Change pillowcases often.',
      'Wipe away discharge with a clean, damp tissue or cloth, and throw it away after one use.',
      'Stop wearing contact lenses until a doctor says it is fine.',
      'Do not use leftover antibiotic drops. Ask a doctor first.',
      'Ask your doctor or school about when it is safe to return.',
    ],
    foods: ['Water and a balanced diet, so your body can recover'],
    exercises: ['box-breathing'],
    exerciseNote:
      'Skip eye massage, palming and the warm compress while your eyes are red or sticky. Wait until a doctor says your eyes have recovered.',
    doctorSoon: [
      'A lot of yellow or green discharge',
      'You wear contact lenses',
      'Symptoms last more than a week, or you have a weakened immune system',
      'A newborn baby has red or sticky eyes (see a doctor the same day)',
    ],
    doctorUrgent: [
      'Eye pain, strong sensitivity to light, or blurry vision that does not clear when you blink',
    ],
  },
  {
    id: 'cataracts',
    name: 'Cataracts',
    tagline: 'Clouding of the eye lens',
    group: 'longterm',
    overview:
      'A cataract is a clouding of the eye lens. Most cataracts develop slowly with age, and they are very common. When they affect daily life, an eye doctor can talk about surgery, which is widely used and often very effective. No food, exercise or eye drop is proven to remove a cataract.',
    signs: [
      'Cloudy, hazy or dim vision',
      'Glare or halos around lights, especially at night',
      'Colors that look faded or yellowish',
      'Needing brighter light to read, or frequent changes of glasses',
      'Double vision in one eye',
    ],
    care: [
      'Have regular eye checks, especially after about 40 to 50.',
      'Wear sunglasses that block UV light outdoors.',
      'Do not smoke. Smoking is linked to a higher cataract risk.',
      'Keep diabetes and blood pressure in check, as your doctor advises.',
      'Use good lighting, and take extra care driving at night.',
      'Talk to your eye doctor about when surgery might be right for you.',
    ],
    foods: [
      'A varied diet with fruit and vegetables supports general eye health, but food cannot remove a cataract',
    ],
    exercises: ['twenty-20-20', 'box-breathing', 'palming'],
    exerciseNote:
      'These exercises are only for comfort and relaxation. They do not prevent, remove or treat cataracts.',
    doctorSoon: [
      'Vision is becoming cloudy or dim, or glare is bothering you',
      'Vision problems are getting in the way of reading, driving or daily tasks',
      'You notice any gradual change in vision',
    ],
    doctorUrgent: [],
  },
  {
    id: 'glaucoma',
    name: 'Glaucoma',
    tagline: 'Silent damage to the optic nerve',
    group: 'longterm',
    overview:
      'Glaucoma is a group of conditions that damage the optic nerve, often linked to pressure inside the eye. In the common type there are usually no early symptoms. Vision loss starts at the edges and you may not notice until it is advanced. Lost vision cannot be restored, but treatment can slow or stop further loss, so regular eye checks matter.',
    signs: [
      'Usually none early on, which is why checks matter',
      'Slowly shrinking side vision later on',
      'Sudden type (an emergency): severe eye pain, headache, nausea, halos around lights, blurry vision and a red eye',
    ],
    care: [
      'Have regular eye checks, especially if you are over 40, have a family history of glaucoma, have diabetes, or are very short- or long-sighted.',
      'If you are prescribed drops, use them exactly as directed and do not stop on your own.',
      'Keep every follow-up appointment.',
      'Never press on your eyes.',
      'Ask your eye doctor whether any exercise, yoga positions (especially head-down ones) or heavy straining are suitable for you.',
    ],
    foods: [
      'A healthy, balanced diet and enough water support your whole body. No food replaces glaucoma treatment.',
    ],
    exercises: ['twenty-20-20', 'box-breathing'],
    exerciseNote:
      'These are only for comfort and relaxation. They do not lower eye pressure or treat glaucoma. Avoid eye massage and anything that presses on your eyes.',
    doctorSoon: [
      'You are over 40, or have a family history, and have not had a recent full eye check',
      'You notice patches or gaps in your side vision',
      'You have diabetes, or are very short- or long-sighted, and are not having regular checks',
    ],
    doctorUrgent: [
      'Severe eye pain with headache, nausea or vomiting, halos around lights and a red eye (go to emergency care immediately)',
    ],
  },
  {
    id: 'macular-degeneration',
    name: 'Macular degeneration',
    tagline: 'Changes to sharp central vision',
    group: 'longterm',
    overview:
      'Age-related macular degeneration (AMD) affects the macula, the small central part of the retina that gives you sharp detail for reading and faces. It mostly affects people over 50. There is a slower "dry" form and a "wet" form that can worsen quickly and needs prompt treatment. There is no cure, but treatments can slow it, and early care helps.',
    signs: [
      'Straight lines look wavy or bent',
      'A blurry, dark or empty patch in the center of your vision',
      'Colors look dull or faded',
      'Trouble reading or recognizing faces',
    ],
    care: [
      'Have regular eye checks, especially after 50.',
      'If you have been diagnosed, ask your doctor about checking your central vision at home, for example with an Amsler grid.',
      'Do not smoke. Smoking raises the risk.',
      'Wear UV-blocking sunglasses outdoors.',
      'Eat a healthy diet with leafy greens and fish, and keep blood pressure and weight healthy.',
      'Only take supplements if your eye doctor recommends a specific one for your stage.',
    ],
    foods: [
      'Leafy greens, colorful vegetables and fish are part of an eye-friendly diet, but food cannot cure macular degeneration',
    ],
    exercises: ['twenty-20-20', 'box-breathing'],
    exerciseNote:
      'These are only for comfort and relaxation. They do not prevent or treat macular degeneration.',
    doctorSoon: [
      'You are over 50 and have not had a recent eye check',
      'You notice any blur or dark patch in your central vision',
    ],
    doctorUrgent: [
      'Straight lines suddenly look wavy, or your central vision suddenly worsens. See an eye doctor right away, because quick treatment can matter.',
    ],
  },
  {
    id: 'diabetic-eye',
    name: 'Diabetic eye care',
    tagline: 'Protecting your eyes when you live with diabetes',
    group: 'longterm',
    overview:
      'Over time, high blood sugar can damage the tiny blood vessels in the retina, called diabetic retinopathy. It often causes no symptoms at first. Diabetes also raises the chance of cataracts and glaucoma. Regular eye checks and good diabetes care can prevent most serious vision loss.',
    signs: [
      'Often none at the start, which is why yearly checks matter',
      'Blurry or changing vision',
      'Dark spots, floaters or gaps in your vision',
      'Trouble seeing at night',
    ],
    care: [
      'Have a dilated eye exam at least once a year, or as often as your eye doctor says.',
      'Keep blood sugar, blood pressure and cholesterol in the range your doctor sets.',
      'Take your medicines as prescribed and keep your appointments.',
      'Do not smoke.',
      'Tell your doctor about any changes in your vision, even small ones.',
      'If you are pregnant with diabetes, ask about extra eye checks.',
    ],
    foods: [
      'Vegetables, whole grains, dal, and fiber-rich foods suit many people with diabetes. Ask your doctor or dietitian for a plan that is right for you.',
      'Go easy on sugary drinks and sweets.',
    ],
    exercises: ['twenty-20-20', 'box-breathing', 'palming'],
    exerciseNote:
      'These are only for comfort and relaxation. They do not prevent or treat diabetic eye disease.',
    doctorSoon: [
      'You have diabetes and have not had a dilated eye exam this year',
      'Your vision is blurry, or changes from day to day',
      'You notice new floaters or dark spots',
    ],
    doctorUrgent: [
      'A sudden shower of floaters, dark or red clouding of vision, or a curtain over your vision',
    ],
  },
]