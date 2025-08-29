import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Pokemon, PokemonFilters, SortOption, FilterState } from '@/types';
import { calculateStatRanges } from '@/lib/utils/filters/statRanges';
import { SortDirection, SortField, StatName } from '@/types/enums';

interface PokemonStore extends FilterState {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
  originalStatRanges: PokemonFilters['stats'];

  // Actions
  setPokemonList: (pokemon: Pokemon[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filter actions
  setSearch: (search: string) => void;
  setTypes: (types: string[]) => void;
  setGenerations: (generations: number[]) => void;
  setAbilities: (abilities: string[]) => void;
  setStatRange: (statName: StatName, range: [number, number]) => void;
  clearFilters: () => void;

  // Sort actions
  setSort: (sort: SortOption) => void;

  // Modal actions
  openModal: (pokemonId: number) => void;
  closeModal: () => void;
}

const initialFilters: PokemonFilters = {
  search: '',
  types: [],
  generations: [],
  abilities: [],
  stats: {
    [StatName.HP]: [0, 0],
    [StatName.ATTACK]: [0, 0],
    [StatName.DEFENSE]: [0, 0],
    [StatName.SPEED]: [0, 0],
    [StatName.SPECIAL_ATTACK]: [0, 0],
    [StatName.SPECIAL_DEFENSE]: [0, 0],
  },
};

const initialSort: SortOption = {
  field: SortField.ID,
  direction: SortDirection.ASC,
};

export const usePokemonStore = create<PokemonStore>()(
  devtools(
    set => ({
      // Initial state
      pokemonList: [],
      isLoading: false,
      error: null,
      filters: initialFilters,
      originalStatRanges: initialFilters.stats,
      sort: initialSort,
      isModalOpen: false,
      selectedPokemon: null,

      // Pokemon list actions
      setPokemonList: pokemon => {
        const statRanges = calculateStatRanges(pokemon);
        const calculatedStats = {
          [StatName.HP]: statRanges[StatName.HP] || [0, 0],
          [StatName.ATTACK]: statRanges[StatName.ATTACK] || [0, 0],
          [StatName.DEFENSE]: statRanges[StatName.DEFENSE] || [0, 0],
          [StatName.SPEED]: statRanges[StatName.SPEED] || [0, 0],
          [StatName.SPECIAL_ATTACK]: statRanges[StatName.SPECIAL_ATTACK] || [0, 0],
          [StatName.SPECIAL_DEFENSE]: statRanges[StatName.SPECIAL_DEFENSE] || [0, 0],
        };
        set(state => ({
          pokemonList: pokemon,
          originalStatRanges: calculatedStats,
          filters: {
            ...state.filters,
            stats: calculatedStats,
          },
        }));
      },
      setLoading: loading => set({ isLoading: loading }),
      setError: error => set({ error }),

      // Filter actions
      setSearch: search =>
        set(state => ({
          filters: { ...state.filters, search },
        })),

      setTypes: types =>
        set(state => ({
          filters: { ...state.filters, types },
        })),

      setGenerations: generations =>
        set(state => ({
          filters: { ...state.filters, generations },
        })),

      setAbilities: abilities =>
        set(state => ({
          filters: { ...state.filters, abilities },
        })),

      setStatRange: (statName, range) =>
        set(state => ({
          filters: {
            ...state.filters,
            stats: {
              ...state.filters.stats,
              [statName]: range,
            },
          },
        })),

      clearFilters: () =>
        set(state => ({
          filters: {
            ...initialFilters,
            stats: state.originalStatRanges,
          },
        })),

      // Sort actions
      setSort: sort => set({ sort }),

      // Modal actions
      openModal: pokemonId => set({ isModalOpen: true, selectedPokemon: pokemonId }),
      closeModal: () => set({ isModalOpen: false, selectedPokemon: null }),
    }),
    {
      name: 'pokemon-store',
    }
  )
);
