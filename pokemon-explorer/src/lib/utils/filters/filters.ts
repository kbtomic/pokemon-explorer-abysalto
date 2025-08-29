import { useState } from 'react';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { usePokemonTypes } from '@/lib/hooks/use-pokemon-types';
import { usePokemonGenerations } from '@/lib/hooks/usePokemonGenerations';
import { useAbilities } from '@/lib/hooks/useAbilities';
import { getTypeColor } from '@/lib/utils';
import { formatAbilityName } from '@/lib/utils/pokemon';
import { Ability } from '@/types';

// Type Filter Configuration
export const useTypeFilterConfig = () => {
  const selectedTypes = usePokemonStore(state => state.filters.types);
  const setTypes = usePokemonStore(state => state.setTypes);
  const { types: pokemonTypes, isLoading, error } = usePokemonTypes();

  const handleTypeToggle = (itemId: string | number) => {
    const typeName = String(itemId);
    const newTypes = selectedTypes.includes(typeName) ? selectedTypes.filter(t => t !== typeName) : [...selectedTypes, typeName];
    setTypes(newTypes);
  };

  const handleClearAll = () => {
    setTypes([]);
  };

  const getItemColor = (item: { name: string }) => getTypeColor(item.name);

  const filterItems = pokemonTypes.map(type => ({
    id: type.name,
    name: type.name,
    url: type.url,
  }));

  return {
    title: 'Types',
    items: filterItems,
    selectedItems: selectedTypes,
    onToggle: handleTypeToggle,
    onClearAll: handleClearAll,
    isLoading,
    error,
    getItemColor,
    badgeColor: 'bg-red-600',
    useTypeVariant: true,
  };
};

// Generation Filter Configuration
export const useGenerationFilterConfig = () => {
  const selectedGenerations = usePokemonStore(state => state.filters.generations);
  const setGenerations = usePokemonStore(state => state.setGenerations);
  const { generations: pokemonGenerations, isLoading, error } = usePokemonGenerations();

  const handleGenerationToggle = (itemId: string | number) => {
    const generationId = typeof itemId === 'number' ? itemId : parseInt(itemId, 10);
    if (isNaN(generationId)) return;

    const newGenerations = selectedGenerations.includes(generationId)
      ? selectedGenerations.filter(g => g !== generationId)
      : [...selectedGenerations, generationId];

    setGenerations(newGenerations);
  };

  const handleClearAll = () => {
    setGenerations([]);
  };

  const getItemDisplayName = (item: { name: string }) => {
    // Convert "generation-i" to "Generation I"
    return item.name
      .split('-')
      .map(word => {
        // Handle Roman numerals - convert to uppercase
        if (
          word === 'i' ||
          word === 'ii' ||
          word === 'iii' ||
          word === 'iv' ||
          word === 'v' ||
          word === 'vi' ||
          word === 'vii' ||
          word === 'viii' ||
          word === 'ix'
        ) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const filterItems = pokemonGenerations.map(generation => ({
    id: generation.id,
    name: generation.name,
    url: generation.url,
  }));

  return {
    title: 'Generations',
    items: filterItems,
    selectedItems: selectedGenerations,
    onToggle: handleGenerationToggle,
    onClearAll: handleClearAll,
    isLoading,
    error,
    getItemDisplayName,
    badgeColor: 'bg-red-600',
    gridCols: 1,
    useTypeVariant: false,
  };
};

// Abilities Filter Configuration
export const useAbilitiesFilterConfig = () => {
  const selectedAbilities = usePokemonStore(state => state.filters.abilities);
  const setAbilities = usePokemonStore(state => state.setAbilities);
  const { abilities, isLoading, isLoadingMore, error, hasMore, loadMore, totalCount } = useAbilities();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAbilityToggle = (itemId: string | number) => {
    const abilityName = String(itemId);
    const newAbilities = selectedAbilities.includes(abilityName)
      ? selectedAbilities.filter(name => name !== abilityName)
      : [...selectedAbilities, abilityName];

    setAbilities(newAbilities);
  };

  const handleClearAll = () => {
    setAbilities([]);
  };

  const getItemDisplayName = (item: { name: string }) => formatAbilityName(item.name);

  const allItems = abilities.map((ability: Ability) => ({
    id: ability.name,
    name: ability.name,
    url: '',
  }));

  const filterItems = allItems.filter(item => getItemDisplayName(item).toLowerCase().includes(searchTerm.toLowerCase()));

  return {
    title: 'Abilities',
    items: filterItems,
    selectedItems: selectedAbilities,
    onToggle: handleAbilityToggle,
    onClearAll: handleClearAll,
    isLoading,
    error: error ? new Error(error) : null,
    getItemDisplayName,
    badgeColor: 'bg-red-600',
    gridCols: 1,
    useTypeVariant: false,
    searchTerm,
    onSearchChange: setSearchTerm,
    isLoadingMore,
    hasMore,
    onLoadMore: loadMore,
    totalCount,
  };
};
