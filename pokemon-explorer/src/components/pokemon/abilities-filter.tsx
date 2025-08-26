'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { pokeAPI } from '@/lib/api/pokeapi';
import { Ability } from '@/types';
import { ChevronDown, X, Search } from 'lucide-react';

export function AbilitiesFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedAbilities = usePokemonStore(state => state.filters.abilities);
  const setStoreAbilities = usePokemonStore(state => state.setAbilities);

  useEffect(() => {
    const fetchAbilities = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await pokeAPI.getAbilities();
        const abilityPromises = response.results.slice(0, 50).map(ability => pokeAPI.getAbility(ability.name));
        const abilitiesData = await Promise.all(abilityPromises);
        setAbilities(abilitiesData);
      } catch (err) {
        setError('Failed to load abilities');
        console.error('Error fetching abilities:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && abilities.length === 0) {
      fetchAbilities();
    }
  }, [isOpen, abilities.length]);

  const filteredAbilities = abilities.filter(ability => ability.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAbilityToggle = (abilityName: string) => {
    const newAbilities = selectedAbilities.includes(abilityName)
      ? selectedAbilities.filter(name => name !== abilityName)
      : [...selectedAbilities, abilityName];

    setStoreAbilities(newAbilities);
  };

  const handleClearAll = () => {
    setStoreAbilities([]);
  };

  const formatAbilityName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const hasActiveFilters = selectedAbilities.length > 0;

  return (
    <div className="relative">
      <Button
        variant={hasActiveFilters ? 'default' : 'outline'}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <span>Abilities</span>
        {hasActiveFilters && (
          <span className="bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium">{selectedAbilities.length}</span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-3">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search abilities..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">{selectedAbilities.length} selected</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading abilities...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : filteredAbilities.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No abilities found</div>
            ) : (
              <div className="p-2">
                {filteredAbilities.map(ability => {
                  const isSelected = selectedAbilities.includes(ability.name);
                  return (
                    <button
                      key={ability.id}
                      onClick={() => handleAbilityToggle(ability.name)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        isSelected
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{formatAbilityName(ability.name)}</span>
                        {isSelected && <X className="h-4 w-4 text-blue-600" />}
                      </div>
                      {ability.flavor_text_entries?.[0] && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {ability.flavor_text_entries[0].flavor_text}
                        </p>
                      )}
                    </button>
                  );
                })}
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
