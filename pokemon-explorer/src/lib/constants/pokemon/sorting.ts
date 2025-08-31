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

export const SORT_DIRECTIONS = {
  ASC: SortDirection.ASC,
  DESC: SortDirection.DESC,
} as const;
