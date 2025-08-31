import { useQuery } from '@tanstack/react-query';

// Types for move metadata
interface MoveDamageClass {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: { name: string; url: string };
  }>;
}

interface MoveLearnMethod {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: { name: string; url: string };
  }>;
  descriptions: Array<{
    description: string;
    language: { name: string; url: string };
  }>;
}

interface MoveCategory {
  id: number;
  name: string;
  names: Array<{
    name: string;
    language: { name: string; url: string };
  }>;
  descriptions: Array<{
    description: string;
    language: { name: string; url: string };
  }>;
}

// Hook to fetch move damage classes (Physical, Special, Status)
export function useMoveDamageClasses() {
  return useQuery<MoveDamageClass[]>({
    queryKey: ['move-damage-classes'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/move-damage-class/');
      if (!response.ok) {
        throw new Error(`Failed to fetch move damage classes: ${response.statusText}`);
      }

      const data = await response.json();

      // Fetch details for each damage class
      const damageClasses = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const detailResponse = await fetch(item.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch damage class details: ${detailResponse.statusText}`);
          }
          return detailResponse.json();
        })
      );

      return damageClasses;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook to fetch move learn methods
export function useMoveLearnMethods() {
  return useQuery<MoveLearnMethod[]>({
    queryKey: ['move-learn-methods'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/move-learn-method/');
      if (!response.ok) {
        throw new Error(`Failed to fetch move learn methods: ${response.statusText}`);
      }

      const data = await response.json();

      // Fetch details for each learn method
      const learnMethods = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const detailResponse = await fetch(item.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch learn method details: ${detailResponse.statusText}`);
          }
          return detailResponse.json();
        })
      );

      return learnMethods;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook to fetch move categories
export function useMoveCategories() {
  return useQuery<MoveCategory[]>({
    queryKey: ['move-categories'],
    queryFn: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/move-category/');
      if (!response.ok) {
        throw new Error(`Failed to fetch move categories: ${response.statusText}`);
      }

      const data = await response.json();

      // Fetch details for each category
      const categories = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const detailResponse = await fetch(item.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch category details: ${detailResponse.statusText}`);
          }
          return detailResponse.json();
        })
      );

      return categories;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Comprehensive hook that combines all move metadata
export function useMoveMetadata() {
  const damageClassesQuery = useMoveDamageClasses();
  const learnMethodsQuery = useMoveLearnMethods();
  const categoriesQuery = useMoveCategories();

  const isLoading = damageClassesQuery.isLoading || learnMethodsQuery.isLoading || categoriesQuery.isLoading;
  const error = damageClassesQuery.error || learnMethodsQuery.error || categoriesQuery.error;
  const isError = damageClassesQuery.isError || learnMethodsQuery.isError || categoriesQuery.isError;

  return {
    damageClasses: damageClassesQuery.data || [],
    learnMethods: learnMethodsQuery.data || [],
    categories: categoriesQuery.data || [],
    isLoading,
    error,
    isError,
    refetch: () => {
      damageClassesQuery.refetch();
      learnMethodsQuery.refetch();
      categoriesQuery.refetch();
    },
  };
}
