'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePokemon } from '@/lib/hooks/use-pokemon';
import { usePokemonSpecies, getEnglishFlavorText, getEnglishGenus, useEvolutionChain } from '@/lib/hooks/use-pokemon-species';
import { getPokemonImageUrl, getTotalStats, formatPokemonName, getEvolutionChainId } from '@/lib/utils';
import { getTypeColor } from '@/lib/utils';
import { AdvancedStatsDisplay } from '@/components/pokemon/advanced-stats-display';
import { EvolutionChainDisplay } from '@/components/pokemon/evolution-chain-display';
import { EnhancedAbilitiesDisplay } from '@/components/pokemon/enhanced-abilities-display';
import { TypeEffectivenessDisplay } from '@/components/pokemon/type-effectiveness-display';
import { PokemonVarietiesDisplay } from '@/components/pokemon/pokemon-varieties-display';
import { ComprehensiveMovesDisplay } from '@/components/pokemon/comprehensive-moves-display';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonId = parseInt(params.id as string);

  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);
  const { data: species, isLoading: speciesLoading } = usePokemonSpecies(pokemonId);
  const evolutionChainId = species ? getEvolutionChainId(species) : null;
  const { data: evolutionChain, isLoading: evolutionLoading } = useEvolutionChain(evolutionChainId);

  if (isLoading || speciesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Loading Pokemon details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-red-600 mb-4">Pokemon Not Found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error?.message || 'Unable to load Pokemon data.'}</p>
              <Link href="/explorer">
                <Button className="inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Explorer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = getPokemonImageUrl(pokemon);
  const totalStats = getTotalStats(pokemon);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/explorer">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Explorer
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Pokemon Image */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-4 shadow-inner">
                <Image src={imageUrl} alt={pokemon.name} width={256} height={256} className="object-contain drop-shadow-lg" priority />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white capitalize mb-2">{formatPokemonName(pokemon.name)}</h1>
                <p className="text-2xl text-gray-600 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
                {species && !speciesLoading && (
                  <p className="text-xl text-gray-500 dark:text-gray-400 italic mt-2">{getEnglishGenus(species)}</p>
                )}
              </div>

              {/* Types */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                {pokemon.types.map(type => (
                  <span
                    key={type.type.name}
                    className="px-6 py-3 text-lg font-medium text-white rounded-full capitalize shadow-lg"
                    style={{
                      backgroundColor: getTypeColor(type.type.name),
                    }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              {/* Basic Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Base Exp</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{pokemon.base_experience}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Stats</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalStats}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="xl:col-span-2 space-y-8">
            {/* Description */}
            {species && !speciesLoading && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">📖</span>
                  Description
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic">
                  &ldquo;{getEnglishFlavorText(species)}&rdquo;
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">📊</span>
                Base Stats
              </h2>
              <AdvancedStatsDisplay pokemon={pokemon} />
            </div>

            {/* Evolution Chain */}
            {evolutionChain && !evolutionLoading && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <EvolutionChainDisplay evolutionChain={evolutionChain} currentPokemonId={pokemon.id} />
              </div>
            )}

            {/* Pokemon Varieties */}
            {species && !speciesLoading && <PokemonVarietiesDisplay species={species} currentPokemonId={pokemon.id} />}

            {/* Comprehensive Moves */}
            <ComprehensiveMovesDisplay moves={pokemon.moves} />
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Type Effectiveness */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="mr-2">⚔️</span>
                Type Effectiveness
              </h2>
              <TypeEffectivenessDisplay types={pokemon.types} />
            </div>

            {/* Abilities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <EnhancedAbilitiesDisplay abilities={pokemon.abilities} />
            </div>

            {/* Species Info */}
            {species && !speciesLoading && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="mr-2">🧬</span>
                  Species Information
                </h2>
                <div className="space-y-4">
                  {/* Characteristics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Characteristics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Generation</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {species.generation?.name.replace('-', ' ').toUpperCase() || 'Unknown'}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Habitat</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{species.habitat?.name || 'Unknown'}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Shape</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{species.shape?.name || 'Unknown'}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Color</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">{species.color?.name || 'Unknown'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Biology */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Biology</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Capture Rate</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{species.capture_rate}/255</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Base Happiness</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{species.base_happiness}/255</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Hatch Counter</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{species.hatch_counter} cycles</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Gender Rate</span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {species.gender_rate === -1 ? 'Genderless' : `${((1 - species.gender_rate / 8) * 100).toFixed(1)}% Female`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Egg Groups */}
                  {species.egg_groups.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Egg Groups</h3>
                      <div className="flex flex-wrap gap-2">
                        {species.egg_groups.map(group => (
                          <span
                            key={group.name}
                            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full capitalize"
                          >
                            {group.name.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Categories */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Rarity</h3>
                    <div className="flex flex-wrap gap-2">
                      {species.is_baby && (
                        <span className="px-3 py-1 text-sm bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full">
                          👶 Baby Pokemon
                        </span>
                      )}
                      {species.is_legendary && (
                        <span className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                          👑 Legendary
                        </span>
                      )}
                      {species.is_mythical && (
                        <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                          🏆 Mythical
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
