import { SortField } from '@/lib/constants/enums';

export interface SortOptionConfig {
  value: SortField;
  label: string;
  description?: string;
}
