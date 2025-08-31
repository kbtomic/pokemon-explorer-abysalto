import { formatPokemonName } from '@/lib/utils';
import { usePokemonSpecies } from '@/lib/hooks/usePokemonSpecies';
import { getEnglishGenus } from '@/lib/utils/speciesUtils';
import { PokemonTypeBadge } from '@/components/pokemonCard/PokemonTypeBadge';
import { Pokemon } from '@/types';

interface PokemonModalInfoProps {
  pokemon: Pokemon;
}

export function PokemonModalInfo({ pokemon }: PokemonModalInfoProps) {
  const { data: species, isLoading: speciesLoading } = usePokemonSpecies(pokemon);

  return (
    <div className="text-center space-y-3">
      <h3 className="text-2xl font-bold text-white capitalize tracking-wide transition-colors duration-200 drop-shadow-lg">
        {formatPokemonName(pokemon.name)}
      </h3>

      {species && !speciesLoading && <p className="text-sm text-red-100 italic font-medium">{getEnglishGenus(species)}</p>}

      <div className="flex items-center justify-center space-x-3 mt-4">
        {pokemon.types.map(type => (
          <PokemonTypeBadge key={type.type.name} typeName={type.type.name} />
        ))}
      </div>
    </div>
  );
}
