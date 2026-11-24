// General, educational information only. It is not medical or dietary advice.

export function matchesQuery(query: string, text: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true
  const haystack = text.toLowerCase()
  return words.every((word) => haystack.includes(word))
}

/* ---------- Nutrients ---------- */
export interface Nutrient {
  id: string
  name: string
  tagline: string
  about: string
  foods: string[]
  caution?: string
}

export const NUTRIENTS: Nutrient[] = [
  {
    id: 'lutein',
    name: 'Lutein',
    tagline: 'A yellow-green plant pigment',
    about:
      "Lutein gathers in the center of the retina, where it helps filter bright light. Eating foods rich in it is part of an eye-friendly diet.",
    foods: ['Spinach (palak)', 'Broccoli', 'Peas', 'Sweet corn', 'Egg yolk', 'Leafy greens'],
  },
  {
    id: 'zeaxanthin',
    name: 'Zeaxanthin',
    tagline: "Lutein's partner pigment",
    about:
      'Zeaxanthin travels with lutein in many foods. Both gather in the macula, the small central area of the retina that gives you sharp detail.',
    foods: ['Sweet corn', 'Orange and yellow capsicum', 'Egg yolk', 'Spinach (palak)', 'Peas'],
  },
  {
    id: 'vitamin-a',
    name: 'Vitamin A',
    tagline: 'For seeing in dim light and a healthy eye surface',
    about:
      'Your retina needs vitamin A to work in low light, and the clear front surface of the eye needs it to stay healthy. Orange and green plant foods give beta-carotene, which your body turns into vitamin A.',
    foods: ['Carrots', 'Papaya', 'Sweet potato', 'Ripe mango', 'Pumpkin', 'Spinach', 'Eggs', 'Milk and curd'],
    caution:
      'Get vitamin A from food. High-dose vitamin A supplements can be harmful, especially in pregnancy, so only take them if your doctor advises.',
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C',
    tagline: 'A gentle antioxidant',
    about:
      "Vitamin C supports the tiny blood vessels in your eyes and helps your body make collagen, part of the eye's structure. Your body does not store much, so enjoy some every day.",
    foods: ['Amla', 'Guava', 'Oranges and mosambi', 'Lemon', 'Capsicum', 'Tomato', 'Papaya', 'Strawberries'],
  },
  {
    id: 'vitamin-e',
    name: 'Vitamin E',
    tagline: 'A fat-soluble antioxidant',
    about:
      'Vitamin E helps protect cells, including those in the eye, from everyday wear. Nuts and seeds are the easiest sources.',
    foods: ['Almonds', 'Sunflower seeds', 'Peanuts (groundnuts)', 'Avocado', 'Whole grains'],
    caution: 'Skip any food you are allergic to, especially nuts and seeds.',
  },
  {
    id: 'omega3',
    name: 'Omega-3 fats',
    tagline: 'Healthy fats from fish, seeds and nuts',
    about:
      "Omega-3 fats are part of the structure of the eye's cells. Some people with dry eyes find them helpful, but research results are mixed, so ask your eye doctor what makes sense for you.",
    foods: ['Mackerel (bangda)', 'Sardines (mathi)', 'Salmon', 'Walnuts', 'Flaxseed (alsi)', 'Chia seeds'],
    caution:
      'Food first. If you take blood-thinning medicine or are thinking about fish-oil supplements, talk to your doctor before starting.',
  },
  {
    id: 'zinc',
    name: 'Zinc',
    tagline: 'A helper mineral',
    about:
      'Zinc helps vitamin A reach the retina and supports many of the eye’s natural processes. A varied diet usually provides enough.',
    foods: ['Dal (lentils)', 'Chickpeas (chana)', 'Pumpkin seeds', 'Cashews', 'Curd and milk', 'Eggs'],
    caution:
      'Very high-dose zinc supplements can cause problems. Only take them if your doctor advises.',
  },
  {
    id: 'hydration',
    name: 'Hydration',
    tagline: 'Water for the whole body',
    about:
      'Tears are mostly water. Drinking enough through the day supports your body’s natural tear production, along with blinking often and a comfortable room.',
    foods: ['Water', 'Buttermilk (chaas)', 'Coconut water', 'Cucumber', 'Watermelon', 'Oranges'],
  },
]

/* ---------- Foods ---------- */
export type Diet = 'vegan' | 'vegetarian' | 'eggs' | 'nonveg'

export const DIET_LABEL: Record<Diet, string> = {
  vegan: 'Vegan',
  vegetarian: 'Vegetarian',
  eggs: 'Contains egg',
  nonveg: 'Non-veg',
}

export interface Food {
  id: string
  name: string
  diet: Diet
  gives: string[]
  note: string
}

export const FOODS: Food[] = [
  {
    id: 'palak',
    name: 'Spinach (palak)',
    diet: 'vegan',
    gives: ['Lutein', 'Zeaxanthin', 'Vitamin A'],
    note: 'Try palak dal, palak paratha or a simple stir-fry.',
  },
  {
    id: 'amaranth',
    name: 'Amaranth leaves (thotakura)',
    diet: 'vegan',
    gives: ['Vitamin A', 'Vitamin C'],
    note: 'Also called chaulai or harive soppu. Cook it with dal or as a light fry.',
  },
  {
    id: 'carrot',
    name: 'Carrots',
    diet: 'vegan',
    gives: ['Vitamin A'],
    note: 'Raw in salads, in a sabzi, or as a crunchy snack.',
  },
  {
    id: 'papaya',
    name: 'Papaya',
    diet: 'vegan',
    gives: ['Vitamin A', 'Vitamin C'],
    note: 'Ripe papaya is lovely in the morning or as an evening snack.',
  },
  {
    id: 'guava',
    name: 'Guava',
    diet: 'vegan',
    gives: ['Vitamin C'],
    note: 'Eat it whole, with the skin, as an easy snack.',
  },
  {
    id: 'amla',
    name: 'Amla (Indian gooseberry)',
    diet: 'vegan',
    gives: ['Vitamin C'],
    note: 'Fresh, in chutney, or lightly salted. Sugary amla candy and murabba are high in sugar.',
  },
  {
    id: 'citrus',
    name: 'Oranges, mosambi and lemon',
    diet: 'vegan',
    gives: ['Vitamin C'],
    note: 'Eat the fruit, or squeeze lemon over salad and dal.',
  },
  {
    id: 'sweet-potato',
    name: 'Sweet potato (shakarkandi)',
    diet: 'vegan',
    gives: ['Vitamin A'],
    note: 'Boiled or roasted, with a little chaat masala.',
  },
  {
    id: 'mango',
    name: 'Ripe mango',
    diet: 'vegan',
    gives: ['Vitamin A', 'Vitamin C'],
    note: 'Sweet and seasonal. Enjoy a modest portion, especially if you watch your blood sugar.',
  },
  {
    id: 'eggs',
    name: 'Eggs',
    diet: 'eggs',
    gives: ['Lutein', 'Zeaxanthin', 'Zinc', 'Vitamin A'],
    note: 'Boiled, as bhurji, or as an omelette with greens.',
  },
  {
    id: 'dal',
    name: 'Dal (toor, moong, masoor)',
    diet: 'vegan',
    gives: ['Zinc'],
    note: 'Add greens like palak or thotakura to your dal for an extra boost.',
  },
  {
    id: 'chana',
    name: 'Chickpeas (chana)',
    diet: 'vegan',
    gives: ['Zinc'],
    note: 'Roasted chana, chana masala or a sprouted chana salad.',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    diet: 'vegan',
    gives: ['Vitamin E'],
    note: 'A small handful, soaked or plain. Skip if you have a nut allergy.',
  },
  {
    id: 'peanuts',
    name: 'Peanuts (groundnuts)',
    diet: 'vegan',
    gives: ['Vitamin E'],
    note: 'An affordable choice. Roasted, in poha, or in chutney. Skip if you are allergic.',
  },
  {
    id: 'walnuts',
    name: 'Walnuts',
    diet: 'vegan',
    gives: ['Omega-3'],
    note: 'A few a day. They give the plant form of omega-3. Skip if you have a nut allergy.',
  },
  {
    id: 'flax',
    name: 'Flaxseed (alsi) and chia',
    diet: 'vegan',
    gives: ['Omega-3'],
    note: 'Sprinkle ground flaxseed or soaked chia on oats, curd or smoothies.',
  },
  {
    id: 'pumpkin-seeds',
    name: 'Pumpkin seeds',
    diet: 'vegan',
    gives: ['Zinc', 'Vitamin E'],
    note: 'Sprinkle on salads, or roast them lightly.',
  },
  {
    id: 'fish',
    name: 'Fatty fish (mackerel, sardine, salmon)',
    diet: 'nonveg',
    gives: ['Omega-3'],
    note: 'Mackerel (bangda) and sardine (mathi) are popular. Grill, bake or curry rather than deep-fry.',
  },
  {
    id: 'corn',
    name: 'Sweet corn',
    diet: 'vegan',
    gives: ['Lutein', 'Zeaxanthin'],
    note: 'Boiled, roasted, or in a vegetable soup.',
  },
  {
    id: 'capsicum',
    name: 'Colored capsicum',
    diet: 'vegan',
    gives: ['Vitamin C', 'Zeaxanthin'],
    note: 'Red, yellow and orange ones are colorful and sweet. Raw in salad or lightly stir-fried.',
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    diet: 'vegan',
    gives: ['Lutein', 'Vitamin C'],
    note: 'Steam it lightly or add to a stir-fry.',
  },
  {
    id: 'curd',
    name: 'Curd and buttermilk (chaas)',
    diet: 'vegetarian',
    gives: ['Zinc', 'Hydration'],
    note: 'Plain curd, or chaas with roasted cumin. Choose unsweetened.',
  },
  {
    id: 'coconut-water',
    name: 'Coconut water',
    diet: 'vegan',
    gives: ['Hydration'],
    note: 'A refreshing change from sugary drinks, especially in the heat. Choose plain, unsweetened.',
  },
  {
    id: 'cucumber',
    name: 'Cucumber and watermelon',
    diet: 'vegan',
    gives: ['Hydration'],
    note: 'Water-rich foods that add to your daily fluids.',
  },
]

/* ---------- Foods and habits to limit ---------- */
export interface LimitItem {
  id: string
  name: string
  why: string
}

export const LIMITS: LimitItem[] = [
  {
    id: 'sugar',
    name: 'Sugary drinks and sweets',
    why: 'Frequent sugar spikes are hard on your body. Steady blood sugar matters for eye health, especially if you have diabetes or it runs in your family.',
  },
  {
    id: 'fried',
    name: 'Deep-fried and packaged snacks',
    why: 'They are often high in unhealthy fats and salt. Choose roasted or baked snacks more often.',
  },
  {
    id: 'salt',
    name: 'Too much salt',
    why: 'Pickles, papad, chips and instant noodles add up. High blood pressure can strain the tiny blood vessels in your eyes.',
  },
  {
    id: 'alcohol',
    name: 'Heavy alcohol',
    why: 'Heavy drinking is linked to poorer overall and eye health. If you drink, keep it modest.',
  },
  {
    id: 'tobacco',
    name: 'Tobacco and smoking',
    why: 'Not a food, but important: smoking is linked to a higher risk of cataracts and macular degeneration. Support is available if you want to quit.',
  },
  {
    id: 'caffeine',
    name: 'Too much caffeine, late in the day',
    why: 'Energy drinks and late coffee can disturb sleep, and tired eyes often follow a short night.',
  },
]

/* ---------- Meal plans ---------- */
export interface Meal {
  when: string
  what: string
}

export interface MealPlan {
  id: string
  name: string
  tagline: string
  meals: Meal[]
  tip: string
  grocery: string[]
}

export const MEAL_PLANS: MealPlan[] = [
  {
    id: 'vegetarian',
    name: 'Vegetarian day',
    tagline: 'Greens, dal, curd and colorful fruit.',
    meals: [
      { when: 'Breakfast', what: 'Palak paratha with plain curd, and an orange.' },
      { when: 'Mid-morning', what: 'A guava, eaten with the skin.' },
      {
        when: 'Lunch',
        what: 'Dal, carrot and beans sabzi, roti or rice, and a cucumber-tomato salad with lemon.',
      },
      { when: 'Evening snack', what: 'Roasted chana, a few almonds and a glass of chaas.' },
      { when: 'Dinner', what: 'Moong dal khichdi with peas, and sautéed amaranth leaves (thotakura).' },
    ],
    tip: 'Squeeze lemon over dal and greens. It adds flavor and a little vitamin C.',
    grocery: [
      'Spinach (palak)',
      'Amaranth leaves (thotakura)',
      'Carrots',
      'Green beans',
      'Peas',
      'Guava',
      'Oranges',
      'Lemons',
      'Cucumber',
      'Tomatoes',
      'Plain curd',
      'Dal (toor and moong)',
      'Roasted chana',
      'Almonds',
      'Wheat flour',
      'Rice',
    ],
  },
  {
    id: 'nonveg',
    name: 'Non-vegetarian day',
    tagline: 'Fish, eggs and plenty of vegetables.',
    meals: [
      { when: 'Breakfast', what: 'Vegetable omelette with spinach, whole wheat toast, and papaya.' },
      { when: 'Mid-morning', what: 'A few walnuts and an orange.' },
      { when: 'Lunch', what: 'Fish curry (mackerel or sardine), rice, dal, and a carrot-cucumber salad.' },
      { when: 'Evening snack', what: 'A boiled egg or sprouts chaat with lemon, and coconut water.' },
      { when: 'Dinner', what: 'Chicken and vegetable stew with roti, and sautéed colored capsicum.' },
    ],
    tip: 'Grill, bake or curry fish instead of deep-frying it.',
    grocery: [
      'Eggs',
      'Spinach (palak)',
      'Whole wheat bread',
      'Papaya',
      'Walnuts',
      'Oranges',
      'Fish (mackerel or sardine)',
      'Rice',
      'Dal',
      'Carrots',
      'Cucumber',
      'Sprouts',
      'Lemons',
      'Coconut water',
      'Chicken',
      'Mixed vegetables',
      'Colored capsicum',
      'Wheat flour',
    ],
  },
  {
    id: 'vegan',
    name: 'Vegan day',
    tagline: 'All plant-based, with seeds for omega-3 and zinc.',
    meals: [
      { when: 'Breakfast', what: 'Oats porridge with chia or flaxseed, a few walnuts, and papaya.' },
      { when: 'Mid-morning', what: 'Guava with a spoon of pumpkin seeds.' },
      { when: 'Lunch', what: 'Chana masala, brown rice, palak sabzi, and a raw carrot salad.' },
      { when: 'Evening snack', what: 'Coconut water and a few almonds.' },
      { when: 'Dinner', what: 'Mixed dal with amaranth leaves, roti, and stir-fried colored capsicum.' },
    ],
    tip: 'Flaxseed, chia and walnuts are your plant sources of omega-3. Ask a doctor or dietitian whether you need anything extra.',
    grocery: [
      'Oats',
      'Chia seeds or flaxseed (alsi)',
      'Walnuts',
      'Papaya',
      'Guava',
      'Pumpkin seeds',
      'Chickpeas (chana)',
      'Brown rice',
      'Spinach (palak)',
      'Carrots',
      'Coconut water',
      'Almonds',
      'Dal',
      'Amaranth leaves (thotakura)',
      'Wheat flour',
      'Colored capsicum',
    ],
  },
  {
    id: 'budget',
    name: 'Budget day',
    tagline: 'Simple, seasonal and kind to your wallet.',
    meals: [
      { when: 'Breakfast', what: 'Poha with peas and roasted groundnuts, with a squeeze of lemon.' },
      { when: 'Mid-morning', what: 'Seasonal fruit: guava, papaya or orange, whichever is cheapest.' },
      { when: 'Lunch', what: 'Dal, rice, a local leafy green (palak or thotakura) and a carrot salad.' },
      { when: 'Evening snack', what: 'Roasted chana or groundnuts, and a glass of chaas.' },
      { when: 'Dinner', what: 'Roti with egg curry or chana curry, and a simple salad.' },
    ],
    tip: 'Seasonal produce is cheapest and freshest. Frozen peas, local greens, dal, chana, groundnuts and eggs are affordable and nutritious.',
    grocery: [
      'Poha',
      'Green peas (fresh or frozen)',
      'Groundnuts',
      'Lemons',
      'Seasonal fruit (guava, papaya, orange)',
      'Dal',
      'Rice',
      'Leafy greens (palak or thotakura)',
      'Carrots',
      'Roasted chana',
      'Curd (for chaas)',
            'Wheat flour',
      'Eggs or chana',
      'Onions and tomatoes',
    ],
  },
]

/* ---------- Daily Eye Plate ---------- */
export interface PlateItem {
  id: string
  name: string
  examples: string
}

export const EYE_PLATE: PlateItem[] = [
  { id: 'greens', name: 'Leafy greens', examples: 'Palak, thotakura, methi, kale' },
  { id: 'orange', name: 'Orange and yellow produce', examples: 'Carrot, papaya, pumpkin, sweet potato, mango' },
  { id: 'vitc', name: 'A vitamin C fruit', examples: 'Amla, guava, orange, lemon, capsicum' },
  { id: 'protein', name: 'Protein', examples: 'Dal, chana, eggs, fish, curd' },
  { id: 'omega', name: 'An omega-3 source', examples: 'Walnuts, flaxseed, chia, fatty fish' },
  { id: 'nuts', name: 'A small handful of nuts or seeds', examples: 'Almonds, groundnuts, pumpkin seeds' },
  { id: 'grains', name: 'Whole grains', examples: 'Roti, millets, brown rice, oats' },
]

/* ---------- Hydration ---------- */
export const HYDRATION_TIPS: string[] = [
  'Keep a bottle where you can see it, like next to your screen.',
  'Sip through the day instead of drinking a lot at once.',
  'Water, chaas, coconut water and water-rich fruits like watermelon and cucumber all help.',
  'Pair a glass of water with each 20-20-20 break.',
  'Pale yellow urine usually means you are drinking enough.',
  'In hot weather, or when you exercise, you may need more.',
]