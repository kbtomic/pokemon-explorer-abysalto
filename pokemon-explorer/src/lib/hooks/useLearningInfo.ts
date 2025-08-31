import { useMemo } from 'react';
import { PokemonMove } from '@/types';
import { MoveLearnMethod } from '@/lib/constants/enums';

interface LearningInfo {
  method: string;
  level: number | null;
}

export function useLearningInfo(pokemonMove: PokemonMove): LearningInfo {
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
  const learningInfo = useMemo((): LearningInfo => {
    const levelUp = groupedDetails[MoveLearnMethod.LEVEL_UP];
    if (levelUp && levelUp.length > 0) {
      // Use the lowest level (earliest learned) for consistency with sorting
      const earliest = levelUp.sort((a, b) => a.level_learned_at - b.level_learned_at)[0];
      return { method: 'Level Up', level: earliest.level_learned_at };
    }

    const tm = groupedDetails[MoveLearnMethod.MACHINE];
    if (tm) {
      return { method: 'TM/TR', level: null };
    }

    const tutor = groupedDetails[MoveLearnMethod.TUTOR];
    if (tutor) {
      return { method: 'Move Tutor', level: null };
    }

    const egg = groupedDetails[MoveLearnMethod.EGG];
    if (egg) {
      return { method: 'Egg Move', level: null };
    }

    return { method: 'Other', level: null };
  }, [groupedDetails]);

  return learningInfo;
}
