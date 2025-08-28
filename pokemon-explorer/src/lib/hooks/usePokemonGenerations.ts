import { useState, useEffect } from 'react';
import { pokeAPI } from '@/lib/api/pokeapi';

interface PokemonGeneration {
  id: number;
  name: string;
  url: string;
}

interface UsePokemonGenerationsReturn {
  generations: PokemonGeneration[];
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonGenerations(): UsePokemonGenerationsReturn {
  const [generations, setGenerations] = useState<PokemonGeneration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        setIsLoading(true);
        setError(null);

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
        setGenerations(generationsWithId);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Pokemon generations'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchGenerations();
  }, []);

  return { generations, isLoading, error };
}
