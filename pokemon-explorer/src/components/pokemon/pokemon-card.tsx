'use client';

import Image from 'next/image';
import { Pokemon } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPokemonImageUrl, getTotalStats, formatPokemonName } from '@/lib/utils';
import { TYPE_COLORS } from '@/types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const imageUrl = getPokemonImageUrl(pokemon);
  const totalStats = getTotalStats(pokemon);

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-white dark:bg-gray-800"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total: {totalStats}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-col items-center space-y-3">
          <div className="relative w-24 h-24">
            <Image src={imageUrl} alt={pokemon.name} width={96} height={96} className="object-contain" loading="lazy" />
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{formatPokemonName(pokemon.name)}</h3>

            <div className="flex items-center justify-center space-x-2 mt-2">
              {pokemon.types.map(type => (
                <span
                  key={type.type.name}
                  className="px-2 py-1 text-xs font-medium text-white rounded-full capitalize"
                  style={{
                    backgroundColor: TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS] || '#6b7280',
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full text-xs">
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white">HP</div>
              <div className="text-gray-600 dark:text-gray-400">{pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0}</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white">ATK</div>
              <div className="text-gray-600 dark:text-gray-400">{pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0}</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900 dark:text-white">DEF</div>
              <div className="text-gray-600 dark:text-gray-400">{pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
