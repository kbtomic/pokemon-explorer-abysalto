import { formatBerryName, getFlavorIcon } from '@/lib/utils/berries';

interface BerryFlavorItemProps {
  flavorName: string;
  potency: number;
  className?: string;
}

export function BerryFlavorItem({ flavorName, potency, className = '' }: BerryFlavorItemProps) {
  return (
    <div className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getFlavorIcon(flavorName)}</span>
        <span className="text-gray-600">{formatBerryName(flavorName)}</span>
      </div>
      <span className="font-medium text-gray-900">{potency}</span>
    </div>
  );
}
