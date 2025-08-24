'use client';

import { Modal } from '@/components/ui/modal';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { usePokemon } from '@/lib/hooks/use-pokemon';
import { getPokemonImageUrl, getTotalStats, formatPokemonName } from '@/lib/utils';
import { TYPE_COLORS, STAT_NAMES } from '@/types';
import Image from 'next/image';
import { Heart, Zap, Shield, Target, Gauge } from 'lucide-react';

export function PokemonModal() {
  const { isModalOpen, selectedPokemon, closeModal } = usePokemonStore();
  const { data: pokemon, isLoading, error } = usePokemon(selectedPokemon || 1);

  if (!isModalOpen || !selectedPokemon) return null;

  if (isLoading) {
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Loading...">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Modal>
    );
  }

  if (error || !pokemon) {
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Error">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load Pokemon</h3>
          <p className="text-gray-600 dark:text-gray-400">{error?.message || 'An error occurred while loading Pokemon data.'}</p>
        </div>
      </Modal>
    );
  }

  const imageUrl = getPokemonImageUrl(pokemon);
  const totalStats = getTotalStats(pokemon);

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp':
        return <Heart className="h-4 w-4" />;
      case 'attack':
        return <Zap className="h-4 w-4" />;
      case 'defense':
        return <Shield className="h-4 w-4" />;
      case 'speed':
        return <Gauge className="h-4 w-4" />;
      case 'special-attack':
        return <Target className="h-4 w-4" />;
      case 'special-defense':
        return <Shield className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getStatColor = (value: number) => {
    if (value >= 100) return 'text-green-600';
    if (value >= 80) return 'text-yellow-600';
    if (value >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title={formatPokemonName(pokemon.name)}>
      <div className="space-y-6">
        {/* Header with image and basic info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 mx-auto">
              <Image src={imageUrl} alt={pokemon.name} width={192} height={192} className="object-contain" priority />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{formatPokemonName(pokemon.name)}</h2>
              <p className="text-gray-600 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map(type => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 text-sm font-medium text-white rounded-full capitalize"
                  style={{
                    backgroundColor: TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS] || '#6b7280',
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Height:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Weight:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Base Experience:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{pokemon.base_experience}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Stats:</span>
                <span className="ml-2 text-gray-900 dark:text-white font-semibold">{totalStats}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Base Stats</h3>
          <div className="space-y-3">
            {pokemon.stats.map(stat => {
              const statName = stat.stat.name;
              const statValue = stat.base_stat;
              const statPercentage = (statValue / 255) * 100;

              return (
                <div key={statName} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatIcon(statName)}
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {STAT_NAMES[statName as keyof typeof STAT_NAMES] || statName}
                      </span>
                    </div>
                    <span className={`font-semibold ${getStatColor(statValue)}`}>{statValue}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        statValue >= 100
                          ? 'bg-green-500'
                          : statValue >= 80
                            ? 'bg-yellow-500'
                            : statValue >= 60
                              ? 'bg-orange-500'
                              : 'bg-red-500'
                      }`}
                      style={{ width: `${statPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Abilities</h3>
          <div className="space-y-2">
            {pokemon.abilities.map(ability => (
              <div key={ability.ability.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-gray-900 dark:text-white capitalize">{ability.ability.name.replace('-', ' ')}</span>
                {ability.is_hidden && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    Hidden
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Moves (showing first 10) */}
        {pokemon.moves.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Moves ({pokemon.moves.length} total)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {pokemon.moves.slice(0, 10).map(move => (
                <div key={move.move.name} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm capitalize">
                  {move.move.name.replace('-', ' ')}
                </div>
              ))}
              {pokemon.moves.length > 10 && (
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-400">
                  +{pokemon.moves.length - 10} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
