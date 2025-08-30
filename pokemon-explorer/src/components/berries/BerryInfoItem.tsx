interface BerryInfoItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function BerryInfoItem({ label, value, className = '' }: BerryInfoItemProps) {
  return (
    <div className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg ${className}`}>
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
