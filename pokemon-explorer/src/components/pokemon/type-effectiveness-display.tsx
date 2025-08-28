'use client';

import { useMemo } from 'react';
import { PokemonType } from '@/types';
import { useType } from '@/lib/hooks/use-pokemon';
import { getTypeColor } from '@/lib/utils';
import { formatPokemonName } from '@/lib/utils';

interface TypeEffectivenessDisplayProps {
  types: PokemonType[];
}

interface EffectivenessRowProps {
  title: string;
  types: string[];
  multiplier: number;
}

function EffectivenessRow({ title, types, multiplier }: EffectivenessRowProps) {
  if (types.length === 0) return null;

  const getMultiplierColor = (multiplier: number) => {
    switch (multiplier) {
      case 0:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
      case 0.25:
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 0.5:
        return 'bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200';
      case 1:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
      case 2:
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 4:
        return 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getMultiplierText = (multiplier: number) => {
    if (multiplier === 0) return 'No Effect';
    if (multiplier === 0.25) return '¼×';
    if (multiplier === 0.5) return '½×';
    if (multiplier === 1) return '1×';
    if (multiplier === 2) return '2×';
    if (multiplier === 4) return '4×';
    return `${multiplier}×`;
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 dark:text-gray-400 w-20">{title}</span>
      <div className="flex flex-wrap gap-1 flex-1">
        {types.map(type => (
          <span
            key={type}
            className="px-2 py-1 text-xs font-medium text-white rounded capitalize"
            style={{
              backgroundColor: getTypeColor(type),
            }}
          >
            {formatPokemonName(type)}
          </span>
        ))}
      </div>
      <span className={`px-2 py-1 text-xs rounded ${getMultiplierColor(multiplier)}`}>{getMultiplierText(multiplier)}</span>
    </div>
  );
}

export function TypeEffectivenessDisplay({ types }: TypeEffectivenessDisplayProps) {
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
  const effectiveness = useMemo(() => {
    if (typeData.length === 0) return null;

    const multipliers: { [key: string]: number } = {};

    // Initialize all possible types with neutral effectiveness
    const allTypes = [
      'normal',
      'fire',
      'water',
      'electric',
      'grass',
      'ice',
      'fighting',
      'poison',
      'ground',
      'flying',
      'psychic',
      'bug',
      'rock',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy',
    ];

    allTypes.forEach(type => {
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

        // Double damage to (strong against) - for offensive effectiveness
        // data.damage_relations.double_damage_to.forEach(type => {
        //   // This would be for offensive calculations, but we're focusing on defensive
        // });
      }
    });

    // Group by effectiveness
    const weakTo = Object.entries(multipliers).filter(([, mult]) => mult > 1);
    const resists = Object.entries(multipliers).filter(([, mult]) => mult < 1 && mult > 0);
    const immuneTo = Object.entries(multipliers).filter(([, mult]) => mult === 0);

    return { weakTo, resists, immuneTo, multipliers };
  }, [typeData]);

  if (typeData.length === 0 || typeQueries.some(q => q.isLoading)) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Type Effectiveness</h3>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Loading type data...</span>
        </div>
      </div>
    );
  }

  if (!effectiveness) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Type Effectiveness</h3>
        <p className="text-gray-600 dark:text-gray-400">Unable to calculate type effectiveness.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Type Effectiveness</h3>
      <div className="space-y-3">
        {effectiveness.weakTo.length > 0 && (
          <EffectivenessRow
            title="Weak to:"
            types={effectiveness.weakTo.map(([type]) => type)}
            multiplier={Math.max(...effectiveness.weakTo.map(([_, mult]) => mult))}
          />
        )}

        {effectiveness.resists.length > 0 && (
          <EffectivenessRow
            title="Resists:"
            types={effectiveness.resists.map(([type]) => type)}
            multiplier={Math.min(...effectiveness.resists.map(([_, mult]) => mult))}
          />
        )}

        {effectiveness.immuneTo.length > 0 && (
          <EffectivenessRow title="Immune to:" types={effectiveness.immuneTo.map(([type]) => type)} multiplier={0} />
        )}

        {effectiveness.weakTo.length === 0 && effectiveness.resists.length === 0 && effectiveness.immuneTo.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">This Pokémon has neutral type effectiveness.</p>
        )}
      </div>
    </div>
  );
}
