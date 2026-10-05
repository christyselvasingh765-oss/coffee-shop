import { CoffeeItem, BrewPreset } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_coffee_pourover_1791194583312.jpg';
export const LATTE_IMAGE = '/src/assets/images/latte_art_ceramic_1791194597979.jpg';
export const BEANS_IMAGE = '/src/assets/images/coffee_beans_roastery_1791194614499.jpg';
export const PASTRY_IMAGE = '/src/assets/images/artisan_pastry_croissant_1791194629283.jpg';
export const CAFE_IMAGE = '/src/assets/images/cafe_interior_ambiance_1791194642622.jpg';

export const COFFEE_ITEMS: CoffeeItem[] = [
  // Espresso & Milk Drinks
  {
    id: 'flat-white',
    name: 'Equinox Velvet Flat White',
    category: 'espresso',
    subtitle: 'Double Ristretto & Microfoam',
    description: 'Double shot of our signature house blend folded through silky, micro-textured steamed milk with rich chocolate undertones.',
    price: 4.75,
    image: LATTE_IMAGE,
    popular: true,
    availableSizes: ['8oz', '12oz'],
    milkOptions: ['Whole Organic Milk', 'Oatly Barista Edition', 'House Almond Milk', 'No Milk (Piccolo)'],
  },
  {
    id: 'cortado',
    name: 'Cortado Clasico',
    category: 'espresso',
    subtitle: 'Equal parts espresso & textured milk',
    description: 'A 1:1 balance of bold espresso and steamed milk served in a faceted Gibraltar glass to highlight sweetness and body.',
    price: 4.25,
    popular: true,
    availableSizes: ['Single'],
    milkOptions: ['Whole Organic Milk', 'Oatly Barista Edition', 'House Almond Milk'],
  },
  {
    id: 'cardamom-latte',
    name: 'Nordic Cardamom Latte',
    category: 'espresso',
    subtitle: 'Cracked Green Cardamom & Brown Sugar',
    description: 'Espresso infused with house-steeped crushed cardamom pods, unrefined muscovado sugar, and velvety steamed milk.',
    price: 5.50,
    image: LATTE_IMAGE,
    popular: true,
    availableSizes: ['12oz', '16oz'],
    milkOptions: ['Whole Organic Milk', 'Oatly Barista Edition', 'House Almond Milk'],
  },
  {
    id: 'espresso-single-origin',
    name: 'Double Origin Espresso',
    category: 'espresso',
    subtitle: 'Rotating Single Lot Shot',
    description: 'Double extraction highlighting our seasonal micro-lot. Currently pulling Huila Pink Bourbon with bright guava acidity.',
    price: 3.75,
    availableSizes: ['Single'],
  },
  {
    id: 'cappuccino-traditional',
    name: 'Traditional 6oz Cappuccino',
    category: 'espresso',
    subtitle: 'Dense glossy foam cap',
    description: 'The Italian classic, pulled short with a thick glossy microfoam crown dusted lightly with Valrhona cocoa.',
    price: 4.50,
    availableSizes: ['8oz'],
    milkOptions: ['Whole Organic Milk', 'Oatly Barista Edition'],
  },

  // Filter & Pour Over
  {
    id: 'v60-chelchele',
    name: 'V60 Hand Brew: Yirgacheffe G1',
    category: 'filter',
    subtitle: 'Ethiopia · Washed Heirloom',
    description: 'Hand-poured on ceramic V60 dripper. Notes of crisp bergamot, sweet jasmine blossom, and candied lemon zest.',
    price: 5.75,
    image: HERO_IMAGE,
    popular: true,
    tastingNotes: ['Jasmine', 'Bergamot', 'Candied Lemon'],
    origin: 'Gedeo Zone, Ethiopia',
    process: 'Washed',
    altitude: '2,050m',
    scaScore: 89.2,
    availableSizes: ['12oz'],
  },
  {
    id: 'batch-brew',
    name: 'Morning Batch Filter',
    category: 'filter',
    subtitle: 'Freshly brewed every 30 minutes',
    description: 'Consistent, clean, and balanced daily filter coffee. Free refills inside the cafe with any pastry.',
    price: 3.50,
    availableSizes: ['12oz', '16oz'],
  },

  // Cold Coffee & Tonics
  {
    id: 'cascara-fizz',
    name: 'Cascara Coffee Cherry Sparkler',
    category: 'cold',
    subtitle: 'Dried Coffee Husks & Blood Orange',
    description: 'Refreshing sparkling iced infusion made with organic dried coffee cherries, fresh blood orange essence, and rosemary sprig.',
    price: 5.25,
    availableSizes: ['16oz'],
    dietary: ['Vegan', 'Antioxidant Rich'],
  },
  {
    id: 'nitro-cold-brew',
    name: '18-Hour Nitro Draft Cold Brew',
    category: 'cold',
    subtitle: 'Cold-steeped & nitrogen-infused',
    description: 'Steeped for 18 hours in cold filtered water and poured on nitrogen draft for a Guinness-like cascading foam head.',
    price: 4.95,
    popular: true,
    availableSizes: ['12oz', '16oz'],
  },
  {
    id: 'espresso-tonic',
    name: 'Fever-Tree Espresso Tonic',
    category: 'cold',
    subtitle: 'Fever-Tree Indian Tonic & Citrus',
    description: 'Double shot of washed Ethiopian espresso floated over chilled tonic water, ice, and an expressed grapefruit peel.',
    price: 5.50,
    availableSizes: ['12oz'],
  },

  // Whole Bean Bags (Roastery)
  {
    id: 'bean-chelchele',
    name: 'Ethiopia Yirgacheffe Chelchele G1',
    category: 'beans',
    subtitle: 'Whole Bean · 250g / 1kg',
    description: 'Exceptional floral clarity from smallholder farmers in the Gedeo zone. Sublime delicate acidity with lingering honey sweetness.',
    price: 19.50,
    image: BEANS_IMAGE,
    popular: true,
    origin: 'Yirgacheffe, Ethiopia',
    process: 'Washed Heirloom',
    altitude: '1,950 - 2,200 MASL',
    scaScore: 89.5,
    roastLevel: 'Light',
    tastingNotes: ['White Jasmine', 'Meyer Lemon', 'Wild Honey'],
    availableSizes: ['250g', '1kg'],
    grindOptions: ['Whole Bean', 'Espresso (Fine)', 'Pour Over / Aeropress (Medium)', 'French Press / Cold Brew (Coarse)'],
  },
  {
    id: 'bean-pink-bourbon',
    name: 'Colombia Huila Pink Bourbon',
    category: 'beans',
    subtitle: 'Whole Bean · 250g / 1kg',
    description: 'Rare Pink Bourbon varietal cultivated by Finca El Paraiso. Lush tropical fruit, pink guava, and creamy stone fruit sweetness.',
    price: 21.00,
    image: BEANS_IMAGE,
    popular: true,
    origin: 'Huila, Colombia',
    process: 'Double Anaerobic Honey',
    altitude: '1,800 MASL',
    scaScore: 90.0,
    roastLevel: 'Light-Medium',
    tastingNotes: ['Pink Guava', 'Blood Orange', 'Panela Sugar'],
    availableSizes: ['250g', '1kg'],
    grindOptions: ['Whole Bean', 'Espresso (Fine)', 'Pour Over / Aeropress (Medium)', 'French Press / Cold Brew (Coarse)'],
  },
  {
    id: 'bean-equinox-blend',
    name: 'The Equinox Signature House Blend',
    category: 'beans',
    subtitle: 'Whole Bean · 250g / 1kg',
    description: 'Our award-winning seasonal blend of washed Colombia and natural Brazil. Smooth, rich, and deeply satisfying with or without milk.',
    price: 17.50,
    image: BEANS_IMAGE,
    popular: true,
    origin: 'Colombia & Brazil Cerrado',
    process: 'Washed & Natural Blend',
    altitude: '1,200 - 1,750 MASL',
    scaScore: 87.5,
    roastLevel: 'Medium',
    tastingNotes: ['Dark Chocolate', 'Toasted Hazelnut', 'Caramel'],
    availableSizes: ['250g', '1kg'],
    grindOptions: ['Whole Bean', 'Espresso (Fine)', 'Pour Over / Aeropress (Medium)', 'French Press / Cold Brew (Coarse)'],
  },
  {
    id: 'bean-guatemala-antigua',
    name: 'Guatemala Antigua Finca Medina',
    category: 'beans',
    subtitle: 'Whole Bean · 250g / 1kg',
    description: 'Volcanic soil terroir brings remarkable complexity with spicy dark cocoa, crisp red apple, and caramelized brown sugar.',
    price: 18.50,
    image: BEANS_IMAGE,
    origin: 'Antigua Valley, Guatemala',
    process: 'Fully Washed',
    altitude: '1,600 MASL',
    scaScore: 88.0,
    roastLevel: 'Medium',
    tastingNotes: ['Dark Cocoa', 'Crisp Red Apple', 'Brown Sugar'],
    availableSizes: ['250g', '1kg'],
    grindOptions: ['Whole Bean', 'Espresso (Fine)', 'Pour Over / Aeropress (Medium)', 'French Press / Cold Brew (Coarse)'],
  },

  // Fresh Bakery & Fare
  {
    id: 'croissant-almond',
    name: 'Almond Frangipane Croissant',
    category: 'bakery',
    subtitle: 'Twice-baked & Flaked Almonds',
    description: 'Slow-fermented French butter pastry filled with rich almond cream, dusted with powdered sugar and toasted sliced almonds.',
    price: 5.25,
    image: PASTRY_IMAGE,
    popular: true,
    dietary: ['Vegetarian'],
  },
  {
    id: 'cardamom-bun',
    name: 'Kardemummabulle (Cardamom Bun)',
    category: 'bakery',
    subtitle: 'Swedish knotted brioche bun',
    description: 'Traditional Swedish braided bun layered with freshly stone-ground cardamom, brown butter, and pearl sugar pearls.',
    price: 4.85,
    image: PASTRY_IMAGE,
    popular: true,
    dietary: ['Vegetarian'],
  },
  {
    id: 'sourdough-tartine',
    name: 'Whipped Ricotta & Fig Tartine',
    category: 'bakery',
    subtitle: 'House Sourdough & Honeycomb',
    description: 'Thick toasted slice of naturally leavened country sourdough, house-whipped smoked ricotta, mission figs, and thyme wildflower honey.',
    price: 8.50,
    dietary: ['Vegetarian'],
  },
  {
    id: 'sea-salt-cookie',
    name: 'Smoked Sea Salt Rye Chocolate Cookie',
    category: 'bakery',
    subtitle: '70% Valrhona Dark Chocolate',
    description: 'Chewy dark rye chocolate cookie packed with melted chocolate pools and finished with Maldon smoked sea salt crystals.',
    price: 4.25,
    dietary: ['Vegetarian'],
  }
];

export const BREW_PRESETS: BrewPreset[] = [
  {
    id: 'v60',
    name: 'Hario V60 Pour Over',
    ratio: '1:16',
    ratioValue: 16,
    temp: '93°C / 200°F',
    grindSize: 'Medium-Fine (table salt)',
    defaultCoffeeGrams: 15,
    totalTimeSeconds: 180,
    steps: [
      { time: 0, instruction: 'Pre-wet filter with hot water and discard rinse water. Add freshly ground coffee and level bed.', targetWaterGrams: (g) => 0 },
      { time: 5, instruction: 'Bloom Pour: Pour 45g of water gently in spiral motion. Swirl lightly to saturate all grounds.', targetWaterGrams: (g) => g * 3 },
      { time: 45, instruction: 'First Main Pour: Pour steadily in circular motions until scale reads 150g. Keep water level steady.', targetWaterGrams: (g) => Math.round(g * 10) },
      { time: 90, instruction: 'Final Pour: Pour remaining water reaching total target. Give one gentle swirl to ensure flat bed.', targetWaterGrams: (g) => g * 16 },
      { time: 150, instruction: 'Draw Down: Allow water to filter completely through bed. Total brew finishes around 3:00.', targetWaterGrams: (g) => g * 16 },
    ]
  },
  {
    id: 'french-press',
    name: 'French Press (Immersion)',
    ratio: '1:15',
    ratioValue: 15,
    temp: '95°C / 203°F',
    grindSize: 'Coarse (sea salt crystals)',
    defaultCoffeeGrams: 30,
    totalTimeSeconds: 240,
    steps: [
      { time: 0, instruction: 'Add coarse coffee to preheated carafe. Pour all target water vigorously to submerge grounds.', targetWaterGrams: (g) => g * 15 },
      { time: 60, instruction: 'Place plunger lid on top without pressing down to retain heat.', targetWaterGrams: (g) => g * 15 },
      { time: 240, instruction: 'Break Crust: Stir surface grounds 3 times with spoon. Skim surface foam if desired.', targetWaterGrams: (g) => g * 15 },
      { time: 270, instruction: 'Slow Press: Gently lower plunger until just above coffee bed. Pour immediately into warm cups.', targetWaterGrams: (g) => g * 15 },
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted Method)',
    ratio: '1:13',
    ratioValue: 13,
    temp: '88°C / 190°F',
    grindSize: 'Fine-Medium (sand)',
    defaultCoffeeGrams: 16,
    totalTimeSeconds: 120,
    steps: [
      { time: 0, instruction: 'Invert AeroPress, add ground coffee. Pour target water briskly within 15 seconds.', targetWaterGrams: (g) => g * 13 },
      { time: 15, instruction: 'Stir 5 times with paddle to ensure complete saturation.', targetWaterGrams: (g) => g * 13 },
      { time: 60, instruction: 'Rinse paper filter in cap, screw cap firmly onto chamber, and carefully flip onto your server.', targetWaterGrams: (g) => g * 13 },
      { time: 80, instruction: 'Press down with steady, gentle forearm pressure for 30 seconds until first hissing sound.', targetWaterGrams: (g) => g * 13 },
    ]
  }
];

export const TASTE_QUIZ_QUESTIONS = [
  {
    id: 'method',
    question: 'How do you brew coffee at home?',
    options: [
      { label: 'Pour Over / Filter (V60, Chemex)', value: 'filter', hint: 'Highlights delicate florals, sweet fruits, and tea-like clarity' },
      { label: 'Espresso Machine or Moka Pot', value: 'espresso', hint: 'Requires rich crema, concentrated body, and low acidity' },
      { label: 'French Press or Cold Brew', value: 'immersion', hint: 'Benefits from robust sweetness, caramel, and chocolate depth' },
    ]
  },
  {
    id: 'flavor',
    question: 'What flavor profiles make you smile most?',
    options: [
      { label: 'Bright & Floral (Jasmine, Meyer Lemon, Bergamot)', value: 'floral' },
      { label: 'Exotic & Fruity (Pink Guava, Blood Orange, Honey)', value: 'fruity' },
      { label: 'Deep & Comforting (Dark Cocoa, Toasted Nut, Caramel)', value: 'chocolate' },
    ]
  },
  {
    id: 'roast',
    question: 'What roast philosophy do you lean towards?',
    options: [
      { label: 'Nordic Light Roast (Maximum terroir transparency)', value: 'light' },
      { label: 'Balanced Medium (Sweet, approachable, great with milk)', value: 'medium' },
    ]
  }
];
