import { StatName } from '@/lib/constants/enums';
import { Pokemon } from '@/types/pokemon/core';
import { cn } from '@/lib/utils/formatting/cn';

interface PokemonStatItemProps {
  pokemon: Pokemon;
  statName: StatName;
  label: string;
  color: string;
  className?: string;
}

export function PokemonStatItem({ pokemon, statName, label, color, className = '' }: PokemonStatItemProps) {
  const statValue = pokemon.stats.find(s => s.stat.name === statName)?.base_stat || 0;

  return (
    <div className={cn('text-center bg-white rounded-lg p-2', className)}>
      <div className="font-bold text-gray-900 mb-1">{label}</div>
      <div className={cn('text-lg font-bold', color)}>{statValue}</div>
    </div>
  );
}
