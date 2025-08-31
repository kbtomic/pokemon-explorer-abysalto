import { CardContent } from '@/components/ui/card';
import { Pokemon } from '@/types';
import { PokemonCardContainer } from '@/components/pokemonCard/PokemonCardContainer';
import { PokemonCardHeader } from '@/components/pokemonCard/PokemonCardHeader';
import { PokemonImage } from '@/components/pokemonCard/PokemonImage';
import { PokemonInfo } from '@/components/pokemonCard/PokemonInfo';
import { PokemonStatsGrid } from '@/components/pokemonCard/PokemonStatsGrid';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <PokemonCardContainer onClick={onClick}>
      <PokemonCardHeader pokemon={pokemon} />

      <CardContent className="relative z-10">
        <div className="flex flex-col items-center space-y-4">
          <PokemonImage pokemon={pokemon} />
          <PokemonInfo pokemon={pokemon} />
          <PokemonStatsGrid pokemon={pokemon} />
        </div>
      </CardContent>
    </PokemonCardContainer>
  );
}
