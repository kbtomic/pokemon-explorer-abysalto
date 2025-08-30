export interface PaginationResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function paginateItems<T>(items: T[], currentPage: number, itemsPerPage: number): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

export function getVisiblePages(currentPage: number, totalPages: number, delta: number = 2): (number | string)[] {
  const range = [];
  const rangeWithDots = [];

  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
}

export function isPageActive(currentPage: number, page: number): boolean {
  return currentPage === page;
}

export function canNavigateToPage(currentPage: number, targetPage: number, totalPages: number): boolean {
  return targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage;
}

export function canNavigatePrevious(currentPage: number): boolean {
  return currentPage > 1;
}

export function canNavigateNext(currentPage: number, totalPages: number): boolean {
  return currentPage < totalPages;
}
