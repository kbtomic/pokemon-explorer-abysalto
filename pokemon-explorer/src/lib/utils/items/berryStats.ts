import type { Berry } from '@/types/items/berries';

export function getBerryStats(berry: Berry) {
  return [
    {
      label: 'Growth Time',
      value: `${berry.growth_time}h`,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Max Harvest',
      value: berry.max_harvest,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Size',
      value: berry.size,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Smoothness',
      value: berry.smoothness,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];
}
