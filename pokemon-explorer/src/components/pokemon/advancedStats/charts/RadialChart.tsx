import { Pokemon } from '@/types/pokemon/core';
import { STAT_NAMES } from '@/lib/constants/filters';
import { getStatData, getStatBarColor } from '@/lib/utils/ui/chartUtils';
import {
  MAX_STAT_VALUE,
  RADIAL_OUTER_RADIUS,
  RADIAL_INNER_RADIUS,
  RADIAL_STROKE_WIDTH,
  RADIAL_COMPARISON_STROKE_WIDTH,
} from '@/lib/constants/statsConfig';

interface RadialChartProps {
  pokemon: Pokemon;
  compareWith?: Pokemon;
  showComparison?: boolean;
}

export function RadialChart({ pokemon, compareWith, showComparison }: RadialChartProps) {
  const pokemonStats = getStatData(pokemon);
  const compareStats = compareWith ? getStatData(compareWith) : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {pokemonStats.map(stat => {
        const compareValue = compareStats?.find(s => s.name === stat.name)?.value;
        const isHigher = compareValue ? stat.value > compareValue : null;
        const isLower = compareValue ? stat.value < compareValue : null;

        return (
          <div key={stat.name} className="text-center">
            <div className="relative inline-flex items-center justify-center w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r={RADIAL_OUTER_RADIUS}
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth={RADIAL_STROKE_WIDTH}
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={RADIAL_OUTER_RADIUS}
                  stroke={getStatBarColor(stat.value).replace('bg-', '')}
                  strokeWidth={RADIAL_STROKE_WIDTH}
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * RADIAL_OUTER_RADIUS}`}
                  strokeDashoffset={`${2 * Math.PI * RADIAL_OUTER_RADIUS * (1 - stat.percentage / 100)}`}
                  className="transition-all duration-500"
                />
                {compareValue && showComparison && (
                  <circle
                    cx="40"
                    cy="40"
                    r={RADIAL_INNER_RADIUS}
                    stroke="red"
                    strokeWidth={RADIAL_COMPARISON_STROKE_WIDTH}
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * RADIAL_INNER_RADIUS}`}
                    strokeDashoffset={`${2 * Math.PI * RADIAL_INNER_RADIUS * (1 - ((compareValue / MAX_STAT_VALUE) * 100) / 100)}`}
                    className="transition-all duration-500"
                  />
                )}
              </svg>
              <div className="absolute flex flex-col items-center">
                <div className="text-white">{stat.iconComponent && <stat.iconComponent className="h-4 w-4" />}</div>
                <span className="text-xs font-medium text-white">{stat.value}</span>
                {compareValue && (
                  <span className={`text-xs ${isHigher ? 'text-green-400' : isLower ? 'text-red-400' : 'text-red-100'}`}>
                    {isHigher ? '↑' : isLower ? '↓' : '='}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 text-xs font-medium text-red-100">{STAT_NAMES[stat.name]}</div>
          </div>
        );
      })}
    </div>
  );
}
