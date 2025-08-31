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
  const openModal = usePokemonStore(state => state.openModal);

  if (isLoading) {
    return <GridSkeleton itemCount={20} theme={Theme.RED} />;
  }

  if (pokemonList.length === 0) {
    return <NoResults title="No Pokemon Found" description="Try adjusting your search or filters to find more Pokemon." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start">
      {pokemonList.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => openModal(pokemon.id)} />
      ))}
    </div>
  );
}
