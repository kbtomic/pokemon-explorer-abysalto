import { Pokemon } from '@/types';
import { StatName } from '@/types/enums';

export interface StatRanges extends Record<StatName, [number, number]> {}

export function calculateStatRanges(pokemonList: Pokemon[]): StatRanges {
  if (pokemonList.length === 0) {
    return {} as StatRanges;
  }

  // Extract unique stat names dynamically from Pokemon data
  const statNames = [...new Set(pokemonList.flatMap(pokemon => pokemon.stats.map(stat => stat.stat.name)))] as const;

  const ranges: Partial<StatRanges> = {};

  statNames.forEach(statName => {
    const values = pokemonList.map(pokemon => {
      const stat = pokemon.stats.find(s => s.stat.name === statName);
      return stat ? stat.base_stat : 0;
    });

    const min = Math.min(...values);
    const max = Math.max(...values);

    ranges[statName as StatName] = [min, max];
  });

  return ranges as StatRanges;
}

export function getStatValue(pokemon: Pokemon, statName: StatName): number {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}
