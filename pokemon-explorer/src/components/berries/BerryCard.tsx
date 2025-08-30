'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getBerryImageUrl, formatBerryName } from '@/lib/utils/berries';
import type { BerryBasic } from '@/types/pokemon';

interface BerryCardProps {
  berry: BerryBasic;
  onClick: () => void;
}

export function BerryCard({ berry, onClick }: BerryCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const berryImageUrl = getBerryImageUrl(berry.name);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-3 sm:p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 hover:border-green-300"
    >
      <div className="flex flex-col items-center space-y-2 sm:space-y-3">
        {/* Berry Image */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full p-1.5 sm:p-2">
          {imageLoading && <div className="w-full h-full bg-gray-200 rounded-full animate-pulse" />}
          <Image
            src={berryImageUrl}
            alt={`${berry.name} berry`}
            width={40}
            height={40}
            className="object-contain drop-shadow-sm"
            onLoadingComplete={() => setImageLoading(false)}
          />
        </div>

        {/* Berry Name */}
        <div className="text-center">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 capitalize leading-tight">{formatBerryName(berry.name)}</h3>
        </div>
      </div>
    </div>
  );
}
