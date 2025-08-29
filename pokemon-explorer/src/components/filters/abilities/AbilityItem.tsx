import { Ability } from '@/types';
import { X } from 'lucide-react';
import { formatAbilityName } from '@/lib/utils/pokemon';

interface AbilityItemProps {
  ability: Ability;
  isSelected: boolean;
  onToggle: (abilityName: string) => void;
}

export function AbilityItem({ ability, isSelected, onToggle }: AbilityItemProps) {
  return (
    <button
      onClick={() => onToggle(ability.name)}
      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
        isSelected ? 'bg-red-100 text-red-900' : 'hover:bg-gray-100 text-gray-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{formatAbilityName(ability.name)}</span>
        {isSelected && <X className="h-4 w-4 text-red-600" />}
      </div>
    </button>
  );
}
