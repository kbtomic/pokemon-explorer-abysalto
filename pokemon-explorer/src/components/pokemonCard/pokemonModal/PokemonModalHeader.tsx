import { Button } from '@/components/ui/button';
import { ButtonVariant, ButtonSize } from '@/types/enums';
import { formatPokemonName } from '@/lib/utils';
import { Pokemon } from '@/types';

interface PokemonModalHeaderProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonModalHeader({ pokemon, onClose }: PokemonModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/20">
      <h2 className="text-xl font-semibold text-white capitalize">{formatPokemonName(pokemon.name)}</h2>
      <Button
        variant={ButtonVariant.GHOST}
        size={ButtonSize.ICON}
        onClick={onClose}
        className="h-10 w-10 text-white hover:bg-white/20 text-xl font-bold"
      >
        ×
      </Button>
    </div>
  );
}
