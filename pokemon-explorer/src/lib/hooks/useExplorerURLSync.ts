import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { useURLStore } from '@/lib/stores/urlStore';
import { arraysEqual, statsEqual, sortOptionsEqual } from '@/lib/utils/interaction/comparison';
import { StatName } from '@/lib/constants/enums';

export function useURLSync() {
  const searchParams = useSearchParams();
  const {
    filters,
    sort,
    pagination,
    pokemonList,
    setSearch,
    setTypes,
    setGenerations,
    setAbilities,
    setStatRange,
    setSort,
    setCurrentPage,
    setItemsPerPage,
  } = usePokemonStore();
  const { initialize, getFiltersFromURL, getSortFromURL, getPaginationFromURL } = useURLStore();

  const isInitialized = useRef(false);
  const isUpdatingFromURL = useRef(false);
  const lastSearchParams = useRef<string>('');

  // Initialize URL store
  useEffect(() => {
    if (!isInitialized.current) {
      initialize(searchParams);
      isInitialized.current = true;
    }
  }, [searchParams, initialize]);

  // Sync URL to store only on initial load and browser navigation
  useEffect(() => {
    if (!isInitialized.current) return;

    const currentSearchParams = searchParams.toString();

    // Only sync if search params actually changed (browser navigation)
    if (currentSearchParams === lastSearchParams.current) return;

    lastSearchParams.current = currentSearchParams;

    const urlFilters = getFiltersFromURL(searchParams);
    const urlSort = getSortFromURL(searchParams);
    const { page, itemsPerPage } = getPaginationFromURL(searchParams);

    isUpdatingFromURL.current = true;

    // Update filters if they differ from URL
    if (urlFilters.search !== filters.search) {
      setSearch(urlFilters.search);
    }
    if (!arraysEqual(urlFilters.types, filters.types)) {
      setTypes(urlFilters.types);
    }
    if (!arraysEqual(urlFilters.generations, filters.generations)) {
      setGenerations(urlFilters.generations);
    }
    if (!arraysEqual(urlFilters.abilities, filters.abilities)) {
      setAbilities(urlFilters.abilities);
    }
    // Only sync stats if Pokemon data has loaded (originalStatRanges are set)
    if (pokemonList.length > 0 && !statsEqual(urlFilters.stats, filters.stats)) {
      // Update each stat individually
      Object.entries(urlFilters.stats).forEach(([statName, range]) => {
        setStatRange(statName as StatName, range);
      });
    }

    // Update sort if it differs from URL
    if (!sortOptionsEqual(urlSort, sort)) {
      setSort(urlSort);
    }

    // Update pagination if it differs from URL
    if (page !== pagination.currentPage) {
      setCurrentPage(page);
    }
    if (itemsPerPage !== pagination.itemsPerPage) {
      setItemsPerPage(itemsPerPage);
    }

    isUpdatingFromURL.current = false;
  }, [
    searchParams,
    getFiltersFromURL,
    getSortFromURL,
    getPaginationFromURL,
    filters.search,
    filters.types,
    filters.generations,
    filters.abilities,
    filters.stats,
    sort,
    pagination.currentPage,
    pagination.itemsPerPage,
    pokemonList.length,
    setSearch,
    setTypes,
    setGenerations,
    setAbilities,
    setStatRange,
    setSort,
    setCurrentPage,
    setItemsPerPage,
  ]);

  return { isUpdatingFromURL: isUpdatingFromURL.current };
}
