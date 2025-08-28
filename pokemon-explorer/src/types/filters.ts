export interface PokemonFilters {
  search: string;
  types: string[];
  generations: number[];
  abilities: string[];
  stats: {
    hp: [number, number];
    attack: [number, number];
    defense: [number, number];
    speed: [number, number];
    'special-attack': [number, number];
    'special-defense': [number, number];
  };
}

export interface SortOption {
  field: 'name' | 'id' | 'total-stats' | 'hp' | 'attack' | 'defense' | 'speed' | 'special-attack' | 'special-defense';
  direction: 'asc' | 'desc';
}

export interface FilterState {
  filters: PokemonFilters;
  sort: SortOption;
  isModalOpen: boolean;
  selectedPokemon: number | null;
}

export const STAT_NAMES = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
} as const;

// Type colors are now handled dynamically in src/lib/utils/typeColors.ts
// This ensures future types are automatically supported
