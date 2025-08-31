import { Location } from '@/types';
import { LocationIconType } from '@/lib/constants/enums';

export interface LocationStats {
  totalAreas: number;
  totalGames: number;
  totalLanguages: number;
  regions: string[];
  gameGenerations: string[];
}

export function calculateLocationStats(locations: Location[]): LocationStats {
  const regions = new Set<string>();
  const gameGenerations = new Set<string>();
  let totalAreas = 0;
  let totalGames = 0;
  let totalLanguages = 0;

  locations.forEach(location => {
    if (location.region?.name) {
      regions.add(location.region.name);
    }

    location.game_indices.forEach(game => {
      gameGenerations.add(game.generation.name);
      totalGames++;
    });

    totalAreas += location.areas.length;
    totalLanguages += location.names.length;
  });

  return {
    totalAreas,
    totalGames,
    totalLanguages,
    regions: Array.from(regions).sort(),
    gameGenerations: Array.from(gameGenerations).sort(),
  };
}

export function getLocationTypeDistribution(locations: Location[]): Record<LocationIconType, number> {
  const distribution: Record<LocationIconType, number> = {} as Record<LocationIconType, number>;

  locations.forEach(location => {
    const icon = getLocationIconType(location.name);
    distribution[icon] = (distribution[icon] || 0) + 1;
  });

  return distribution;
}

export function getLocationIconType(locationName: string): LocationIconType {
  const name = locationName.toLowerCase();

  if (name.includes('forest') || name.includes('jungle') || name.includes('woods')) {
    return LocationIconType.TREES;
  }
  if (name.includes('mountain') || name.includes('peak') || name.includes('hill')) {
    return LocationIconType.MOUNTAIN;
  }
  if (name.includes('water') || name.includes('sea') || name.includes('ocean') || name.includes('lake') || name.includes('river')) {
    return LocationIconType.WAVES;
  }
  if (name.includes('cave') || name.includes('tunnel') || name.includes('cavern')) {
    return LocationIconType.CAVE;
  }
  if (name.includes('city') || name.includes('town') || name.includes('village')) {
    return LocationIconType.BUILDING;
  }
  if (name.includes('route') || name.includes('path')) {
    return LocationIconType.ROAD;
  }
  if (name.includes('island') || name.includes('beach')) {
    return LocationIconType.ISLAND;
  }

  return LocationIconType.MAP_PIN;
}

export function getRegionDistribution(locations: Location[]): Record<string, number> {
  const distribution: Record<string, number> = {};

  locations.forEach(location => {
    const region = location.region?.name || 'Unknown';
    distribution[region] = (distribution[region] || 0) + 1;
  });

  return distribution;
}
