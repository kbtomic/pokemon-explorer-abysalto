'use client';

import { Modal } from '@/components/ui/modal';
import { usePokemonStore } from '@/lib/stores/pokemon-store';
import { usePokemon } from '@/lib/hooks/use-pokemon';
import Link from 'next/link';
import { usePokemonSpecies, getEnglishGenus } from '@/lib/hooks/use-pokemon-species';
import { getPokemonImageUrl, getTotalStats, formatPokemonName } from '@/lib/utils';
import { getTypeColor } from '@/lib/utils';
import { AdvancedStatsDisplay } from './advanced-stats-display';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import Image from 'next/image';

export function PokemonModal() {
  const { isModalOpen, selectedPokemon, closeModal } = usePokemonStore();
  const { data: pokemon, isLoading, error } = usePokemon(selectedPokemon || 1);
  const { data: species, isLoading: speciesLoading } = usePokemonSpecies(selectedPokemon || 1);

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

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title={formatPokemonName(pokemon.name)}>
      <div className="space-y-6">
        {/* Header with image and basic info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <Image src={imageUrl} alt={pokemon.name} width={128} height={128} className="object-contain" priority />
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{formatPokemonName(pokemon.name)}</h2>
              <p className="text-gray-600 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
              {species && !speciesLoading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">{getEnglishGenus(species)}</p>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {pokemon.types.map(type => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 text-sm font-medium text-white rounded-full capitalize"
                  style={{
                    backgroundColor: getTypeColor(type.type.name),
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

        {/* Stats Display */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Base Stats</h3>
          <AdvancedStatsDisplay pokemon={pokemon} />
        </div>

        {/* Quick Info */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Want to see detailed information about this Pokemon?</span>
            </div>
            <Link href={`/pokemon/${pokemon.id}`}>
              <Button onClick={closeModal} className="inline-flex items-center gap-2">
                <span>View Details</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
