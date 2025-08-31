import { Pokemon } from '@/types';
import { StatName } from '@/lib/constants/enums';
import { getStatValue } from '@/lib/utils/pokemon/pokemon';
import { STATS_CONFIG, MAX_STAT_VALUE } from '@/lib/constants/statsConfig';
import { getStatIconComponent } from '@/lib/utils/ui/iconUtils';
import {
  CHART_CENTER,
  CHART_RADIUS,
  LABEL_RADIUS,
  RADAR_ANGLE_OFFSET,
  RADAR_ANGLE_STEP,
  STAT_THRESHOLDS,
} from '@/lib/constants/statsConfig';

export interface StatData {
  name: StatName;
  iconComponent: React.ComponentType<{ className?: string }> | null;
  color: string;
  barColor: string;
  value: number;
  percentage: number;
}

export function getStatData(pokemon: Pokemon): StatData[] {
  return STATS_CONFIG.map(stat => ({
    ...stat,
    iconComponent: getStatIconComponent(stat.name),
    value: getStatValue(pokemon, stat.name),
    percentage: (getStatValue(pokemon, stat.name) / MAX_STAT_VALUE) * 100,
  }));
}

export function getStatColor(value: number): string {
  if (value >= STAT_THRESHOLDS.EXCELLENT) return 'text-green-400';
  if (value >= STAT_THRESHOLDS.GOOD) return 'text-yellow-400';
  if (value >= STAT_THRESHOLDS.AVERAGE) return 'text-orange-400';
  return 'text-red-400';
}

export function getStatBarColor(value: number): string {
  if (value >= STAT_THRESHOLDS.EXCELLENT) return 'bg-green-500';
  if (value >= STAT_THRESHOLDS.GOOD) return 'bg-yellow-500';
  if (value >= STAT_THRESHOLDS.AVERAGE) return 'bg-orange-500';
  return 'bg-red-500';
}

export function calculateRadarPoint(stat: StatData, index: number, radius: number = CHART_RADIUS): { x: number; y: number } {
  const angle = (index * RADAR_ANGLE_STEP + RADAR_ANGLE_OFFSET) * (Math.PI / 180);
  const actualRadius = (stat.value / MAX_STAT_VALUE) * radius;
  return {
    x: CHART_CENTER + Math.cos(angle) * actualRadius,
    y: CHART_CENTER + Math.sin(angle) * actualRadius,
  };
}

export function calculateRadarLabel(index: number, radius: number = LABEL_RADIUS): { x: number; y: number } {
  const angle = (index * RADAR_ANGLE_STEP + RADAR_ANGLE_OFFSET) * (Math.PI / 180);
  return {
    x: CHART_CENTER + Math.cos(angle) * radius,
    y: CHART_CENTER + Math.sin(angle) * radius,
  };
}
