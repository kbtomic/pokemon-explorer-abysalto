import { useQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';
import { CACHE_STRATEGIES } from '@/lib/constants/api/reactQuery';

export function usePokemonGenerations() {
  return useQuery({
    queryKey: ['pokemon-generations'],
    queryFn: async () => {
      const response = await pokeAPI.getGenerations();
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
    ...CACHE_STRATEGIES.STATIC,
  });
}
