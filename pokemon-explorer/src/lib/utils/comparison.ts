import { StatName } from '@/types/enums';
import { SortOption, PokemonFilters } from '@/types/filters';

/**
 * Efficiently compares two arrays for equality
 */
export function arraysEqual<T>(current: T[], target: T[]): boolean {
  if (current.length !== target.length) return false;
  return current.every((item, index) => item === target[index]);
}

/**
 * Efficiently compares two stat range objects
 */
export function statsEqual(currentStats: PokemonFilters['stats'], targetStats: PokemonFilters['stats']): boolean {
  const statNames = Object.values(StatName);

  for (const statName of statNames) {
    const [currentMin, currentMax] = currentStats[statName];
    const [targetMin, targetMax] = targetStats[statName];

    if (currentMin !== targetMin || currentMax !== targetMax) {
      return false;
    }
  }

  return true;
}

/**
 * Efficiently compares two sort options
 */
export function sortOptionsEqual(currentSort: SortOption, targetSort: SortOption): boolean {
  return currentSort.field === targetSort.field && currentSort.direction === targetSort.direction;
}
