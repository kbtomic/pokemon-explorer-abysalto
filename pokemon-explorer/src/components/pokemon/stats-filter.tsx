'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { Filter } from 'lucide-react';
import { STAT_NAMES } from '@/types';

const STAT_RANGES = {
  hp: [0, 255],
  attack: [0, 255],
  defense: [0, 255],
  speed: [0, 255],
  'special-attack': [0, 255],
  'special-defense': [0, 255],
} as const;

export function StatsFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const statsFilters = usePokemonStore(state => state.filters.stats);
  const setStatRange = usePokemonStore(state => state.setStatRange);

  const handleStatChange = (statName: string, value: number, isMin: boolean) => {
    const currentRange = statsFilters[statName as keyof typeof statsFilters];
    const newRange: [number, number] = isMin ? [value, currentRange[1]] : [currentRange[0], value];

    setStatRange(statName, newRange);
  };

  const handleResetStat = (statName: string) => {
    const defaultRange = STAT_RANGES[statName as keyof typeof STAT_RANGES];
    setStatRange(statName, [defaultRange[0], defaultRange[1]]);
  };

  const hasActiveStats = Object.entries(statsFilters).some(([statName, [min, max]]) => {
    const defaultRange = STAT_RANGES[statName as keyof typeof STAT_RANGES];
    return min > defaultRange[0] || max < defaultRange[1];
  });

  const activeStatsCount = Object.entries(statsFilters).filter(([statName, [min, max]]) => {
    const defaultRange = STAT_RANGES[statName as keyof typeof STAT_RANGES];
    return min > defaultRange[0] || max < defaultRange[1];
  }).length;

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        <Filter className="h-4 w-4" />
        <span>Stats</span>
        {activeStatsCount > 0 && (
          <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px]">{activeStatsCount}</span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[320px]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Filter by Stats</h3>
              {hasActiveStats && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    Object.keys(STAT_RANGES).forEach(statName => {
                      const defaultRange = STAT_RANGES[statName as keyof typeof STAT_RANGES];
                      setStatRange(statName, [defaultRange[0], defaultRange[1]]);
                    });
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  Reset All
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {Object.entries(STAT_RANGES).map(([statName, [minRange, maxRange]]) => {
                const currentRange = statsFilters[statName as keyof typeof statsFilters];
                const isActive = currentRange[0] > minRange || currentRange[1] < maxRange;

                return (
                  <div key={statName} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {STAT_NAMES[statName as keyof typeof STAT_NAMES]}
                      </span>
                      {isActive && (
                        <button onClick={() => handleResetStat(statName)} className="text-xs text-red-600 hover:text-red-700">
                          Reset
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <input
                          type="range"
                          min={minRange}
                          max={maxRange}
                          value={currentRange[0]}
                          onChange={e => handleStatChange(statName, parseInt(e.target.value), true)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-center">{currentRange[0]}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <input
                          type="range"
                          min={minRange}
                          max={maxRange}
                          value={currentRange[1]}
                          onChange={e => handleStatChange(statName, parseInt(e.target.value), false)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-center">{currentRange[1]}</span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Min: {currentRange[0]}</span>
                      <span>Max: {currentRange[1]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
