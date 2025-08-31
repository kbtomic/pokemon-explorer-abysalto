import { DetailModal } from '@/components/common/DetailModal';
import { StatsGrid } from '@/components/common/StatsGrid';
import { formatName } from '@/lib/utils/formatting/stringUtils';
import { getImageUrl } from '@/lib/utils/ui/imageUtils';
import { ImageType } from '@/lib/constants/enums';
import { BerryDataSection } from '@/components/berries/BerryDataSection';
import { getBerryStats } from '@/lib/utils/items/berryStats';
import { getBerryCharacteristics, getBerryFlavors } from '@/lib/utils/items/berryDataUtils';
import type { Berry } from '@/types/items/berries';

interface BerryDetailModalProps {
  berry: Berry | undefined;
  isLoading?: boolean;
  onClose: () => void;
}

export function BerryDetailModal({ berry, isLoading = false, onClose }: BerryDetailModalProps) {
  const berryImageUrl = berry ? getImageUrl(berry.name, ImageType.BERRY) : '';

  return (
    <DetailModal
      isOpen={!!berry}
      onClose={onClose}
      isLoading={isLoading}
      loadingText="Loading berry details..."
      theme={{
        gradientFrom: 'from-green-500',
        gradientTo: 'via-green-600 to-green-700',
        borderColor: 'border-green-300/50',
        loadingColor: 'border-green-600',
      }}
      header={{
        imageUrl: berryImageUrl,
        imageAlt: berry ? `${berry.name} berry` : '',
        title: berry ? `${formatName(berry.name)} Berry` : '',
        subtitle: berry ? `#${berry.id}` : '',
      }}
    >
      {berry && (
        <>
          <StatsGrid stats={getBerryStats(berry)} />
          <BerryDataSection title="Characteristics" data={getBerryCharacteristics(berry)} />
          <BerryDataSection title="Flavors" data={getBerryFlavors(berry)} />
        </>
      )}
    </DetailModal>
  );
}
