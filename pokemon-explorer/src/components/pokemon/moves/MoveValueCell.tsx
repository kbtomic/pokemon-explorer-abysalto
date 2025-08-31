interface MoveValueCellProps {
  value?: number | string | null;
  fallback?: string;
  className?: string;
}

export function MoveValueCell({ value, fallback = '—', className = '' }: MoveValueCellProps) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      <span className="text-sm text-white">{value || fallback}</span>
    </td>
  );
}
