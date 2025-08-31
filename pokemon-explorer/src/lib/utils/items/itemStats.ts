import type { Item } from '@/types/items/items';

export function getItemStats(item: Item) {
  const stats = [
    {
      label: 'Cost',
      value: item.cost,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Attributes',
      value: item.attributes?.length || 0,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ];

  if (item.fling_power) {
    stats.splice(1, 0, {
      label: 'Fling Power',
      value: item.fling_power,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    });
  }

  if (item.held_by_pokemon) {
    stats.push({
      label: 'Held By',
      value: item.held_by_pokemon.length,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    });
  }

  return stats;
}
