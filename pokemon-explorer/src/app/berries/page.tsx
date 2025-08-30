'use client';

import { useBerriesPaginated, useBerry } from '@/lib/hooks/use-pokemon';
import { Leaf, X } from 'lucide-react';
import { SearchBar } from '@/components/filters/common/SearchBar';
import { Pagination } from '@/components/pagination/Pagination';
import { BerryDetailModal } from '@/components/berries/BerryDetailModal';
import { BerryGrid } from '@/components/berries/BerryGrid';
import { useBerrySearch } from '@/lib/hooks/use-berry-search';
import { useBerryURLSync } from '@/lib/hooks/use-berry-url-sync';
import type { BerryBasic } from '@/types/pokemon';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { NoResults } from '@/components/common/NoResults';
import { PageHeader } from '@/components/common/PageHeader';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { PageLayout } from '@/components/common/PageLayout';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/pagination';
import { Theme } from '@/lib/constants/enums';

const BATCH_SIZE = 50;

function BerriesPageContent() {
  const [selectedBerry, setSelectedBerry] = useState<BerryBasic | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data: berriesData, isLoading, error, fetchNextPage } = useBerriesPaginated(BATCH_SIZE);

  // Extract all berries from paginated data
  const allBerries = berriesData?.pages.flatMap(page => page.results) || [];

  // URL synchronization for search and pagination
  const { isInitialized } = useBerryURLSync({
    onPageChange: setCurrentPage,
    onSearchChange: setSearchValue,
  });

  // Update URL when state changes
  useEffect(() => {
    if (!isInitialized) return;

    const params = new URLSearchParams();

    if (currentPage > 1) {
      params.set('page', currentPage.toString());
    }

    if (searchValue) {
      params.set('search', searchValue);
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : '';

    // Use the full path for proper URL handling
    const fullPath = `/berries${url}`;
    router.replace(fullPath, { scroll: false });
  }, [currentPage, searchValue, router, isInitialized]);

  // Use the custom hook for search and pagination logic
  const { paginatedResults } = useBerrySearch({
    berries: allBerries,
    searchValue,
    currentPage,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    onFetchMore: fetchNextPage,
  });

  // Fetch full berry details when a berry is selected
  const { data: selectedBerryDetails, isLoading: isLoadingBerryDetails } = useBerry(
    selectedBerry ? selectedBerry.url.split('/').slice(-2)[0] : ''
  );

  if (error) {
    return <ErrorDisplay title="Error Loading Berries" message={error.message} onRetry={() => window.location.reload()} />;
  }

  return (
    <PageLayout
      headerContent={
        <SearchBar placeholder="Search berries..." searchValue={searchValue} onSearchChange={setSearchValue} theme={Theme.GREEN} />
      }
    >
      <PageHeader
        title="Pokemon Berries Database"
        icon={<Leaf className="w-6 h-6 sm:w-8 sm:h-8" />}
        description="Explore all berries with detailed information about their growth, flavors, and uses."
        stats={{
          isLoading,
          totalItems: paginatedResults.totalItems,
          itemName: 'berries',
          isFiltered: !!searchValue,
        }}
      />

      <BerryGrid berries={paginatedResults.items} isLoading={isLoading} onBerryClick={setSelectedBerry} />

      {/* Pagination */}
      {paginatedResults.totalPages > 1 && (
        <div className="mt-8 sm:mt-12">
          <Pagination currentPage={paginatedResults.currentPage} totalPages={paginatedResults.totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {/* No results */}
      {!isLoading && searchValue && paginatedResults.totalItems === 0 && (
        <NoResults
          title="No berries found"
          description={`No berries match your search for "${searchValue}".`}
          action={{
            label: 'Clear search',
            onClick: () => setSearchValue(''),
            icon: <X className="w-4 h-4" />,
          }}
        />
      )}

      {/* Berry Detail Modal */}
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
