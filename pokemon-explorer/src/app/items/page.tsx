'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useItemsPaginated, useItem, useItemCategory } from '@/lib/hooks/use-pokemon';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header/Header';
import { ArrowLeft, Package, Star, Zap, Heart, Shield, Sword, ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ButtonSize, ButtonVariant } from '@/lib/constants/enums';

const BATCH_SIZE = 50;

interface ItemCardProps {
  item: {
    name: string;
    url: string;
  };
  onClick: () => void;
}

function ItemCard({ item, onClick }: ItemCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const itemImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Item Image */}
        <div className="relative w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full p-1">
          {imageLoading && <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>}
          <Image
            src={itemImageUrl}
            alt={`${item.name} item`}
            width={40}
            height={40}
            className="object-contain drop-shadow-sm"
            onLoadingComplete={() => setImageLoading(false)}
          />
        </div>

        {/* Item Name */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white capitalize">{item.name.replace('-', ' ')}</h3>
        </div>
      </div>
    </div>
  );
}

interface ItemDetailModalProps {
  item: {
    name: string;
    url: string;
  } | null;
  onClose: () => void;
}

function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const itemId = item ? item.url.split('/').slice(-2)[0] : null;
  const { data: itemData, isLoading } = useItem(itemId || '');
  const { data: category } = useItemCategory(itemData?.category?.name || '');

  if (!item) return null;

  const getItemIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'held-items':
      case 'bad-held-items':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'vitamins':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'battle-effect-items':
        return <Sword className="w-4 h-4 text-orange-500" />;
      case 'potion':
      case 'status-cures':
        return <Heart className="w-4 h-4 text-green-500" />;
      case 'stones':
        return <Star className="w-4 h-4 text-purple-500" />;
      case 'machines':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full p-3">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                  alt={`${item.name} item`}
                  width={56}
                  height={56}
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{item.name.replace('-', ' ')}</h2>
                <p className="text-gray-600 dark:text-gray-400">#{itemId}</p>
                {itemData?.category && (
                  <div className="flex items-center space-x-2 mt-2">
                    {getItemIcon(itemData.category.name)}
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{itemData.category.name.replace('-', ' ')}</span>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={onClose} variant={ButtonVariant.GHOST} size={ButtonSize.SM}>
              ✕
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : itemData ? (
            <div className="space-y-6">
              {/* Basic Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{itemData.cost}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Cost</div>
                </div>
                {itemData.fling_power && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{itemData.fling_power}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fling Power</div>
                  </div>
                )}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{itemData.attributes?.length || 0}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Attributes</div>
                </div>
                {itemData.held_by_pokemon && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{itemData.held_by_pokemon.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Held By</div>
                  </div>
                )}
              </div>

              {/* Description */}
              {itemData.effect_entries && itemData.effect_entries.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Effect</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      {itemData.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'No description available.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Flavor Text */}
              {itemData.flavor_text_entries && itemData.flavor_text_entries.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">In-Game Description</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      &ldquo;
                      {itemData.flavor_text_entries.find(
                        entry => entry.language.name === 'en' && entry.version_group.name === 'sword-shield'
                      )?.text ||
                        itemData.flavor_text_entries.find(entry => entry.language.name === 'en')?.text ||
                        'No flavor text available.'}
                      &rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Attributes */}
              {itemData.attributes && itemData.attributes.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Attributes</h3>
                  <div className="flex flex-wrap gap-2">
                    {itemData.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full capitalize"
                      >
                        {attr.name.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Held By Pokemon */}
              {itemData.held_by_pokemon && itemData.held_by_pokemon.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Held By Pokemon</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {itemData.held_by_pokemon.slice(0, 10).map((held, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white capitalize">{held.pokemon.name.replace('-', ' ')}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Rarity: {held.version_details[0]?.rarity || 'Unknown'}%
                        </span>
                      </div>
                    ))}
                  </div>
                  {itemData.held_by_pokemon.length > 10 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      And {itemData.held_by_pokemon.length - 10} more Pokemon...
                    </p>
                  )}
                </div>
              )}

              {/* Machines Info */}
              {itemData.machines && itemData.machines.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Machine Information</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      This item teaches a move to Pokemon. Available in {itemData.machines.length} version(s).
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Unable to load item details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState<{ name: string; url: string } | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data: itemsData, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useItemsPaginated(BATCH_SIZE);

  // Extract all items from paginated data
  const allItems = itemsData?.pages.flatMap(page => page.results) || [];
  const totalCount = itemsData?.pages[0]?.count || 0;

  // Load more items
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
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Items</h2>
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
            <Package className="w-8 h-8 text-blue-600" />
            Pokemon Items Database
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore all {totalCount} items with detailed information about their effects, costs, and uses.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400">Loading items...</p>
          </div>
        )}

        {/* Items Grid */}
        {!isLoading && itemsData && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {allItems.length} of {totalCount} items
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {allItems.map(item => (
                <ItemCard key={item.name} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="mt-8 text-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage || isLoadingMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isFetchingNextPage || isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading more items...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Load More Items
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((allItems.length / totalCount) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p>
                Loaded {allItems.length} of {totalCount} items
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
