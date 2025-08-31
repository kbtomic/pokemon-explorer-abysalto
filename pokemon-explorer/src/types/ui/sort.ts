import { SortField } from '@/lib/constants/pokemon/sorting';

export interface SortOptionConfig {
  value: SortField;
  label: string;
  description?: string;
}
