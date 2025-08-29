'use client';

import { PokemonSearchBar } from '@/components/filters/common/SearchBar';
import { FilterContent } from '@/components/filters/common/FilterContent';
import { ClearAllButton } from '@/components/filters/common/ClearAllButton';

export function DesktopFilterBar() {
  return (
    <div className="hidden md:block bg-white container mx-auto px-4 py-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex-1 w-full lg:w-auto self-start">
          <PokemonSearchBar />
        </div>

        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <FilterContent className="flex items-center gap-3 flex-wrap min-w-0" />
          <ClearAllButton />
        </div>
      </div>
    </div>
  );
}
