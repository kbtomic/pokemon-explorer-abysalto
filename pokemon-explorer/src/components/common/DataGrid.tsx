import { DataCard } from '@/components/common/DataCard';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/pagination';
import { getOptimalGridColumns } from '@/lib/utils/ui/gridLayout';
import { GridSkeleton } from '@/components/common/GridSkeleton';
import { Theme } from '@/lib/constants/enums';

interface DataGridProps<T extends { name: string; id?: number; url?: string }> {
  items: T[];
  isLoading?: boolean;
  onItemClick: (item: T) => void;
  imageUrl: (item: T) => string | null;
  formatName: (name: string) => string;
  theme: {
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
    skeletonTheme: Theme;
  };
  altText?: (item: T) => string;
}

export function DataGrid<T extends { name: string; id?: number; url?: string }>({
  items,
  isLoading = false,
  onItemClick,
  imageUrl,
  formatName,
  theme,
  altText,
}: DataGridProps<T>) {
  const gridColumns = getOptimalGridColumns(items.length || DEFAULT_ITEMS_PER_PAGE);

  if (isLoading) {
    return <GridSkeleton itemCount={12} theme={theme.skeletonTheme} />;
  }

  return (
    <div className={`grid ${gridColumns} gap-4`}>
      {items.map(item => {
        // Use ID if available, otherwise extract from URL
        const itemId = item.id || (item.url ? item.url.split('/').slice(-2)[0] : item.name);
        return (
          <DataCard
            key={`${item.name}-${itemId}`}
            item={item}
            onClick={() => onItemClick(item)}
            imageUrl={imageUrl(item)}
            formatName={formatName}
            theme={theme}
            altText={altText ? altText(item) : undefined}
          />
        );
      })}
    </div>
  );
}
