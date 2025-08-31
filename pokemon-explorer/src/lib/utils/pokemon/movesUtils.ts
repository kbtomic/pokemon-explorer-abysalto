import { PokemonMove } from '@/types/pokemon/core';
import { Move } from '@/types/pokemon/moves';
import { MoveLearnMethod, MoveSortField } from '@/lib/constants/enums';
import { formatPokemonName } from './pokemon';

// Complex sorting for moves that can't use the generic function
export const sortMoves = (
  moves: PokemonMove[],
  sortBy: MoveSortField,
  moveDataMap: { [key: string]: { data?: Move; isLoading: boolean } }
): PokemonMove[] => {
  return [...moves].sort((a, b) => {
    const aData = moveDataMap[a.move.name];
    const bData = moveDataMap[b.move.name];

    switch (sortBy) {
      case MoveSortField.NAME:
        return a.move.name.localeCompare(b.move.name);
      case MoveSortField.LEVEL:
        const aLevelUp = a.version_group_details.find(d => d.move_learn_method.name === MoveLearnMethod.LEVEL_UP)?.level_learned_at || 999;
        const bLevelUp = b.version_group_details.find(d => d.move_learn_method.name === MoveLearnMethod.LEVEL_UP)?.level_learned_at || 999;
        return aLevelUp - bLevelUp;
      case MoveSortField.TYPE:
        return (aData?.data?.type?.name || '').localeCompare(bData?.data?.type?.name || '');
      case MoveSortField.POWER:
        return (bData?.data?.power || 0) - (aData?.data?.power || 0);
      default:
        return 0;
    }
  });
};

// Filter moves based on search and type
export const filterMoves = (
  moves: PokemonMove[],
  searchQuery: string,
  filterBy: string,
  moveDataMap: { [key: string]: { data?: Move; isLoading: boolean } }
): PokemonMove[] => {
  return moves.filter(move => {
    const moveData = moveDataMap[move.move.name];
    const matchesSearch = move.move.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || moveData?.data?.type?.name === filterBy;
    return matchesSearch && matchesFilter;
  });
};

// Get available move types for filtering
export const getAvailableMoveTypes = (moves: PokemonMove[], moveDataMap: { [key: string]: { data?: Move; isLoading: boolean } }) => {
  const types = moves
    .map(move => {
      const moveData = moveDataMap[move.move.name];
      return moveData?.data?.type?.name;
    })
    .filter((type): type is string => Boolean(type))
    .filter((type, index, arr) => arr.indexOf(type) === index)
    .sort();

  return types.map(type => ({
    value: type,
    label: formatPokemonName(type),
  }));
};

// Get sort options for moves
export const getSortOptions = () => [
  { value: MoveSortField.LEVEL, label: 'Sort by Level' },
  { value: MoveSortField.NAME, label: 'Sort by Name' },
  { value: MoveSortField.TYPE, label: 'Sort by Type' },
  { value: MoveSortField.POWER, label: 'Sort by Power' },
];
