import { STAT_NAMES } from '@/lib/constants/filters/stats';
import { LoadingStatItem } from './LoadingStatItem';
import { StatItem } from './StatItem';
import { StatName } from '@/lib/constants/pokemon/stats';

interface StatsContentProps {
  statRanges: Record<StatName, [number, number]>;
  statsFilters: Record<StatName, [number, number]>;
  onStatChange: (statName: StatName, range: [number, number]) => void;
  onResetStat: (statName: StatName) => void;
}

export function StatsContent({ statRanges, statsFilters, onStatChange, onResetStat }: StatsContentProps) {
  const isLoading = Object.keys(statRanges).length === 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Object.keys(STAT_NAMES).map(statName => (
          <LoadingStatItem key={statName} statName={statName as StatName} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(statRanges).map(([statName, statRange]) => (
        <StatItem
          key={statName}
          statName={statName as StatName}
          statRange={statRange}
          currentFilter={statsFilters[statName as StatName]}
          onStatChange={onStatChange}
          onResetStat={onResetStat}
        />
      ))}
    </div>
  );
}
