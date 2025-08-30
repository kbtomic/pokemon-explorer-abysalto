'use client';

import { PokemonSpecies } from '@/types';
import { getPokemonImageUrl, formatPokemonName } from '@/lib/utils';
import Image from 'next/image';

interface PokemonVarietiesDisplayProps {
  species: PokemonSpecies;
  currentPokemonId: number;
}

interface VarietyCardProps {
  variety: {
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  };
  currentPokemonId: number;
}

function VarietyCard({ variety, currentPokemonId }: VarietyCardProps) {
  const pokemonId = parseInt(variety.pokemon.url.split('/').slice(-2)[0]);
  const isCurrentPokemon = pokemonId === currentPokemonId;
  const pokemonName = formatPokemonName(variety.pokemon.name);
  const imageUrl = getPokemonImageUrl(pokemonId);

  return (
    <div
      className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
        isCurrentPokemon
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
      }`}
    >
      <div className="relative w-16 h-16 mb-2">
        {imageUrl ? (
          <Image src={imageUrl} alt={pokemonName} width={64} height={64} className="object-contain" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Image src="/favicon.svg" alt="Pokemon Explorer" width={32} height={32} className="object-contain opacity-60" />
          </div>
        )}
      </div>
      <span
        className={`text-xs font-medium text-center ${
          isCurrentPokemon ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
        }`}
      >
        {pokemonName}
      </span>
      <span className="text-xs text-gray-600 dark:text-gray-400">#{pokemonId.toString().padStart(3, '0')}</span>
      {variety.is_default && (
        <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full mt-1">
          Default
        </span>
      )}
      {isCurrentPokemon && (
        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full mt-1">Current</span>
      )}
    </div>
  );
}

export function PokemonVarietiesDisplay({ species, currentPokemonId }: PokemonVarietiesDisplayProps) {
  // Only show if there are multiple varieties
  if (!species.varieties || species.varieties.length <= 1) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Forms & Varieties ({species.varieties.length})</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {species.varieties.map(variety => (
          <VarietyCard key={variety.pokemon.name} variety={variety} currentPokemonId={currentPokemonId} />
        ))}
      </div>
    </div>
  );
}
