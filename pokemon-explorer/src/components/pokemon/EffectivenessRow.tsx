import { TypeMultiplierBadge } from './TypeMultiplierBadge';

interface EffectivenessRowProps {
  title: string;
  types: string[];
  multiplier: number;
}

export function EffectivenessRow({ title, types, multiplier }: EffectivenessRowProps) {
  if (types.length === 0) return null;

  const getMultiplierColor = (multiplier: number) => {
    switch (multiplier) {
      case 0:
        return 'bg-gray-100 text-gray-600 dark:text-gray-400';
      case 0.25:
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 0.5:
        return 'bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200';
      case 1:
        return 'bg-gray-100 text-gray-600 dark:text-gray-400';
      case 2:
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 4:
        return 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-600 dark:text-gray-400';
    }
  };

  const getMultiplierText = (multiplier: number) => {
    if (multiplier === 0) return 'No Effect';
    if (multiplier === 0.25) return '¼×';
    if (multiplier === 0.5) return '½×';
    if (multiplier === 1) return '1×';
    if (multiplier === 2) return '2×';
    if (multiplier === 4) return '4×';
    return `${multiplier}×`;
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 dark:text-gray-400 w-20">{title}</span>
      <div className="flex flex-wrap gap-1 flex-1">
        {types.map(type => (
          <TypeMultiplierBadge key={type} type={type} />
        ))}
      </div>
      <span className={`px-2 py-1 text-xs rounded ${getMultiplierColor(multiplier)}`}>{getMultiplierText(multiplier)}</span>
    </div>
  );
}
