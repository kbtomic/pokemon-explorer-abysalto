'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { FiltersBar, PokemonGrid, PokemonModal } from '@/components/pokemon';
import { usePokemonList, usePokemonBatch } from '@/lib/hooks/use-pokemon';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { filterPokemon, sortPokemon } from '@/lib/utils/pokemon';

export default function ExplorerPage() {
  const { data: pokemonListResponse, isLoading: isLoadingList, error: listError } = usePokemonList(151);
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    error: pokemonError,
  } = usePokemonBatch(pokemonListResponse?.results.map(p => p.name) || []);

  const { setPokemonList, setLoading, setError, pokemonList, filters, sort } = usePokemonStore();

  // Update store with fetched data
  useEffect(() => {
    if (pokemonData) {
      setPokemonList(pokemonData);
    }
  }, [pokemonData, setPokemonList]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoadingList || isLoadingPokemon);
  }, [isLoadingList, isLoadingPokemon, setLoading]);

  // Update error state
  useEffect(() => {
    const error = listError || pokemonError;
    setError(error ? error.message : null);
  }, [listError, pokemonError, setError]);

  // Filter and sort Pokemon
  const filteredPokemon = filterPokemon(pokemonList, filters);
  const sortedPokemon = sortPokemon(filteredPokemon, sort);

  const isLoading = isLoadingList || isLoadingPokemon;
  const error = listError || pokemonError;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Pokemon</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <FiltersBar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pokemon Explorer</h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading...' : `${sortedPokemon.length} Pokemon found`}
            </div>
          </div>
        </div>

        <PokemonGrid pokemonList={sortedPokemon} isLoading={isLoading} />
      </main>

      <PokemonModal />
    </div>
  );
}
