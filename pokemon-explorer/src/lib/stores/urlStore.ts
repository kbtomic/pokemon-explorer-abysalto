import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PokemonFilters, SortOption } from '@/types/ui/filters';
import { SortDirection, SortField } from '@/lib/constants/pokemon/sorting';
import { StatName } from '@/lib/constants/pokemon/stats';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/api/pagination';
import { URL_PARAMS } from '@/lib/constants/api/urlParams';
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
      [StatName.HP]: [0, 0] as [number, number],
      [StatName.ATTACK]: [0, 0] as [number, number],
      [StatName.DEFENSE]: [0, 0] as [number, number],
      [StatName.SPEED]: [0, 0] as [number, number],
      [StatName.SPECIAL_ATTACK]: [0, 0] as [number, number],
      [StatName.SPECIAL_DEFENSE]: [0, 0] as [number, number],
    };
  }

  const defaultStats = {
    [StatName.HP]: [0, 0] as [number, number],
    [StatName.ATTACK]: [0, 0] as [number, number],
    [StatName.DEFENSE]: [0, 0] as [number, number],
    [StatName.SPEED]: [0, 0] as [number, number],
    [StatName.SPECIAL_ATTACK]: [0, 0] as [number, number],
    [StatName.SPECIAL_DEFENSE]: [0, 0] as [number, number],
  };

  try {
    // Parse stats in format: "hp:1-255,attack:50-150"
    const statEntries = statsParam.split(',');

    statEntries.forEach(entry => {
      const [statName, range] = entry.split(':');
      if (range) {
        const [min, max] = range.split('-').map(Number);
        if (!isNaN(min) && !isNaN(max) && statName in defaultStats) {
          defaultStats[statName as StatName] = [min, max] as [number, number];
        }
      }
    });

    return defaultStats;
  } catch {
    return defaultStats;
  }
};

const serializeStatsForURL = (stats: PokemonFilters['stats']): string => {
  const activeStats: string[] = [];

  Object.entries(stats).forEach(([statName, [min, max]]) => {
    if (min > 0 || max > 0) {
      activeStats.push(`${statName}:${min}-${max}`);
    }
  });

  return activeStats.join(',');
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
          newSearchParams.set(URL_PARAMS.PAGE, params.page.toString());
        }
        if (params.itemsPerPage !== undefined) {
          newSearchParams.set(URL_PARAMS.ITEMS_PER_PAGE, params.itemsPerPage.toString());
        }

        // Update filters
        if (params.search !== undefined) {
          if (params.search) {
            newSearchParams.set(URL_PARAMS.SEARCH, params.search);
          } else {
            newSearchParams.delete(URL_PARAMS.SEARCH);
          }
        }
        if (params.types !== undefined) {
          if (params.types.length > 0) {
            newSearchParams.set(URL_PARAMS.TYPES, params.types.join(','));
          } else {
            newSearchParams.delete(URL_PARAMS.TYPES);
          }
        }
        if (params.generations !== undefined) {
          if (params.generations.length > 0) {
            newSearchParams.set(URL_PARAMS.GENERATIONS, params.generations.join(','));
          } else {
            newSearchParams.delete(URL_PARAMS.GENERATIONS);
          }
        }
        if (params.abilities !== undefined) {
          if (params.abilities.length > 0) {
            newSearchParams.set(URL_PARAMS.ABILITIES, params.abilities.join(','));
          } else {
            newSearchParams.delete(URL_PARAMS.ABILITIES);
          }
        }
        if (params.stats !== undefined) {
          const hasActiveStats = Object.values(params.stats).some(([min, max]) => min > 0 || max > 0);
          if (hasActiveStats) {
            newSearchParams.set(URL_PARAMS.STATS, serializeStatsForURL(params.stats));
          } else {
            newSearchParams.delete(URL_PARAMS.STATS);
          }
        }

        // Update sort
        if (params.sortField !== undefined) {
          newSearchParams.set(URL_PARAMS.SORT_FIELD, params.sortField);
        }
        if (params.sortDirection !== undefined) {
          newSearchParams.set(URL_PARAMS.SORT_DIRECTION, params.sortDirection);
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
        const page = parseInt(searchParams.get(URL_PARAMS.PAGE) || '1', 10);
        const itemsPerPage = parseInt(searchParams.get(URL_PARAMS.ITEMS_PER_PAGE) || DEFAULT_ITEMS_PER_PAGE.toString(), 10);
        const search = searchParams.get(URL_PARAMS.SEARCH) || '';
        const types = searchParams.get(URL_PARAMS.TYPES)?.split(',').filter(Boolean) || [];
        const generations =
          searchParams
            .get(URL_PARAMS.GENERATIONS)
            ?.split(',')
            .map(Number)
            .filter(n => !isNaN(n)) || [];
        const abilities = searchParams.get(URL_PARAMS.ABILITIES)?.split(',').filter(Boolean) || [];
        const stats = parseStatsFromURL(searchParams.get(URL_PARAMS.STATS));
        const sortField = searchParams.get(URL_PARAMS.SORT_FIELD) || 'id';
        const sortDirection = searchParams.get(URL_PARAMS.SORT_DIRECTION) || 'asc';

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
