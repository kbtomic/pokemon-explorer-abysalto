'use client';

import { useAllBerriesDetails, useBerry } from '@/lib/hooks/usePokemon';
import { Berry } from '@/types';
import { Leaf, X } from 'lucide-react';
import { SearchBar } from '@/components/filters/common/SearchBar';
import { Pagination } from '@/components/pagination/Pagination';
import { BerryDetailModal } from '@/components/berries/BerryDetailModal';
import { DataGrid } from '@/components/common/DataGrid';
import { useURLSync } from '@/lib/hooks/useURLSync';
import { createDataStore } from '@/lib/stores/dataStore';
import { formatName } from '@/lib/utils/dataUtils';
import { getImageUrl } from '@/lib/utils/imageUtils';
import { filterData, sortData } from '@/lib/utils/dataUtils';
import { paginateItems } from '@/lib/utils/pagination';
import { getNavigationUrl } from '@/lib/utils/urlUtils';
import { useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { NoResults } from '@/components/common/NoResults';
import { PageHeader } from '@/components/common/PageHeader';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { PageLayout } from '@/components/common/PageLayout';
import { ImageType, Theme, NavigationLabel, SortField, SortDirection } from '@/lib/constants/enums';

const useBerryStore = createDataStore<Berry>('berry-store');

function BerriesPageContent() {
  const router = useRouter();

  const { data: allBerries, isLoading: isLoadingBerries, error: berriesError } = useAllBerriesDetails();

  const store = useBerryStore();
  const {
    setItemList: setBerryList,
    setLoading,
    setError,
    itemList: berryList,
    filters,
    sort,
    pagination,
    setCurrentPage,
    selectedItem: selectedBerry,
    setSelectedItem: setSelectedBerry,
    setSearch,
    setSort,
  } = store;

  // Handle URL synchronization
  const { isUpdatingFromURL } = useURLSync({
    setSearch,
    setSort,
    setCurrentPage,
  });

  // Update store with fetched data
  useEffect(() => {
    if (allBerries) {
      setBerryList(allBerries);
    }
  }, [allBerries, setBerryList]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoadingBerries);
  }, [isLoadingBerries, setLoading]);

  // Update error state
  useEffect(() => {
    setError(berriesError ? berriesError.message : null);
  }, [berriesError, setError]);

  // Sync store state to URL when filters, sort, or pagination change
  useEffect(() => {
    if (isUpdatingFromURL) return; // Prevent infinite loops

    const params = new URLSearchParams();

    if (pagination.currentPage > 1) {
      params.set('page', pagination.currentPage.toString());
    }

    if (filters.search) {
      params.set('search', filters.search);
    }

    if (sort.field !== SortField.ID) {
      params.set('sortField', sort.field);
    }

    if (sort.direction !== SortDirection.ASC) {
      params.set('sortDirection', sort.direction);
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : '';
    const fullPath = `/berries${url}`;
    router.replace(fullPath, { scroll: false });
  }, [filters, sort, pagination, router, isUpdatingFromURL]);

  // Filter and sort berries
  const filteredAndSortedBerries = useMemo(() => {
    if (!berryList.length) return [];

    const filtered = filterData(berryList, filters);
    return sortData(filtered, sort);
  }, [berryList, filters, sort]);

  // Apply pagination to filtered and sorted results
  const paginatedResults = useMemo(() => {
    return paginateItems(filteredAndSortedBerries, pagination.currentPage, pagination.itemsPerPage);
  }, [filteredAndSortedBerries, pagination.currentPage, pagination.itemsPerPage]);

  const { data: selectedBerryDetails, isLoading: isLoadingBerryDetails } = useBerry(selectedBerry ? selectedBerry.id : '');

  // Performance optimization - currently not used
  // const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(paginatedResults.items.length);

  const isLoading = isLoadingBerries;
  const error = berriesError;

  if (error) {
    return <ErrorDisplay title="Error Loading Berries" message={error.message} onRetry={() => window.location.reload()} />;
  }

  return (
    <PageLayout
      headerContent={
        <SearchBar placeholder="Search berries..." searchValue={filters.search} onSearchChange={setSearch} theme={Theme.GREEN} />
      }
    >
      <PageHeader
        title="Pokemon Berries Database"
        icon={<Leaf className="w-6 h-6 sm:w-8 sm:h-8" />}
        description="Explore all berries with detailed information about their growth, flavors, and uses."
        stats={{
          isLoading,
          totalItems: paginatedResults.totalItems,
          itemName: NavigationLabel.BERRIES.toLowerCase(),
          isFiltered: !!filters.search,
        }}
      />

      <DataGrid
        items={paginatedResults.items}
        isLoading={isLoading}
        onItemClick={setSelectedBerry}
        imageUrl={berry => getImageUrl(berry.name, ImageType.BERRY)}
        formatName={formatName}
        theme={{
          borderColor: 'hover:border-green-300',
          gradientFrom: 'from-green-100',
          gradientTo: 'to-green-200',
          skeletonTheme: Theme.GREEN,
        }}
        altText={berry => `${berry.name} berry`}
      />

      {paginatedResults.totalPages > 1 && (
        <div className="mt-8 sm:mt-12">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={paginatedResults.totalPages}
            baseUrl={getNavigationUrl(NavigationLabel.BERRIES)}
            filters={filters}
            sort={sort}
          />
        </div>
      )}

      {!isLoading && filters.search && paginatedResults.totalItems === 0 && (
        <NoResults
          title="No berries found"
          description={`No berries match your search for "${filters.search}".`}
          action={{
            label: 'Clear search',
            onClick: () => setSearch(''),
            icon: <X className="w-4 h-4" />,
          }}
        />
      )}

      {selectedBerry && (
        <BerryDetailModal berry={selectedBerryDetails} isLoading={isLoadingBerryDetails} onClose={() => setSelectedBerry(null)} />
      )}
    </PageLayout>
  );
}

export default function BerriesPage() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading berries...</p>
          </div>
        </PageLayout>
      }
    >
      <BerriesPageContent />
    </Suspense>
  );
}
