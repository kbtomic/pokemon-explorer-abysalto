'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocationsPaginated, useLocation, useLocationArea, useRegion } from '@/lib/hooks/use-pokemon';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header/Header';
import { ArrowLeft, Map, MapPin, Globe, Trees, Mountain, Waves, ChevronDown, Loader2 } from 'lucide-react';
import { ButtonSize, ButtonVariant } from '@/lib/constants/enums';

const BATCH_SIZE = 50;

interface LocationCardProps {
  location: {
    name: string;
    url: string;
  };
  onClick: () => void;
  region?: string;
}

function LocationCard({ location, onClick, region }: LocationCardProps) {
  const getLocationIcon = (locationName: string) => {
    if (locationName.includes('forest') || locationName.includes('jungle')) {
      return <Trees className="w-5 h-5 text-green-600" />;
    }
    if (locationName.includes('mountain') || locationName.includes('peak')) {
      return <Mountain className="w-5 h-5 text-brown-600" />;
    }
    if (locationName.includes('water') || locationName.includes('sea') || locationName.includes('ocean')) {
      return <Waves className="w-5 h-5 text-blue-600" />;
    }
    if (locationName.includes('cave') || locationName.includes('tunnel')) {
      return <Mountain className="w-5 h-5 text-gray-600" />;
    }
    return <MapPin className="w-5 h-5 text-red-600" />;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center space-x-3">
        {getLocationIcon(location.name)}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{location.name.replace('-', ' ')}</h3>
          {region && <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{region.replace('-', ' ')}</p>}
        </div>
      </div>
    </div>
  );
}

interface LocationDetailModalProps {
  location: {
    name: string;
    url: string;
  } | null;
  onClose: () => void;
}

function LocationDetailModal({ location, onClose }: LocationDetailModalProps) {
  const locationId = location ? location.url.split('/').slice(-2)[0] : null;
  const { data: locationData, isLoading } = useLocation(locationId || '');
  const { data: region } = useRegion(locationData?.region?.name || '');

  if (!location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full p-3">
                <MapPin className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{location.name.replace('-', ' ')}</h2>
                <p className="text-gray-600 dark:text-gray-400">Location #{locationId}</p>
                {locationData?.region && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 capitalize">{locationData.region.name.replace('-', ' ')} Region</p>
                )}
              </div>
            </div>
            <Button onClick={onClose} variant={ButtonVariant.GHOST} size={ButtonSize.SM}>
              ✕
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : locationData ? (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{locationData.areas.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Areas</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{locationData.game_indices.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Games</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{locationData.names.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
                </div>
              </div>

              {/* Areas */}
              {locationData.areas && locationData.areas.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Areas in this Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {locationData.areas.map((area, index) => (
                      <LocationAreaCard key={index} area={area} />
                    ))}
                  </div>
                </div>
              )}

              {/* Names in Different Languages */}
              {locationData.names && locationData.names.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Names in Different Languages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {locationData.names.map((name, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white capitalize">{name.language.name}</span>
                        <span className="text-gray-600 dark:text-gray-400">{name.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Games */}
              {locationData.game_indices && locationData.game_indices.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appears in Games</h3>
                  <div className="flex flex-wrap gap-2">
                    {locationData.game_indices.map((game, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full capitalize"
                      >
                        {game.generation.name.replace('-', ' ')} (ID: {game.game_index})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Unable to load location details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface LocationAreaCardProps {
  area: {
    name: string;
    url: string;
  };
}

function LocationAreaCard({ area }: LocationAreaCardProps) {
  const areaId = area.url.split('/').slice(-2)[0];
  const { data: areaData } = useLocationArea(areaId);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h4 className="font-medium text-gray-900 dark:text-white capitalize mb-2">{area.name.replace('-', ' ')}</h4>
      {areaData?.pokemon_encounters && areaData.pokemon_encounters.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">{areaData.pokemon_encounters.length} Pokemon can be found here</div>
      )}
      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Area #{areaId}</div>
    </div>
  );
}

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; url: string } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: locationsData, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useLocationsPaginated(BATCH_SIZE);

  // Extract all locations from paginated data
  const allLocations = locationsData?.pages.flatMap(page => page.results) || [];
  const totalCount = locationsData?.pages[0]?.count || 0;

  // Load more locations
  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoadingMore(true);
      await fetchNextPage();
      setIsLoadingMore(false);
    }
  };

  // Filter locations by selected region
  const filteredLocations = allLocations.filter(location => {
    if (!selectedRegion) return true;
    // This is a simplified filter - in a real app, you'd need to fetch location details
    return true; // For now, show all
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Locations</h2>
            <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant={ButtonVariant.OUTLINE} className="inline-flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Map className="w-8 h-8 text-green-600" />
            Pokemon Locations Database
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore all {totalCount} locations across different regions and discover what Pokemon you can find in each area.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400">Loading locations...</p>
          </div>
        )}

        {/* Locations Grid */}
        {!isLoading && locationsData && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredLocations.length} of {totalCount} locations
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLocations.map(location => (
                <LocationCard key={location.name} location={location} onClick={() => setSelectedLocation(location)} />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage || isLoadingMore}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {isFetchingNextPage || isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading more locations...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Load More Locations
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((allLocations.length / totalCount) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p>
                Loaded {allLocations.length} of {totalCount} locations
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Location Detail Modal */}
      <LocationDetailModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />
    </div>
  );
}
