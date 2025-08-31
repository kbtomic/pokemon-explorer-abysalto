import { getTypeColor } from '@/lib/utils';

interface MoveTypeBadgeProps {
  typeName?: string;
  className?: string;
}

export function MoveTypeBadge({ typeName, className = '' }: MoveTypeBadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium text-white rounded-full capitalize ${className}`}
      style={{ backgroundColor: typeName ? getTypeColor(typeName) : '#6b7280' }}
    >
      {typeName ? typeName : '???'}
    </span>
  );
}
