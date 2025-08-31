import { StatName } from '@/lib/constants/pokemon/stats';

export const STAT_NAMES = {
  [StatName.HP]: 'HP',
  [StatName.ATTACK]: 'Attack',
  [StatName.DEFENSE]: 'Defense',
  [StatName.SPEED]: 'Speed',
  [StatName.SPECIAL_ATTACK]: 'Sp. Atk',
  [StatName.SPECIAL_DEFENSE]: 'Sp. Def',
} as const;
