import { formatPokemonName } from '@/lib/utils/pokemon/pokemon';

interface AbilityHeaderProps {
  abilityName: string;
  isHidden: boolean;
}

export function AbilityHeader({ abilityName, isHidden }: AbilityHeaderProps) {
  return (
    <div className="flex items-center space-x-3">
      <span className="font-medium text-gray-900 capitalize">{formatPokemonName(abilityName)}</span>
      {isHidden && (
        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full border border-purple-200">Hidden Ability</span>
      )}
    </div>
  );
}
