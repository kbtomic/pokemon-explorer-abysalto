// Generic data utilities for filtering, sorting, and formatting any data type

import { SortDirection, SortField } from '@/lib/constants/pokemon/sorting';
import { formatName } from '@/lib/utils/formatting/stringUtils';

// Check if more data is needed for pagination
export function needsMoreData(currentItems: number, currentPage: number, itemsPerPage: number, totalPagesNeeded: number): boolean {
  const itemsNeeded = totalPagesNeeded * itemsPerPage;
  return itemsNeeded > currentItems;
}

// Calculate items needed for pagination
export function calculateItemsNeeded(currentItems: number, currentPage: number, itemsPerPage: number): number {
  const totalPagesNeeded = Math.ceil((currentPage * itemsPerPage) / itemsPerPage);
  return totalPagesNeeded * itemsPerPage;
}

// Generic filter function for any data with name and search
export const filterData = <T extends { name: string }>(items: T[], filters: { search: string }): T[] => {
  if (!filters.search.trim()) {
    return items;
  }

  const searchLower = filters.search.toLowerCase();
  return items.filter(
    dataItem => dataItem.name.toLowerCase().includes(searchLower) || formatName(dataItem.name).toLowerCase().includes(searchLower)
  );
};

// Generic sort function for any data with name and id
export const sortData = <T extends { name: string; id: number }>(items: T[], sort: { field: SortField; direction: SortDirection }): T[] => {
  return [...items].sort((firstItem, secondItem) => {
    let firstValue: string | number;
    let secondValue: string | number;

    switch (sort.field) {
      case SortField.NAME:
        firstValue = firstItem.name;
        secondValue = secondItem.name;
        break;
      case SortField.ID:
      default:
        firstValue = firstItem.id;
        secondValue = secondItem.id;
        break;
    }

    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
      return sort.direction === SortDirection.ASC ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
    }

    return sort.direction === SortDirection.ASC
      ? (firstValue as number) - (secondValue as number)
      : (secondValue as number) - (firstValue as number);
  });
};
