'use client';

import { useAllLocationsDetails, useLocation } from '@/lib/hooks/usePokemon';
import { Location } from '@/types';
import { Map, X } from 'lucide-react';
import { SearchBar } from '@/components/filters/common/SearchBar';
import { Pagination } from '@/components/pagination/Pagination';
import { LocationDetailModal } from '@/components/locations/LocationDetailModal';
import { DataGrid } from '@/components/common/DataGrid';
import { useURLSync } from '@/lib/hooks/useURLSync';
import { createDataStore } from '@/lib/stores/dataStore';
import { formatName } from '@/lib/utils/dataUtils';
import { getImageUrl } from '@/lib/utils/imageUtils';
import { filterData, sortData } from '@/lib/utils/dataUtils';
import { paginateItems } from '@/lib/utils/pagination';
import { usePerformanceOptimization } from '@/lib/hooks/use-performance-optimization';
import { PerformanceIndicator } from '@/components/ui/performance-indicator';
import { useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { NoResults } from '@/components/common/NoResults';
import { PageHeader } from '@/components/common/PageHeader';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { PageLayout } from '@/components/common/PageLayout';
import { ImageType, Theme, NavigationLabel, SortField, SortDirection } from '@/lib/constants/enums';

const useLocationStore = createDataStore<Location>('location-store');

function LocationsPageContent() {
  const router = useRouter();

  const { data: allLocations, isLoading: isLoadingLocations, error: locationsError } = useAllLocationsDetails();

  const store = useLocationStore();
  const {
    setItemList: setLocationList,
    setLoading,
    setError,
    itemList: locationList,
    filters,
    sort,
    pagination,
    setCurrentPage,
    selectedItem: selectedLocation,
    setSelectedItem: setSelectedLocation,
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
    if (allLocations) {
      setLocationList(allLocations);
    }
  }, [allLocations, setLocationList]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoadingLocations);
  }, [isLoadingLocations, setLoading]);

  // Update error state
  useEffect(() => {
    setError(locationsError ? locationsError.message : null);
  }, [locationsError, setError]);

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
    const fullPath = `/locations${url}`;
    router.replace(fullPath, { scroll: false });
  }, [filters, sort, pagination, router, isUpdatingFromURL]);

  // Filter and sort locations
  const filteredAndSortedLocations = useMemo(() => {
    if (!locationList.length) return [];

    const filtered = filterData(locationList, filters);
    return sortData(filtered, sort);
  }, [locationList, filters, sort]);

  // Apply pagination to filtered and sorted results
  const paginatedResults = useMemo(() => {
    return paginateItems(filteredAndSortedLocations, pagination.currentPage, pagination.itemsPerPage);
  }, [filteredAndSortedLocations, pagination.currentPage, pagination.itemsPerPage]);

  // Update URL when pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: selectedLocationDetails, isLoading: isLoadingLocationDetails } = useLocation(selectedLocation ? selectedLocation.id : '');

  // Performance optimization
  const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(paginatedResults.items.length);

  const isLoading = isLoadingLocations;
  const error = locationsError;

  if (error) {
    return <ErrorDisplay title="Error Loading Locations" message={error.message} onRetry={() => window.location.reload()} />;
  }

  return (
    <PageLayout
      headerContent={
        <SearchBar placeholder="Search locations..." searchValue={filters.search} onSearchChange={setSearch} theme={Theme.GREEN} />
      }
    >
      <PageHeader
        title="Pokemon Locations Database"
        icon={<Map className="w-6 h-6 sm:w-8 sm:h-8" />}
        description="Explore all locations across different regions and discover what Pokemon you can find in each area."
        stats={{
          isLoading,
          totalItems: paginatedResults.totalItems,
          itemName: NavigationLabel.LOCATIONS.toLowerCase(),
          isFiltered: !!filters.search,
        }}
      />

      <PerformanceIndicator
        isVirtualized={useVirtualization}
        itemCount={paginatedResults.items.length}
        threshold={virtualizationThreshold}
      />

      <DataGrid
        items={paginatedResults.items}
        isLoading={isLoading}
        onItemClick={setSelectedLocation}
        imageUrl={location => getImageUrl(location.name, ImageType.LOCATION)}
        formatName={formatName}
        theme={{
          borderColor: 'hover:border-green-300',
          gradientFrom: 'from-green-100',
          gradientTo: 'to-green-200',
          skeletonTheme: Theme.GREEN,
        }}
        altText={location => `${location.name} location`}
      />

      {paginatedResults.totalPages > 1 && (
        <div className="mt-8 sm:mt-12">
          <Pagination currentPage={pagination.currentPage} totalPages={paginatedResults.totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      {!isLoading && filters.search && paginatedResults.totalItems === 0 && (
        <NoResults
          title="No locations found"
          description={`No locations match your search for "${filters.search}".`}
          action={{
            label: 'Clear search',
            onClick: () => setSearch(''),
            icon: <X className="w-4 h-4" />,
          }}
        />
      )}

      {selectedLocation && (
        <LocationDetailModal
          location={selectedLocationDetails || null}
          isLoading={isLoadingLocationDetails}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </PageLayout>
  );
}

export default function LocationsPage() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading locations...</p>
          </div>
        </PageLayout>
      }
    >
      <LocationsPageContent />
    </Suspense>
  );
}
