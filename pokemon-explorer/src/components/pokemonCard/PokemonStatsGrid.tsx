import { StatName } from '@/lib/constants/enums';
import { Pokemon } from '@/types';
import { PokemonStatItem } from './PokemonStatItem';
import { cn } from '@/lib/utils/cn';

interface PokemonStatsGridProps {
  pokemon: Pokemon;
  className?: string;
}

export function PokemonStatsGrid({ pokemon, className }: PokemonStatsGridProps) {
  return (
    <div className={cn('grid grid-cols-3 gap-3 w-full text-xs', className)}>
      <PokemonStatItem pokemon={pokemon} statName={StatName.HP} label={StatName.HP.toUpperCase()} color="text-red-600" />
      <PokemonStatItem pokemon={pokemon} statName={StatName.ATTACK} label="ATK" color="text-orange-600" />
      <PokemonStatItem pokemon={pokemon} statName={StatName.DEFENSE} label="DEF" color="text-blue-600" />
    </div>
  );
}
