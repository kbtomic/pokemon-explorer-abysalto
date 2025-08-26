'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Pokemon } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPokemonImageUrl, getTotalStats, formatPokemonName } from '@/lib/utils';
import { TYPE_COLORS } from '@/types';
import { accessibilityUtils, ariaAttributes } from '@/lib/utils/accessibility';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageUrl = getPokemonImageUrl(pokemon);
  const totalStats = getTotalStats(pokemon);
  const cardId = accessibilityUtils.generateId('pokemon-card');
  const description = accessibilityUtils.createPokemonCardDescription(pokemon);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      ref={cardRef}
      role={ariaAttributes.roles.button}
      tabIndex={0}
      aria-label={accessibilityUtils.createAriaLabel('View details for', pokemon.name)}
      aria-describedby={`${cardId}-description`}
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset relative overflow-hidden"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/30 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
            {totalStats}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0 relative z-10">
        <div className="flex flex-col items-center space-y-4">
          {/* Pokemon Image with enhanced styling */}
          <div className="relative w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full p-2 shadow-inner group-hover:shadow-lg transition-shadow duration-300">
            <Image
              src={imageUrl}
              alt={`${pokemon.name} official artwork`}
              width={112}
              height={112}
              className="object-contain drop-shadow-sm"
              loading="lazy"
            />
          </div>

          {/* Pokemon Name with better visibility */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {formatPokemonName(pokemon.name)}
            </h3>

            {/* Enhanced Type Badges */}
            <div className="flex items-center justify-center space-x-2 mt-3" role="list" aria-label="Pokemon types">
              {pokemon.types.map(type => (
                <span
                  key={type.type.name}
                  role="listitem"
                  className="px-3 py-1.5 text-xs font-bold text-white rounded-full capitalize shadow-sm transform group-hover:scale-105 transition-transform duration-200"
                  style={{
                    backgroundColor: TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS] || '#6b7280',
                    boxShadow: `0 2px 4px ${TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS] || '#6b7280'}40`,
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Stats Display */}
          <div className="grid grid-cols-3 gap-3 w-full text-xs" role="list" aria-label="Base stats">
            <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2" role="listitem">
              <div className="font-bold text-gray-900 dark:text-white mb-1">HP</div>
              <div
                className="text-lg font-bold text-red-600 dark:text-red-400"
                aria-label={accessibilityUtils.formatStatForScreenReader(
                  'hp',
                  pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0
                )}
              >
                {pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0}
              </div>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2" role="listitem">
              <div className="font-bold text-gray-900 dark:text-white mb-1">ATK</div>
              <div
                className="text-lg font-bold text-orange-600 dark:text-orange-400"
                aria-label={accessibilityUtils.formatStatForScreenReader(
                  'attack',
                  pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0
                )}
              >
                {pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0}
              </div>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-2" role="listitem">
              <div className="font-bold text-gray-900 dark:text-white mb-1">DEF</div>
              <div
                className="text-lg font-bold text-blue-600 dark:text-blue-400"
                aria-label={accessibilityUtils.formatStatForScreenReader(
                  'defense',
                  pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0
                )}
              >
                {pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Screen reader description */}
        <div id={`${cardId}-description`} className="sr-only">
          {description}
        </div>
      </CardContent>
    </Card>
  );
}
