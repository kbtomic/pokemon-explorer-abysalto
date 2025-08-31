import { getMultiplierColor, getMultiplierText } from '@/lib/utils/effectivenessUtils';
import { TypeMultiplierBadge } from '@/components/pokemon/effectiveness/TypeMultiplierBadge';

interface EffectivenessRowProps {
  title: string;
  types: string[];
  multiplier: number;
}

export function EffectivenessRow({ title, types, multiplier }: EffectivenessRowProps) {
  if (types.length === 0) return null;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 w-20">{title}</span>
      <div className="flex flex-wrap gap-1 flex-1">
        {types.map(type => (
          <TypeMultiplierBadge key={type} type={type} />
        ))}
      </div>
      <span className={`px-2 py-1 text-xs rounded ${getMultiplierColor(multiplier)}`}>{getMultiplierText(multiplier)}</span>
    </div>
  );
}
