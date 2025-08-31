/**
 * React Query caching configurations
 *
 * These constants define how long data should be considered fresh (staleTime)
 * and how long to keep it in cache (gcTime) for different types of data.
 *
 * Usage:
 * ```typescript
 * import { CACHE_STRATEGIES } from '@/lib/constants';
 *
 * const query = useQuery({
 *   queryKey: ['my-data'],
 *   queryFn: fetchMyData,
 *   ...CACHE_STRATEGIES.STATIC, // For data that rarely changes
 * });
 * ```
 */

// Time constants in milliseconds
export const FIVE_MINUTES = 5 * 60 * 1000;
export const TEN_MINUTES = 10 * 60 * 1000;
export const ONE_HOUR = 1000 * 60 * 60;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

// Default configuration constants
export const DEFAULT_RETRY_ATTEMPTS = 3;

// Caching strategies for different types of data
export const CACHE_STRATEGIES = {
  // Static data that rarely changes (types, generations, shapes, etc.)
  STATIC: {
    staleTime: ONE_DAY, // 24 hours
    gcTime: ONE_WEEK, // 7 days
  },

  // Semi-static data that changes occasionally (abilities, moves, etc.)
  SEMI_STATIC: {
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  },

  // Dynamic data that changes more frequently (pokemon details, etc.)
  DYNAMIC: {
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  },

  // Real-time data that changes frequently (if needed in the future)
  REAL_TIME: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: ONE_HOUR, // 1 hour
  },
} as const;

// Helper function to get cache strategy by data type
export function getCacheStrategy(dataType: keyof typeof CACHE_STRATEGIES) {
  return CACHE_STRATEGIES[dataType];
}
