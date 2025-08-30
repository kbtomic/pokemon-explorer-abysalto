'use client';

import { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Pokemon } from '@/types';
import { PokemonCard } from '../pokemonCard/PokemonCard';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { NoResults } from '@/components/common/NoResults';
import { GridSkeleton } from '@/components/common/GridSkeleton';
import { Theme } from '@/lib/constants/enums';

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
    return <GridSkeleton itemCount={20} theme={Theme.RED} />;
  }

  if (pokemonList.length === 0) {
    return <NoResults title="No Pokemon Found" description="Try adjusting your search or filters to find more Pokemon." />;
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
