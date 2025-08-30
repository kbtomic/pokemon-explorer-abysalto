import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';

// New: Hook to fetch all Pokemon at once with enhanced caching and performance monitoring
export function useAllPokemon() {
  return useQuery({
    queryKey: ['all-pokemon'],
    queryFn: () => pokeAPI.getAllPokemonDetails(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2, // Retry failed requests
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// New: Hook to get all Pokemon list (names only) for quick access
export function useAllPokemonList() {
  return useQuery({
    queryKey: ['all-pokemon-list'],
    queryFn: () => pokeAPI.getAllPokemonList(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function usePokemonList(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemon-list', limit, offset],
    queryFn: () => pokeAPI.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// New: Paginated Pokemon list hook
export function usePokemonListPaginated(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ['pokemon-list-paginated', limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokeAPI.getPokemonPaginated(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
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

// New: Chunked Pokemon batch hook
export function usePokemonBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50) {
  return useQuery({
    queryKey: ['pokemon-batch-chunked', namesOrIds, chunkSize],
    queryFn: () => pokeAPI.getPokemonBatchChunked(namesOrIds, chunkSize),
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

export function useMove(nameOrId: string | number) {
  return useQuery({
    queryKey: ['move', nameOrId],
    queryFn: () => pokeAPI.getMove(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useBerries() {
  return useQuery({
    queryKey: ['berries'],
    queryFn: () => pokeAPI.getBerries(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Paginated Berries hook
export function useBerriesPaginated(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ['berries-paginated', limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokeAPI.getBerriesPaginated(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useBerry(nameOrId: string | number) {
  return useQuery({
    queryKey: ['berry', nameOrId],
    queryFn: () => pokeAPI.getBerry(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Hook to fetch all berries details with optimized chunking
export function useAllBerriesDetails() {
  return useQuery({
    queryKey: ['all-berries-details'],
    queryFn: () => pokeAPI.getAllBerriesDetails(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// New: Chunked Berries batch hook
export function useBerriesBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 25) {
  return useQuery({
    queryKey: ['berries-batch-chunked', namesOrIds, chunkSize],
    queryFn: () => pokeAPI.getBerriesBatchChunked(namesOrIds, chunkSize),
    enabled: namesOrIds.length > 0,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useBerryFirmness() {
  return useQuery({
    queryKey: ['berry-firmness'],
    queryFn: () => pokeAPI.getBerryFirmness(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useBerryFirmnessById(nameOrId: string | number) {
  return useQuery({
    queryKey: ['berry-firmness', nameOrId],
    queryFn: () => pokeAPI.getBerryFirmnessById(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useBerryFlavors() {
  return useQuery({
    queryKey: ['berry-flavors'],
    queryFn: () => pokeAPI.getBerryFlavors(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useBerryFlavor(nameOrId: string | number) {
  return useQuery({
    queryKey: ['berry-flavor', nameOrId],
    queryFn: () => pokeAPI.getBerryFlavor(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: () => pokeAPI.getItems(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Hook to fetch all items at once (like useAllPokemon)
export function useAllItems() {
  return useQuery({
    queryKey: ['all-items'],
    queryFn: () => pokeAPI.getItems(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Hook to fetch all items details with optimized chunking
export function useAllItemsDetails() {
  return useQuery({
    queryKey: ['all-items-details'],
    queryFn: () => pokeAPI.getAllItemsDetails(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1, // Reduce retries to fail faster
    retryDelay: 1000,
  });
}

// Fallback hook that tries full details first, then basic items
export function useAllItemsWithFallback() {
  const detailsQuery = useQuery({
    queryKey: ['all-items-details'],
    queryFn: () => pokeAPI.getAllItemsDetails(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    retryDelay: 1000,
  });

  const basicQuery = useQuery({
    queryKey: ['all-items-basic'],
    queryFn: () => pokeAPI.getItems(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    enabled: detailsQuery.isError, // Only run if details query fails
  });

  // Debug logging
  console.log('Items Fallback Hook State:', {
    detailsLoading: detailsQuery.isLoading,
    detailsError: detailsQuery.isError,
    detailsData: !!detailsQuery.data,
    basicLoading: basicQuery.isLoading,
    basicError: basicQuery.isError,
    basicData: !!basicQuery.data,
  });

  // Return the successful query
  if (detailsQuery.data) {
    return {
      data: detailsQuery.data,
      isLoading: detailsQuery.isLoading,
      error: detailsQuery.error,
      isUsingFallback: false,
    };
  }

  if (detailsQuery.isError && basicQuery.data) {
    // Convert basic items to format expected by store
    const convertedItems = basicQuery.data.results.map((item: any, index: number) => ({
      ...item,
      id: parseInt(item.url.split('/').slice(-2)[0]) || index + 1,
    }));
    return {
      data: convertedItems,
      isLoading: basicQuery.isLoading,
      error: basicQuery.error,
      isUsingFallback: true,
    };
  }

  return {
    data: undefined,
    isLoading: detailsQuery.isLoading || (detailsQuery.isError && basicQuery.isLoading),
    error: detailsQuery.error,
    isUsingFallback: false,
  };
}

// New: Paginated Items hook
export function useItemsPaginated(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ['items-paginated', limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokeAPI.getItemsPaginated(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useItem(nameOrId: string | number) {
  return useQuery({
    queryKey: ['item', nameOrId],
    queryFn: () => pokeAPI.getItem(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Chunked Items batch hook
export function useItemsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50) {
  return useQuery({
    queryKey: ['items-batch-chunked', namesOrIds, chunkSize],
    queryFn: () => pokeAPI.getItemsBatchChunked(namesOrIds, chunkSize),
    enabled: namesOrIds.length > 0,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useItemCategories() {
  return useQuery({
    queryKey: ['item-categories'],
    queryFn: () => pokeAPI.getItemCategories(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useItemCategory(nameOrId: string | number) {
  return useQuery({
    queryKey: ['item-category', nameOrId],
    queryFn: () => pokeAPI.getItemCategory(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useMachines() {
  return useQuery({
    queryKey: ['machines'],
    queryFn: () => pokeAPI.getMachines(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useMachine(nameOrId: string | number) {
  return useQuery({
    queryKey: ['machine', nameOrId],
    queryFn: () => pokeAPI.getMachine(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => pokeAPI.getLocations(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Paginated Locations hook
export function useLocationsPaginated(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ['locations-paginated', limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokeAPI.getLocationsPaginated(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useLocation(nameOrId: string | number) {
  return useQuery({
    queryKey: ['location', nameOrId],
    queryFn: () => pokeAPI.getLocation(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// New: Chunked Locations batch hook
export function useLocationsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50) {
  return useQuery({
    queryKey: ['locations-batch-chunked', namesOrIds, chunkSize],
    queryFn: () => pokeAPI.getLocationsBatchChunked(namesOrIds, chunkSize),
    enabled: namesOrIds.length > 0,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useLocationAreas() {
  return useQuery({
    queryKey: ['location-areas'],
    queryFn: () => pokeAPI.getLocationAreas(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useLocationArea(nameOrId: string | number) {
  return useQuery({
    queryKey: ['location-area', nameOrId],
    queryFn: () => pokeAPI.getLocationArea(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useRegions() {
  return useQuery({
    queryKey: ['regions'],
    queryFn: () => pokeAPI.getRegions(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useRegion(nameOrId: string | number) {
  return useQuery({
    queryKey: ['region', nameOrId],
    queryFn: () => pokeAPI.getRegion(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function usePokedexes() {
  return useQuery({
    queryKey: ['pokedexes'],
    queryFn: () => pokeAPI.getPokedexes(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function usePokedex(nameOrId: string | number) {
  return useQuery({
    queryKey: ['pokedex', nameOrId],
    queryFn: () => pokeAPI.getPokedex(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useVersions() {
  return useQuery({
    queryKey: ['versions'],
    queryFn: () => pokeAPI.getVersions(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useVersion(nameOrId: string | number) {
  return useQuery({
    queryKey: ['version', nameOrId],
    queryFn: () => pokeAPI.getVersion(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useVersionGroups() {
  return useQuery({
    queryKey: ['version-groups'],
    queryFn: () => pokeAPI.getVersionGroups(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useVersionGroup(nameOrId: string | number) {
  return useQuery({
    queryKey: ['version-group', nameOrId],
    queryFn: () => pokeAPI.getVersionGroup(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useEncounterMethods() {
  return useQuery({
    queryKey: ['encounter-methods'],
    queryFn: () => pokeAPI.getEncounterMethods(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useEncounterMethod(nameOrId: string | number) {
  return useQuery({
    queryKey: ['encounter-method', nameOrId],
    queryFn: () => pokeAPI.getEncounterMethod(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useEncounterConditions() {
  return useQuery({
    queryKey: ['encounter-conditions'],
    queryFn: () => pokeAPI.getEncounterConditions(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useEncounterCondition(nameOrId: string | number) {
  return useQuery({
    queryKey: ['encounter-condition', nameOrId],
    queryFn: () => pokeAPI.getEncounterCondition(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useEvolutionTriggers() {
  return useQuery({
    queryKey: ['evolution-triggers'],
    queryFn: () => pokeAPI.getEvolutionTriggers(),
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export function useEvolutionTrigger(nameOrId: string | number) {
  return useQuery({
    queryKey: ['evolution-trigger', nameOrId],
    queryFn: () => pokeAPI.getEvolutionTrigger(nameOrId),
    enabled: !!nameOrId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
