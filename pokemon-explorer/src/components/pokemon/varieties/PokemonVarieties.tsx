import { PokemonSpecies } from '@/types/pokemon/species';
import { VarietyHeader } from '@/components/pokemon/varieties/VarietyHeader';
import { VarietyGrid } from '@/components/pokemon/varieties/VarietyGrid';

interface PokemonVarietiesDisplayProps {
  species: PokemonSpecies;
  currentPokemonId: number;
}

export function PokemonVarietiesDisplay({ species, currentPokemonId }: PokemonVarietiesDisplayProps) {
  // Only show if there are multiple varieties
  if (!species.varieties || species.varieties.length <= 1) {
    return null;
  }

  return (
    <>
      <VarietyHeader varietyCount={species.varieties.length} />
      <VarietyGrid species={species} currentPokemonId={currentPokemonId} />
    </>
  );
}
