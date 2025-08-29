import { Pokemon } from '@/types';

interface ChartLegendProps {
  pokemon: Pokemon;
  compareWith: Pokemon;
}

export function ChartLegend({ pokemon, compareWith }: ChartLegendProps) {
  return (
    <div className="flex items-center justify-center space-x-6 text-sm">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-white rounded"></div>
        <span className="text-white">{pokemon.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-red-500 rounded"></div>
        <span className="text-white">{compareWith.name}</span>
      </div>
    </div>
  );
}
