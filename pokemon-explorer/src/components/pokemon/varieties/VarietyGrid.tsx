import { PokemonSpecies } from '@/types';
import { VarietyCard } from '@/components/pokemon/varieties/VarietyCard';

interface VarietyGridProps {
  species: PokemonSpecies;
  currentPokemonId: number;
  className?: string;
}

export function VarietyGrid({ species, currentPokemonId, className = '' }: VarietyGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}>
      {species.varieties.map(variety => (
        <VarietyCard key={variety.pokemon.name} variety={variety} currentPokemonId={currentPokemonId} />
      ))}
    </div>
  );
}
