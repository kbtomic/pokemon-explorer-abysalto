import { STAT_NAMES } from '@/lib/constants/filters';
import { DualRangeSlider } from '@/components/ui/DualRangeSlider';
import { useStatItem } from '@/lib/hooks/useStatItem';
import { StatName } from '@/lib/constants/enums';

interface StatItemProps {
  statName: StatName;
  statRange: [number, number];
  currentFilter: [number, number];
  onStatChange: (statName: StatName, range: [number, number]) => void;
  onResetStat: (statName: StatName) => void;
}

export function StatItem({ statName, statRange, currentFilter, onStatChange, onResetStat }: StatItemProps) {
  const { effectiveRange, isActive } = useStatItem(statName, statRange, currentFilter);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-black">{STAT_NAMES[statName]}</span>
        {isActive && (
          <button onClick={() => onResetStat(statName)} className="text-xs text-red-600 hover:text-red-700">
            Reset
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Min: {effectiveRange[0]}</span>
          <span>Max: {effectiveRange[1]}</span>
        </div>
        <DualRangeSlider
          min={statRange[0]}
          max={statRange[1]}
          value={effectiveRange}
          onChange={newRange => onStatChange(statName, newRange)}
        />
      </div>
    </div>
  );
}
