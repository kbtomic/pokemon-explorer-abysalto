import { DetailModal } from '@/components/common/DetailModal';
import { StatsGrid } from '@/components/common/StatsGrid';
import { formatName } from '@/lib/utils/dataUtils';
import { getImageUrl } from '@/lib/utils/imageUtils';
import { ImageType } from '@/lib/constants/enums';
import { BerryDataSection } from '@/components/berries/BerryDataSection';
import { getBerryStats } from '@/lib/utils/berryStats';
import { getBerryCharacteristics, getBerryFlavors } from '@/lib/utils/berryDataUtils';
import type { Berry } from '@/types/pokemon';

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
