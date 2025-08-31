import { useMemo } from 'react';
import { useFullGenerations } from './useFullGenerations';
import { getGenerationFromId as getGenerationFromIdUtil, clearGenerationMappingCache } from '@/lib/utils/generationMapping';
import { Generation } from '@/types';

/**
 * Hook that provides generation mapping functionality using actual PokeAPI data
 * @returns Object with generation mapping functions and loading state
 */
export function useGenerationMapping() {
  const { data: generations, isLoading, error } = useFullGenerations();

  // Memoized function to get generation from Pokemon ID
  const getGenerationFromId = useMemo(() => {
    return (pokemonId: number): number | null => {
      if (isLoading || error || !generations || generations.length === 0) {
        return null;
      }
      return getGenerationFromIdUtil(pokemonId, generations);
    };
  }, [generations, isLoading, error]);

  // Memoized function to get all Pokemon IDs for a generation
  const getPokemonIdsForGeneration = useMemo(() => {
    return (generationId: number): number[] => {
      if (isLoading || error || !generations || generations.length === 0) {
        return [];
      }

      const generation = generations.find((g: Generation) => g.id === generationId);
      if (!generation) return [];

      return generation.pokemon_species
        .map((species: { name: string; url: string }) => {
          const match = species.url.match(/\/pokemon-species\/(\d+)\//);
          return match ? parseInt(match[1], 10) : null;
        })
        .filter((id: number | null): id is number => id !== null)
        .sort((a: number, b: number) => a - b);
    };
  }, [generations, isLoading, error]);

  return {
    getGenerationFromId,
    getPokemonIdsForGeneration,
    generations,
    isLoading,
    error,
    clearCache: clearGenerationMappingCache,
  };
}
