import { EvolutionChainLink } from '@/types';
import { EvolutionStage } from '@/components/pokemon/evolutionChain/EvolutionStage';
import { EvolutionArrow } from '@/components/pokemon/evolutionChain/EvolutionArrow';

interface EvolutionChainContainerProps {
  pokemon: EvolutionChainLink;
  currentPokemonId: number;
  level?: number;
  className?: string;
}

export function EvolutionChainContainer({ pokemon, currentPokemonId, level = 0, className = '' }: EvolutionChainContainerProps) {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <EvolutionStage pokemon={pokemon} currentPokemonId={currentPokemonId} level={level} />

      {/* Recursive rendering of next evolutions */}
      {pokemon.evolves_to.length > 0 && (
        <>
          <EvolutionArrow />
          <div className="flex flex-wrap justify-center gap-4">
            {pokemon.evolves_to.map((evolution, index) => (
              <EvolutionChainContainer key={index} pokemon={evolution} currentPokemonId={currentPokemonId} level={level + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
