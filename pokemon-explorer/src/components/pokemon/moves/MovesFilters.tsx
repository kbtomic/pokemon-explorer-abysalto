import { PokemonMove } from '@/types/pokemon/core';
import { Move } from '@/types/pokemon/moves';
import { SearchBar } from '@/components/filters/common/SearchBar';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { getAvailableMoveTypes, getSortOptions } from '@/lib/utils/pokemon/movesUtils';
import { Theme } from '@/lib/constants/ui/themes';
import { MoveSortField } from '@/lib/constants/moves/sorting';

interface MovesFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterBy: string;
  setFilterBy: (filter: string) => void;
  sortBy: MoveSortField;
  setSortBy: (sort: MoveSortField) => void;
  moves: PokemonMove[];
  moveDataMap: { [key: string]: { data?: Move; isLoading: boolean } };
}

export function MovesFilters({
  searchQuery,
  setSearchQuery,
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  moves,
  moveDataMap,
}: MovesFiltersProps) {
  const availableTypes = getAvailableMoveTypes(moves, moveDataMap);
  const sortOptions = getSortOptions();

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <SearchBar
          placeholder="Search moves..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          theme={Theme.BLUE}
          className="text-white"
        />
      </div>
      <div className="flex gap-2">
        <FilterSelect value={filterBy} onChange={setFilterBy} options={availableTypes} placeholder="All Types" />
        <FilterSelect value={sortBy} onChange={value => setSortBy(value as MoveSortField)} options={sortOptions} placeholder="Sort by" />
      </div>
    </div>
  );
}
