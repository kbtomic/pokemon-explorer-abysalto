interface DamageClassCellProps {
  damageClassName?: string;
  className?: string;
}

export function DamageClassCell({ damageClassName, className = '' }: DamageClassCellProps) {
  return (
    <td className={`px-4 py-3 ${className}`}>
      <span className="text-sm text-white capitalize">{damageClassName || '???'}</span>
    </td>
  );
}
