import { SortDirection, SortField, StatName } from '@/lib/constants/enums';
import { Pokemon } from '@/types';

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
  selectedPokemon: Pokemon | null;
}

export interface FilterItem {
  id: string | number;
  name: string;
  url?: string;
}
