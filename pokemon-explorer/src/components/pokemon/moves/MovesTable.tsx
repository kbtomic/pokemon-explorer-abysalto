import { PokemonMove } from '@/types/pokemon/core';
import { Move } from '@/types/pokemon/moves';
import { MoveRow } from '@/components/pokemon/moves/MoveRow';
import { MovesTableColumn } from '@/lib/constants/moves/sorting';

interface MovesTableProps {
  filteredAndSortedMoves: PokemonMove[];
  moveDataMap: { [key: string]: { data?: Move; isLoading: boolean } };
}

export function MovesTable({ filteredAndSortedMoves, moveDataMap }: MovesTableProps) {
  if (filteredAndSortedMoves.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white">No moves found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-500">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.MOVE}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.TYPE}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.POWER}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.ACCURACY}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.PP}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.LEARN_METHOD}</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">{MovesTableColumn.CATEGORY}</th>
          </tr>
        </thead>
        <tbody className="bg-blue-500 divide-y divide-gray-200">
          {filteredAndSortedMoves.map(move => {
            const moveInfo = moveDataMap[move.move.name];
            return <MoveRow key={move.move.name} pokemonMove={move} moveData={moveInfo?.data} isLoading={moveInfo?.isLoading || false} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
