'use client';

import { useState } from 'react';
import { PokemonAbility } from '@/types/pokemon/core';
import { useAbility } from '@/lib/hooks/pokemon/usePokemon';

import { ChevronDown } from 'lucide-react';
import { AbilityHeader } from '@/components/pokemon/abilities/AbilityHeader';
import { AbilityDetails } from '@/components/pokemon/abilities/AbilityDetails';
import { AbilityLoadingState } from '@/components/pokemon/abilities/AbilityLoadingState';
import { AbilityErrorState } from '@/components/pokemon/abilities/AbilityErrorState';

interface AbilityCardProps {
  ability: PokemonAbility;
}

export function AbilityCard({ ability }: AbilityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: abilityData, isLoading } = useAbility(ability.ability.name);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls={`ability-${ability.ability.name}`}
      >
        <AbilityHeader abilityName={ability.ability.name} isHidden={ability.is_hidden} />
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div id={`ability-${ability.ability.name}`} className="p-4 bg-white border-t border-gray-200">
          {isLoading ? <AbilityLoadingState /> : abilityData ? <AbilityDetails abilityData={abilityData} /> : <AbilityErrorState />}
        </div>
      )}
    </div>
  );
}
