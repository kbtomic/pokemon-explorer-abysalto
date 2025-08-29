'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize, ChartType } from '@/types/enums';
import { BarChart3 } from 'lucide-react';
import { Pokemon } from '@/types';
import { ChartSelector } from '@/components/pokemon/advancedStats/ChartSelector';
import { SummaryStats } from '@/components/pokemon/advancedStats/SummaryStats';
import { ChartLegend } from '@/components/pokemon/advancedStats/ChartLegend';
import { RadarChart } from '@/components/pokemon/advancedStats/charts/RadarChart';
import { BarChart } from '@/components/pokemon/advancedStats/charts/BarChart';
import { RadialChart } from '@/components/pokemon/advancedStats/charts/RadialChart';

interface AdvancedStatsDisplayProps {
  pokemon: Pokemon;
  compareWith?: Pokemon;
}

export function AdvancedStatsDisplay({ pokemon, compareWith }: AdvancedStatsDisplayProps) {
  const [chartType, setChartType] = useState<ChartType>(ChartType.RADAR);
  const [showComparison, setShowComparison] = useState(false);

  const renderChart = () => {
    switch (chartType) {
      case ChartType.RADAR:
        return <RadarChart pokemon={pokemon} compareWith={compareWith} showComparison={showComparison} />;
      case ChartType.BAR:
        return <BarChart pokemon={pokemon} compareWith={compareWith} showComparison={showComparison} />;
      case ChartType.RADIAL:
        return <RadialChart pokemon={pokemon} compareWith={compareWith} showComparison={showComparison} />;
      default:
        return <RadarChart pokemon={pokemon} compareWith={compareWith} showComparison={showComparison} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-white" />
          <span className="text-lg font-bold text-white">Advanced Stats</span>
        </div>

        <div className="flex items-center space-x-2">
          {compareWith && (
            <Button
              variant={showComparison ? ButtonVariant.DEFAULT : ButtonVariant.OUTLINE}
              size={ButtonSize.SM}
              onClick={() => setShowComparison(!showComparison)}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              {showComparison ? 'Hide' : 'Show'} Comparison
            </Button>
          )}
        </div>
      </div>

      {/* Chart type selector */}
      <ChartSelector chartType={chartType} onChartTypeChange={setChartType} />

      {/* Summary Stats */}
      <SummaryStats pokemon={pokemon} />

      {/* Chart */}
      <div className="min-h-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">{renderChart()}</div>

      {/* Legend */}
      {compareWith && showComparison && <ChartLegend pokemon={pokemon} compareWith={compareWith} />}
    </div>
  );
}
