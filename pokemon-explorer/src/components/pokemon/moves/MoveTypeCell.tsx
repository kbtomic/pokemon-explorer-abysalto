import { MoveTypeBadge } from '@/components/pokemon/moves/MoveTypeBadge';

interface MoveTypeCellProps {
  typeName?: string;
  className?: string;
}

export function MoveTypeCell({ typeName, className = '' }: MoveTypeCellProps) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      <MoveTypeBadge typeName={typeName} />
    </td>
  );
}
