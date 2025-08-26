'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pokemon } from '@/types';
import { getTotalStats, getStatValue } from '@/lib/utils';
import { STAT_NAMES } from '@/types';
import { BarChart3, Target, Zap, Shield, Heart, Gauge } from 'lucide-react';

interface AdvancedStatsDisplayProps {
  pokemon: Pokemon;
  compareWith?: Pokemon;
}

type ChartType = 'radar' | 'bar' | 'radial';

export function AdvancedStatsDisplay({ pokemon, compareWith }: AdvancedStatsDisplayProps) {
  const [chartType, setChartType] = useState<ChartType>('radar');
  const [showComparison, setShowComparison] = useState(false);

  const stats = [
    { name: 'hp', icon: <Heart className="h-4 w-4" />, color: 'bg-red-500' },
    { name: 'attack', icon: <Zap className="h-4 w-4" />, color: 'bg-orange-500' },
    { name: 'defense', icon: <Shield className="h-4 w-4" />, color: 'bg-blue-500' },
    { name: 'special-attack', icon: <Target className="h-4 w-4" />, color: 'bg-purple-500' },
    { name: 'special-defense', icon: <Shield className="h-4 w-4" />, color: 'bg-green-500' },
    { name: 'speed', icon: <Gauge className="h-4 w-4" />, color: 'bg-yellow-500' },
  ];

  const getStatData = (pokemon: Pokemon) => {
    return stats.map(stat => ({
      ...stat,
      value: getStatValue(pokemon, stat.name),
      percentage: (getStatValue(pokemon, stat.name) / 255) * 100,
    }));
  };

  const pokemonStats = getStatData(pokemon);
  const compareStats = compareWith ? getStatData(compareWith) : null;

  const getStatColor = (value: number) => {
    if (value >= 100) return 'text-green-600 dark:text-green-400';
    if (value >= 80) return 'text-yellow-600 dark:text-yellow-400';
    if (value >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatBarColor = (value: number) => {
    if (value >= 100) return 'bg-green-500';
    if (value >= 80) return 'bg-yellow-500';
    if (value >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const renderRadarChart = () => (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background circles */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="#e5e7eb" strokeWidth="1" />

        {/* Stat lines */}
        {stats.map((stat, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const x = 100 + Math.cos(angle) * 80;
          const y = 100 + Math.sin(angle) * 80;
          return <line key={stat.name} x1="100" y1="100" x2={x} y2={y} stroke="#d1d5db" strokeWidth="1" />;
        })}

        {/* Pokemon stats polygon */}
        <polygon
          points={pokemonStats
            .map((stat, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const radius = (stat.value / 255) * 80;
              const x = 100 + Math.cos(angle) * radius;
              const y = 100 + Math.sin(angle) * radius;
              return `${x},${y}`;
            })
            .join(' ')}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Comparison polygon */}
        {compareStats && showComparison && (
          <polygon
            points={compareStats
              .map((stat, index) => {
                const angle = (index * 60 - 90) * (Math.PI / 180);
                const radius = (stat.value / 255) * 80;
                const x = 100 + Math.cos(angle) * radius;
                const y = 100 + Math.sin(angle) * radius;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="rgba(239, 68, 68, 0.2)"
            stroke="#ef4444"
            strokeWidth="2"
          />
        )}

        {/* Stat labels */}
        {stats.map((stat, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const x = 100 + Math.cos(angle) * 95;
          const y = 100 + Math.sin(angle) * 95;
          return (
            <text
              key={stat.name}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-600 dark:fill-gray-400"
            >
              {STAT_NAMES[stat.name as keyof typeof STAT_NAMES]}
            </text>
          );
        })}
      </svg>
    </div>
  );

  const renderBarChart = () => (
    <div className="space-y-3">
      {pokemonStats.map((stat, index) => {
        const compareValue = compareStats?.[index]?.value;
        const isHigher = compareValue ? stat.value > compareValue : null;
        const isLower = compareValue ? stat.value < compareValue : null;

        return (
          <div key={stat.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                {stat.icon}
                <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">
                  {STAT_NAMES[stat.name as keyof typeof STAT_NAMES]}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-semibold ${getStatColor(stat.value)}`}>{stat.value}</span>
                {compareValue && (
                  <>
                    <span className="text-gray-400">vs</span>
                    <span className={`font-semibold ${getStatColor(compareValue)}`}>{compareValue}</span>
                    {isHigher && <span className="text-green-500 text-xs">↑</span>}
                    {isLower && <span className="text-red-500 text-xs">↓</span>}
                  </>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${getStatBarColor(stat.value)}`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>

              {compareValue && showComparison && (
                <div className="absolute top-0 left-0 w-full h-3">
                  <div className="h-3 rounded-full bg-red-400 opacity-60" style={{ width: `${(compareValue / 255) * 100}%` }} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderRadialChart = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {pokemonStats.map(stat => {
        const compareValue = compareStats?.find(s => s.name === stat.name)?.value;
        const isHigher = compareValue ? stat.value > compareValue : null;
        const isLower = compareValue ? stat.value < compareValue : null;

        return (
          <div key={stat.name} className="text-center">
            <div className="relative inline-flex items-center justify-center w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke={getStatBarColor(stat.value).replace('bg-', '')}
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - stat.percentage / 100)}`}
                  className="transition-all duration-500"
                />
                {compareValue && showComparison && (
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    stroke="red"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - ((compareValue / 255) * 100) / 100)}`}
                    className="transition-all duration-500"
                  />
                )}
              </svg>
              <div className="absolute flex flex-col items-center">
                {stat.icon}
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{stat.value}</span>
                {compareValue && (
                  <span className={`text-xs ${isHigher ? 'text-green-500' : isLower ? 'text-red-500' : 'text-gray-400'}`}>
                    {isHigher ? '↑' : isLower ? '↓' : '='}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
              {STAT_NAMES[stat.name as keyof typeof STAT_NAMES]}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'radar':
        return renderRadarChart();
      case 'bar':
        return renderBarChart();
      case 'radial':
        return renderRadialChart();
      default:
        return renderRadarChart();
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Advanced Stats</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {compareWith && (
              <Button variant={showComparison ? 'default' : 'outline'} size="sm" onClick={() => setShowComparison(!showComparison)}>
                {showComparison ? 'Hide' : 'Show'} Comparison
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant={chartType === 'radar' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('radar')}>
            Radar
          </Button>
          <Button variant={chartType === 'bar' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('bar')}>
            Bar
          </Button>
          <Button variant={chartType === 'radial' ? 'default' : 'outline'} size="sm" onClick={() => setChartType('radial')}>
            Radial
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getTotalStats(pokemon)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Stats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.max(...pokemonStats.map(s => s.value))}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Highest Stat</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.min(...pokemonStats.map(s => s.value))}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lowest Stat</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(pokemonStats.reduce((sum, stat) => sum + stat.value, 0) / pokemonStats.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
            </div>
          </div>

          {/* Chart */}
          <div className="min-h-[300px]">{renderChart()}</div>

          {/* Legend */}
          {compareWith && showComparison && (
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">{pokemon.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">{compareWith.name}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
