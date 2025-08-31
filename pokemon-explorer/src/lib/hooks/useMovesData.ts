import { useMemo } from 'react';
import { PokemonMove, Move } from '@/types';
import { useMove } from '@/lib/hooks/usePokemon';

export function useMovesData(moves: PokemonMove[]) {
  // Fetch move data for all moves
  const moveQueries = moves.map(pokemonMove => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMove(pokemonMove.move.name);
  });

  // Create a map of move data
  const moveDataMap = useMemo(() => {
    const map: { [key: string]: { data?: Move; isLoading: boolean } } = {};
    moves.forEach((move, index) => {
      map[move.move.name] = {
        data: moveQueries[index].data,
        isLoading: moveQueries[index].isLoading,
      };
    });
    return map;
  }, [moves, moveQueries]);

  const isLoading = moveQueries.some(q => q.isLoading);

  return {
    moveDataMap,
    isLoading,
  };
}
