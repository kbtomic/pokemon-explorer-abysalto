'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { DesktopFilterBar } from '@/components/filters/desktop/DesktopFilterBar';
import { MobileFilterBar } from '@/components/filters/mobile/MobileFilterBar';
import { PokemonGrid } from '@/components/pokemon/pokemon-grid';
import { PokemonModal } from '@/components/pokemonCard/pokemonModal/PokemonModal';
import { PerformanceIndicator } from '@/components/ui/performance-indicator';
import { useAllPokemon } from '@/lib/hooks/use-pokemon';
import { usePerformanceOptimization } from '@/lib/hooks/use-performance-optimization';
import { useGenerationMapping } from '@/lib/hooks/useGenerationMapping';
import { useURLSync } from '@/lib/hooks/useURLSync';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { useURLStore } from '@/lib/stores/urlStore';
import { filterPokemon, sortPokemon } from '@/lib/utils/pokemon';
import { paginateItems } from '@/lib/utils/pagination';
import { Pagination } from '@/components/pagination/Pagination';

export default function ExplorerPage() {
  const router = useRouter();

  const { data: allPokemon, isLoading: isLoadingPokemon, error: pokemonError } = useAllPokemon();

  const { setPokemonList, setLoading, setError, pokemonList, filters, sort, pagination, setCurrentPage } = usePokemonStore();

  const { updateSearchParams, syncWithRouter } = useURLStore();

  // Handle URL synchronization
  const { isUpdatingFromURL } = useURLSync();

  // Use dynamic generation mapping
  const { getGenerationFromId } = useGenerationMapping();

  // Update store with fetched data
  useEffect(() => {
    if (allPokemon) {
      setPokemonList(allPokemon);
    }
  }, [allPokemon, setPokemonList]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoadingPokemon);
  }, [isLoadingPokemon, setLoading]);

  // Update error state
  useEffect(() => {
    setError(pokemonError ? pokemonError.message : null);
  }, [pokemonError, setError]);

  // Sync store state to URL when filters, sort, or pagination change
  useEffect(() => {
    if (isUpdatingFromURL) return; // Prevent infinite loops

    updateSearchParams({
      search: filters.search,
      types: filters.types,
      generations: filters.generations,
      abilities: filters.abilities,
      stats: filters.stats,
      sortField: sort.field,
      sortDirection: sort.direction,
      page: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
    });
    syncWithRouter(router);
  }, [filters, sort, pagination, updateSearchParams, syncWithRouter, router, isUpdatingFromURL]);

  // Filter and sort Pokemon using dynamic generation mapping
  const filteredAndSortedPokemon = useMemo(() => {
    if (!pokemonList.length) return [];

    const filtered = filterPokemon(pokemonList, filters, getGenerationFromId);
    return sortPokemon(filtered, sort, getGenerationFromId);
  }, [pokemonList, filters, sort, getGenerationFromId]);

  // Apply pagination to filtered and sorted results
  const paginatedResults = useMemo(() => {
    return paginateItems(filteredAndSortedPokemon, pagination.currentPage, pagination.itemsPerPage);
  }, [filteredAndSortedPokemon, pagination.currentPage, pagination.itemsPerPage]);

  // Update URL when pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // URL will be updated automatically by the useEffect above
  };

  // Performance optimization
  const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(paginatedResults.items.length);

  const isLoading = isLoadingPokemon;
  const error = pokemonError;

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
      <div className="sticky top-0 z-40 bg-white ">
        <Header />
        <div className="border-b border-red-200">
          <DesktopFilterBar />
          <MobileFilterBar />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">Explore the Pokemon Universe</h2>
            <div className="text-sm sm:text-base text-red-500">
              {isLoading ? 'Loading...' : `${paginatedResults.totalItems} Pokemon found`}
              {filters.search || filters.types.length > 0 || filters.generations.length > 0 || filters.abilities.length > 0
                ? ' (filtered)'
                : ''}
            </div>
          </div>
        </div>

        <PokemonGrid pokemonList={paginatedResults.items} isLoading={isLoading} />

        {/* Pagination - replacing the old Load More button */}
        {paginatedResults.totalPages > 1 && (
          <Pagination currentPage={paginatedResults.currentPage} totalPages={paginatedResults.totalPages} onPageChange={handlePageChange} />
        )}
      </main>

      <PokemonModal />

      <PerformanceIndicator
        isVirtualized={useVirtualization}
        itemCount={paginatedResults.items.length}
        threshold={virtualizationThreshold}
      />
    </div>
  );
}
