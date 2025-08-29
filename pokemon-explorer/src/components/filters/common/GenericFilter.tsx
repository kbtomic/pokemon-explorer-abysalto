'use client';

import { useState, useCallback } from 'react';
import { FilterItem } from '../types';
import { FilterButton } from '@/components/filters/common/FilterButton';
import { FilterDropdown } from '@/components/filters/common/FilterDropdown';
import { FilterHeader } from '@/components/filters/common/FilterHeader';
import { FilterStates } from '@/components/filters/common/FilterStates';
import { FilterItemsGrid } from '@/components/filters/common/FilterItemsGrid';
import { SelectedItemsDisplay } from '@/components/filters/common/SelectedItemsDisplay';
import { SearchBar } from '@/components/filters/SearchBar';
import { Loader2 } from 'lucide-react';

interface GenericFilterProps {
  title: string;
  items?: FilterItem[];
  selectedItems?: (string | number)[];
  onToggle?: (itemId: string | number) => void;
  onClearAll: () => void;
  isLoading?: boolean;
  error?: Error | null;
  getItemColor?: (item: FilterItem) => string;
  getItemDisplayName?: (item: FilterItem) => string;
  badgeColor?: string;
  className?: string;
  gridCols?: number;
  useTypeVariant?: boolean;
  children?: React.ReactNode;
  selectedCount?: number;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  isScrollable?: boolean;
  maxHeight?: string;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  totalCount?: number;
}

export function GenericFilter({
  title,
  items = [],
  selectedItems = [],
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
  children,
  selectedCount: propSelectedCount,
  searchTerm,
  onSearchChange,
  isScrollable = false,
  maxHeight = 'max-h-64',
  isLoadingMore = false,
  hasMore = false,
  onLoadMore,
  totalCount,
}: GenericFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = propSelectedCount ?? selectedItems.length;

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!onLoadMore || isLoadingMore || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold

      if (isAtBottom) {
        onLoadMore();
      }
    },
    [onLoadMore, isLoadingMore, hasMore]
  );

  return (
    <div className={`relative ${className}`}>
      <FilterButton title={title} selectedCount={selectedCount} badgeColor={badgeColor} onClick={() => setIsOpen(!isOpen)} />

      <FilterDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} onScroll={onLoadMore ? handleScroll : undefined}>
        <div className="p-4">
          <FilterHeader title={title} selectedCount={selectedCount} onClearAll={onClearAll} />

          {searchTerm !== undefined && onSearchChange && (
            <div className="mb-3">
              <SearchBar placeholder={`Search ${title.toLowerCase()}...`} searchValue={searchTerm} onSearchChange={onSearchChange} />
            </div>
          )}

          <FilterStates isLoading={isLoading} error={error} title={title} />

          {!isLoading &&
            !error &&
            (children || (
              <div className={isScrollable ? `overflow-y-auto ${maxHeight}` : ''}>
                <FilterItemsGrid
                  items={items}
                  selectedItems={selectedItems}
                  onToggle={onToggle!}
                  getItemColor={getItemColor}
                  getItemDisplayName={getItemDisplayName}
                  gridCols={gridCols}
                  useTypeVariant={useTypeVariant}
                />
              </div>
            ))}

          {isLoadingMore && (
            <div className="p-4 text-center">
              <Loader2 className="h-4 w-4 mx-auto animate-spin text-gray-500" />
            </div>
          )}

          {!hasMore && items.length > 0 && totalCount && <div className="p-2 text-center text-xs t">All {totalCount} items loaded</div>}

          {onToggle && (
            <SelectedItemsDisplay
              selectedItems={selectedItems}
              items={items}
              onToggle={onToggle}
              getItemColor={getItemColor}
              getItemDisplayName={getItemDisplayName}
              useTypeVariant={useTypeVariant}
            />
          )}
        </div>
      </FilterDropdown>
    </div>
  );
}
