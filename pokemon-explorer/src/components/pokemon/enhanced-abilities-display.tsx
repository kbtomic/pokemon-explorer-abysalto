'use client';

import { useState } from 'react';
import { PokemonAbility } from '@/types';
import { useAbility } from '@/lib/hooks/use-pokemon';
import { getEnglishAbilityEffect, getEnglishAbilityFlavorText } from '@/lib/hooks/use-pokemon-species';
import { formatPokemonName } from '@/lib/utils';

interface EnhancedAbilitiesDisplayProps {
  abilities: PokemonAbility[];
}

interface AbilityCardProps {
  ability: PokemonAbility;
}

function AbilityCard({ ability }: AbilityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: abilityData, isLoading } = useAbility(ability.ability.name);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls={`ability-${ability.ability.name}`}
      >
        <div className="flex items-center space-x-3">
          <span className="font-medium text-gray-900 dark:text-white capitalize">{formatPokemonName(ability.ability.name)}</span>
          {ability.is_hidden && (
            <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
              Hidden Ability
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div id={`ability-${ability.ability.name}`} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Loading ability details...</span>
            </div>
          ) : abilityData ? (
            <div className="space-y-3">
              {/* Effect Description */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Effect</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{getEnglishAbilityEffect(abilityData)}</p>
              </div>

              {/* Flavor Text */}
              {getEnglishAbilityFlavorText(abilityData) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">In-Game Description</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    &ldquo;{getEnglishAbilityFlavorText(abilityData)}&rdquo;
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Ability ID:</span>
                  <p className="text-sm text-gray-900 dark:text-white">#{abilityData.id.toString().padStart(3, '0')}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Effect:</span>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {getEnglishAbilityEffect(abilityData) || 'No effect description available'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400">Unable to load ability details.</div>
          )}
        </div>
      )}
    </div>
  );
}

export function EnhancedAbilitiesDisplay({ abilities }: EnhancedAbilitiesDisplayProps) {
  if (abilities.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Abilities</h3>
        <p className="text-gray-600 dark:text-gray-400">No abilities found.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Abilities</h3>
      <div className="space-y-3">
        {abilities.map(ability => (
          <AbilityCard key={ability.ability.name} ability={ability} />
        ))}
      </div>
    </div>
  );
}
