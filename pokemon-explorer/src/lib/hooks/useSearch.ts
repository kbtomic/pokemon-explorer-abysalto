import { useMemo } from 'react';
import { paginateItems } from '@/lib/utils/pagination';

interface UseSearchOptions<T extends { name: string; url: string }> {
  items: T[];
  searchValue: string;
  currentPage: number;
  itemsPerPage?: number;
  onFetchMore?: () => void;
  filterFunction: (items: T[], searchValue: string) => T[];
  needsMoreFunction: (currentItems: number, currentPage: number, itemsPerPage: number, totalPagesNeeded: number) => boolean;
}

interface UseSearchReturn<T> {
  filteredItems: T[];
  paginatedResults: {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function useSearch<T extends { name: string; url: string }>({
  items,
  searchValue,
  currentPage,
  itemsPerPage = 48,
  onFetchMore,
  filterFunction,
  needsMoreFunction,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  // Filter items based on search
  const filteredItems = useMemo(() => {
    return filterFunction(items, searchValue);
  }, [items, searchValue, filterFunction]);

  // Apply pagination to filtered items
  const paginatedResults = useMemo(() => {
    return paginateItems(filteredItems, currentPage, itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Auto-fetch more data when needed
  useMemo(() => {
    if (onFetchMore) {
      const totalPagesNeeded = Math.ceil(filteredItems.length / itemsPerPage);
      if (needsMoreFunction(items.length, currentPage, itemsPerPage, totalPagesNeeded)) {
        onFetchMore();
      }
    }
  }, [items.length, currentPage, itemsPerPage, filteredItems.length, onFetchMore, needsMoreFunction]);

  return {
    filteredItems,
    paginatedResults,
  };
}
