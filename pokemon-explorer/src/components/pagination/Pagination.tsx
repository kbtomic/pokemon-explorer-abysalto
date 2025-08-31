'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationContainer } from '@/components/pagination/PaginationContainer';
import { PaginationNavigationButton } from '@/components/pagination/PaginationNavigationButton';
import { PaginationPageNumbers } from '@/components/pagination/PaginationPageNumbers';
import { getVisiblePages, canNavigatePrevious, canNavigateNext } from '@/lib/utils/pagination';
import { buildPaginationUrl } from '@/lib/utils/urlUtils';
import { PokemonFilters, SortOption } from '@/types';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  filters: PokemonFilters | { search: string };
  sort: SortOption;
  className?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl, filters, sort, className }: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  const buildUrl = (page: number) => {
    return buildPaginationUrl(baseUrl, filters, sort, page);
  };

  return (
    <PaginationContainer className={className}>
      <Link href={buildUrl(1)}>
        <PaginationNavigationButton icon={ChevronsLeft} disabled={!canNavigatePrevious(currentPage)} ariaLabel="Go to first page" />
      </Link>

      <Link href={buildUrl(currentPage - 1)}>
        <PaginationNavigationButton icon={ChevronLeft} disabled={!canNavigatePrevious(currentPage)} ariaLabel="Go to previous page" />
      </Link>

      <PaginationPageNumbers visiblePages={visiblePages} currentPage={currentPage} buildUrl={buildUrl} />

      <Link href={buildUrl(currentPage + 1)}>
        <PaginationNavigationButton icon={ChevronRight} disabled={!canNavigateNext(currentPage, totalPages)} ariaLabel="Go to next page" />
      </Link>

      <Link href={buildUrl(totalPages)}>
        <PaginationNavigationButton icon={ChevronsRight} disabled={!canNavigateNext(currentPage, totalPages)} ariaLabel="Go to last page" />
      </Link>
    </PaginationContainer>
  );
}
