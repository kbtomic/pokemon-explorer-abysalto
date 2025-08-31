import { useQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';
import { CACHE_STRATEGIES } from '@/lib/constants';

export function usePokemonSpecies(pokemonId: number) {
  return useQuery({
    queryKey: ['pokemon-species', pokemonId],
    queryFn: () => pokeAPI.getPokemonSpecies(pokemonId),
    enabled: !!pokemonId,
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
