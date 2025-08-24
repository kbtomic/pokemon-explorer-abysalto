'use client';

import { SearchBar } from './search-bar';
import { TypeFilter } from './type-filter';
import { GenerationFilter } from './generation-filter';
import { StatsFilter } from './stats-filter';
import { SortSelector } from './sort-selector';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { RotateCcw } from 'lucide-react';

export function FiltersBar() {
  const clearFilters = usePokemonStore(state => state.clearFilters);
  const filters = usePokemonStore(state => state.filters);

  const hasActiveFilters =
    filters.search ||
    filters.types.length > 0 ||
    filters.generations.length > 0 ||
    filters.abilities.length > 0 ||
    Object.values(filters.stats).some(([min, max]) => min > 0 || max < 255);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 w-full lg:w-auto">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <TypeFilter />
            <GenerationFilter />
            <StatsFilter />
            <SortSelector />

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4" />
                <span>Clear All</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
