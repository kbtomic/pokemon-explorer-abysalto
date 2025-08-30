interface BerryCharacteristicItemProps {
  label: string;
  value: string | number;
  formatValue?: (value: string | number) => string;
}

export function BerryCharacteristicItem({ label, value, formatValue }: BerryCharacteristicItemProps) {
  const displayValue = formatValue ? formatValue(value) : value;

  return (
    <div className="flex gap-x-2 items-center">
      <span className="text-white">{label}:</span>
      <span className="text-red-200 font-medium">{displayValue}</span>
    </div>
  );
}
