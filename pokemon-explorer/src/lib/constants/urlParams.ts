/**
 * URL parameter constants for consistent parameter naming across the application
 */

export const URL_PARAMS = {
  // Pagination parameters
  PAGE: 'page',
  ITEMS_PER_PAGE: 'itemsPerPage',

  // Filter parameters
  SEARCH: 'search',
  TYPES: 'types',
  GENERATIONS: 'generations',
  ABILITIES: 'abilities',
  STATS: 'stats',

  // Sort parameters
  SORT_FIELD: 'sortField',
  SORT_DIRECTION: 'sortDirection',
} as const;

/**
 * Type for URL parameter keys
 */
export type URLParamKey = (typeof URL_PARAMS)[keyof typeof URL_PARAMS];
