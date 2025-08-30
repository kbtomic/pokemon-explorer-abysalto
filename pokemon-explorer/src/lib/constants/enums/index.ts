export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortField {
  NAME = 'name',
  ID = 'id',
  GENERATION = 'generation',
  TOTAL_STATS = 'total-stats',
  HP = 'hp',
  ATTACK = 'attack',
  DEFENSE = 'defense',
  SPEED = 'speed',
  SPECIAL_ATTACK = 'special-attack',
  SPECIAL_DEFENSE = 'special-defense',
}

export enum StatName {
  HP = 'hp',
  ATTACK = 'attack',
  DEFENSE = 'defense',
  SPEED = 'speed',
  SPECIAL_ATTACK = 'special-attack',
  SPECIAL_DEFENSE = 'special-defense',
}

export enum PokemonImageVariant {
  DEFAULT = 'default',
  SHINY = 'shiny',
}

export enum ButtonVariant {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
  OUTLINE = 'outline',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  LINK = 'link',
  TYPE = 'type',
}

export enum ButtonSize {
  DEFAULT = 'default',
  SM = 'sm',
  LG = 'lg',
  ICON = 'icon',
}

export enum ChartType {
  RADAR = 'radar',
  BAR = 'bar',
  RADIAL = 'radial',
}

export enum BerryFlavor {
  SPICY = 'spicy',
  SWEET = 'sweet',
  SOUR = 'sour',
  BITTER = 'bitter',
  DRY = 'dry',
}

export enum ItemCategory {
  VITAMINS = 'vitamins',
  POTION = 'potion',
  STONES = 'stones',
  MACHINES = 'machines',
}

export enum LocationType {
  FOREST = 'forest',
  JUNGLE = 'jungle',
  MOUNTAIN = 'mountain',
  PEAK = 'peak',
  WATER = 'water',
  SEA = 'sea',
  OCEAN = 'ocean',
  CAVE = 'cave',
  TUNNEL = 'tunnel',
}

export enum SpeciesSortField {
  ID = 'id',
  NAME = 'name',
  HABITAT = 'habitat',
  SHAPE = 'shape',
  COLOR = 'color',
}

export enum LanguageCode {
  ENGLISH = 'en',
}

export enum VersionGroup {
  SWORD_SHIELD = 'sword-shield',
}

export enum NavigationLabel {
  POKEMON = 'Pokemon',
  BERRIES = 'Berries',
  ITEMS = 'Items',
  LOCATIONS = 'Locations',
  SPECIES = 'Species',
}

export enum TechnologyName {
  TYPESCRIPT = 'TypeScript',
  POKEAPI = 'PokeAPI',
}

export enum RangeBound {
  MIN = 'min',
  MAX = 'max',
}

export const SORT_DIRECTIONS = {
  ASC: SortDirection.ASC,
  DESC: SortDirection.DESC,
} as const;
