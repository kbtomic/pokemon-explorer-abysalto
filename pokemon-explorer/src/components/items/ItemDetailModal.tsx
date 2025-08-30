'use client';

import { DetailModal } from '@/components/common/DetailModal';
import { StatsGrid } from '@/components/common/StatsGrid';
import { formatName } from '@/lib/utils/dataUtils';
import { getImageUrl } from '@/lib/utils/imageUtils';
import { getItemStats } from '@/lib/utils/itemStats';
import { ImageType } from '@/lib/constants/enums';
import { ItemEffectSection } from '@/components/items/ItemEffectSection';
import { ItemAttributesSection } from '@/components/items/ItemAttributesSection';
import { ItemHeldBySection } from '@/components/items/ItemHeldBySection';
import { ItemMachinesSection } from '@/components/items/ItemMachinesSection';
import { ItemCategoryDisplay } from '@/components/items/ItemCategoryDisplay';
import type { Item } from '@/types/pokemon';

interface ItemDetailModalProps {
  item: Item | undefined;
  isLoading?: boolean;
  onClose: () => void;
}

export function ItemDetailModal({ item, isLoading = false, onClose }: ItemDetailModalProps) {
  const itemImageUrl = item ? getImageUrl(item.name, ImageType.ITEM) || '' : '';

  return (
    <DetailModal
      isOpen={!!item}
      onClose={onClose}
      isLoading={isLoading}
      loadingText="Loading item details..."
      theme={{
        gradientFrom: 'from-blue-500',
        gradientTo: 'via-blue-600 to-blue-700',
        borderColor: 'border-blue-300/50',
        loadingColor: 'border-blue-600',
      }}
      header={{
        imageUrl: itemImageUrl,
        imageAlt: item ? `${item.name} item` : '',
        title: item ? formatName(item.name) : '',
        subtitle: item ? `#${item.id}` : '',
        icon: item ? <ItemCategoryDisplay item={item} /> : undefined,
      }}
    >
      {item && (
        <>
          <StatsGrid stats={getItemStats(item)} />
          <ItemEffectSection item={item} />
          <ItemAttributesSection item={item} />
          <ItemHeldBySection item={item} />
          <ItemMachinesSection item={item} />
        </>
      )}
    </DetailModal>
  );
}
