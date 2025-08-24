import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Pokemon, PokemonFilters, SortOption, FilterState } from '@/types';

interface PokemonStore extends FilterState {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setPokemonList: (pokemon: Pokemon[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Filter actions
  setSearch: (search: string) => void;
  setTypes: (types: string[]) => void;
  setGenerations: (generations: number[]) => void;
  setAbilities: (abilities: string[]) => void;
  setStatRange: (statName: string, range: [number, number]) => void;
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
    hp: [0, 255],
    attack: [0, 255],
    defense: [0, 255],
    speed: [0, 255],
    'special-attack': [0, 255],
    'special-defense': [0, 255],
  },
};

const initialSort: SortOption = {
  field: 'id',
  direction: 'asc',
};

export const usePokemonStore = create<PokemonStore>()(
  devtools(
    set => ({
      // Initial state
      pokemonList: [],
      isLoading: false,
      error: null,
      filters: initialFilters,
      sort: initialSort,
      isModalOpen: false,
      selectedPokemon: null,

      // Pokemon list actions
      setPokemonList: pokemon => set({ pokemonList: pokemon }),
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
        set({
          filters: initialFilters,
          sort: initialSort,
        }),

      // Sort actions
      setSort: sort => set({ sort }),

      // Modal actions
      openModal: pokemonId =>
        set({
          isModalOpen: true,
          selectedPokemon: pokemonId,
        }),

      closeModal: () =>
        set({
          isModalOpen: false,
          selectedPokemon: null,
        }),
    }),
    {
      name: 'pokemon-store',
    }
  )
);
