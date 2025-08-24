'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const setSearch = usePokemonStore(state => state.setSearch);
  const search = usePokemonStore(state => state.filters.search);

  // Initialize search value from store
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, setSearch]);

  const handleClear = () => {
    setSearchValue('');
    setSearch('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search Pokemon by name..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8" onClick={handleClear}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
