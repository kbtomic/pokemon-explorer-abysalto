'use client';

import { useState } from 'react';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { SortButton } from '@/components/sort/SortButton';
import { FilterDropdown } from '@/components/filters/common/FilterDropdown';
import { FilterItemsGrid } from '@/components/filters/common/FilterItemsGrid';
import { SortDirectionToggle } from '@/components/sort/SortDirectionToggle';
import { convertSortOptionsToFilterItems, handleSortChange, handleDirectionToggle } from '@/lib/utils/sort/sortUtils';

export function SortSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const sort = usePokemonStore(state => state.sort);
  const setSort = usePokemonStore(state => state.setSort);

  const sortItems = convertSortOptionsToFilterItems();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <SortButton currentSort={sort} onClick={handleToggle} />

        <FilterDropdown isOpen={isOpen} onClose={handleClose}>
          <div className="p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-red-600">Sort by</h3>
            </div>
            <FilterItemsGrid
              items={sortItems}
              selectedItems={[sort.field]}
              onToggle={itemId => handleSortChange(itemId, sort, setSort, () => setIsOpen(false))}
              gridCols={1}
            />
          </div>
        </FilterDropdown>
      </div>

      <SortDirectionToggle direction={sort.direction} onToggle={() => handleDirectionToggle(sort, setSort)} />
    </div>
  );
}
