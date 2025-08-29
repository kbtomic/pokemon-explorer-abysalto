import { SortDirection, SortField, StatName } from './enums';

export interface PokemonFilters {
  search: string;
  types: string[];
  generations: number[];
  abilities: string[];
  stats: {
    [StatName.HP]: [number, number];
    [StatName.ATTACK]: [number, number];
    [StatName.DEFENSE]: [number, number];
    [StatName.SPEED]: [number, number];
    [StatName.SPECIAL_ATTACK]: [number, number];
    [StatName.SPECIAL_DEFENSE]: [number, number];
  };
}

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

export interface FilterState {
  filters: PokemonFilters;
  sort: SortOption;
  isModalOpen: boolean;
  selectedPokemon: number | null;
}

export interface FilterItem {
  id: string | number;
  name: string;
  url?: string;
}

export const STAT_NAMES = {
  [StatName.HP]: 'HP',
  [StatName.ATTACK]: 'Attack',
  [StatName.DEFENSE]: 'Defense',
  [StatName.SPEED]: 'Speed',
  [StatName.SPECIAL_ATTACK]: 'Sp. Atk',
  [StatName.SPECIAL_DEFENSE]: 'Sp. Def',
};
