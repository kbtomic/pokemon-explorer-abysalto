import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';
import type { PokemonSpecies, Ability } from '@/types';
import { LanguageCode, VersionGroup } from '@/lib/constants/enums';

export function usePokemonSpecies(pokemonId: number) {
  return useQuery({
    queryKey: ['pokemon-species', pokemonId],
    queryFn: () => pokeAPI.getPokemonSpecies(pokemonId),
    enabled: !!pokemonId,
  });
}

// New: Paginated Pokemon Species list hook
export function usePokemonSpeciesListPaginated(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ['pokemon-species-list-paginated', limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokeAPI.getPokemonSpeciesPaginated(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function usePokemonSpeciesBatch(namesOrIds: (string | number)[]) {
  return useQuery({
    queryKey: ['pokemon-species-batch', namesOrIds],
    queryFn: () => pokeAPI.getPokemonSpeciesBatch(namesOrIds),
    enabled: namesOrIds.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// New: Chunked Pokemon Species batch hook
export function usePokemonSpeciesBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50) {
  return useQuery({
    queryKey: ['pokemon-species-batch-chunked', namesOrIds, chunkSize],
    queryFn: () => pokeAPI.getPokemonSpeciesBatchChunked(namesOrIds, chunkSize),
    enabled: namesOrIds.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function usePokemonHabitats() {
  return useQuery({
    queryKey: ['pokemon-habitats'],
    queryFn: () => pokeAPI.getPokemonHabitats(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (habitats don't change often)
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

export function usePokemonShapes() {
  return useQuery({
    queryKey: ['pokemon-shapes'],
    queryFn: () => pokeAPI.getPokemonShapes(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (shapes don't change often)
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

export function usePokemonColors() {
  return useQuery({
    queryKey: ['pokemon-colors'],
    queryFn: () => pokeAPI.getPokemonColors(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (colors don't change often)
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
}

// Utility function to get English flavor text
export function getEnglishFlavorText(species: PokemonSpecies): string {
  const englishEntry = species.flavor_text_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.flavor_text || 'No description available.';
}

// Utility function to get English genus
export function getEnglishGenus(species: PokemonSpecies): string {
  const englishEntry = species.genera.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.genus || 'Unknown';
}

// Utility function to get English name
export function getEnglishName(species: PokemonSpecies): string {
  const englishEntry = species.names.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.name || species.name;
}

export function useEvolutionChain(evolutionChainId: number | null) {
  return useQuery({
    queryKey: ['evolution-chain', evolutionChainId],
    queryFn: () => (evolutionChainId ? pokeAPI.getEvolutionChain(evolutionChainId) : null),
    enabled: evolutionChainId !== null,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Utility function to get English ability effect
export function getEnglishAbilityEffect(ability: Ability): string {
  const englishEntry = ability.effect_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.effect || 'No description available.';
}

// Utility function to get English ability flavor text
export function getEnglishAbilityFlavorText(ability: Ability): string {
  const englishEntry =
    ability.flavor_text_entries.find(
      entry => entry.language.name === LanguageCode.ENGLISH && entry.version_group.name === VersionGroup.SWORD_SHIELD
    ) || ability.flavor_text_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.flavor_text || '';
}
