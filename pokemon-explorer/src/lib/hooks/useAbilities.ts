import { useState, useEffect, useCallback } from 'react';
import { pokeAPI } from '@/lib/api/pokeapi';
import { Ability } from '@/types';

const BATCH_SIZE = 50;

export function useAbilities() {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [allAbilityNames, setAllAbilityNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Load initial batch of abilities
  useEffect(() => {
    const fetchInitialAbilities = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await pokeAPI.getAbilities();

        setAllAbilityNames(response.results.map(ability => ability.name));

        // Load first batch
        const firstBatch = response.results.slice(0, BATCH_SIZE);

        const abilityPromises = firstBatch.map(ability => pokeAPI.getAbility(ability.name));
        const abilitiesData = await Promise.all(abilityPromises);

        // Ensure no duplicates in initial load
        const uniqueAbilities = abilitiesData.filter((ability, index, self) => index === self.findIndex(a => a.name === ability.name));
        setAbilities(uniqueAbilities);

        setHasMore(response.results.length > BATCH_SIZE);
      } catch {
        setError('Failed to load abilities');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialAbilities();
  }, []);

  // Load more abilities
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const currentCount = abilities.length;
      const nextBatch = allAbilityNames.slice(currentCount, currentCount + BATCH_SIZE);

      if (nextBatch.length === 0) {
        setHasMore(false);
        return;
      }

      const abilityPromises = nextBatch.map(abilityName => pokeAPI.getAbility(abilityName));
      const newAbilities = await Promise.all(abilityPromises);

      setAbilities(prev => {
        const existingNames = new Set(prev.map(ability => ability.name));
        const uniqueNewAbilities = newAbilities.filter(ability => !existingNames.has(ability.name));
        return [...prev, ...uniqueNewAbilities];
      });
      setHasMore(currentCount + BATCH_SIZE < allAbilityNames.length);
    } catch {
      setError('Failed to load more abilities');
    } finally {
      setIsLoadingMore(false);
    }
  }, [abilities.length, allAbilityNames, hasMore, isLoadingMore]);

  return {
    abilities,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    totalCount: allAbilityNames.length,
  };
}
