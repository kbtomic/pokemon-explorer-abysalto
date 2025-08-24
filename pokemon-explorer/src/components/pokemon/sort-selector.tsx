'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortOption } from '@/types';

const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'total-stats', label: 'Total Stats' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Attack' },
  { value: 'defense', label: 'Defense' },
  { value: 'speed', label: 'Speed' },
  { value: 'special-attack', label: 'Sp. Atk' },
  { value: 'special-defense', label: 'Sp. Def' },
] as const;

export function SortSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const sort = usePokemonStore(state => state.sort);
  const setSort = usePokemonStore(state => state.setSort);

  const handleSortChange = (field: SortOption['field']) => {
    const newDirection = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ field, direction: newDirection });
  };

  const getCurrentSortLabel = () => {
    const option = SORT_OPTIONS.find(opt => opt.value === sort.field);
    return option?.label || 'Sort';
  };

  const getSortIcon = () => {
    if (sort.direction === 'asc') {
      return <ArrowUp className="h-4 w-4" />;
    }
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        <ArrowUpDown className="h-4 w-4" />
        <span>{getCurrentSortLabel()}</span>
        {getSortIcon()}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="p-2">
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white px-2 py-1">Sort by</h3>
            </div>

            <div className="space-y-1">
              {SORT_OPTIONS.map(option => {
                const isActive = sort.field === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value as SortOption['field'])}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors
                      ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {isActive && getSortIcon()}
                  </button>
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
