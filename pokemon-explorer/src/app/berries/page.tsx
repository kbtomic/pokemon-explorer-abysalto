'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  useBerriesPaginated,
  useBerry,
  useBerryFirmness,
  useBerryFirmnessById,
  useBerryFlavors,
  useBerryFlavor,
} from '@/lib/hooks/use-pokemon';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { ArrowLeft, Leaf, Droplets, Flame, Zap, Heart, Shield, Sparkles, ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';

const BATCH_SIZE = 50;

interface BerryCardProps {
  berry: {
    name: string;
    url: string;
  };
  onClick: () => void;
}

function BerryCard({ berry, onClick }: BerryCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const berryImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name}-berry.png`;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Berry Image */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full p-2">
          {imageLoading && <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>}
          <Image
            src={berryImageUrl}
            alt={`${berry.name} berry`}
            width={48}
            height={48}
            className="object-contain drop-shadow-sm"
            onLoadingComplete={() => setImageLoading(false)}
          />
        </div>

        {/* Berry Name */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{berry.name.replace('-', ' ')}</h3>
        </div>
      </div>
    </div>
  );
}

interface BerryDetailModalProps {
  berry: {
    name: string;
    url: string;
  } | null;
  onClose: () => void;
}

function BerryDetailModal({ berry, onClose }: BerryDetailModalProps) {
  const berryId = berry ? berry.url.split('/').slice(-2)[0] : null;
  const { data: berryData, isLoading } = useBerry(berryId || '');
  const { data: firmness } = useBerryFirmnessById(berryData?.firmness?.name || '');
  const { data: flavor } = useBerryFlavor(berryData?.natural_gift_type?.name || '');

  if (!berry) return null;

  const getFlavorIcon = (flavorName: string) => {
    switch (flavorName) {
      case 'spicy':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'sweet':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'sour':
        return <Droplets className="w-4 h-4 text-yellow-500" />;
      case 'bitter':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'dry':
        return <Zap className="w-4 h-4 text-blue-500" />;
      default:
        return <Leaf className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full p-3">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name}-berry.png`}
                  alt={`${berry.name} berry`}
                  width={56}
                  height={56}
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{berry.name.replace('-', ' ')} Berry</h2>
                <p className="text-gray-600 dark:text-gray-400">#{berryId}</p>
              </div>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              ✕
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : berryData ? (
            <div className="space-y-6">
              {/* Basic Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{berryData.growth_time}h</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Growth Time</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{berryData.max_harvest}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Harvest</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{berryData.size}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Size</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{berryData.smoothness}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Smoothness</div>
                </div>
              </div>

              {/* Detailed Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Characteristics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Firmness:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{berryData.firmness?.name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Natural Gift Power:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{berryData.natural_gift_power}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Soil Dryness:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{berryData.soil_dryness}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Flavors</h3>
                  <div className="space-y-2">
                    {berryData.flavors?.map((flavor, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getFlavorIcon(flavor.flavor.name)}
                          <span className="text-gray-600 dark:text-gray-400 capitalize">{flavor.flavor.name}</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{flavor.potency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Unable to load berry details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BerriesPage() {
  const [selectedBerry, setSelectedBerry] = useState<{ name: string; url: string } | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: berriesData, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useBerriesPaginated(BATCH_SIZE);

  // Extract all berries from paginated data
  const allBerries = berriesData?.pages.flatMap(page => page.results) || [];
  const totalCount = berriesData?.pages[0]?.count || 0;

  // Load more berries
  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoadingMore(true);
      await fetchNextPage();
      setIsLoadingMore(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Berries</h2>
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
            <Button variant="outline" className="inline-flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            Pokemon Berries Database
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore all {totalCount} berries with detailed information about their growth, flavors, and uses.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400">Loading berries...</p>
          </div>
        )}

        {/* Berries Grid */}
        {!isLoading && berriesData && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {allBerries.length} of {totalCount} berries
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {allBerries.map(berry => (
                <BerryCard key={berry.name} berry={berry} onClick={() => setSelectedBerry(berry)} />
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
                      Loading more berries...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Load More Berries
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
                    width: `${Math.min((allBerries.length / totalCount) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p>
                Loaded {allBerries.length} of {totalCount} berries
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Berry Detail Modal */}
      <BerryDetailModal berry={selectedBerry} onClose={() => setSelectedBerry(null)} />
    </div>
  );
}
