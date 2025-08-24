'use client';

import { Pokemon } from '@/types';
import { PokemonCard } from './pokemon-card';
import { usePokemonStore } from '@/lib/stores/pokemon-store';

interface PokemonGridProps {
  pokemonList: Pokemon[];
  isLoading?: boolean;
}

export function PokemonGrid({ pokemonList, isLoading = false }: PokemonGridProps) {
  const openModal = usePokemonStore(state => state.openModal);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="text-center">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Pokemon Found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters to find more Pokemon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemonList.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => openModal(pokemon.id)} />
      ))}
    </div>
  );
}
