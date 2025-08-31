import { getTypeColor } from '@/lib/utils';
import { formatPokemonName } from '@/lib/utils';

interface TypeMultiplierBadgeProps {
  type: string;
  className?: string;
}

export function TypeMultiplierBadge({ type, className = '' }: TypeMultiplierBadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium text-white rounded capitalize ${className}`}
      style={{
        backgroundColor: getTypeColor(type),
      }}
    >
      {formatPokemonName(type)}
    </span>
  );
}
