import {
  getPokemonImageUrl,
  getTotalStats,
  getStatValue,
  filterPokemon,
  sortPokemon,
  getGenerationFromId,
  formatPokemonName,
  formatStatName,
} from '../pokemon';
import { mockPokemon, mockPokemonList } from '@/lib/test-utils';
import { PokemonFilters, SortOption } from '@/types';

describe('Pokemon Utilities', () => {
  describe('getPokemonImageUrl', () => {
    it('should return official artwork URL for default variant', () => {
      const url = getPokemonImageUrl(mockPokemon, 'default');
      expect(url).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png');
    });

    it('should return shiny artwork URL for shiny variant', () => {
      const url = getPokemonImageUrl(mockPokemon, 'shiny');
      expect(url).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png');
    });

    it('should fallback to front_default when official artwork is not available', () => {
      const pokemonWithoutArtwork = {
        ...mockPokemon,
        sprites: {
          ...mockPokemon.sprites,
          other: {
            'official-artwork': {
              front_default: '',
              front_shiny: '',
            },
            dream_world: {
              front_default: '',
            },
          },
        },
      };
      const url = getPokemonImageUrl(pokemonWithoutArtwork);
      expect(url).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
    });
  });

  describe('getTotalStats', () => {
    it('should calculate total stats correctly', () => {
      const total = getTotalStats(mockPokemon);
      expect(total).toBe(318); // 45 + 49 + 49 + 65 + 65 + 45
    });

    it('should return 0 for Pokemon with no stats', () => {
      const pokemonWithoutStats = { ...mockPokemon, stats: [] };
      const total = getTotalStats(pokemonWithoutStats);
      expect(total).toBe(0);
    });
  });

  describe('getStatValue', () => {
    it('should return correct stat value', () => {
      const hp = getStatValue(mockPokemon, 'hp');
      expect(hp).toBe(45);
    });

    it('should return 0 for non-existent stat', () => {
      const nonExistentStat = getStatValue(mockPokemon, 'non-existent');
      expect(nonExistentStat).toBe(0);
    });
  });

  describe('filterPokemon', () => {
    it('should return all Pokemon when no filters are applied', () => {
      const filters: PokemonFilters = {
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          hp: [0, 255],
          attack: [0, 255],
          defense: [0, 255],
          speed: [0, 255],
          'special-attack': [0, 255],
          'special-defense': [0, 255],
        },
      };
      const filtered = filterPokemon(mockPokemonList, filters);
      expect(filtered).toEqual(mockPokemonList);
    });

    it('should filter by search term', () => {
      const filters: PokemonFilters = {
        search: 'bulba',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          hp: [0, 255],
          attack: [0, 255],
          defense: [0, 255],
          speed: [0, 255],
          'special-attack': [0, 255],
          'special-defense': [0, 255],
        },
      };
      const filtered = filterPokemon(mockPokemonList, filters);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('bulbasaur');
    });

    it('should filter by types', () => {
      const filters: PokemonFilters = {
        search: '',
        types: ['grass'],
        generations: [],
        abilities: [],
        stats: {
          hp: [0, 255],
          attack: [0, 255],
          defense: [0, 255],
          speed: [0, 255],
          'special-attack': [0, 255],
          'special-defense': [0, 255],
        },
      };
      const filtered = filterPokemon(mockPokemonList, filters);
      expect(filtered).toHaveLength(3); // All mock Pokemon have grass type
    });

    it('should filter by abilities', () => {
      const filters: PokemonFilters = {
        search: '',
        types: [],
        generations: [],
        abilities: ['overgrow'],
        stats: {
          hp: [0, 255],
          attack: [0, 255],
          defense: [0, 255],
          speed: [0, 255],
          'special-attack': [0, 255],
          'special-defense': [0, 255],
        },
      };
      const filtered = filterPokemon(mockPokemonList, filters);
      expect(filtered).toHaveLength(3); // All mock Pokemon have overgrow ability
    });

    it('should filter by stat ranges', () => {
      const filters: PokemonFilters = {
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          hp: [50, 255], // HP should be >= 50
          attack: [0, 255],
          defense: [0, 255],
          speed: [0, 255],
          'special-attack': [0, 255],
          'special-defense': [0, 255],
        },
      };
      const filtered = filterPokemon(mockPokemonList, filters);
      expect(filtered).toHaveLength(0); // No Pokemon have HP >= 50
    });
  });

  describe('sortPokemon', () => {
    it('should sort by name ascending', () => {
      const sort: SortOption = { field: 'name', direction: 'asc' };
      const sorted = sortPokemon(mockPokemonList, sort);
      expect(sorted[0].name).toBe('bulbasaur');
      expect(sorted[1].name).toBe('ivysaur');
      expect(sorted[2].name).toBe('venusaur');
    });

    it('should sort by name descending', () => {
      const sort: SortOption = { field: 'name', direction: 'desc' };
      const sorted = sortPokemon(mockPokemonList, sort);
      expect(sorted[0].name).toBe('venusaur');
      expect(sorted[1].name).toBe('ivysaur');
      expect(sorted[2].name).toBe('bulbasaur');
    });

    it('should sort by ID ascending', () => {
      const sort: SortOption = { field: 'id', direction: 'asc' };
      const sorted = sortPokemon(mockPokemonList, sort);
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(2);
      expect(sorted[2].id).toBe(3);
    });

    it('should sort by total stats', () => {
      const sort: SortOption = { field: 'total-stats', direction: 'asc' };
      const sorted = sortPokemon(mockPokemonList, sort);
      // All mock Pokemon have the same total stats, so order should remain the same
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(2);
      expect(sorted[2].id).toBe(3);
    });

    it('should sort by individual stat', () => {
      const sort: SortOption = { field: 'hp', direction: 'asc' };
      const sorted = sortPokemon(mockPokemonList, sort);
      // All mock Pokemon have the same HP, so order should remain the same
      expect(sorted[0].id).toBe(1);
      expect(sorted[1].id).toBe(2);
      expect(sorted[2].id).toBe(3);
    });
  });

  describe('getGenerationFromId', () => {
    it('should return correct generation for Pokemon ID', () => {
      expect(getGenerationFromId(1)).toBe(1);
      expect(getGenerationFromId(151)).toBe(1);
      expect(getGenerationFromId(152)).toBe(2);
      expect(getGenerationFromId(251)).toBe(2);
      expect(getGenerationFromId(252)).toBe(3);
      expect(getGenerationFromId(386)).toBe(3);
      expect(getGenerationFromId(387)).toBe(4);
      expect(getGenerationFromId(493)).toBe(4);
      expect(getGenerationFromId(494)).toBe(5);
      expect(getGenerationFromId(649)).toBe(5);
      expect(getGenerationFromId(650)).toBe(6);
      expect(getGenerationFromId(721)).toBe(6);
      expect(getGenerationFromId(722)).toBe(7);
      expect(getGenerationFromId(809)).toBe(7);
      expect(getGenerationFromId(810)).toBe(8);
      expect(getGenerationFromId(898)).toBe(8);
      expect(getGenerationFromId(899)).toBe(9);
    });
  });

  describe('formatPokemonName', () => {
    it('should format Pokemon name correctly', () => {
      expect(formatPokemonName('bulbasaur')).toBe('Bulbasaur');
      expect(formatPokemonName('charizard')).toBe('Charizard');
      expect(formatPokemonName('mew-two')).toBe('Mew two');
    });
  });

  describe('formatStatName', () => {
    it('should format stat name correctly', () => {
      expect(formatStatName('special-attack')).toBe('Special Attack');
      expect(formatStatName('special-defense')).toBe('Special Defense');
      expect(formatStatName('attack')).toBe('Attack');
    });
  });
});
