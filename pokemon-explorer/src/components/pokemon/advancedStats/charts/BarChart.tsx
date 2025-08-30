import { Pokemon } from '@/types';
import { STAT_NAMES } from '@/lib/constants/filters';
import { getStatData } from '@/lib/utils/chartUtils';
import {
  MAX_STAT_VALUE,
  BAR_CHART_HEIGHT,
  BAR_CHART_COMPARISON_HEIGHT,
  BAR_CHART_SPACING,
  BAR_CHART_ICON_SIZE,
  BAR_CHART_LABEL_WIDTH,
  BAR_CHART_VALUE_WIDTH,
  BAR_CHART_INDICATOR_WIDTH,
} from '@/lib/constants/statsConfig';

interface BarChartProps {
  pokemon: Pokemon;
  compareWith?: Pokemon;
  showComparison?: boolean;
}

export function BarChart({ pokemon, compareWith, showComparison }: BarChartProps) {
  const pokemonStats = getStatData(pokemon);
  const compareStats = compareWith ? getStatData(compareWith) : null;

  return (
    <div className={`space-y-${BAR_CHART_SPACING}`}>
      {pokemonStats.map(stat => {
        const compareValue = compareStats?.find(s => s.name === stat.name)?.value;
        const isHigher = compareValue ? stat.value > compareValue : null;
        const isLower = compareValue ? stat.value < compareValue : null;

        return (
          <div key={stat.name} className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 w-${BAR_CHART_LABEL_WIDTH}`}>
              <div className="text-white">
                {stat.iconComponent && <stat.iconComponent className={`h-${BAR_CHART_ICON_SIZE} w-${BAR_CHART_ICON_SIZE}`} />}
              </div>
              <span className="text-sm font-medium text-red-100">{STAT_NAMES[stat.name]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div className={`h-${BAR_CHART_HEIGHT} rounded-full ${stat.barColor}`} style={{ width: `${stat.percentage}%` }} />
                </div>
                <span className={`text-sm font-medium text-white w-${BAR_CHART_VALUE_WIDTH} text-right`}>{stat.value}</span>
                {compareValue && (
                  <span
                    className={`text-xs w-${BAR_CHART_INDICATOR_WIDTH} text-center ${isHigher ? 'text-green-400' : isLower ? 'text-red-400' : 'text-red-100'}`}
                  >
                    {isHigher ? '↑' : isLower ? '↓' : '='}
                  </span>
                )}
              </div>
              {compareValue && showComparison && (
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-white/10 rounded-full h-1">
                    <div
                      className={`h-${BAR_CHART_COMPARISON_HEIGHT} rounded-full bg-red-500`}
                      style={{ width: `${(compareValue / MAX_STAT_VALUE) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs text-red-100 w-${BAR_CHART_VALUE_WIDTH} text-right`}>{compareValue}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
