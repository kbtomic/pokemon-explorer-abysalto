import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface UseBerryURLSyncOptions {
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
}

export function useBerryURLSync({ onPageChange, onSearchChange }: UseBerryURLSyncOptions) {
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  // Initialize from URL on first load
  useEffect(() => {
    if (!isInitialized.current) {
      const urlPage = parseInt(searchParams.get('page') || '1', 10);
      const urlSearch = searchParams.get('search') || '';

      onPageChange(urlPage);
      onSearchChange(urlSearch);

      isInitialized.current = true;
    }
  }, [searchParams, onPageChange, onSearchChange]);

  return { isInitialized: isInitialized.current };
}
