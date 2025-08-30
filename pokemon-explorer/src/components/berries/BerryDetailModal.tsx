'use client';

import Image from 'next/image';
import { Modal } from '@/components/ui/modal';
import { formatBerryName, getBerryImageUrl } from '@/lib/utils/berries';
import { BerryStatsGrid } from './BerryStatsGrid';
import { BerryInfoSection } from './BerryInfoSection';
import { BerryInfoItem } from './BerryInfoItem';
import { BerryFlavorItem } from './BerryFlavorItem';
import type { Berry } from '@/types/pokemon';

interface BerryDetailModalProps {
  berry: Berry | undefined;
  isLoading?: boolean;
  onClose: () => void;
}

export function BerryDetailModal({ berry, isLoading = false, onClose }: BerryDetailModalProps) {
  if (!berry && !isLoading) return null;

  const berryImageUrl = berry ? getBerryImageUrl(berry.name) : '';

  const berryStats = berry
    ? [
        { label: 'Growth Time', value: `${berry.growth_time}h` },
        { label: 'Max Harvest', value: berry.max_harvest },
        { label: 'Size', value: berry.size },
        { label: 'Smoothness', value: berry.smoothness },
      ]
    : [];

  return (
    <Modal
      isOpen={!!berry || isLoading}
      onClose={onClose}
      title=""
      className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 border-green-300/50 backdrop-blur-xl"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600">Loading berry details...</span>
        </div>
      ) : berry ? (
        <>
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full p-3">
                <Image src={berryImageUrl} alt={`${berry.name} berry`} width={56} height={56} className="object-contain drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white capitalize">{formatBerryName(berry.name)} Berry</h2>
                <p className="text-white">#{berry.id}</p>
              </div>
            </div>
          </div>

          <BerryStatsGrid stats={berryStats} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BerryInfoSection title="Characteristics">
              <div className="space-y-3">
                <BerryInfoItem label="Firmness" value={formatBerryName(berry.firmness.name)} />
                <BerryInfoItem label="Natural Gift Power" value={berry.natural_gift_power} />
                <BerryInfoItem label="Soil Dryness" value={berry.soil_dryness} />
              </div>
            </BerryInfoSection>

            <BerryInfoSection title="Flavors">
              <div className="space-y-2">
                {berry.flavors?.map((flavor, index) => (
                  <BerryFlavorItem key={index} flavorName={flavor.flavor.name} potency={flavor.potency} />
                ))}
              </div>
            </BerryInfoSection>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Unable to load berry details.</p>
        </div>
      )}
    </Modal>
  );
}
