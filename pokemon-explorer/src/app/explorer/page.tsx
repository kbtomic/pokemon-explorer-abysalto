'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { FiltersBar, PokemonGrid, PokemonModal } from '@/components/pokemon';
import { PerformanceIndicator, AccessibilityTester } from '@/components/ui';
import { usePokemonListPaginated, usePokemonBatchChunked } from '@/lib/hooks/use-pokemon';
import { usePerformanceOptimization } from '@/lib/hooks/use-performance-optimization';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { filterPokemon, sortPokemon } from '@/lib/utils/pokemon';
import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';

const BATCH_SIZE = 50;

export default function ExplorerPage() {
  const [loadedPokemon, setLoadedPokemon] = useState<any[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    data: pokemonListResponse,
    isLoading: isLoadingList,
    error: listError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonListPaginated(BATCH_SIZE);

  const { setPokemonList, setLoading, setError, pokemonList, filters, sort } = usePokemonStore();

  // Extract all Pokemon names from paginated data
  const allPokemonNames = pokemonListResponse?.pages.flatMap(page => page.results.map(p => p.name)) || [];

  // Load Pokemon details in chunks
  const { data: pokemonData, isLoading: isLoadingPokemon, error: pokemonError } = usePokemonBatchChunked(allPokemonNames, BATCH_SIZE);

  // Update loaded Pokemon when new data arrives
  useEffect(() => {
    if (pokemonData) {
      setLoadedPokemon(pokemonData);
    }
  }, [pokemonData]);

  // Update store with fetched data
  useEffect(() => {
    if (loadedPokemon.length > 0) {
      setPokemonList(loadedPokemon);
    }
  }, [loadedPokemon, setPokemonList]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoadingList || isLoadingPokemon || isFetchingNextPage);
  }, [isLoadingList, isLoadingPokemon, isFetchingNextPage, setLoading]);

  // Update error state
  useEffect(() => {
    const error = listError || pokemonError;
    setError(error ? error.message : null);
  }, [listError, pokemonError, setError]);

  // Load more Pokemon
  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoadingMore(true);
      await fetchNextPage();
      setIsLoadingMore(false);
    }
  };

  // Filter and sort Pokemon
  const filteredPokemon = filterPokemon(pokemonList, filters);
  const sortedPokemon = sortPokemon(filteredPokemon, sort);

  // Performance optimization
  const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(sortedPokemon.length);

  const isLoading = isLoadingList || isLoadingPokemon || isFetchingNextPage;
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
      <div className="sticky top-0 z-40 bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="border-b border-gray-200 dark:border-gray-700">
          <FiltersBar />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pokemon Explorer</h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading...' : `${sortedPokemon.length} Pokemon found`}
              {pokemonListResponse && (
                <span className="ml-2 text-xs">
                  (Loaded {allPokemonNames.length} of {pokemonListResponse.pages[0]?.count || 0})
                </span>
              )}
            </div>
          </div>
        </div>

        <PokemonGrid pokemonList={sortedPokemon} isLoading={isLoading} />

        {/* Load More Button */}
        {hasNextPage && (
          <div className="mt-8 text-center">
            <Button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage || isLoadingMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isFetchingNextPage || isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading more Pokemon...
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Load More Pokemon
                </>
              )}
            </Button>
          </div>
        )}

        {/* Progress indicator */}
        {pokemonListResponse && (
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((allPokemonNames.length / (pokemonListResponse.pages[0]?.count || 1)) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p>
              Loaded {allPokemonNames.length} of {pokemonListResponse.pages[0]?.count || 0} Pokemon
            </p>
          </div>
        )}
      </main>

      <PokemonModal />

      <PerformanceIndicator isVirtualized={useVirtualization} itemCount={sortedPokemon.length} threshold={virtualizationThreshold} />
      <AccessibilityTester />
    </div>
  );
}
