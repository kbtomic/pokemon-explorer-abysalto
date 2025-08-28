'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { FiltersBar } from '@/components/filters/FiltersBar';
import { PokemonGrid } from '@/components/pokemon/pokemon-grid';
import { PokemonModal } from '@/components/pokemon/pokemon-modal';
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

  // Debug logging
  console.log('Filters:', filters);
  console.log('Pokemon count before filter:', pokemonList.length);
  console.log('Pokemon count after filter:', filteredPokemon.length);

  // Performance optimization
  const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(sortedPokemon.length);

  const isLoading = isLoadingList || isLoadingPokemon || isFetchingNextPage;
  const error = listError || pokemonError;

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center">
            <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Error Loading Pokemon</h2>
            <p className="text-sm sm:text-base text-red-500 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 bg-white border-b border-red-200">
        <Header />
        <div className="border-b border-red-200">
          <FiltersBar />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600">Pokemon Explorer</h2>
            <div className="text-sm sm:text-base text-red-500">
              {isLoading ? 'Loading...' : `${sortedPokemon.length} Pokemon found`}
              {pokemonListResponse && (
                <span className="ml-2 text-xs sm:text-sm">
                  (Loaded {allPokemonNames.length} of {pokemonListResponse.pages[0]?.count || 0})
                </span>
              )}
            </div>
          </div>
        </div>

        <PokemonGrid pokemonList={sortedPokemon} isLoading={isLoading} />

        {/* Load More Button */}
        {hasNextPage && (
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <Button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage || isLoadingMore}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
            >
              {isFetchingNextPage || isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                  Loading more Pokemon...
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Load More Pokemon
                </>
              )}
            </Button>
          </div>
        )}

        {/* Progress indicator */}
        {pokemonListResponse && (
          <div className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-red-500">
            <div className="w-full bg-red-200 rounded-full h-2 mb-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
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
