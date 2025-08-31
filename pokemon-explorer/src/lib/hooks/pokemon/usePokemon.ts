import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokemonAPI } from '@/lib/api/pokemon';
import { Pokemon } from '@/types/pokemon/core';
import { getSpeciesIdFromPokemon } from '@/lib/utils/pokemon/pokemon';
import { ONE_DAY, ONE_WEEK, FIVE_MINUTES, TEN_MINUTES, THIRTY_MINUTES, ONE_HOUR } from '@/lib/constants/api/reactQuery';

const BATCH_SIZE = 50;

// Hook to fetch all Pokemon at once with enhanced caching and performance monitoring
export function useAllPokemon() {
  return useQuery({
    queryKey: ['all-pokemon'],
    queryFn: () => pokemonAPI.getAllPokemonDetails(),
    staleTime: ONE_DAY, // 24 hours
    gcTime: ONE_WEEK, // 7 days
    retry: 2, // Retry failed requests
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook to get all Pokemon list (names only) for quick access
export function useAllPokemonList() {
  return useQuery({
    queryKey: ['all-pokemon-list'],
    queryFn: () => pokemonAPI.getAllPokemonList(),
    staleTime: ONE_DAY, // 24 hours
    gcTime: ONE_WEEK, // 7 days
  });
}

export function usePokemonList(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => pokemonAPI.getPokemonList(limit, offset),
    staleTime: FIVE_MINUTES, // 5 minutes
    gcTime: TEN_MINUTES, // 10 minutes
  });
}

// Paginated Pokemon list hook
export function usePokemonListPaginated(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ['pokemon-list-paginated', limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokemonAPI.getPokemonPaginated(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
    staleTime: FIVE_MINUTES, // 5 minutes
    gcTime: TEN_MINUTES, // 10 minutes
  });
}

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => pokemonAPI.getPokemon(nameOrId),
    enabled: !!nameOrId,
    staleTime: TEN_MINUTES, // 10 minutes
    gcTime: THIRTY_MINUTES, // 30 minutes
  });
}

export function usePokemonBatch(namesOrIds: (string | number)[]) {
  return useQuery({
    queryKey: ['pokemon-batch', namesOrIds],
    queryFn: () => pokemonAPI.getPokemonBatch(namesOrIds),
    enabled: namesOrIds.length > 0,
    staleTime: FIVE_MINUTES, // 5 minutes
    gcTime: TEN_MINUTES, // 10 minutes
  });
}

// Chunked Pokemon batch hook
export function usePokemonBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50) {
  return useQuery({
    queryKey: ['pokemon-batch-chunked', namesOrIds, chunkSize],
    queryFn: () => pokemonAPI.getPokemonBatchChunked(namesOrIds, chunkSize),
    enabled: namesOrIds.length > 0,
    staleTime: FIVE_MINUTES, // 5 minutes
    gcTime: TEN_MINUTES, // 10 minutes
  });
}

// Individual type hook - used in type effectiveness calculations
export function useType(nameOrId: string | number) {
  return useQuery({
    queryKey: ['type', nameOrId],
    queryFn: () => pokemonAPI.getType(nameOrId),
    enabled: !!nameOrId,
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

// Individual ability hook - used in AbilityCard
export function useAbility(nameOrId: string | number) {
  return useQuery({
    queryKey: ['ability', nameOrId],
    queryFn: () => pokemonAPI.getAbility(nameOrId),
    enabled: !!nameOrId,
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function useMove(nameOrId: string | number) {
  return useQuery({
    queryKey: ['move', nameOrId],
    queryFn: () => pokemonAPI.getMove(nameOrId),
    enabled: !!nameOrId,
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

// Pokemon generations with ID extraction - used in filters
export function usePokemonGenerations() {
  return useQuery({
    queryKey: ['pokemon-generations'],
    queryFn: async () => {
      const response = await pokemonAPI.getGenerations();
      // Extract ID from URL and create PokemonGeneration objects
      const generationsWithId = response.results.map(item => {
        const id = parseInt(item.url.split('/').slice(-2)[0], 10);
        return {
          id,
          name: item.name,
          url: item.url,
        };
      });
      return generationsWithId;
    },
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

// Full generation details - used in generation mapping
export function useFullGenerations() {
  return useQuery({
    queryKey: ['full-generations'],
    queryFn: async () => {
      // First, get the list of all generations
      const generationsList = await pokemonAPI.getGenerations();

      // Then fetch each generation's full data
      const fullGenerations = await Promise.all(
        generationsList.results.map(async gen => {
          const id = parseInt(gen.url.split('/').slice(-2)[0], 10);
          return await pokemonAPI.getGeneration(id);
        })
      );

      return fullGenerations;
    },
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

// Infinite abilities query - used in filters
export function useAbilitiesInfinite() {
  return useInfiniteQuery({
    queryKey: ['abilities-infinite'],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await pokemonAPI.getAbilities();
      const allAbilityNames = response.results.map(ability => ability.name);

      const startIndex = pageParam;
      const endIndex = startIndex + BATCH_SIZE;
      const batchNames = allAbilityNames.slice(startIndex, endIndex);

      const abilityPromises = batchNames.map(abilityName => pokemonAPI.getAbility(abilityName));
      const abilitiesData = await Promise.all(abilityPromises);

      return {
        abilities: abilitiesData,
        totalCount: allAbilityNames.length,
        hasMore: endIndex < allAbilityNames.length,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages.length * BATCH_SIZE;
      return lastPage.hasMore ? currentCount : undefined;
    },
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function usePokemonSpecies(pokemonOrSpeciesId: Pokemon | number) {
  const speciesId = typeof pokemonOrSpeciesId === 'number' ? pokemonOrSpeciesId : getSpeciesIdFromPokemon(pokemonOrSpeciesId);

  return useQuery({
    queryKey: ['pokemon-species', speciesId],
    queryFn: () => pokemonAPI.getPokemonSpecies(speciesId!),
    enabled: !!speciesId,
    staleTime: TEN_MINUTES, // 10 minutes
    gcTime: THIRTY_MINUTES, // 30 minutes
  });
}

export function useEvolutionChain(evolutionChainId: number | null) {
  return useQuery({
    queryKey: ['evolution-chain', evolutionChainId],
    queryFn: () => (evolutionChainId ? pokemonAPI.getEvolutionChain(evolutionChainId) : null),
    enabled: evolutionChainId !== null,
    staleTime: TEN_MINUTES, // 10 minutes
    gcTime: THIRTY_MINUTES, // 30 minutes
  });
}

// Pokemon types list - used in filters
export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemon-types'],
    queryFn: () => pokemonAPI.getTypes(),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}
