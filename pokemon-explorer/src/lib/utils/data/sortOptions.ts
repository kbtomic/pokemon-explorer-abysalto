import { SortOption } from '@/types/ui/filters';
import { SortField } from '@/lib/constants/enums';
import { SortOptionConfig } from '@/types/ui/sort';

export const SORT_OPTIONS: SortOptionConfig[] = [
  { value: SortField.ID, label: 'ID', description: 'Sort by Pokemon ID' },
  { value: SortField.NAME, label: 'Name', description: 'Sort alphabetically by name' },
  { value: SortField.GENERATION, label: 'Generation', description: 'Sort by Pokemon generation' },
  { value: SortField.TOTAL_STATS, label: 'Total Stats', description: 'Sort by total base stats' },
  { value: SortField.HP, label: 'HP', description: 'Sort by HP stat' },
  { value: SortField.ATTACK, label: 'Attack', description: 'Sort by Attack stat' },
  { value: SortField.DEFENSE, label: 'Defense', description: 'Sort by Defense stat' },
  { value: SortField.SPEED, label: 'Speed', description: 'Sort by Speed stat' },
  { value: SortField.SPECIAL_ATTACK, label: 'Sp. Atk', description: 'Sort by Special Attack stat' },
  { value: SortField.SPECIAL_DEFENSE, label: 'Sp. Def', description: 'Sort by Special Defense stat' },
];

export function getSortOptionByValue(value: SortOption['field']): SortOptionConfig | undefined {
  return SORT_OPTIONS.find(option => option.value === value);
}

export function getSortOptionLabel(value: SortOption['field']): string {
  const option = getSortOptionByValue(value);
  return option?.label || 'Sort';
}
