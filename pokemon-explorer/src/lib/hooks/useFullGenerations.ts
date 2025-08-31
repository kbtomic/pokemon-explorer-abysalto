import { useQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';
import { CACHE_STRATEGIES } from '@/lib/constants/api/reactQuery';

export function useFullGenerations() {
  return useQuery({
    queryKey: ['full-generations'],
    queryFn: async () => {
      // First, get the list of all generations
      const generationsList = await pokeAPI.getGenerations();

      // Then fetch each generation's full data
      const fullGenerations = await Promise.all(
        generationsList.results.map(async gen => {
          const id = parseInt(gen.url.split('/').slice(-2)[0], 10);
          return await pokeAPI.getGeneration(id);
        })
      );

      return fullGenerations;
    },
    ...CACHE_STRATEGIES.STATIC,
  });
}
