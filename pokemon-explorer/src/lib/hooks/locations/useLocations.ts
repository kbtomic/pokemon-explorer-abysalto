import { useQuery } from '@tanstack/react-query';
import { locationsAPI } from '@/lib/api/locations';
import { ONE_HOUR, ONE_DAY } from '@/lib/constants/api/reactQuery';

export function useLocations(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['locations', limit, offset],
    queryFn: () => locationsAPI.getLocationsPaginated(limit, offset),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function useLocation(nameOrId: string | number) {
  return useQuery({
    queryKey: ['location', nameOrId],
    queryFn: () => locationsAPI.getLocation(nameOrId),
    enabled: !!nameOrId,
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

// Hook to fetch all locations details with optimized chunking
export function useAllLocationsDetails() {
  return useQuery({
    queryKey: ['all-locations-details'],
    queryFn: () => locationsAPI.getAllLocationsDetails(),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
