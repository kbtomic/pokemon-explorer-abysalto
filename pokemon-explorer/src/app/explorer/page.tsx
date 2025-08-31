'use client';

import { useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { DesktopFilterBar } from '@/components/filters/desktop/DesktopFilterBar';
import { MobileFilterBar } from '@/components/filters/mobile/MobileFilterBar';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { PokemonModal } from '@/components/pokemonCard/pokemonModal/PokemonModal';
import { PerformanceIndicator } from '@/components/ui/performance-indicator';
import { useAllPokemon } from '@/lib/hooks/usePokemon';
import { usePerformanceOptimization } from '@/lib/hooks/usePerformanceOptimization';
import { useGenerationMapping } from '@/lib/hooks/useGenerationMapping';
import { useURLSync } from '@/lib/hooks/useExplorerURLSync';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { useURLStore } from '@/lib/stores/urlStore';
import { filterPokemon, sortPokemon } from '@/lib/utils/pokemon';
import { paginateItems } from '@/lib/utils/pagination';
import { buildSearchParams, getNavigationUrl } from '@/lib/utils/urlUtils';
import { Pagination } from '@/components/pagination/Pagination';
import { NavigationLabel } from '@/lib/constants/enums';

function ExplorerPageContent() {
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

  // Performance optimization
  const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(paginatedResults.items.length);

  const isLoading = isLoadingPokemon;
  const error = pokemonError;

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Pokemon</h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-40 bg-white">
        <Header />
        <div className="border-b border-red-200">
          <DesktopFilterBar />
          <MobileFilterBar />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Performance Indicator */}
        <PerformanceIndicator
          isVirtualized={useVirtualization}
          itemCount={paginatedResults.items.length}
          threshold={virtualizationThreshold}
        />

        <PokemonGrid pokemonList={paginatedResults.items} isLoading={isLoading} />

        {!isLoading && paginatedResults.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={paginatedResults.totalPages}
              baseUrl={getNavigationUrl(NavigationLabel.POKEMON)}
              searchParams={buildSearchParams(filters, sort)}
            />
          </div>
        )}

        <PokemonModal />
      </div>
    </div>
  );
}

export default function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <div className="sticky top-0 z-40 bg-white">
            <Header />
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading explorer...</p>
            </div>
          </div>
        </div>
      }
    >
      <ExplorerPageContent />
    </Suspense>
  );
}
