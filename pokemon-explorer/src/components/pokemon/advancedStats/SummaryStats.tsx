import { Pokemon } from '@/types';
import { getTotalStats } from '@/lib/utils/pokemon/pokemon';
import { getStatData } from '@/lib/utils/ui/chartUtils';
import { SUMMARY_ITEMS_CONFIG, SummaryItem } from '@/lib/constants/statsConfig';

interface SummaryStatsProps {
  pokemon: Pokemon;
}

export function SummaryStats({ pokemon }: SummaryStatsProps) {
  const pokemonStats = getStatData(pokemon);
  const totalStats = getTotalStats(pokemon);
  const highestStat = Math.max(...pokemonStats.map(s => s.value));
  const lowestStat = Math.min(...pokemonStats.map(s => s.value));
  const averageStat = Math.round(pokemonStats.reduce((sum, stat) => sum + stat.value, 0) / pokemonStats.length);

  const summaryValues = [totalStats, highestStat, lowestStat, averageStat];

  const summaryItems: SummaryItem[] = SUMMARY_ITEMS_CONFIG.map((config, index) => ({
    ...config,
    value: summaryValues[index],
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {summaryItems.map(({ value, label, color }) => (
        <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg text-center">
          <div className={`text-2xl font-bold ${color}`}>{value}</div>
          <div className="text-sm text-red-100">{label}</div>
        </div>
      ))}
    </div>
  );
}
