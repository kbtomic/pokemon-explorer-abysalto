import { useState, useMemo } from 'react';
import { PokemonMove } from '@/types';
import { useMovesData } from '@/lib/hooks/useMovesData';
import { MovesFilters } from '@/components/pokemon/moves/MovesFilters';
import { MovesTable } from '@/components/pokemon/moves/MovesTable';
import { filterMoves, sortMoves } from '@/lib/utils/pokemon/movesUtils';
import { MoveSortField } from '@/lib/constants/enums';

interface ComprehensiveMovesDisplayProps {
  moves: PokemonMove[];
}

export function ComprehensiveMovesDisplay({ moves }: ComprehensiveMovesDisplayProps) {
  const [sortBy, setSortBy] = useState<MoveSortField>(MoveSortField.LEVEL);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { moveDataMap } = useMovesData(moves);

  const filteredAndSortedMoves = useMemo(() => {
    const filtered = filterMoves(moves, searchQuery, filterBy, moveDataMap);
    return sortMoves(filtered, sortBy, moveDataMap);
  }, [moves, moveDataMap, sortBy, filterBy, searchQuery]);

  return (
    <div className="bg-blue-500 rounded-xl shadow-lg p-6 max-h-[550px] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">⚔️</span>({moves.length} total moves)
        </h2>
      </div>

      <MovesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
        moves={moves}
        moveDataMap={moveDataMap}
      />

      <MovesTable filteredAndSortedMoves={filteredAndSortedMoves} moveDataMap={moveDataMap} />
    </div>
  );
}
