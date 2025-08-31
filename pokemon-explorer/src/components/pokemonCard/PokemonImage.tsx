import { getPokemonImageUrl } from '@/lib/utils/ui/imageUtils';
import { Pokemon } from '@/types';
import { cn } from '@/lib/utils/formatting/cn';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface PokemonImageProps {
  pokemon: Pokemon;
  size?: number;
  className?: string;
  priority?: boolean;
}

export function PokemonImage({ pokemon, size = 112, className, priority = false }: PokemonImageProps) {
  const imageUrl = getPokemonImageUrl(pokemon);
  const containerSize = size + 16; // Add padding

  return (
    <div
      className={cn(
        'relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-2 shadow-inner group-hover:shadow-lg transition-shadow duration-300',
        className
      )}
      style={{ width: containerSize, height: containerSize }}
    >
      <ImageWithFallback
        src={imageUrl || ''}
        alt={`${pokemon.name} official artwork`}
        width={size}
        height={size}
        className="object-contain drop-shadow-sm"
        loading="lazy"
        priority={priority}
      />
    </div>
  );
}
