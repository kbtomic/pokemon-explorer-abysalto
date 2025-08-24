'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { Filter, X } from 'lucide-react';

const GENERATIONS = [
  { id: 1, name: 'Generation I', range: '1-151' },
  { id: 2, name: 'Generation II', range: '152-251' },
  { id: 3, name: 'Generation III', range: '252-386' },
  { id: 4, name: 'Generation IV', range: '387-493' },
  { id: 5, name: 'Generation V', range: '494-649' },
  { id: 6, name: 'Generation VI', range: '650-721' },
  { id: 7, name: 'Generation VII', range: '722-809' },
  { id: 8, name: 'Generation VIII', range: '810-898' },
  { id: 9, name: 'Generation IX', range: '899-1025' },
] as const;

export function GenerationFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedGenerations = usePokemonStore(state => state.filters.generations);
  const setGenerations = usePokemonStore(state => state.setGenerations);

  const handleGenerationToggle = (generationId: number) => {
    const newGenerations = selectedGenerations.includes(generationId)
      ? selectedGenerations.filter(g => g !== generationId)
      : [...selectedGenerations, generationId];
    setGenerations(newGenerations);
  };

  const handleClearAll = () => {
    setGenerations([]);
  };

  const selectedCount = selectedGenerations.length;

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        <Filter className="h-4 w-4" />
        <span>Generations</span>
        {selectedCount > 0 && <span className="bg-green-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px]">{selectedCount}</span>}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[280px]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Filter by Generation</h3>
              {selectedCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-red-600 hover:text-red-700">
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {GENERATIONS.map(generation => {
                const isSelected = selectedGenerations.includes(generation.id);
                return (
                  <button
                    key={generation.id}
                    onClick={() => handleGenerationToggle(generation.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        isSelected
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{generation.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({generation.range})</span>
                    </div>
                    {isSelected && <X className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>

            {selectedCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {selectedGenerations.map(generationId => {
                    const generation = GENERATIONS.find(g => g.id === generationId);
                    return (
                      <span
                        key={generationId}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      >
                        {generation?.name}
                        <button
                          onClick={() => handleGenerationToggle(generationId)}
                          className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
