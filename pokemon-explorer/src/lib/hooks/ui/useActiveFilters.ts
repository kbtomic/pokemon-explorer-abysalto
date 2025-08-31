import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { SortDirection, SortField } from '@/lib/constants/pokemon/sorting';
import { StatName } from '@/lib/constants/pokemon/stats';

export function useActiveFilters() {
  const { filters, sort, originalStatRanges } = usePokemonStore();

  const hasActiveSearch = filters.search.length > 0;
  const hasActiveTypes = filters.types.length > 0;
  const hasActiveGenerations = filters.generations.length > 0;
  const hasActiveAbilities = filters.abilities.length > 0;

  const hasActiveStats = Object.entries(filters.stats).some(([statName, [min, max]]) => {
    const [originalMin, originalMax] = (originalStatRanges as Record<StatName, [number, number]>)[statName as StatName] || [0, 0];
    return min !== originalMin || max !== originalMax;
  });

  const hasActiveSort = sort.field !== SortField.ID || sort.direction !== SortDirection.ASC;

  return hasActiveSearch || hasActiveTypes || hasActiveGenerations || hasActiveAbilities || hasActiveStats || hasActiveSort;
}
