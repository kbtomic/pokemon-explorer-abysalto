'use client';

import { Modal } from '@/components/ui/modal';
import { usePokemonStore } from '@/lib/stores/pokemonStore';
import { AdvancedStatsDisplay } from '@/components/pokemon/AdvancedStatsDisplay';
import { PokemonStatsGrid } from '@/components/pokemonCard/PokemonStatsGrid';
import { PokemonModalHeader } from '@/components/pokemonCard/pokemonModal/PokemonModalHeader';
import { PokemonModalBadges } from '@/components/pokemonCard/pokemonModal/PokemonModalBadges';
import { PokemonModalImage } from '@/components/pokemonCard/pokemonModal/PokemonModalImage';
import { PokemonModalInfo } from '@/components/pokemonCard/pokemonModal/PokemonModalInfo';
import { PokemonModalInfoCards } from '@/components/pokemonCard/pokemonModal/PokemonModalInfoCards';
import { PokemonModalCallToAction } from '@/components/pokemonCard/pokemonModal/PokemonModalCallToAction';
import { PokemonModalBackground } from '@/components/pokemonCard/pokemonModal/PokemonModalBackground';

export function PokemonModal() {
  const { isModalOpen, selectedPokemon, closeModal } = usePokemonStore();

  if (!isModalOpen || !selectedPokemon) return null;

  const pokemon = selectedPokemon;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 border-red-300/50 backdrop-blur-xl"
    >
      <div className="relative min-h-[600px]">
        <PokemonModalBackground />

        <PokemonModalHeader pokemon={pokemon} onClose={closeModal} />

        <div className="relative z-10 space-y-8 p-2">
          <PokemonModalBadges pokemon={pokemon} />

          <div className="flex flex-col items-center space-y-6">
            <PokemonModalImage pokemon={pokemon} />
            <PokemonModalInfo pokemon={pokemon} />

            <div className="w-full max-w-md">
              <PokemonStatsGrid pokemon={pokemon} />
            </div>
          </div>

          <PokemonModalInfoCards pokemon={pokemon} />

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
            <AdvancedStatsDisplay pokemon={pokemon} />
          </div>

          <PokemonModalCallToAction pokemon={pokemon} onClose={closeModal} />
        </div>
      </div>
    </Modal>
  );
}
