import { Package, Star, Zap, Heart, Sword } from 'lucide-react';
import { ItemCategory } from '@/lib/constants/enums';

export function getItemIcon(categoryName: string) {
  switch (categoryName) {
    case ItemCategory.HELD_ITEMS:
    case ItemCategory.BAD_HELD_ITEMS:
      return { icon: Package, className: 'w-4 h-4 text-blue-500' };
    case ItemCategory.VITAMINS:
      return { icon: Heart, className: 'w-4 h-4 text-red-500' };
    case ItemCategory.BATTLE_EFFECT_ITEMS:
      return { icon: Sword, className: 'w-4 h-4 text-orange-500' };
    case ItemCategory.POTION:
    case ItemCategory.STATUS_CURES:
      return { icon: Heart, className: 'w-4 h-4 text-green-500' };
    case ItemCategory.STONES:
      return { icon: Star, className: 'w-4 h-4 text-purple-500' };
    case ItemCategory.MACHINES:
      return { icon: Zap, className: 'w-4 h-4 text-yellow-500' };
    default:
      return { icon: Package, className: 'w-4 h-4 text-gray-500' };
  }
}
