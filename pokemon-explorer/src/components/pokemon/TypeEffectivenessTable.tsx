import { EffectivenessRow } from '@/components/pokemon/EffectivenessRow';

interface TypeEffectivenessData {
  weakTo: [string, number][];
  resists: [string, number][];
  immuneTo: [string, number][];
  multipliers: { [key: string]: number };
}

interface TypeEffectivenessTableProps {
  effectiveness: TypeEffectivenessData;
}

export function TypeEffectivenessTable({ effectiveness }: TypeEffectivenessTableProps) {
  if (effectiveness.weakTo.length === 0 && effectiveness.resists.length === 0 && effectiveness.immuneTo.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400 text-sm">This Pokémon has neutral type effectiveness.</p>;
  }

  return (
    <div className="space-y-3">
      {effectiveness.weakTo.length > 0 && (
        <EffectivenessRow
          title="Weak to:"
          types={effectiveness.weakTo.map(([type]) => type)}
          multiplier={Math.max(...effectiveness.weakTo.map(([, mult]) => mult))}
        />
      )}

      {effectiveness.resists.length > 0 && (
        <EffectivenessRow
          title="Resists:"
          types={effectiveness.resists.map(([type]) => type)}
          multiplier={Math.min(...effectiveness.resists.map(([, mult]) => mult))}
        />
      )}

      {effectiveness.immuneTo.length > 0 && (
        <EffectivenessRow title="Immune to:" types={effectiveness.immuneTo.map(([type]) => type)} multiplier={0} />
      )}
    </div>
  );
}
