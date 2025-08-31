'use client';

import { Search } from 'lucide-react';
import { cn } from '@/lib/utils/formatting/cn';
import { Theme } from '@/lib/constants/enums';
import { usePokemonStore } from '@/lib/stores/pokemonStore';

interface SearchBarProps {
  placeholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  theme?: Theme;
  className?: string;
}

const themeColors = {
  [Theme.RED]: {
    border: 'border-red-200 focus:border-red-500',
    ring: 'focus:ring-red-500',
    icon: 'text-red-500',
  },
  [Theme.GREEN]: {
    border: 'border-green-200 focus:border-green-500',
    ring: 'focus:ring-green-500',
    icon: 'text-green-500',
  },
  [Theme.BLUE]: {
    border: 'border-blue-200 focus:border-blue-500',
    ring: 'focus:ring-blue-500',
    icon: 'text-blue-500',
  },
  [Theme.GRAY]: {
    border: 'border-gray-200 focus:border-gray-500',
    ring: 'focus:ring-gray-500',
    icon: 'text-gray-500',
  },
};

export function SearchBar({ placeholder = 'Search...', searchValue, onSearchChange, theme = Theme.RED, className }: SearchBarProps) {
  const colors = themeColors[theme];

  return (
    <div className={cn('relative', className)}>
      <Search className={cn('absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5', colors.icon)} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={e => onSearchChange(e.target.value)}
        className={cn(
          'w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors',
          colors.border,
          colors.ring
        )}
      />
    </div>
  );
}

// Wrapper component for Pokemon search to maintain backward compatibility
export function PokemonSearchBar() {
  const setSearch = usePokemonStore(state => state.setSearch);
  const search = usePokemonStore(state => state.filters.search);

  return <SearchBar placeholder="Search Pokemon..." searchValue={search} onSearchChange={setSearch} />;
}
