import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SortDirection, SortField } from '@/lib/constants/pokemon/sorting';

interface URLParams {
  page: number;
  search: string;
  sortField: string;
  sortDirection: string;
}

interface StoreActions {
  setSearch: (search: string) => void;
  setSort: (sort: { field: SortField; direction: SortDirection }) => void;
  setCurrentPage: (page: number) => void;
}

export function useURLSync(storeActions: StoreActions) {
  const [isUpdatingFromURL, setIsUpdatingFromURL] = useState(false);
  const searchParams = useSearchParams();

  const { setSearch, setSort, setCurrentPage } = storeActions;

  // Parse URL parameters
  const parseFromURL = (params: URLSearchParams): URLParams => {
    const page = parseInt(params.get('page') || '1', 10);
    const search = params.get('search') || '';
    const sortField = params.get('sortField') || SortField.ID;
    const sortDirection = params.get('sortDirection') || SortDirection.ASC;

    return {
      page,
      search,
      sortField,
      sortDirection,
    };
  };

  // Initialize store from URL on mount
  useEffect(() => {
    if (!searchParams) return;

    setIsUpdatingFromURL(true);
    const urlParams = parseFromURL(searchParams);

    // Update store with URL parameters
    setSearch(urlParams.search);
    setSort({
      field: urlParams.sortField as SortField,
      direction: urlParams.sortDirection as SortDirection,
    });
    setCurrentPage(urlParams.page);

    setIsUpdatingFromURL(false);
  }, [searchParams, setSearch, setSort, setCurrentPage]);

  return {
    isUpdatingFromURL,
  };
}
