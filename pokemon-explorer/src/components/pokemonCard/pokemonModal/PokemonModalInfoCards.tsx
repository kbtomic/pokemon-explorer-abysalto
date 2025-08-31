import { getTotalStats } from '@/lib/utils/pokemon/pokemon';
import { Pokemon } from '@/types/pokemon/core';
import { POKEMON_INFO_CARDS_CONFIG, TOTAL_STATS_LABEL } from '@/lib/constants/statsConfig';

interface PokemonModalInfoCardsProps {
  pokemon: Pokemon;
}

export function PokemonModalInfoCards({ pokemon }: PokemonModalInfoCardsProps) {
  const totalStats = getTotalStats(pokemon);

  const infoCards = POKEMON_INFO_CARDS_CONFIG.map(config => {
    let value: number;

    if (config.label === TOTAL_STATS_LABEL) {
      value = totalStats;
    } else {
      value = pokemon[config.valueKey] as number;
    }

    return {
      label: config.label,
      value: config.formatter(value),
    };
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {infoCards.map(card => (
        <div
          key={card.label}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
        >
          <div className="text-center">
            <span className="text-red-100 text-xs font-medium uppercase tracking-wide">{card.label}</span>
            <p className="text-white font-bold text-lg mt-1">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
