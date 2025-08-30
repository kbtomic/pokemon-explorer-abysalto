import { StatName } from '@/lib/constants/enums';
import { Pokemon } from '@/types';

export interface StatConfig {
  name: StatName;
  color: string;
  barColor: string;
}

export interface SummaryItem {
  value: number;
  label: string;
  color: string;
}

export interface InfoCardConfig {
  label: string;
  valueKey: keyof Pokemon;
  formatter: (value: number) => string;
}
