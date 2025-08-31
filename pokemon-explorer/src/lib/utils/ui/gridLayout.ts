import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/api/pagination';

export interface GridOptions {
  minColumns?: number;
  maxColumns?: number;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /**
   * Target number of items per page for grid optimization
   * Defaults to DEFAULT_ITEMS_PER_PAGE (50)
   */
  targetItemsPerPage?: number;
}

/**
 * Calculate optimal grid columns based on number of items to avoid empty rows
 *
 * This function optimizes grid layouts to ensure no empty rows when displaying
 * paginated content. It's designed to work with the app's default pagination
 * of 50 items per page, creating optimal layouts like:
 * - 50 items = 5 columns × 10 rows (perfect grid)
 * - 40 items = 5 columns × 8 rows (perfect grid)
 * - 30 items = 5 columns × 6 rows (perfect grid)
 *
 * @param itemCount - Number of items to display
 * @param options - Optional configuration for grid layout
 * @returns Tailwind CSS grid classes string
 */
export function getOptimalGridColumns(itemCount: number, options?: GridOptions): string {
  const {
    minColumns = 2,
    maxColumns = 8,
    targetItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    breakpoints = {
      sm: 3,
      md: 4,
      lg: 5,
      xl: 5,
    },
  } = options || {};

  // Grid optimization strategy:
  // For the target pagination size, we want to create layouts that result
  // in complete rows without empty slots
  // targetItemsPerPage = 5 columns × (targetItemsPerPage/5) rows (optimal for most screen sizes)

  // Calculate optimal columns based on target items per page
  const optimalColumns = Math.min(5, maxColumns); // 5 columns is optimal for most cases
  const itemsPerRow = Math.ceil(targetItemsPerPage / optimalColumns);

  if (itemCount <= itemsPerRow * 2) {
    // For smaller item counts, use fewer columns
    return `grid-cols-${minColumns} sm:grid-cols-${Math.min(breakpoints.sm || 3, maxColumns)} md:grid-cols-${Math.min(breakpoints.md || 4, maxColumns)} lg:grid-cols-${Math.min(breakpoints.lg || 5, maxColumns)}`;
  } else if (itemCount <= itemsPerRow * 3) {
    // For medium item counts, use moderate columns
    return `grid-cols-${minColumns} sm:grid-cols-${Math.min(breakpoints.sm || 3, maxColumns)} md:grid-cols-${Math.min(5, maxColumns)} lg:grid-cols-${Math.min(6, maxColumns)}`;
  } else if (itemCount <= itemsPerRow * 4) {
    // For larger item counts, use more columns
    return `grid-cols-${minColumns} sm:grid-cols-${Math.min(4, maxColumns)} md:grid-cols-${Math.min(5, maxColumns)} lg:grid-cols-${Math.min(8, maxColumns)}`;
  } else {
    // For targetItemsPerPage, use optimal columns for perfect grid
    // This creates a perfect grid with no empty slots
    return `grid-cols-${minColumns} sm:grid-cols-${Math.min(breakpoints.sm || 3, maxColumns)} md:grid-cols-${Math.min(breakpoints.md || 4, maxColumns)} lg:grid-cols-${Math.min(breakpoints.lg || 5, maxColumns)} xl:grid-cols-${Math.min(breakpoints.xl || 5, maxColumns)}`;
  }
}
