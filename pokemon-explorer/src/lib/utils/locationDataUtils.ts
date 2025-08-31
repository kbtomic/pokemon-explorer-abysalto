import { Location } from '@/types';
import { LocationIconType } from '@/lib/constants/enums';

export function getLocationIcon(locationName: string): LocationIconType {
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

export function getLocationStats(location: Location) {
  return {
    areas: location.areas.length,
    games: location.game_indices.length,
    languages: location.names.length,
    region: location.region?.name || 'Unknown',
  };
}

export function getLocationDisplayName(location: Location, language: string = 'en') {
  const localizedName = location.names.find(name => name.language.name === language);

  return localizedName?.name || location.name.replace('-', ' ');
}

export function getLocationRegion(location: Location) {
  return location.region?.name || 'Unknown Region';
}

export function getLocationGames(location: Location) {
  return location.game_indices.map(game => ({
    generation: game.generation.name.replace('-', ' '),
    gameIndex: game.game_index,
  }));
}

export function getLocationLanguages(location: Location) {
  return location.names.map(name => ({
    language: name.language.name,
    name: name.name,
  }));
}
