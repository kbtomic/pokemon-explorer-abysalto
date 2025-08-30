'use client';

import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { GenericFilter } from '@/components/filters/common/GenericFilter';
import { StatsContent } from '@/components/filters/stats/StatsContent';
import { StatName } from '@/lib/constants/enums';

export function StatsFilter() {
  const statsFilters = usePokemonStore(state => state.filters.stats);
  const originalStatRanges = usePokemonStore(state => state.originalStatRanges);
  const setStatRange = usePokemonStore(state => state.setStatRange);

  const handleResetStat = (statName: StatName) => {
    const defaultRange = originalStatRanges[statName];
    if (defaultRange) {
      setStatRange(statName, [defaultRange[0], defaultRange[1]]);
    }
  };

  const handleClearAll = () => {
    Object.keys(originalStatRanges).forEach(statName => {
      const defaultRange = originalStatRanges[statName as StatName];
      if (defaultRange) {
        setStatRange(statName as StatName, [defaultRange[0], defaultRange[1]]);
      }
    });
  };

  const activeStatsCount = Object.entries(statsFilters).filter(([statName, [min, max]]) => {
    const defaultRange = originalStatRanges[statName as StatName];
    if (!defaultRange) return false;
    return min !== defaultRange[0] || max !== defaultRange[1];
  }).length;

  return (
    <GenericFilter title="Stats" onClearAll={handleClearAll} selectedCount={activeStatsCount} badgeColor="bg-red-600">
      <StatsContent
        statRanges={originalStatRanges}
        statsFilters={statsFilters}
        onStatChange={(statName, range) => setStatRange(statName, range)}
        onResetStat={handleResetStat}
      />
    </GenericFilter>
  );
}
