import { useState, useEffect } from 'react';
import { pokeAPI } from '@/lib/api/pokeapi';

interface PokemonType {
  name: string;
  url: string;
}

interface UsePokemonTypesReturn {
  types: PokemonType[];
  isLoading: boolean;
  error: Error | null;
}

export function usePokemonTypes(): UsePokemonTypesReturn {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTypes() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await pokeAPI.getTypes();
        setTypes(response.results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Pokemon types'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchTypes();
  }, []);

  return { types, isLoading, error };
}
