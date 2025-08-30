'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationContainer } from '@/components/pagination/PaginationContainer';
import { PaginationNavigationButton } from '@/components/pagination/PaginationNavigationButton';
import { PaginationPageNumbers } from '@/components/pagination/PaginationPageNumbers';
import { getVisiblePages, canNavigatePrevious, canNavigateNext } from '@/lib/utils/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer className={className}>
      <PaginationNavigationButton
        icon={ChevronsLeft}
        onClick={() => onPageChange(1)}
        disabled={!canNavigatePrevious(currentPage)}
        ariaLabel="Go to first page"
      />

      <PaginationNavigationButton
        icon={ChevronLeft}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canNavigatePrevious(currentPage)}
        ariaLabel="Go to previous page"
      />

      <PaginationPageNumbers visiblePages={visiblePages} currentPage={currentPage} onPageChange={onPageChange} />

      <PaginationNavigationButton
        icon={ChevronRight}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNavigateNext(currentPage, totalPages)}
        ariaLabel="Go to next page"
      />

      <PaginationNavigationButton
        icon={ChevronsRight}
        onClick={() => onPageChange(totalPages)}
        disabled={!canNavigateNext(currentPage, totalPages)}
        ariaLabel="Go to last page"
      />
    </PaginationContainer>
  );
}
