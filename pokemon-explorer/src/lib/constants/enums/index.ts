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
  HELD_ITEMS = 'held-items',
  BAD_HELD_ITEMS = 'bad-held-items',
  VITAMINS = 'vitamins',
  BATTLE_EFFECT_ITEMS = 'battle-effect-items',
  POTION = 'potion',
  STATUS_CURES = 'status-cures',
  STONES = 'stones',
  MACHINES = 'machines',
}

export enum ImageType {
  ITEM = 'item',
  BERRY = 'berry',
  LOCATION = 'location',
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

export enum LocationIconType {
  TREES = 'trees',
  MOUNTAIN = 'mountain',
  WAVES = 'waves',
  CAVE = 'cave',
  BUILDING = 'building',
  ROAD = 'road',
  ISLAND = 'island',
  MAP_PIN = 'map-pin',
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
}

export enum TechnologyName {
  TYPESCRIPT = 'TypeScript',
  POKEAPI = 'PokeAPI',
}

// Move-related enums based on PokeAPI data
export enum MoveDamageClass {
  STATUS = 'status',
  PHYSICAL = 'physical',
  SPECIAL = 'special',
}

export enum MoveLearnMethod {
  LEVEL_UP = 'level-up',
  EGG = 'egg',
  TUTOR = 'tutor',
  MACHINE = 'machine',
  STADIUM_SURFING_PIKACHU = 'stadium-surfing-pikachu',
  LIGHT_BALL_EGG = 'light-ball-egg',
  COLOSSEUM_PURIFICATION = 'colosseum-purification',
  XD_SHADOW = 'xd-shadow',
  XD_PURIFICATION = 'xd-purification',
  FORM_CHANGE = 'form-change',
  ZYGARDE_CUBE = 'zygarde-cube',
}

export enum MoveCategory {
  DAMAGE = 'damage',
  AILMENT = 'ailment',
  NET_GOOD_STATS = 'net-good-stats',
  HEAL = 'heal',
  DAMAGE_AILMENT = 'damage+ailment',
  SWAGGER = 'swagger',
  DAMAGE_LOWER = 'damage+lower',
  DAMAGE_RAISE = 'damage+raise',
  DAMAGE_HEAL = 'damage+heal',
  OHKO = 'ohko',
  WHOLE_FIELD_EFFECT = 'whole-field-effect',
  FIELD_EFFECT = 'field-effect',
  FORCE_SWITCH = 'force-switch',
  UNIQUE = 'unique',
}

export enum RangeBound {
  MIN = 'min',
  MAX = 'max',
}

export enum Theme {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  GRAY = 'gray',
}

export enum ContentSectionTitle {
  EFFECT = 'Effect',
  IN_GAME_DESCRIPTION = 'In-Game Description',
  ABILITY_ID = 'Ability ID',
  TYPE_EFFECTIVENESS = 'Type Effectiveness',
  ABILITIES = 'Abilities',
  SPECIES_INFORMATION = 'Species Information',
  DESCRIPTION = 'Description',
  BASE_STATS = 'Base Stats',
  EVOLUTION_CHAIN = 'Evolution Chain',
  POKEMON_VARIETIES = 'Pokemon Varieties',
  MOVES = 'Moves',
  CHARACTERISTICS = 'Characteristics',
  BIOLOGY = 'Biology',
  EGG_GROUPS = 'Egg Groups',
  RARITY = 'Rarity',
}

// Pokemon species characteristic labels
export enum CharacteristicLabel {
  GENERATION = 'Generation',
  HABITAT = 'Habitat',
  SHAPE = 'Shape',
  COLOR = 'Color',
}

// Pokemon species biology labels
export enum BiologyLabel {
  CAPTURE_RATE = 'Capture Rate',
  BASE_HAPPINESS = 'Base Happiness',
  HATCH_COUNTER = 'Hatch Counter',
  GENDER_RATE = 'Gender Rate',
}

// Pokemon species special category labels
export enum SpecialCategoryLabel {
  BABY_POKEMON = '👶 Baby Pokemon',
  LEGENDARY = '👑 Legendary',
  MYTHICAL = '🏆 Mythical',
}

// Badge color variants
export enum BadgeColor {
  DEFAULT = 'default',
  RED = 'red',
  PINK = 'pink',
  YELLOW = 'yellow',
  PURPLE = 'purple',
}

// Evolution trigger types
export enum EvolutionTriggerType {
  LEVEL_UP = 'level-up',
  USE_ITEM = 'use-item',
  TRADE = 'trade',
  OTHER = 'other',
}

// Evolution method labels
export enum EvolutionMethod {
  LEVEL = 'Level',
  ITEM = 'Item',
  TRADE = 'Trade',
  HELD_ITEM = 'Holding',
  KNOWN_MOVE = 'Knows',
  TIME_OF_DAY = 'Time',
  LOCATION = 'At',
  FRIENDSHIP = 'High friendship',
  BEAUTY = 'High beauty',
  RAIN = 'Rain',
  PARTY_SPECIES = 'With species in party',
  PARTY_TYPE = 'With type in party',
  PHYSICAL_STATS = 'Physical stats',
  TRADE_SPECIES = 'Trade for',
  UPSIDE_DOWN = 'Turn console upside down',
  SPECIAL = 'Special',
}

// Moves table column headers
export enum MovesTableColumn {
  MOVE = 'Move',
  TYPE = 'Type',
  POWER = 'Power',
  ACCURACY = 'Acc',
  PP = 'PP',
  LEARN_METHOD = 'Learn Method',
  CATEGORY = 'Category',
}

// Move sorting fields
export enum MoveSortField {
  LEVEL = 'level',
  NAME = 'name',
  TYPE = 'type',
  POWER = 'power',
}

// Pokemon variety labels
export enum VarietyLabel {
  DEFAULT = 'Default',
  CURRENT = 'Current',
  FORMS_VARIETIES = 'Forms & Varieties',
}

export const SORT_DIRECTIONS = {
  ASC: SortDirection.ASC,
  DESC: SortDirection.DESC,
} as const;
