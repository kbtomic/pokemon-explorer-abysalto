import Link from 'next/link';
import { PaginationButton } from '@/components/pagination/PaginationButton';
import { PaginationDots } from '@/components/pagination/PaginationDots';
import { isPageActive } from '@/lib/utils/pagination';

interface PaginationPageNumbersProps {
  visiblePages: (number | string)[];
  currentPage: number;
  buildUrl: (page: number) => string;
}

export function PaginationPageNumbers({ visiblePages, currentPage, buildUrl }: PaginationPageNumbersProps) {
  return (
    <>
      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <PaginationDots />
          ) : (
            <Link href={buildUrl(page as number)}>
              <PaginationButton page={page as number} isActive={isPageActive(currentPage, page as number)} />
            </Link>
          )}
        </div>
      ))}
    </>
  );
}
