import { SortOption } from '@/types';
import { SortDirection } from '@/lib/constants/enums';
import { SORT_OPTIONS } from '@/lib/utils/data/sortOptions';
import { FilterItem } from '@/types/filters';

export function convertSortOptionsToFilterItems(): FilterItem[] {
  return SORT_OPTIONS.map(option => ({
    id: option.value,
    name: option.label,
  }));
}

export function handleSortChange(
  itemId: string | number,
  currentSort: SortOption,
  setSort: (sort: SortOption) => void,
  onClose?: () => void
) {
  setSort({ field: itemId as SortOption['field'], direction: currentSort.direction });
  onClose?.();
}

export function handleDirectionToggle(currentSort: SortOption, setSort: (sort: SortOption) => void) {
  const newDirection = currentSort.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
  setSort({ field: currentSort.field, direction: newDirection });
}
