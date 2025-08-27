'use client';

import { useState, useMemo } from 'react';
import { PokemonMove, Move } from '@/types';
import { useMove } from '@/lib/hooks/use-pokemon';
import { formatPokemonName } from '@/lib/utils';
import { TYPE_COLORS } from '@/types';

interface ComprehensiveMovesDisplayProps {
  moves: PokemonMove[];
}

interface MoveRowProps {
  pokemonMove: PokemonMove;
  moveData?: Move;
  isLoading: boolean;
  onClick?: () => void;
}

function MoveRow({ pokemonMove, moveData, isLoading }: MoveRowProps) {
  const moveName = formatPokemonName(pokemonMove.move.name);

  // Group version details by method
  const groupedDetails = useMemo(() => {
    const groups: { [key: string]: typeof pokemonMove.version_group_details } = {};
    pokemonMove.version_group_details.forEach(detail => {
      const method = detail.move_learn_method.name;
      if (!groups[method]) {
        groups[method] = [];
      }
      groups[method].push(detail);
    });
    return groups;
  }, [pokemonMove]);

  // Get the most recent/relevant learning method and level
  const getPrimaryLearningInfo = () => {
    const levelUp = groupedDetails['level-up'];
    if (levelUp && levelUp.length > 0) {
      const latest = levelUp.sort((a, b) => b.level_learned_at - a.level_learned_at)[0];
      return { method: 'Level Up', level: latest.level_learned_at };
    }

    const tm = groupedDetails['machine'];
    if (tm) {
      return { method: 'TM/TR', level: null };
    }

    const tutor = groupedDetails['tutor'];
    if (tutor) {
      return { method: 'Move Tutor', level: null };
    }

    const egg = groupedDetails['egg'];
    if (egg) {
      return { method: 'Egg Move', level: null };
    }

    return { method: 'Other', level: null };
  };

  const learningInfo = getPrimaryLearningInfo();

  if (isLoading) {
    return (
      <tr className="border-b border-gray-200 dark:border-gray-700">
        <td className="px-4 py-3">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </td>
        <td className="px-4 py-3">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </td>
        <td className="px-4 py-3">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
        </td>
        <td className="px-4 py-3">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </td>
        <td className="px-4 py-3">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">{moveName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">#{moveData?.id || '???'}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className="px-2 py-1 text-xs font-medium text-white rounded-full capitalize"
          style={{
            backgroundColor: moveData?.type ? TYPE_COLORS[moveData.type.name as keyof typeof TYPE_COLORS] || '#6b7280' : '#6b7280',
          }}
        >
          {moveData?.type?.name || '???'}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-900 dark:text-white">{moveData?.power || '—'}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-900 dark:text-white">{moveData?.accuracy || '—'}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-900 dark:text-white">{moveData?.pp || '???'}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 dark:text-white">{learningInfo.method}</span>
          {learningInfo.level && <span className="text-xs text-gray-500 dark:text-gray-400">Level {learningInfo.level}</span>}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{moveData?.damage_class?.name || '???'}</span>
      </td>
    </tr>
  );
}

export function ComprehensiveMovesDisplay({ moves }: ComprehensiveMovesDisplayProps) {
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'type' | 'power'>('level');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch move data for all moves - Note: In a real app, you might want to limit this to avoid too many API calls
  // For now, we'll fetch data for all moves but this could be optimized with pagination
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

  // Filter and sort moves
  const filteredAndSortedMoves = useMemo(() => {
    const filtered = moves.filter(move => {
      const moveData = moveDataMap[move.move.name];
      const matchesSearch = move.move.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterBy === 'all' || moveData?.data?.type?.name === filterBy;
      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      const aData = moveDataMap[a.move.name];
      const bData = moveDataMap[b.move.name];

      switch (sortBy) {
        case 'name':
          return a.move.name.localeCompare(b.move.name);
        case 'level':
          const aLevelUp = a.version_group_details.find(d => d.move_learn_method.name === 'level-up')?.level_learned_at || 999;
          const bLevelUp = b.version_group_details.find(d => d.move_learn_method.name === 'level-up')?.level_learned_at || 999;
          return aLevelUp - bLevelUp;
        case 'type':
          return (aData?.data?.type?.name || '').localeCompare(bData?.data?.type?.name || '');
        case 'power':
          return (bData?.data?.power || 0) - (aData?.data?.power || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [moves, moveDataMap, sortBy, filterBy, searchQuery]);

  // Get unique types for filter dropdown
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    moves.forEach(move => {
      const moveData = moveDataMap[move.move.name];
      if (moveData?.data?.type?.name) {
        types.add(moveData.data.type.name);
      }
    });
    return Array.from(types).sort();
  }, [moves, moveDataMap]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <span className="mr-2">⚔️</span>
          Moves ({moves.length} total)
        </h2>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search moves..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterBy}
            onChange={e => setFilterBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="all">All Types</option>
            {availableTypes.map(type => (
              <option key={type} value={type} className="capitalize">
                {formatPokemonName(type)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'level' | 'type' | 'power')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="level">Sort by Level</option>
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
            <option value="power">Sort by Power</option>
          </select>
        </div>
      </div>

      {/* Moves Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Move</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Power</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acc</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">PP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Learn Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedMoves.map(move => {
              const moveInfo = moveDataMap[move.move.name];
              return <MoveRow key={move.move.name} pokemonMove={move} moveData={moveInfo?.data} isLoading={moveInfo?.isLoading || false} />;
            })}
          </tbody>
        </table>
      </div>

      {filteredAndSortedMoves.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No moves found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
