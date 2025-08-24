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
  field:
    | 'name'
    | 'id'
    | 'total-stats'
    | 'hp'
    | 'attack'
    | 'defense'
    | 'speed'
    | 'special-attack'
    | 'special-defense';
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

export const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
} as const;

export type PokemonTypeName = keyof typeof TYPE_COLORS;
