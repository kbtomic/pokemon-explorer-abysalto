import { CloseButton } from '@/components/common/CloseButton';
import { formatPokemonName } from '@/lib/utils/pokemon/pokemon';
import { Pokemon } from '@/types';

interface PokemonModalHeaderProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonModalHeader({ pokemon, onClose }: PokemonModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/20">
      <h2 className="text-xl font-semibold text-white capitalize">{formatPokemonName(pokemon.name)}</h2>
      <CloseButton onClose={onClose} />
    </div>
  );
}
