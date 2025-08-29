'use client';

import { PokemonSearchBar } from '@/components/filters/SearchBar';
import { GenericFilter } from './common/GenericFilter';
import { StatsFilter } from './stats/StatsFilter';
import { SortSelector } from '../sort/SortSelector';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { useTypeFilterConfig, useGenerationFilterConfig, useAbilitiesFilterConfig } from '@/lib/utils/filters/filters';
import { useActiveFilters } from '@/lib/hooks/useActiveFilters';
import { RotateCcw } from 'lucide-react';
import { ButtonSize, ButtonVariant } from '@/types/enums';

export function FiltersBar() {
  const clearFilters = usePokemonStore(state => state.clearFilters);
  const hasActiveFilters = useActiveFilters();
  const typeFilterConfig = useTypeFilterConfig();
  const generationFilterConfig = useGenerationFilterConfig();
  const abilitiesFilterConfig = useAbilitiesFilterConfig();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 w-full lg:w-auto">
            <PokemonSearchBar />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <GenericFilter {...typeFilterConfig} />
            <GenericFilter {...generationFilterConfig} />
            <StatsFilter />
            <GenericFilter {...abilitiesFilterConfig} />
            <SortSelector />

            <Button
              variant={ButtonVariant.OUTLINE}
              size={ButtonSize.SM}
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
