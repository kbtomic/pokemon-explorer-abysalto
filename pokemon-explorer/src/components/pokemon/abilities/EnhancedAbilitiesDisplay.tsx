'use client';

import { PokemonAbility } from '@/types';
import { AbilityCard } from '@/components/pokemon/abilities/AbilityCard';

interface EnhancedAbilitiesDisplayProps {
  abilities: PokemonAbility[];
}

export function EnhancedAbilitiesDisplay({ abilities }: EnhancedAbilitiesDisplayProps) {
  if (abilities.length === 0) {
    return <p className="text-gray-600">No abilities found.</p>;
  }

  return (
    <div className="space-y-3">
      {abilities.map(ability => (
        <AbilityCard key={ability.ability.name} ability={ability} />
      ))}
    </div>
  );
}
