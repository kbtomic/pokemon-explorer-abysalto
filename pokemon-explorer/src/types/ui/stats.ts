import { StatName } from '@/lib/constants/pokemon/stats';
import { Pokemon } from '@/types/pokemon/core';

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
