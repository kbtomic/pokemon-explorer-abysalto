import { useMemo } from 'react';
import { filterBerriesBySearch, needsMoreBerries } from '@/lib/utils/berries';
import { paginateItems } from '@/lib/utils/pagination';
import type { BerryBasic } from '@/types/pokemon';

interface UseBerrySearchOptions {
  berries: BerryBasic[];
  searchValue: string;
  currentPage: number;
  itemsPerPage?: number;
  onFetchMore?: () => void;
}

interface UseBerrySearchReturn {
  filteredBerries: BerryBasic[];
  paginatedResults: {
    items: BerryBasic[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function useBerrySearch({
  berries,
  searchValue,
  currentPage,
  itemsPerPage = 48,
  onFetchMore,
}: UseBerrySearchOptions): UseBerrySearchReturn {
  // Filter berries based on search
  const filteredBerries = useMemo(() => {
    return filterBerriesBySearch(berries, searchValue);
  }, [berries, searchValue]);

  // Apply pagination to filtered berries
  const paginatedResults = useMemo(() => {
    return paginateItems(filteredBerries, currentPage, itemsPerPage);
  }, [filteredBerries, currentPage, itemsPerPage]);

  // Auto-fetch more data when needed
  useMemo(() => {
    if (onFetchMore) {
      const totalPagesNeeded = Math.ceil(filteredBerries.length / itemsPerPage);
      if (needsMoreBerries(berries.length, currentPage, itemsPerPage, totalPagesNeeded)) {
        onFetchMore();
      }
    }
  }, [berries.length, currentPage, itemsPerPage, filteredBerries.length, onFetchMore]);

  return {
    filteredBerries,
    paginatedResults,
  };
}
