import { CardHeader } from '@/components/ui/card';
import { getTotalStats } from '@/lib/utils';
import { Pokemon } from '@/types';

interface PokemonCardHeaderProps {
  pokemon: Pokemon;
}

export function PokemonCardHeader({ pokemon }: PokemonCardHeaderProps) {
  const totalStats = getTotalStats(pokemon);

  return (
    <CardHeader className="pb-3 relative z-10">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">#{pokemon.id.toString().padStart(3, '0')}</span>
        <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{totalStats}</span>
      </div>
    </CardHeader>
  );
}
