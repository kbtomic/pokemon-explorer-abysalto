import { EvolutionChainLink } from '@/types';
import { formatPokemonName, getPokemonImageUrl } from '@/lib/utils';
import { getPokemonIdFromUrl } from '@/lib/utils/evolutionUtils';
import { EvolutionTrigger } from '@/components/pokemon/evolutionChain/EvolutionTrigger';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { cn } from '@/lib/utils';

interface EvolutionStageProps {
  pokemon: EvolutionChainLink;
  currentPokemonId: number;
  level?: number;
  className?: string;
}

export function EvolutionStage({ pokemon, currentPokemonId, level = 0, className = '' }: EvolutionStageProps) {
  const pokemonId = getPokemonIdFromUrl(pokemon.species.url);
  const pokemonName = formatPokemonName(pokemon.species.name);
  const imageUrl = getPokemonImageUrl(pokemonId);
  const isCurrentPokemon = pokemonId === currentPokemonId;

  return (
    <div className={cn('flex flex-col items-center space-y-2', level > 0 ? 'ml-8' : '', className)}>
      <div className={cn('relative w-20 h-20', isCurrentPokemon ? 'ring-2 ring-blue-500 rounded-full' : '')}>
        <div className="flex items-center justify-center w-full h-full">
          <ImageWithFallback
            src={imageUrl || ''}
            alt={pokemonName}
            width={80}
            height={80}
            className="object-contain"
            fallbackWidth={40}
            fallbackHeight={40}
          />
        </div>
      </div>
      <span className={cn('text-sm font-medium text-center', isCurrentPokemon ? 'text-blue-600' : 'text-gray-900')}>{pokemonName}</span>
      <span className="text-xs text-gray-600">#{pokemonId.toString().padStart(3, '0')}</span>

      {pokemon.evolution_details.length > 0 && (
        <div className="text-center">
          {pokemon.evolution_details.map((detail, index) => (
            <EvolutionTrigger key={index} detail={detail} />
          ))}
        </div>
      )}
    </div>
  );
}
