import { Pokemon } from '@/types';
import { STAT_NAMES } from '@/types/filters';
import { getStatData, calculateRadarPoint, calculateRadarLabel } from '@/lib/utils/chartUtils';
import {
  CHART_CENTER,
  CHART_RADIUS,
  CHART_HEIGHT,
  BACKGROUND_CIRCLES,
  RADAR_ANGLE_STEP,
  RADAR_ANGLE_OFFSET,
} from '@/lib/constants/statsConfig';

interface RadarChartProps {
  pokemon: Pokemon;
  compareWith?: Pokemon;
  showComparison?: boolean;
}

export function RadarChart({ pokemon, compareWith, showComparison }: RadarChartProps) {
  const pokemonStats = getStatData(pokemon);
  const compareStats = compareWith ? getStatData(compareWith) : null;

  return (
    <div className={`relative w-full h-${CHART_HEIGHT}`}>
      <svg viewBox={`0 0 ${CHART_CENTER * 2} ${CHART_CENTER * 2}`} className="w-full h-full">
        {/* Background circles */}
        {BACKGROUND_CIRCLES.map(radius => (
          <circle key={radius} cx={CHART_CENTER} cy={CHART_CENTER} r={radius} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        ))}

        {/* Stat lines */}
        {pokemonStats.map((stat, index) => {
          const angle = (index * RADAR_ANGLE_STEP + RADAR_ANGLE_OFFSET) * (Math.PI / 180);
          const x = CHART_CENTER + Math.cos(angle) * CHART_RADIUS;
          const y = CHART_CENTER + Math.sin(angle) * CHART_RADIUS;
          return <line key={stat.name} x1={CHART_CENTER} y1={CHART_CENTER} x2={x} y2={y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />;
        })}

        {/* Pokemon stats polygon */}
        <polygon
          points={pokemonStats
            .map((stat, index) => {
              const point = calculateRadarPoint(stat, index);
              return `${point.x},${point.y}`;
            })
            .join(' ')}
          fill="rgba(255,255,255,0.2)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Comparison polygon */}
        {compareStats && showComparison && (
          <polygon
            points={compareStats
              .map((stat, index) => {
                const point = calculateRadarPoint(stat, index);
                return `${point.x},${point.y}`;
              })
              .join(' ')}
            fill="rgba(239, 68, 68, 0.3)"
            stroke="#ef4444"
            strokeWidth="2"
          />
        )}

        {/* Stat labels */}
        {pokemonStats.map((stat, index) => {
          const label = calculateRadarLabel(index);
          return (
            <text
              key={stat.name}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-white"
            >
              {STAT_NAMES[stat.name]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
