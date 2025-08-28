'use client';

import { useState } from 'react';
import { FilterItem } from './types';
import { FilterButton } from '@/components/filters/FilterButton';
import { FilterDropdown } from '@/components/filters/FilterDropdown';
import { FilterHeader } from '@/components/filters/FilterHeader';
import { FilterStates } from '@/components/filters/FilterStates';
import { FilterItemsGrid } from '@/components/filters/FilterItemsGrid';
import { SelectedItemsDisplay } from '@/components/filters/SelectedItemsDisplay';

interface GenericFilterProps {
  title: string;
  items: FilterItem[];
  selectedItems: (string | number)[];
  onToggle: (itemId: string | number) => void;
  onClearAll: () => void;
  isLoading?: boolean;
  error?: Error | null;
  getItemColor?: (item: FilterItem) => string;
  getItemDisplayName?: (item: FilterItem) => string;
  badgeColor?: string;
  className?: string;
  gridCols?: number;
  useTypeVariant?: boolean;
}

export function GenericFilter({
  title,
  items,
  selectedItems,
  onToggle,
  onClearAll,
  isLoading = false,
  error = null,
  getItemColor,
  getItemDisplayName = item => item.name,
  badgeColor = 'bg-red-600',
  className = '',
  gridCols = 3,
  useTypeVariant = false,
}: GenericFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = selectedItems.length;

  return (
    <div className={`relative ${className}`}>
      <FilterButton title={title} selectedCount={selectedCount} badgeColor={badgeColor} onClick={() => setIsOpen(!isOpen)} />

      <FilterDropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <FilterHeader title={title} selectedCount={selectedCount} onClearAll={onClearAll} />

          <FilterStates isLoading={isLoading} error={error} title={title} />

          {!isLoading && !error && (
            <FilterItemsGrid
              items={items}
              selectedItems={selectedItems}
              onToggle={onToggle}
              getItemColor={getItemColor}
              getItemDisplayName={getItemDisplayName}
              gridCols={gridCols}
              useTypeVariant={useTypeVariant}
            />
          )}

          <SelectedItemsDisplay
            selectedItems={selectedItems}
            items={items}
            onToggle={onToggle}
            getItemColor={getItemColor}
            getItemDisplayName={getItemDisplayName}
            useTypeVariant={useTypeVariant}
          />
        </div>
      </FilterDropdown>
    </div>
  );
}
