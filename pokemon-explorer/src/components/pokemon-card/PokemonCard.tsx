import { CardContent } from '@/components/ui/Card';
import { Pokemon } from '@/types/pokemon/core';
import { PokemonCardContainer } from '@/components/pokemonCard/PokemonCardContainer';
import { PokemonCardHeader } from '@/components/pokemonCard/PokemonCardHeader';
import { PokemonImage } from '@/components/pokemonCard/PokemonImage';
import { PokemonInfo } from '@/components/pokemonCard/PokemonInfo';
import { PokemonStatsGrid } from '@/components/pokemonCard/PokemonStatsGrid';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  priority?: boolean;
}

export function PokemonCard({ pokemon, onClick, priority = false }: PokemonCardProps) {
  return (
    <PokemonCardContainer onClick={onClick}>
      <PokemonCardHeader pokemon={pokemon} />

      <CardContent className="relative z-10">
        <div className="flex flex-col items-center space-y-4">
          <PokemonImage pokemon={pokemon} priority={priority} />
          <PokemonInfo pokemon={pokemon} />
          <PokemonStatsGrid pokemon={pokemon} />
        </div>
      </CardContent>
    </PokemonCardContainer>
  );
}
