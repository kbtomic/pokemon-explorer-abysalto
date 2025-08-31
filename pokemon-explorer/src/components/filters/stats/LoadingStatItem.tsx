import { STAT_NAMES } from '@/lib/constants/filters';
import { StatName } from '@/lib/constants/enums';

interface LoadingStatItemProps {
  statName: StatName;
}

export function LoadingStatItem({ statName }: LoadingStatItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-black">{STAT_NAMES[statName]}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Min: --</span>
          <span>Max: --</span>
        </div>
        <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
