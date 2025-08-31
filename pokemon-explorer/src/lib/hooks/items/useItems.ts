import { useQuery } from '@tanstack/react-query';
import { itemsAPI } from '@/lib/api/items';
import { ONE_HOUR, ONE_DAY } from '@/lib/constants/api/reactQuery';

export function useItems(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['items', limit, offset],
    queryFn: () => itemsAPI.getItemsPaginated(limit, offset),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function useAllItems(limit?: number, offset: number = 0) {
  return useQuery({
    queryKey: ['all-items', limit, offset],
    queryFn: () => itemsAPI.getItemsPaginated(limit, offset),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function useAllItemsDetails() {
  return useQuery({
    queryKey: ['all-items-details'],
    queryFn: () => itemsAPI.getAllItemsDetails(),
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}

export function useItem(nameOrId: string | number) {
  return useQuery({
    queryKey: ['item', nameOrId],
    queryFn: () => itemsAPI.getItem(nameOrId),
    enabled: !!nameOrId,
    staleTime: ONE_HOUR, // 1 hour
    gcTime: ONE_DAY, // 24 hours
  });
}
