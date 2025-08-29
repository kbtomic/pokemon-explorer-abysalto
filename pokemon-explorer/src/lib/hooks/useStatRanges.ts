import { useState, useEffect } from 'react';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { calculateStatRanges, StatRanges } from '@/lib/utils/filters/statRanges';

export function useStatRanges() {
  const pokemonList = usePokemonStore(state => state.pokemonList);
  const [statRanges, setStatRanges] = useState<StatRanges>(() => calculateStatRanges(pokemonList));

  useEffect(() => {
    const ranges = calculateStatRanges(pokemonList);
    setStatRanges(ranges);
  }, [pokemonList]);

  return statRanges;
}
