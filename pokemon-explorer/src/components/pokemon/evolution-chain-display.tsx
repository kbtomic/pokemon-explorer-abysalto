'use client';

import { EvolutionChain, EvolutionChainLink, EvolutionDetail } from '@/types';
import { formatPokemonName, getPokemonImageUrl } from '@/lib/utils';
import Image from 'next/image';

interface EvolutionChainDisplayProps {
  evolutionChain: EvolutionChain;
  currentPokemonId: number;
}

interface EvolutionNodeProps {
  pokemon: EvolutionChainLink;
  currentPokemonId: number;
  level?: number;
}

function EvolutionNode({ pokemon, currentPokemonId, level = 0 }: EvolutionNodeProps) {
  const pokemonId = parseInt(pokemon.species.url.split('/').slice(-2)[0]);
  const pokemonName = formatPokemonName(pokemon.species.name);
  const imageUrl = getPokemonImageUrl(pokemonId);
  const isCurrentPokemon = pokemonId === currentPokemonId;

  return (
    <div className={`flex flex-col items-center space-y-2 ${level > 0 ? 'ml-8' : ''}`}>
      <div className={`relative w-20 h-20 ${isCurrentPokemon ? 'ring-2 ring-blue-500 rounded-full' : ''}`}>
        <Image src={imageUrl} alt={pokemonName} width={80} height={80} className="object-contain" />
      </div>
      <span className={`text-sm font-medium text-center ${isCurrentPokemon ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>
        {pokemonName}
      </span>
      <span className="text-xs text-gray-600 dark:text-gray-400">#{pokemonId.toString().padStart(3, '0')}</span>

      {/* Evolution details */}
      {pokemon.evolution_details.length > 0 && (
        <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
          {pokemon.evolution_details.map((detail, index) => (
            <EvolutionTrigger key={index} detail={detail} />
          ))}
        </div>
      )}

      {/* Recursive rendering of next evolutions */}
      {pokemon.evolves_to.length > 0 && (
        <div className="flex flex-col items-center space-y-4 mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">↓</div>
          <div className="flex flex-wrap justify-center gap-4">
            {pokemon.evolves_to.map((evolution, index) => (
              <EvolutionNode key={index} pokemon={evolution} currentPokemonId={currentPokemonId} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EvolutionTrigger({ detail }: { detail: EvolutionDetail }) {
  const triggers = [];

  if (detail.min_level) {
    triggers.push(`Level ${detail.min_level}`);
  }

  if (detail.trigger.name === 'use-item' && detail.item) {
    triggers.push(formatPokemonName(detail.item.name));
  }

  if (detail.trigger.name === 'trade') {
    triggers.push('Trade');
  }

  if (detail.held_item) {
    triggers.push(`Holding ${formatPokemonName(detail.held_item.name)}`);
  }

  if (detail.known_move) {
    triggers.push(`Knows ${formatPokemonName(detail.known_move.name)}`);
  }

  if (detail.time_of_day && detail.time_of_day !== '') {
    triggers.push(formatPokemonName(detail.time_of_day));
  }

  if (detail.location) {
    triggers.push(`At ${formatPokemonName(detail.location.name)}`);
  }

  if (detail.min_happiness) {
    triggers.push(`High friendship`);
  }

  if (detail.min_beauty) {
    triggers.push(`High beauty`);
  }

  if (detail.needs_overworld_rain) {
    triggers.push('Rain');
  }

  if (detail.party_species) {
    triggers.push(`With ${formatPokemonName(detail.party_species.name)} in party`);
  }

  if (detail.party_type) {
    triggers.push(`With ${formatPokemonName(detail.party_type.name)} in party`);
  }

  if (detail.relative_physical_stats !== null) {
    if (detail.relative_physical_stats === 1) {
      triggers.push('Attack > Defense');
    } else if (detail.relative_physical_stats === -1) {
      triggers.push('Attack < Defense');
    } else {
      triggers.push('Attack = Defense');
    }
  }

  if (detail.trade_species) {
    triggers.push(`Trade for ${formatPokemonName(detail.trade_species.name)}`);
  }

  if (detail.turn_upside_down) {
    triggers.push('Turn console upside down');
  }

  if (triggers.length === 0) {
    triggers.push('Special');
  }

  return <div className="text-xs">{triggers.join(', ')}</div>;
}

export function EvolutionChainDisplay({ evolutionChain, currentPokemonId }: EvolutionChainDisplayProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evolution Chain</h3>
      <div className="flex justify-center overflow-x-auto pb-4">
        <EvolutionNode pokemon={evolutionChain.chain} currentPokemonId={currentPokemonId} />
      </div>
    </div>
  );
}
