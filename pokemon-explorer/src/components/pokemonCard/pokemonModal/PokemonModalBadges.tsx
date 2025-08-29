import { getTotalStats } from '@/lib/utils';
import { Pokemon } from '@/types';

interface PokemonModalBadgesProps {
  pokemon: Pokemon;
}

export function PokemonModalBadges({ pokemon }: PokemonModalBadgesProps) {
  const totalStats = getTotalStats(pokemon);

  return (
    <div className="flex items-center justify-between">
      <div className="relative group">
        <span className="inline-flex items-center px-4 py-2 text-sm font-bold text-blue-600 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-blue-200/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="relative group">
        <span className="inline-flex items-center px-4 py-2 text-sm font-bold text-emerald-600 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-emerald-200/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
          {totalStats}
        </span>
        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}
