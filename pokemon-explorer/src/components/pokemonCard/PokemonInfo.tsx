import { formatPokemonName } from '@/lib/utils/pokemon/pokemon';
import { usePokemonSpecies } from '@/lib/hooks/pokemon/usePokemon';
import { getEnglishGenus } from '@/lib/utils/pokemon/speciesUtils';
import { Pokemon } from '@/types/pokemon/core';
import { PokemonTypeBadge } from '@/components/pokemonCard/PokemonTypeBadge';
import { cn } from '@/lib/utils/formatting/cn';

interface PokemonInfoProps {
  pokemon: Pokemon;
  className?: string;
}

export function PokemonInfo({ pokemon, className = '' }: PokemonInfoProps) {
  const { data: species, isLoading: speciesLoading } = usePokemonSpecies(pokemon);

  return (
    <div className={cn('text-center', className)}>
      <h3 className="text-lg font-bold text-white capitalize tracking-wide transition-colors duration-200">
        {formatPokemonName(pokemon.name)}
      </h3>

      {species && !speciesLoading && <p className="text-sm text-red-100 italic mt-1">{getEnglishGenus(species)}</p>}

      <div className="flex items-center justify-center space-x-2 mt-3">
        {pokemon.types.map(type => (
          <PokemonTypeBadge key={type.type.name} typeName={type.type.name} />
        ))}
      </div>
    </div>
  );
}
