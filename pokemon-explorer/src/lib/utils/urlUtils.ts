import { PokemonFilters, SortOption } from '@/types';
import { SortDirection, SortField, NavigationLabel, StatName } from '@/lib/constants/enums';
import { URL_PARAMS } from '@/lib/constants/urlParams';

/**
 * Generic interface for basic filters
 */
interface BaseFilters {
  search: string;
}

/**
 * Serialize stats for URL parameters using simple string format
 */
const serializeStatsForURL = (stats: PokemonFilters['stats']): string => {
  const activeStats: string[] = [];

  Object.entries(stats).forEach(([statName, [min, max]]) => {
    if (min > 0 || max > 0) {
      activeStats.push(`${statName}:${min}-${max}`);
    }
  });

  return activeStats.join(',');
};

/**
 * Converts NavigationLabel enum to URL path
 * @param label - NavigationLabel enum value
 * @returns URL path string
 */
export function getNavigationUrl(label: NavigationLabel): string {
  const urlMap: Record<NavigationLabel, string> = {
    [NavigationLabel.POKEMON]: '/explorer',
    [NavigationLabel.BERRIES]: '/berries',
    [NavigationLabel.ITEMS]: '/items',
    [NavigationLabel.LOCATIONS]: '/locations',
  };

  return urlMap[label];
}

/**
 * Builds search params object for pagination from filters and sort state
 * @param filters - Current filter state (PokemonFilters or DataFilters)
 * @param sort - Current sort state
 * @returns Record of search parameters
 */
export function buildSearchParams(filters: PokemonFilters | BaseFilters, sort: SortOption): Record<string, string> {
  const params: Record<string, string> = {};

  // Add search filter
  if (filters.search) {
    params[URL_PARAMS.SEARCH] = filters.search;
  }

  // Add Pokemon-specific filters if available
  if (URL_PARAMS.TYPES in filters && filters.types.length > 0) {
    params[URL_PARAMS.TYPES] = filters.types.join(',');
  }

  if (URL_PARAMS.GENERATIONS in filters && filters.generations.length > 0) {
    params[URL_PARAMS.GENERATIONS] = filters.generations.join(',');
  }

  if (URL_PARAMS.ABILITIES in filters && filters.abilities.length > 0) {
    params[URL_PARAMS.ABILITIES] = filters.abilities.join(',');
  }

  // Add stats filters if available and not default values
  if (URL_PARAMS.STATS in filters) {
    const statsFilters = filters.stats;
    const hasActiveStats = Object.values(statsFilters).some(([min, max]) => min > 0 || max > 0);

    if (hasActiveStats) {
      params[URL_PARAMS.STATS] = serializeStatsForURL(statsFilters);
    }
  }

  // Add sort parameters (only if not default)
  if (sort.field !== SortField.ID) {
    params[URL_PARAMS.SORT_FIELD] = sort.field;
  }
  if (sort.direction !== SortDirection.ASC) {
    params[URL_PARAMS.SORT_DIRECTION] = sort.direction;
  }

  return params;
}

/**
 * Builds a URL with search params for pagination
 * @param baseUrl - Base URL path
 * @param filters - Current filter state
 * @param sort - Current sort state
 * @param page - Page number (optional, defaults to 1)
 * @returns Complete URL with search parameters
 */
export function buildPaginationUrl(baseUrl: string, filters: PokemonFilters | BaseFilters, sort: SortOption, page?: number): string {
  const params = buildSearchParams(filters, sort);

  // Add page parameter if provided and greater than 1
  if (page && page > 1) {
    params[URL_PARAMS.PAGE] = page.toString();
  }

  const queryString = new URLSearchParams(params).toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
