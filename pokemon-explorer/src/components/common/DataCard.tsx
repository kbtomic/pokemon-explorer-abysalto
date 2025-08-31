'use client';

import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { LocationIcon } from '@/components/common/LocationIcon';
import { cn } from '@/lib/utils/formatting/cn';

interface DataCardProps {
  item: {
    name: string;
    id?: number;
    url?: string;
  };
  onClick: () => void;
  imageUrl: string | null;
  formatName: (name: string) => string;
  theme: {
    borderColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
  altText?: string;
}

export function DataCard({ item, onClick, imageUrl, formatName, theme, altText }: DataCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg shadow-md p-3 sm:p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200',
        theme.borderColor
      )}
    >
      <div className="flex flex-col items-center space-y-2 sm:space-y-3">
        <div
          className={cn(
            'relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br rounded-full p-1.5 sm:p-2 flex items-center justify-center',
            theme.gradientFrom,
            theme.gradientTo
          )}
        >
          {imageUrl ? (
            <ImageWithFallback
              src={imageUrl}
              alt={altText || `${item.name}`}
              width={40}
              height={40}
              className="object-contain drop-shadow-sm"
              fallbackClassName="object-contain opacity-60"
              fallbackWidth={24}
              fallbackHeight={24}
            />
          ) : (
            <LocationIcon locationName={item.name} size={24} className="drop-shadow-sm" />
          )}
        </div>

        <div className="text-center">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 capitalize leading-tight">{formatName(item.name)}</h3>
        </div>
      </div>
    </div>
  );
}
