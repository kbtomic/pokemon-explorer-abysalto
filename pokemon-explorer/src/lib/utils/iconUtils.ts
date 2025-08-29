import { StatName } from '@/types/enums';
import { Heart, Zap, Shield, Target, Gauge } from 'lucide-react';

export const getStatIconComponent = (statName: StatName) => {
  const iconMap = {
    [StatName.HP]: Heart,
    [StatName.ATTACK]: Zap,
    [StatName.DEFENSE]: Shield,
    [StatName.SPECIAL_ATTACK]: Target,
    [StatName.SPECIAL_DEFENSE]: Shield,
    [StatName.SPEED]: Gauge,
  };

  return iconMap[statName] || null;
};
