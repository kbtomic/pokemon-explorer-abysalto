'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { TYPE_COLORS } from '@/types';
import { Filter, X } from 'lucide-react';

const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export function TypeFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedTypes = usePokemonStore(state => state.filters.types);
  const setTypes = usePokemonStore(state => state.setTypes);

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type) ? selectedTypes.filter(t => t !== type) : [...selectedTypes, type];
    setTypes(newTypes);
  };

  const handleClearAll = () => {
    setTypes([]);
  };

  const selectedCount = selectedTypes.length;

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        <Filter className="h-4 w-4" />
        <span>Types</span>
        {selectedCount > 0 && <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px]">{selectedCount}</span>}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[300px]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Filter by Type</h3>
              {selectedCount > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-red-600 hover:text-red-700">
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {POKEMON_TYPES.map(type => {
                const isSelected = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => handleTypeToggle(type)}
                    className={`
                      flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                    `}
                    style={{
                      backgroundColor: isSelected ? TYPE_COLORS[type] || '#6b7280' : 'transparent',
                    }}
                  >
                    <span className="capitalize">{type}</span>
                    {isSelected && <X className="ml-1 h-3 w-3" />}
                  </button>
                );
              })}
            </div>

            {selectedCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map(type => (
                    <span
                      key={type}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{
                        backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] || '#6b7280',
                      }}
                    >
                      {type}
                      <button onClick={() => handleTypeToggle(type)} className="ml-1 hover:bg-black/20 rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
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
