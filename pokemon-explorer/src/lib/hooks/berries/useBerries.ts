import { useQuery } from '@tanstack/react-query';
import { berriesAPI } from '@/lib/api/berries';
import { ONE_HOUR, ONE_DAY } from '@/lib/constants/api/reactQuery';

export function useBerries(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['berries', limit, offset],
    queryFn: () => berriesAPI.getBerriesPaginated(limit, offset),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function useBerry(nameOrId: string | number) {
  return useQuery({
    queryKey: ['berry', nameOrId],
    queryFn: () => berriesAPI.getBerry(nameOrId),
    enabled: !!nameOrId,
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

// Hook to fetch all berries details with optimized chunking
export function useAllBerriesDetails() {
  return useQuery({
    queryKey: ['all-berries-details'],
    queryFn: () => berriesAPI.getAllBerriesDetails(),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
