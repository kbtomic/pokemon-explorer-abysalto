import Image from 'next/image';
import { getPokemonImageUrl } from '@/lib/utils';
import { Pokemon } from '@/types';

interface PokemonModalImageProps {
  pokemon: Pokemon;
}

export function PokemonModalImage({ pokemon }: PokemonModalImageProps) {
  const imageUrl = getPokemonImageUrl(pokemon);

  return (
    <div className="relative group bg-gradient-to-br from-white/90 to-gray-100/90 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-100/80 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      <Image
        src={imageUrl}
        alt={`${pokemon.name} official artwork`}
        width={140}
        height={140}
        className="relative z-10 object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
        priority
      />
    </div>
  );
}
