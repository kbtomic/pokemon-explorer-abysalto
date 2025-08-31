import { PokemonVariety } from '@/types/pokemon/core';
import { cn } from '@/lib/utils/formatting/cn';
import { getPokemonImageUrl } from '@/lib/utils/ui/imageUtils';
import { formatPokemonName } from '@/lib/utils/pokemon/pokemon';
import { getPokemonIdFromVarietyUrl, isCurrentPokemon } from '@/lib/utils/pokemon/varietyUtils';
import { VarietyLabel } from '@/lib/constants/enums';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface VarietyCardProps {
  variety: PokemonVariety;
  currentPokemonId: number;
  className?: string;
}

export function VarietyCard({ variety, currentPokemonId, className = '' }: VarietyCardProps) {
  const pokemonId = getPokemonIdFromVarietyUrl(variety.pokemon.url);
  const isCurrent = isCurrentPokemon(pokemonId, currentPokemonId);
  const pokemonName = formatPokemonName(variety.pokemon.name);
  const imageUrl = getPokemonImageUrl(pokemonId);

  return (
    <div
      className={cn(
        'flex flex-col items-center p-3 rounded-lg border transition-colors',
        isCurrent ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50',
        className
      )}
    >
      <div className="relative w-16 h-16 mb-2">
        <ImageWithFallback
          src={imageUrl || ''}
          alt={pokemonName}
          width={64}
          height={64}
          className="object-contain"
          fallbackWidth={32}
          fallbackHeight={32}
          priority={true} // Priority for variety images (above the fold)
        />
      </div>
      <span className={cn('text-xs font-medium text-center', isCurrent ? 'text-blue-600' : 'text-gray-900')}>{pokemonName}</span>
      <span className="text-xs text-gray-600">#{pokemonId.toString().padStart(3, '0')}</span>
      {variety.is_default && (
        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mt-1">{VarietyLabel.DEFAULT}</span>
      )}
      {isCurrent && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1">{VarietyLabel.CURRENT}</span>}
    </div>
  );
}
