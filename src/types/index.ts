export type CategoryType = 'all' | 'espresso' | 'filter' | 'cold' | 'beans' | 'bakery';

export interface CoffeeItem {
  id: string;
  name: string;
  category: 'espresso' | 'filter' | 'cold' | 'beans' | 'bakery';
  subtitle: string;
  description: string;
  price: number;
  image?: string;
  tastingNotes?: string[];
  origin?: string;
  process?: string;
  altitude?: string;
  scaScore?: number;
  roastLevel?: 'Light' | 'Light-Medium' | 'Medium' | 'Medium-Dark';
  availableSizes?: ('8oz' | '12oz' | '16oz' | '250g' | '1kg' | 'Single')[];
  milkOptions?: string[];
  grindOptions?: string[];
  popular?: boolean;
  dietary?: string[];
}

export interface CartItem {
  cartId: string;
  item: CoffeeItem;
  quantity: number;
  size: string;
  milk?: string;
  grind?: string;
  isSubscription?: boolean;
  notes?: string;
  unitPrice: number;
}

export interface BrewPreset {
  id: string;
  name: string;
  ratio: string;
  ratioValue: number; // e.g. 16 for 1:16
  temp: string;
  grindSize: string;
  defaultCoffeeGrams: number;
  totalTimeSeconds: number;
  steps: {
    time: number; // seconds when this step starts
    instruction: string;
    targetWaterGrams: (coffeeGrams: number) => number;
  }[];
}
