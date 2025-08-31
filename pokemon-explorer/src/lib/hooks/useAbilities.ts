import { useInfiniteQuery } from '@tanstack/react-query';
import { pokeAPI } from '@/lib/api/pokeapi';
import { CACHE_STRATEGIES } from '@/lib/constants/api/reactQuery';

const BATCH_SIZE = 50;

export function useAbilities() {
  return useInfiniteQuery({
    queryKey: ['abilities'],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await pokeAPI.getAbilities();
      const allAbilityNames = response.results.map(ability => ability.name);

      const startIndex = pageParam;
      const endIndex = startIndex + BATCH_SIZE;
      const batchNames = allAbilityNames.slice(startIndex, endIndex);

      const abilityPromises = batchNames.map(abilityName => pokeAPI.getAbility(abilityName));
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
    ...CACHE_STRATEGIES.SEMI_STATIC,
  });
}
