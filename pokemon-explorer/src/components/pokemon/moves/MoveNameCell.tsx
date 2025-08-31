interface MoveNameCellProps {
  moveName: string;
  moveId?: number;
  className?: string;
}

export function MoveNameCell({ moveName, moveId, className = '' }: MoveNameCellProps) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      <div className="flex flex-col">
        <span className="font-medium text-white">{moveName}</span>
        <span className="text-xs text-white">#{moveId || '???'}</span>
      </div>
    </td>
  );
}
