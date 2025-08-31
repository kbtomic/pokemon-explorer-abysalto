import { PokemonType } from '@/types/pokemon/core';
import { useTypeEffectiveness } from '@/lib/hooks/filters/useTypeEffectiveness';
import { TypeEffectivenessTable } from './TypeEffectivenessTable';

interface TypeEffectivenessDisplayProps {
  types: PokemonType[];
}

export function TypeEffectivenessDisplay({ types }: TypeEffectivenessDisplayProps) {
  const { effectiveness, isLoading, typeData } = useTypeEffectiveness(types);

  if (!typeData || isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600 dark:text-gray-400">Loading type data...</span>
      </div>
    );
  }

  if (!effectiveness) {
    return <p className="text-gray-600 dark:text-gray-400">Unable to calculate type effectiveness.</p>;
  }

  return <TypeEffectivenessTable effectiveness={effectiveness} />;
}
