import { StatsGrid } from '@/components/common/StatsGrid';
import { Ruler, Weight, Star, Target } from 'lucide-react';
import { getPokemonImageUrl } from '@/lib/utils/ui/imageUtils';
import { getTotalStats } from '@/lib/utils/pokemon/pokemon';
import { getTypeColor } from '@/lib/utils/ui/typeColors';
import { Pokemon } from '@/types/pokemon';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface PokemonHeroSectionProps {
  pokemon: Pokemon;
  genus?: string;
}

export function PokemonHeroSection({ pokemon, genus }: PokemonHeroSectionProps) {
  const imageUrl = getPokemonImageUrl(pokemon);
  const totalStats = getTotalStats(pokemon);

  const basicStats = [
    {
      label: 'Height',
      value: `${(pokemon.height / 10).toFixed(1)} m`,
      icon: <Ruler className="w-5 h-5" />,
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Weight',
      value: `${(pokemon.weight / 10).toFixed(1)} kg`,
      icon: <Weight className="w-5 h-5" />,
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Base Exp',
      value: pokemon.base_experience.toString(),
      icon: <Star className="w-5 h-5" />,
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Total Stats',
      value: totalStats.toString(),
      icon: <Target className="w-5 h-5" />,
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="relative flex items-center justify-center w-64 h-64 bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-4 shadow-inner border border-red-200">
          <ImageWithFallback
            src={imageUrl || ''}
            alt={pokemon.name}
            width={256}
            height={256}
            className="object-contain drop-shadow-lg"
            fallbackSrc="/favicon.svg"
            fallbackAlt="Pokemon Explorer"
            fallbackWidth={128}
            fallbackHeight={128}
            fallbackClassName="object-contain opacity-60"
            priority
          />
        </div>

        <div className="flex-1 text-center lg:text-left">
          {genus && <p className="text-xl text-gray-600 italic mb-4 border-b border-gray-200 pb-2">{genus}</p>}

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
            {pokemon.types.map(type => (
              <span
                key={type.type.name}
                className="px-6 py-3 text-lg font-medium text-white rounded-full capitalize shadow-lg border-2 border-white"
                style={{
                  backgroundColor: getTypeColor(type.type.name),
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <StatsGrid stats={basicStats} />
        </div>
      </div>
    </div>
  );
}
