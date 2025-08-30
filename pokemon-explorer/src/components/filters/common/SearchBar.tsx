'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { ButtonSize, ButtonVariant } from '@/types/enums';

interface SearchBarProps {
  placeholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  debounceMs?: number;
}

export function SearchBar({ placeholder = 'Search...', searchValue, onSearchChange, debounceMs = 300 }: SearchBarProps) {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  // Initialize local search value from prop
  useEffect(() => {
    setLocalSearchValue(searchValue);
  }, [searchValue]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localSearchValue, onSearchChange, debounceMs]);

  const handleClear = () => {
    setLocalSearchValue('');
    onSearchChange('');
  };

  return (
    <div className="relative min-w-[200px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localSearchValue}
        onChange={e => setLocalSearchValue(e.target.value)}
        className="pl-10 pr-10 border-red-300 focus:border-red-500 focus:ring-red-500 focus:ring-2 transition-colors duration-200"
      />
      {localSearchValue && (
        <Button
          variant={ButtonVariant.GHOST}
          size={ButtonSize.ICON}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

// Wrapper component for Pokemon search to maintain backward compatibility
export function PokemonSearchBar() {
  const setSearch = usePokemonStore(state => state.setSearch);
  const search = usePokemonStore(state => state.filters.search);

  return <SearchBar placeholder="Search by name..." searchValue={search} onSearchChange={setSearch} />;
}
