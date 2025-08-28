import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { usePokemonTypes, usePokemonGenerations } from '@/lib/hooks';
import { getTypeColor } from '@/lib/utils';

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
