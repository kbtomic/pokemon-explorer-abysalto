import { getTypeColor } from '@/lib/utils/ui/typeColors';
import { cn } from '@/lib/utils/formatting/cn';

interface PokemonTypeBadgeProps {
  typeName: string;
  className?: string;
}

export function PokemonTypeBadge({ typeName, className }: PokemonTypeBadgeProps) {
  return (
    <span
      className={cn(
        'px-3 py-1.5 text-xs font-bold text-white rounded-full capitalize shadow-sm transform group-hover:scale-105 transition-transform duration-200',
        className
      )}
      style={{
        backgroundColor: getTypeColor(typeName),
        boxShadow: `0 2px 4px ${getTypeColor(typeName)}40`,
      }}
    >
      {typeName}
    </span>
  );
}
