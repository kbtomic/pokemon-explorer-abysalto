import { useMemo } from 'react';
import { PokemonType } from '@/types/pokemon/core';
import { useType } from '@/lib/hooks/usePokemon';
import { POKEMON_TYPES } from '@/lib/constants/pokemonTypes';

interface TypeEffectivenessData {
  weakTo: [string, number][];
  resists: [string, number][];
  immuneTo: [string, number][];
  multipliers: { [key: string]: number };
}

export function useTypeEffectiveness(types: PokemonType[]) {
  // Fetch type data for all Pokemon types
  const typeQueries = types.map(pokemonType => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useType(pokemonType.type.name);
  });

  const typeData = useMemo(() => {
    return typeQueries
      .map((query, index) => ({
        type: types[index].type.name,
        data: query.data,
        isLoading: query.isLoading,
      }))
      .filter(item => item.data);
  }, [typeQueries, types]);

  // Calculate combined type effectiveness
  const effectiveness = useMemo((): TypeEffectivenessData | null => {
    if (typeData.length === 0) return null;

    const multipliers: { [key: string]: number } = {};

    // Initialize all possible types with neutral effectiveness
    POKEMON_TYPES.forEach(type => {
      multipliers[type] = 1;
    });

    // Calculate combined damage multipliers
    typeData.forEach(({ data }) => {
      if (data?.damage_relations) {
        // Double damage from (weak to)
        data.damage_relations.double_damage_from.forEach(type => {
          multipliers[type.name] *= 2;
        });

        // Half damage from (resists)
        data.damage_relations.half_damage_from.forEach(type => {
          multipliers[type.name] *= 0.5;
        });

        // No damage from (immune to)
        data.damage_relations.no_damage_from.forEach(type => {
          multipliers[type.name] *= 0;
        });
      }
    });

    // Group by effectiveness
    const weakTo = Object.entries(multipliers).filter(([, mult]) => mult > 1);
    const resists = Object.entries(multipliers).filter(([, mult]) => mult < 1 && mult > 0);
    const immuneTo = Object.entries(multipliers).filter(([, mult]) => mult === 0);

    return { weakTo, resists, immuneTo, multipliers };
  }, [typeData]);

  const isLoading = typeQueries.some(q => q.isLoading);

  return {
    effectiveness,
    isLoading,
    typeData: typeData.length > 0,
  };
}
