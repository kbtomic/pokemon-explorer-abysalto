'use client';

import { SearchBar } from '../pokemon/search-bar';
import { GenericFilter } from './GenericFilter';
import { StatsFilter } from '../pokemon/stats-filter';
import { AbilitiesFilter } from '../pokemon/abilities-filter';
import { SortSelector } from '../pokemon/sort-selector';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { useTypeFilterConfig, useGenerationFilterConfig } from '@/lib/utils/filters/filters';
import { RotateCcw } from 'lucide-react';

export function FiltersBar() {
  const clearFilters = usePokemonStore(state => state.clearFilters);
  const filters = usePokemonStore(state => state.filters);
  const typeFilterConfig = useTypeFilterConfig();
  const generationFilterConfig = useGenerationFilterConfig();

  const hasActiveFilters =
    filters.search ||
    filters.types.length > 0 ||
    filters.generations.length > 0 ||
    filters.abilities.length > 0 ||
    Object.values(filters.stats).some(([min, max]) => min > 0 || max < 255);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 w-full lg:w-auto">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <GenericFilter {...typeFilterConfig} />
            <GenericFilter {...generationFilterConfig} />
            <StatsFilter />
            <AbilitiesFilter />
            <SortSelector />

            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className={`flex items-center space-x-2 transition-opacity duration-200 ${
                hasActiveFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
