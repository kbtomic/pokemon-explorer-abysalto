'use client';

import { useAllItemsDetails, useItem } from '@/lib/hooks/use-pokemon';
import { Item } from '@/types';
import { Package, X } from 'lucide-react';
import { SearchBar } from '@/components/filters/common/SearchBar';
import { Pagination } from '@/components/pagination/Pagination';
import { ItemDetailModal } from '@/components/items/ItemDetailModal';
import { DataGrid } from '@/components/common/DataGrid';
import { useURLSync } from '@/lib/hooks/useURLSync';
import { createDataStore } from '@/lib/stores/dataStore';
import { formatName, filterData, sortData } from '@/lib/utils/dataUtils';
import { getImageUrl } from '@/lib/utils/imageUtils';
import { paginateItems } from '@/lib/utils/pagination';
import { usePerformanceOptimization } from '@/lib/hooks/use-performance-optimization';
import { PerformanceIndicator } from '@/components/ui/performance-indicator';
import { ImageType, Theme } from '@/lib/constants/enums';
import { useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { NoResults } from '@/components/common/NoResults';
import { PageHeader } from '@/components/common/PageHeader';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { PageLayout } from '@/components/common/PageLayout';

// Create item store instance
const useItemStore = createDataStore<Item>('item-store');

function ItemsPageContent() {
  const router = useRouter();

  const { data: allItems, isLoading: isLoadingItems, error: itemsError } = useAllItemsDetails();

  const store = useItemStore();
  const {
    setItemList,
    setLoading,
    setError,
    itemList,
    filters,
    sort,
    pagination,
    setCurrentPage,
    selectedItem,
    setSelectedItem,
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
    if (allItems) {
      setItemList(allItems);
      console.log('Items: Loaded', allItems.length, 'items with full details');
    }
  }, [allItems, setItemList]);

  // Update loading state
  useEffect(() => {
    setLoading(isLoadingItems);
  }, [isLoadingItems, setLoading]);

  // Update error state
  useEffect(() => {
    setError(itemsError ? itemsError.message : null);
  }, [itemsError, setError]);

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

    if (sort.field !== 'id') {
      params.set('sortField', sort.field);
    }

    if (sort.direction !== 'asc') {
      params.set('sortDirection', sort.direction);
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : '';
    const fullPath = `/items${url}`;
    router.replace(fullPath, { scroll: false });
  }, [filters, sort, pagination, router, isUpdatingFromURL]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    if (!itemList.length) return [];

    const filtered = filterData(itemList, filters);
    return sortData(filtered, sort);
  }, [itemList, filters, sort]);

  // Apply pagination to filtered and sorted results
  const paginatedResults = useMemo(() => {
    return paginateItems(filteredAndSortedItems, pagination.currentPage, pagination.itemsPerPage);
  }, [filteredAndSortedItems, pagination.currentPage, pagination.itemsPerPage]);

  // Update URL when pagination changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch full item details when an item is selected
  const { data: selectedItemDetails, isLoading: isLoadingItemDetails } = useItem(selectedItem ? selectedItem.id : '');

  // Performance optimization
  const { useVirtualization, virtualizationThreshold } = usePerformanceOptimization(paginatedResults.items.length);

  const isLoading = isLoadingItems;
  const error = itemsError;

  if (error) {
    return <ErrorDisplay title="Error Loading Items" message={error.message} onRetry={() => window.location.reload()} />;
  }

  return (
    <PageLayout
      headerContent={<SearchBar placeholder="Search items..." searchValue={filters.search} onSearchChange={setSearch} theme={Theme.BLUE} />}
    >
      <PageHeader
        title="Pokemon Items Database"
        icon={<Package className="w-6 h-6 sm:w-8 sm:h-8" />}
        description="Explore all items with detailed information about their effects, costs, and uses."
        stats={{
          isLoading,
          totalItems: paginatedResults.totalItems,
          itemName: 'items',
          isFiltered: !!filters.search,
        }}
      />

      {/* Performance Indicator */}
      <PerformanceIndicator
        isVirtualized={useVirtualization}
        itemCount={paginatedResults.items.length}
        threshold={virtualizationThreshold}
      />

      <DataGrid
        items={paginatedResults.items}
        isLoading={isLoading}
        onItemClick={setSelectedItem}
        imageUrl={item => getImageUrl(item.name, ImageType.ITEM)}
        formatName={formatName}
        theme={{
          borderColor: 'hover:border-blue-300',
          gradientFrom: 'from-blue-100',
          gradientTo: 'to-blue-200',
          skeletonTheme: Theme.BLUE,
        }}
        altText={item => `${item.name} item`}
      />

      {paginatedResults.totalPages > 1 && (
        <div className="mt-8 sm:mt-12">
          <Pagination currentPage={pagination.currentPage} totalPages={paginatedResults.totalPages} onPageChange={handlePageChange} />
        </div>
      )}

      {!isLoading && filters.search && paginatedResults.totalItems === 0 && (
        <NoResults
          title="No items found"
          description={`No items match your search for "${filters.search}".`}
          action={{
            label: 'Clear search',
            onClick: () => setSearch(''),
            icon: <X className="w-4 h-4" />,
          }}
        />
      )}

      {selectedItem && (
        <ItemDetailModal item={selectedItemDetails} isLoading={isLoadingItemDetails} onClose={() => setSelectedItem(null)} />
      )}
    </PageLayout>
  );
}

export default function ItemsPage() {
  return (
    <Suspense
      fallback={
        <PageLayout>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading items...</p>
          </div>
        </PageLayout>
      }
    >
      <ItemsPageContent />
    </Suspense>
  );
}
