import { useState, useEffect } from 'react';
import { pokeAPI } from '@/lib/api/pokeapi';
import { Generation } from '@/types';

interface UseFullGenerationsReturn {
  generations: Generation[];
  isLoading: boolean;
  error: Error | null;
}

export function useFullGenerations(): UseFullGenerationsReturn {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFullGenerations() {
      try {
        setIsLoading(true);
        setError(null);

        // First, get the list of all generations
        const generationsList = await pokeAPI.getGenerations();

        // Then fetch each generation's full data
        const fullGenerations = await Promise.all(
          generationsList.results.map(async gen => {
            const id = parseInt(gen.url.split('/').slice(-2)[0], 10);
            return await pokeAPI.getGeneration(id);
          })
        );

        setGenerations(fullGenerations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch full generation data'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchFullGenerations();
  }, []);

  return { generations, isLoading, error };
}
