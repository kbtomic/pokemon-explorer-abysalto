import { StatName } from '@/lib/constants/pokemon/stats';

export function useStatItem(statName: StatName, statRange: [number, number], currentFilter: [number, number]) {
  const effectiveRange: [number, number] = currentFilter && currentFilter[0] !== currentFilter[1] ? currentFilter : statRange;

  const isActive = effectiveRange[0] > statRange[0] || effectiveRange[1] < statRange[1];

  return { effectiveRange, isActive };
}
