import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PokemonFilters, SortOption } from '@/types';
import { SortDirection, SortField, StatName } from '@/types/enums';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/pagination';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface URLParams {
  page: number;
  itemsPerPage: number;
  search: string;
  types: string[];
  generations: number[];
  abilities: string[];
  stats: PokemonFilters['stats'];
  sortField: string;
  sortDirection: string;
}

interface URLStore {
  // URL state
  searchParams: URLSearchParams;
  isInitialized: boolean;

  // Actions
  initialize: (searchParams: URLSearchParams) => void;
  updateSearchParams: (params: Partial<URLParams>) => void;
  syncWithRouter: (router: AppRouterInstance) => void;
  parseFromURL: (searchParams: URLSearchParams) => URLParams;
  getFiltersFromURL: (searchParams: URLSearchParams) => PokemonFilters;
  getSortFromURL: (searchParams: URLSearchParams) => SortOption;
  getPaginationFromURL: (searchParams: URLSearchParams) => { page: number; itemsPerPage: number };
}

const parseStatsFromURL = (statsParam: string | null): PokemonFilters['stats'] => {
  if (!statsParam) {
    return {
      [StatName.HP]: [0, 0],
      [StatName.ATTACK]: [0, 0],
      [StatName.DEFENSE]: [0, 0],
      [StatName.SPEED]: [0, 0],
      [StatName.SPECIAL_ATTACK]: [0, 0],
      [StatName.SPECIAL_DEFENSE]: [0, 0],
    };
  }

  try {
    const stats = JSON.parse(statsParam);
    return {
      [StatName.HP]: stats.hp || [0, 0],
      [StatName.ATTACK]: stats.attack || [0, 0],
      [StatName.DEFENSE]: stats.defense || [0, 0],
      [StatName.SPEED]: stats.speed || [0, 0],
      [StatName.SPECIAL_ATTACK]: stats['special-attack'] || [0, 0],
      [StatName.SPECIAL_DEFENSE]: stats['special-defense'] || [0, 0],
    };
  } catch {
    return {
      [StatName.HP]: [0, 0],
      [StatName.ATTACK]: [0, 0],
      [StatName.DEFENSE]: [0, 0],
      [StatName.SPEED]: [0, 0],
      [StatName.SPECIAL_ATTACK]: [0, 0],
      [StatName.SPECIAL_DEFENSE]: [0, 0],
    };
  }
};

const serializeStatsForURL = (stats: PokemonFilters['stats']): string => {
  const serialized = {
    hp: stats[StatName.HP],
    attack: stats[StatName.ATTACK],
    defense: stats[StatName.DEFENSE],
    speed: stats[StatName.SPEED],
    'special-attack': stats[StatName.SPECIAL_ATTACK],
    'special-defense': stats[StatName.SPECIAL_DEFENSE],
  };
  return JSON.stringify(serialized);
};

export const useURLStore = create<URLStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      searchParams: new URLSearchParams(),
      isInitialized: false,

      // Actions
      initialize: (searchParams: URLSearchParams) => {
        set({ searchParams, isInitialized: true });
      },

      updateSearchParams: (params: Partial<URLParams>) => {
        const { searchParams } = get();
        const newSearchParams = new URLSearchParams(searchParams);

        // Update pagination
        if (params.page !== undefined) {
          newSearchParams.set('page', params.page.toString());
        }
        if (params.itemsPerPage !== undefined) {
          newSearchParams.set('itemsPerPage', params.itemsPerPage.toString());
        }

        // Update filters
        if (params.search !== undefined) {
          if (params.search) {
            newSearchParams.set('search', params.search);
          } else {
            newSearchParams.delete('search');
          }
        }
        if (params.types !== undefined) {
          if (params.types.length > 0) {
            newSearchParams.set('types', params.types.join(','));
          } else {
            newSearchParams.delete('types');
          }
        }
        if (params.generations !== undefined) {
          if (params.generations.length > 0) {
            newSearchParams.set('generations', params.generations.join(','));
          } else {
            newSearchParams.delete('generations');
          }
        }
        if (params.abilities !== undefined) {
          if (params.abilities.length > 0) {
            newSearchParams.set('abilities', params.abilities.join(','));
          } else {
            newSearchParams.delete('abilities');
          }
        }
        if (params.stats !== undefined) {
          const hasActiveStats = Object.values(params.stats).some(([min, max]) => min > 0 || max > 0);
          if (hasActiveStats) {
            newSearchParams.set('stats', serializeStatsForURL(params.stats));
          } else {
            newSearchParams.delete('stats');
          }
        }

        // Update sort
        if (params.sortField !== undefined) {
          newSearchParams.set('sortField', params.sortField);
        }
        if (params.sortDirection !== undefined) {
          newSearchParams.set('sortDirection', params.sortDirection);
        }

        set({ searchParams: newSearchParams });
      },

      syncWithRouter: (router: AppRouterInstance) => {
        const { searchParams } = get();
        const queryString = searchParams.toString();
        const url = queryString ? `?${queryString}` : '';
        router.push(url, { scroll: false });
      },

      parseFromURL: (searchParams: URLSearchParams): URLParams => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || DEFAULT_ITEMS_PER_PAGE.toString(), 10);
        const search = searchParams.get('search') || '';
        const types = searchParams.get('types')?.split(',').filter(Boolean) || [];
        const generations =
          searchParams
            .get('generations')
            ?.split(',')
            .map(Number)
            .filter(n => !isNaN(n)) || [];
        const abilities = searchParams.get('abilities')?.split(',').filter(Boolean) || [];
        const stats = parseStatsFromURL(searchParams.get('stats'));
        const sortField = searchParams.get('sortField') || 'id';
        const sortDirection = searchParams.get('sortDirection') || 'asc';

        return {
          page,
          itemsPerPage,
          search,
          types,
          generations,
          abilities,
          stats,
          sortField,
          sortDirection,
        };
      },

      getFiltersFromURL: (searchParams: URLSearchParams): PokemonFilters => {
        const { search, types, generations, abilities, stats } = get().parseFromURL(searchParams);
        return {
          search,
          types,
          generations,
          abilities,
          stats,
        };
      },

      getSortFromURL: (searchParams: URLSearchParams): SortOption => {
        const { sortField, sortDirection } = get().parseFromURL(searchParams);
        return {
          field: sortField as SortField,
          direction: sortDirection as SortDirection,
        };
      },

      getPaginationFromURL: (searchParams: URLSearchParams) => {
        const { page, itemsPerPage } = get().parseFromURL(searchParams);
        return { page, itemsPerPage };
      },
    }),
    {
      name: 'url-store',
    }
  )
);
