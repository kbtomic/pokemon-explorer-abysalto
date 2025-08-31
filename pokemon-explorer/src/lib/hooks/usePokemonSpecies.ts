import { useQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';
import { CACHE_STRATEGIES } from '@/lib/constants/api/reactQuery';
import { getSpeciesIdFromPokemon } from '@/lib/utils/pokemon/pokemon';
import { Pokemon } from '@/types/pokemon/core';

export function usePokemonSpecies(pokemonOrSpeciesId: Pokemon | number) {
  const speciesId = typeof pokemonOrSpeciesId === 'number' ? pokemonOrSpeciesId : getSpeciesIdFromPokemon(pokemonOrSpeciesId);

  return useQuery({
    queryKey: ['pokemon-species', speciesId],
    queryFn: () => pokeAPI.getPokemonSpecies(speciesId!),
    enabled: !!speciesId,
    ...CACHE_STRATEGIES.DYNAMIC,
  });
}

export function useEvolutionChain(evolutionChainId: number | null) {
  return useQuery({
    queryKey: ['evolution-chain', evolutionChainId],
    queryFn: () => (evolutionChainId ? pokeAPI.getEvolutionChain(evolutionChainId) : null),
    enabled: evolutionChainId !== null,
    ...CACHE_STRATEGIES.DYNAMIC,
  });
}
