'use client';

import { Location } from '@/types';
import { DetailModal } from '@/components/common/DetailModal';
import { ContentSection } from '@/components/common/ContentSection';
import { DataCard } from '@/components/common/DataCard';
import { StatsGrid } from '@/components/common/StatsGrid';
import {
  getLocationStats,
  getLocationDisplayName,
  getLocationRegion,
  getLocationGames,
  getLocationLanguages,
} from '@/lib/utils/locationDataUtils';
import { MapPin } from 'lucide-react';

interface LocationDetailModalProps {
  location: Location | null;
  isLoading: boolean;
  onClose: () => void;
}

export function LocationDetailModal({ location, isLoading, onClose }: LocationDetailModalProps) {
  if (!location) return null;

  const stats = getLocationStats(location);
  const displayName = getLocationDisplayName(location);
  const region = getLocationRegion(location);
  const games = getLocationGames(location);
  const languages = getLocationLanguages(location);

  return (
    <DetailModal
      isOpen={!!location}
      onClose={onClose}
      isLoading={isLoading}
      theme={{
        gradientFrom: 'from-green-100',
        gradientTo: 'to-green-200',
        borderColor: 'border-green-200',
        loadingColor: 'border-green-600',
      }}
      header={{
        imageUrl: null,
        imageAlt: `${location.name} location`,
        title: displayName,
        subtitle: `Location #${location.id}`,
        icon: <MapPin className="w-8 h-8 text-green-600" />,
      }}
    >
      <div className="space-y-6">
        {/* Basic Stats */}
        <StatsGrid
          stats={[
            {
              label: 'Areas',
              value: stats.areas.toString(),
              bgColor: 'bg-green-100',
              textColor: 'text-green-600',
            },
            {
              label: 'Games',
              value: stats.games.toString(),
              bgColor: 'bg-blue-100',
              textColor: 'text-blue-600',
            },
            {
              label: 'Languages',
              value: stats.languages.toString(),
              bgColor: 'bg-purple-100',
              textColor: 'text-purple-600',
            },
          ]}
        />

        {/* Region Information */}
        <ContentSection title="Region">
          <DataCard
            item={{ name: region, id: 0 }}
            onClick={() => {}}
            imageUrl={null}
            formatName={name => name}
            theme={{
              borderColor: 'border-green-200',
              gradientFrom: 'from-green-50',
              gradientTo: 'to-green-100',
            }}
            altText="Primary region for this location"
          />
        </ContentSection>

        {/* Areas */}
        {location.areas.length > 0 && (
          <ContentSection title="Areas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {location.areas.map((area, index) => (
                <DataCard
                  key={index}
                  item={{ name: area.name.replace('-', ' '), id: parseInt(area.url.split('/').slice(-2)[0]) }}
                  onClick={() => {}}
                  imageUrl={null}
                  formatName={name => name}
                  theme={{
                    borderColor: 'border-blue-200',
                    gradientFrom: 'from-blue-50',
                    gradientTo: 'to-blue-100',
                  }}
                  altText={`Area #${area.url.split('/').slice(-2)[0]}`}
                />
              ))}
            </div>
          </ContentSection>
        )}

        {/* Games */}
        {games.length > 0 && (
          <ContentSection title="Appears in Games">
            <div className="flex flex-wrap gap-2">
              {games.map((game, index) => (
                <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full capitalize">
                  {game.generation} (ID: {game.gameIndex})
                </span>
              ))}
            </div>
          </ContentSection>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <ContentSection title="Names in Different Languages">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900 capitalize">{lang.language}</span>
                  <span className="text-gray-600">{lang.name}</span>
                </div>
              ))}
            </div>
          </ContentSection>
        )}
      </div>
    </DetailModal>
  );
}
