'use client';

import { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Pokemon } from '@/types';
import { PokemonCard } from './pokemon-card';
import { usePokemonStore } from '@/lib/stores/pokemon-store';

interface VirtualizedPokemonGridProps {
  pokemonList: Pokemon[];
  isLoading?: boolean;
}

export function VirtualizedPokemonGrid({ pokemonList, isLoading = false }: VirtualizedPokemonGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const openModal = usePokemonStore(state => state.openModal);

  // Calculate grid layout based on screen size
  const getGridConfig = () => {
    if (typeof window === 'undefined') return { cols: 5, itemWidth: 280, itemHeight: 320 };

    const width = window.innerWidth;
    if (width < 640) return { cols: 1, itemWidth: 280, itemHeight: 320 }; // sm
    if (width < 768) return { cols: 2, itemWidth: 280, itemHeight: 320 }; // md
    if (width < 1024) return { cols: 3, itemWidth: 280, itemHeight: 320 }; // lg
    if (width < 1280) return { cols: 4, itemWidth: 280, itemHeight: 320 }; // xl
    return { cols: 5, itemWidth: 280, itemHeight: 320 }; // 2xl
  };

  const gridConfig = getGridConfig();

  // Create rows of Pokemon for virtualization
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < pokemonList.length; i += gridConfig.cols) {
      result.push(pokemonList.slice(i, i + gridConfig.cols));
    }
    return result;
  }, [pokemonList, gridConfig.cols]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => gridConfig.itemHeight + 32, // item height + gap (32px = gap-y-8)
    overscan: 5, // Number of items to render outside of the visible area
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 w-full">
                <div className="text-center">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-8 mx-auto mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-6 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Pokemon Found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters to find more Pokemon.</p>
      </div>
    );
  }

  return (
    <div ref={parentRef} className="w-full h-full">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className="grid gap-6 gap-y-8"
                style={{
                  gridTemplateColumns: `repeat(${gridConfig.cols}, minmax(0, 1fr))`,
                }}
              >
                {row.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => openModal(pokemon.id)} />
                ))}
                {/* Fill empty slots in the last row */}
                {row.length < gridConfig.cols &&
                  Array.from({ length: gridConfig.cols - row.length }).map((_, index) => <div key={`empty-${index}`} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
