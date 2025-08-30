import { PaginationButton } from '@/components/pagination/PaginationButton';
import { PaginationDots } from '@/components/pagination/PaginationDots';
import { isPageActive } from '@/lib/utils/pagination';

interface PaginationPageNumbersProps {
  visiblePages: (number | string)[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationPageNumbers({ visiblePages, currentPage, onPageChange }: PaginationPageNumbersProps) {
  return (
    <>
      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <PaginationDots />
          ) : (
            <PaginationButton
              page={page as number}
              isActive={isPageActive(currentPage, page as number)}
              onClick={() => onPageChange(page as number)}
            />
          )}
        </div>
      ))}
    </>
  );
}
