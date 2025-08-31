import { formatName, formatNameCapitalized } from '@/lib/utils/formatting/stringUtils';
import type { Berry } from '@/types/pokemon';

export function formatFirmness(value: string | number): string {
  return typeof value === 'string' ? formatName(value) : value.toString();
}

export function getBerryCharacteristics(berry: Berry) {
  return [
    {
      label: 'Firmness',
      value: berry.firmness.name,
      formatValue: formatFirmness,
    },
    {
      label: 'Natural Gift Power',
      value: berry.natural_gift_power,
    },
    {
      label: 'Soil Dryness',
      value: berry.soil_dryness,
    },
  ];
}

export function getBerryFlavors(berry: Berry) {
  if (!berry.flavors || berry.flavors.length === 0) return [];

  return berry.flavors.map(flavor => ({
    label: formatNameCapitalized(flavor.flavor.name),
    value: flavor.potency,
  }));
}
