import { useQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';

export function usePokemonList(limit: number = 151, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => pokeAPI.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => pokeAPI.getPokemon(nameOrId),
    enabled: !!nameOrId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function usePokemonBatch(namesOrIds: (string | number)[]) {
  return useQuery({
    queryKey: ['pokemon-batch', namesOrIds],
    queryFn: () => pokeAPI.getPokemonBatch(namesOrIds),
    enabled: namesOrIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useTypes() {
  return useQuery({
    queryKey: ['types'],
    queryFn: () => pokeAPI.getTypes(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useType(nameOrId: string | number) {
  return useQuery({
    queryKey: ['type', nameOrId],
    queryFn: () => pokeAPI.getType(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useGenerations() {
  return useQuery({
    queryKey: ['generations'],
    queryFn: () => pokeAPI.getGenerations(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useGeneration(nameOrId: string | number) {
  return useQuery({
    queryKey: ['generation', nameOrId],
    queryFn: () => pokeAPI.getGeneration(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useAbilities() {
  return useQuery({
    queryKey: ['abilities'],
    queryFn: () => pokeAPI.getAbilities(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useAbility(nameOrId: string | number) {
  return useQuery({
    queryKey: ['ability', nameOrId],
    queryFn: () => pokeAPI.getAbility(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
