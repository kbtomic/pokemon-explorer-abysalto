'use client';

import { useParams } from 'next/navigation';
import { usePokemon } from '@/lib/hooks/usePokemon';
import { usePokemonSpecies, useEvolutionChain } from '@/lib/hooks/usePokemonSpecies';
import { getEnglishFlavorText, getEnglishGenus } from '@/lib/utils/speciesUtils';
import { formatPokemonName, getEvolutionChainId } from '@/lib/utils/pokemon';
import { AdvancedStatsDisplay } from '@/components/pokemon/AdvancedStatsDisplay';
import { EvolutionChainContainer } from '@/components/pokemon/evolutionChain/EvolutionChainContainer';
import { EnhancedAbilitiesDisplay } from '@/components/pokemon/abilities/EnhancedAbilitiesDisplay';
import { TypeEffectivenessDisplay } from '@/components/pokemon/TypeEffectivenessDisplay';
import { PokemonVarietiesDisplay } from '@/components/pokemon/varieties/PokemonVarieties';
import { ComprehensiveMovesDisplay } from '@/components/pokemon/moves/ComprehensiveMovesDisplay';

import { PageLayout } from '@/components/common/PageLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { ContentSection } from '@/components/common/ContentSection';
import { ContentSectionTitle } from '@/lib/constants/enums';
import { PokemonHeroSection } from '@/components/pokemon/PokemonHeroSection';
import { PokemonSpeciesInfo } from '@/components/pokemon/species/PokemonSpeciesInfo';
import { PokemonDescription } from '@/components/pokemon/PokemonDescription';
import { Zap } from 'lucide-react';

export default function PokemonDetailPage() {
  const params = useParams();
  const pokemonId = parseInt(params.id as string);

  const { data: pokemon, isLoading, error } = usePokemon(pokemonId);
  const { data: species, isLoading: speciesLoading } = usePokemonSpecies(pokemonId);
  const evolutionChainId = species ? getEvolutionChainId(species) : null;
  const { data: evolutionChain, isLoading: evolutionLoading } = useEvolutionChain(evolutionChainId);

  if (isLoading || speciesLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading Pokemon details...</p>
        </div>
      </PageLayout>
    );
  }

  if (error || !pokemon) {
    return (
      <PageLayout>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Pokemon Not Found</h2>
          <p className="text-sm sm:text-base text-red-500 mb-4">{error?.message || 'Unable to load Pokemon data.'}</p>
        </div>
      </PageLayout>
    );
  }

  const genus = species && !speciesLoading ? getEnglishGenus(species) : undefined;
  const description = species && !speciesLoading ? getEnglishFlavorText(species) : '';

  return (
    <PageLayout>
      <PageHeader
        title={formatPokemonName(pokemon.name)}
        icon={<Zap className="w-8 h-8" />}
        description={`Pokemon #${pokemon.id.toString().padStart(3, '0')}`}
      />

      <PokemonHeroSection pokemon={pokemon} genus={genus} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {description && (
            <ContentSection title={ContentSectionTitle.DESCRIPTION}>
              <PokemonDescription description={description} />
            </ContentSection>
          )}

          <ContentSection title={ContentSectionTitle.BASE_STATS}>
            <div className="bg-blue-400 rounded-lg p-6 shadow-md border border-gray-200">
              <AdvancedStatsDisplay pokemon={pokemon} />
            </div>
          </ContentSection>

          {evolutionChain && !evolutionLoading && (
            <ContentSection title={ContentSectionTitle.EVOLUTION_CHAIN}>
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <EvolutionChainContainer pokemon={evolutionChain.chain} currentPokemonId={pokemon.id} />
              </div>
            </ContentSection>
          )}

          {species && !speciesLoading && (
            <ContentSection title={ContentSectionTitle.POKEMON_VARIETIES}>
              <PokemonVarietiesDisplay species={species} currentPokemonId={pokemon.id} />
            </ContentSection>
          )}

          <ContentSection title={ContentSectionTitle.MOVES}>
            <ComprehensiveMovesDisplay moves={pokemon.moves} />
          </ContentSection>
        </div>

        <div className="space-y-8">
          <ContentSection title={ContentSectionTitle.TYPE_EFFECTIVENESS}>
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <TypeEffectivenessDisplay types={pokemon.types} />
            </div>
          </ContentSection>

          <ContentSection title={ContentSectionTitle.ABILITIES}>
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <EnhancedAbilitiesDisplay abilities={pokemon.abilities} />
            </div>
          </ContentSection>

          {species && !speciesLoading && (
            <ContentSection title={ContentSectionTitle.SPECIES_INFORMATION}>
              <PokemonSpeciesInfo species={species} />
            </ContentSection>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
