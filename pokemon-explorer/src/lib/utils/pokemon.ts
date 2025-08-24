import { Pokemon, PokemonFilters, SortOption } from '@/types';

export function getPokemonImageUrl(pokemon: Pokemon, variant: 'default' | 'shiny' = 'default'): string {
  const artwork = pokemon.sprites.other['official-artwork'];
  if (variant === 'shiny' && artwork.front_shiny) {
    return artwork.front_shiny;
  }
  return artwork.front_default || pokemon.sprites.front_default || '';
}

export function getTotalStats(pokemon: Pokemon): number {
  return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
}

export function getStatValue(pokemon: Pokemon, statName: string): number {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat?.base_stat || 0;
}

export function filterPokemon(pokemonList: Pokemon[], filters: PokemonFilters): Pokemon[] {
  return pokemonList.filter(pokemon => {
    // Search filter
    if (filters.search && !pokemon.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Type filter
    if (filters.types.length > 0) {
      const pokemonTypes = pokemon.types.map(t => t.type.name);
      if (!filters.types.some(type => pokemonTypes.includes(type))) {
        return false;
      }
    }

    // Generation filter (simplified - using ID ranges)
    if (filters.generations.length > 0) {
      const generation = getGenerationFromId(pokemon.id);
      if (!filters.generations.includes(generation)) {
        return false;
      }
    }

    // Abilities filter
    if (filters.abilities.length > 0) {
      const pokemonAbilities = pokemon.abilities.map(a => a.ability.name);
      if (!filters.abilities.some(ability => pokemonAbilities.includes(ability))) {
        return false;
      }
    }

    // Stats filter
    for (const [statName, [min, max]] of Object.entries(filters.stats)) {
      const statValue = getStatValue(pokemon, statName);
      if (statValue < min || statValue > max) {
        return false;
      }
    }

    return true;
  });
}

export function sortPokemon(pokemonList: Pokemon[], sort: SortOption): Pokemon[] {
  return [...pokemonList].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sort.field) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'id':
        aValue = a.id;
        bValue = b.id;
        break;
      case 'total-stats':
        aValue = getTotalStats(a);
        bValue = getTotalStats(b);
        break;
      default:
        aValue = getStatValue(a, sort.field);
        bValue = getStatValue(b, sort.field);
        break;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      const comparison = aValue - bValue;
      return sort.direction === 'asc' ? comparison : -comparison;
    }

    return 0;
  });
}

export function getGenerationFromId(id: number): number {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 898) return 8;
  return 9;
}

export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');
}

export function formatStatName(statName: string): string {
  return statName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}
