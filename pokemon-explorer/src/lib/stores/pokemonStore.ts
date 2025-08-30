import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Pokemon, PokemonFilters, SortOption, FilterState } from '@/types';
import { calculateStatRanges } from '@/lib/utils/filters/statRanges';
import { SortDirection, SortField, StatName } from '@/types/enums';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/pagination';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

interface PokemonStore extends FilterState {
  pokemonList: Pokemon[];
  isLoading: boolean;
  error: string | null;
  originalStatRanges: PokemonFilters['stats'];
  pagination: PaginationState;

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

  // Pagination actions
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  resetPagination: () => void;

  // Modal actions
  openModal: (pokemonId: number) => void;
  closeModal: () => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
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

const initialPagination: PaginationState = {
  currentPage: 1,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  totalItems: 0,
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
      pagination: initialPagination,
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
          pagination: {
            ...state.pagination,
            totalItems: pokemon.length,
            currentPage: 1, // Reset to first page when new data is loaded
          },
        }));
      },
      setLoading: loading => set({ isLoading: loading }),
      setError: error => set({ error }),

      // Filter actions
      setSearch: search =>
        set(state => ({
          filters: { ...state.filters, search },
          pagination: { ...state.pagination, currentPage: 1 }, // Reset to first page on filter change
        })),

      setTypes: types =>
        set(state => ({
          filters: { ...state.filters, types },
          pagination: { ...state.pagination, currentPage: 1 },
        })),

      setGenerations: generations =>
        set(state => ({
          filters: { ...state.filters, generations },
          pagination: { ...state.pagination, currentPage: 1 },
        })),

      setAbilities: abilities =>
        set(state => ({
          filters: { ...state.filters, abilities },
          pagination: { ...state.pagination, currentPage: 1 },
        })),

      setStatRange: (statName, range) =>
        set(state => ({
          filters: {
            ...state.filters,
            stats: { ...state.filters.stats, [statName]: range },
          },
          pagination: { ...state.pagination, currentPage: 1 },
        })),

      clearFilters: () =>
        set(state => ({
          filters: {
            ...initialFilters,
            stats: state.originalStatRanges,
          },
          pagination: { ...state.pagination, currentPage: 1 },
        })),

      // Sort actions
      setSort: sort =>
        set(state => ({
          sort,
        })),

      // Pagination actions
      setCurrentPage: page => set(state => ({ pagination: { ...state.pagination, currentPage: page } })),
      setItemsPerPage: itemsPerPage => set(state => ({ pagination: { ...state.pagination, itemsPerPage } })),
      resetPagination: () => set(state => ({ pagination: { ...state.pagination, currentPage: 1 } })),

      // Modal actions
      openModal: pokemonId =>
        set(state => ({
          isModalOpen: true,
          selectedPokemon: state.pokemonList.find(p => p.id === pokemonId) || null,
        })),
      closeModal: () => set({ isModalOpen: false, selectedPokemon: null }),
      setSelectedPokemon: pokemon => set({ selectedPokemon: pokemon }),
    }),
    {
      name: 'pokemon-store',
    }
  )
);
