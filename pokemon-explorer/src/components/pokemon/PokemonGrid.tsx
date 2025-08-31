import { Pokemon } from '@/types/pokemon/core';
import { PokemonCard } from '@/components/pokemonCard/PokemonCard';
import { VirtualizedPokemonGrid } from '@/components/pokemon/VirtualizedPokemonGrid';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { usePerformanceOptimization } from '@/lib/hooks/usePerformanceOptimization';
import { NoResults } from '@/components/common/NoResults';
import { GridSkeleton } from '@/components/common/GridSkeleton';
import { Theme } from '@/lib/constants/enums';

interface PokemonGridProps {
  pokemonList: Pokemon[];
  isLoading?: boolean;
}

export function PokemonGrid({ pokemonList, isLoading = false }: PokemonGridProps) {
  const openModal = usePokemonStore(state => state.openModal);
  const { useVirtualization } = usePerformanceOptimization(pokemonList.length);

  // Use virtualized grid for better performance with large lists
  if (useVirtualization) {
    return <VirtualizedPokemonGrid pokemonList={pokemonList} isLoading={isLoading} />;
  }

  if (isLoading) {
    return <GridSkeleton itemCount={20} theme={Theme.RED} />;
  }

  if (pokemonList.length === 0) {
    return <NoResults title="No Pokemon Found" description="Try adjusting your search or filters to find more Pokemon." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => openModal(pokemon.id)}
          priority={index < 10} // Priority for first 10 cards (above the fold)
        />
      ))}
    </div>
  );
}
