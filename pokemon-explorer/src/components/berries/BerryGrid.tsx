'use client';

import { BerryCard } from './BerryCard';
import type { BerryBasic } from '@/types/pokemon';
import { DEFAULT_ITEMS_PER_PAGE } from '@/lib/constants/pagination';
import { getOptimalGridColumns } from '@/lib/utils/gridLayout';
import { GridSkeleton } from '@/components/common/GridSkeleton';
import { Theme } from '@/lib/constants/enums';

interface BerryGridProps {
  berries: BerryBasic[];
  isLoading?: boolean;
  onBerryClick: (berry: BerryBasic) => void;
}

export function BerryGrid({ berries, isLoading = false, onBerryClick }: BerryGridProps) {
  const gridColumns = getOptimalGridColumns(berries.length || DEFAULT_ITEMS_PER_PAGE);

  if (isLoading) {
    return <GridSkeleton itemCount={12} theme={Theme.GREEN} />;
  }

  return (
    <div className={`grid ${gridColumns} gap-4`}>
      {berries.map(berry => (
        <BerryCard key={berry.name} berry={berry} onClick={() => onBerryClick(berry)} />
      ))}
    </div>
  );
}
