import { Pokemon } from '@/types/pokemon/core';
import { PokemonFilters, SortOption } from '@/types/ui/filters';
import { PokemonSpecies } from '@/types/pokemon/species';
import { StatName, SortField, SortDirection } from '@/lib/constants/enums';

export function getTotalStats(pokemon: Pokemon): number {
  return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
}

export function getStatValue(pokemon: Pokemon, statName: StatName): number {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat?.base_stat || 0;
}

export function filterPokemon(
  pokemonList: Pokemon[],
  filters: PokemonFilters,
  getGenerationFromIdFn: (id: number) => number | null
): Pokemon[] {
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

    // Generation filter (using dynamic mapping)
    if (filters.generations.length > 0) {
      const generation = getGenerationFromIdFn(pokemon.id);
      if (generation === null || !filters.generations.includes(generation)) {
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
      // Skip stats with [0, 0] as they indicate no filter is applied
      if (min === 0 && max === 0) {
        continue;
      }
      const statValue = getStatValue(pokemon, statName as StatName);
      if (statValue < min || statValue > max) {
        return false;
      }
    }

    return true;
  });
}

export function sortPokemon(pokemonList: Pokemon[], sort: SortOption, getGenerationFromIdFn: (id: number) => number | null): Pokemon[] {
  return [...pokemonList].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sort.field) {
      case SortField.NAME:
        aValue = a.name;
        bValue = b.name;
        break;
      case SortField.ID:
        aValue = a.id;
        bValue = b.id;
        break;
      case SortField.GENERATION:
        aValue = getGenerationFromIdFn(a.id) || 0;
        bValue = getGenerationFromIdFn(b.id) || 0;
        break;
      case SortField.TOTAL_STATS:
        aValue = getTotalStats(a);
        bValue = getTotalStats(b);
        break;
      case SortField.HP:
        aValue = getStatValue(a, StatName.HP);
        bValue = getStatValue(b, StatName.HP);
        break;
      case SortField.ATTACK:
        aValue = getStatValue(a, StatName.ATTACK);
        bValue = getStatValue(b, StatName.ATTACK);
        break;
      case SortField.DEFENSE:
        aValue = getStatValue(a, StatName.DEFENSE);
        bValue = getStatValue(b, StatName.DEFENSE);
        break;
      case SortField.SPEED:
        aValue = getStatValue(a, StatName.SPEED);
        bValue = getStatValue(b, StatName.SPEED);
        break;
      case SortField.SPECIAL_ATTACK:
        aValue = getStatValue(a, StatName.SPECIAL_ATTACK);
        bValue = getStatValue(b, StatName.SPECIAL_ATTACK);
        break;
      case SortField.SPECIAL_DEFENSE:
        aValue = getStatValue(a, StatName.SPECIAL_DEFENSE);
        bValue = getStatValue(b, StatName.SPECIAL_DEFENSE);
        break;
      default:
        aValue = a.id;
        bValue = b.id;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sort.direction === SortDirection.ASC ? comparison : -comparison;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === SortDirection.ASC ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
}

export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function formatStatName(statName: StatName): string {
  return statName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getEvolutionChainId(species: PokemonSpecies): number | null {
  if (!species.evolution_chain?.url) return null;
  const match = species.evolution_chain.url.match(/\/evolution-chain\/(\d+)\//);
  return match ? parseInt(match[1], 10) : null;
}

export function getSpeciesIdFromPokemon(pokemon: Pokemon): number | null {
  if (!pokemon.species?.url) return null;
  const match = pokemon.species.url.match(/\/pokemon-species\/(\d+)\//);
  return match ? parseInt(match[1], 10) : null;
}
