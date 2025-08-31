import { buildSearchParams, buildPaginationUrl } from '@/lib/utils/routing/urlUtils';
import { PokemonFilters, SortOption } from '@/types/ui/filters';
import { StatName, SortField, SortDirection } from '@/lib/constants/enums';

describe('URL Utilities', () => {
  describe('buildSearchParams', () => {
    it('should build search params from empty filters', () => {
      const filters: PokemonFilters = {
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [0, 0],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [0, 0],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      };
      const sort: SortOption = { field: SortField.ID, direction: SortDirection.ASC };

      const result = buildSearchParams(filters, sort);

      expect(result).toEqual({});
    });

    it('should build search params with active filters', () => {
      const filters: PokemonFilters = {
        search: 'pikachu',
        types: ['electric', 'normal'],
        generations: [1, 2],
        abilities: ['static'],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [0, 0],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [50, 100],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      };
      const sort: SortOption = { field: SortField.NAME, direction: SortDirection.DESC };

      const result = buildSearchParams(filters, sort);

      expect(result.search).toBe('pikachu');
      expect(result.types).toBe('electric,normal');
      expect(result.generations).toBe('1,2');
      expect(result.abilities).toBe('static');
      expect(result.stats).toBe('speed:50-100');
      expect(result.sortField).toBe('name');
      expect(result.sortDirection).toBe('desc');
    });

    it('should handle multiple stats correctly', () => {
      const filters: PokemonFilters = {
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [30, 80],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [50, 100],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      };
      const sort: SortOption = { field: SortField.ID, direction: SortDirection.ASC };

      const result = buildSearchParams(filters, sort);

      expect(result.stats).toBe('attack:30-80,speed:50-100');
    });
  });

  describe('buildPaginationUrl', () => {
    it('should build pagination URL with base URL and page', () => {
      const baseUrl = '/explorer';
      const filters: PokemonFilters = {
        search: 'pikachu',
        types: ['electric'],
        generations: [],
        abilities: [],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [0, 0],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [0, 0],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      };
      const sort: SortOption = { field: SortField.NAME, direction: SortDirection.ASC };
      const page = 2;

      const result = buildPaginationUrl(baseUrl, filters, sort, page);

      expect(result).toBe('/explorer?search=pikachu&types=electric&sortField=name&page=2');
    });

    it('should build pagination URL with itemsPerPage', () => {
      const baseUrl = '/explorer';
      const filters: PokemonFilters = {
        search: '',
        types: [],
        generations: [],
        abilities: [],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [0, 0],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [0, 0],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      };
      const sort: SortOption = { field: SortField.ID, direction: SortDirection.ASC };
      const page = 1;

      const result = buildPaginationUrl(baseUrl, filters, sort, page);

      expect(result).toBe('/explorer');
    });

    it('should handle complex filter combinations', () => {
      const baseUrl = '/explorer';
      const filters: PokemonFilters = {
        search: 'char',
        types: ['fire', 'flying'],
        generations: [1, 3],
        abilities: ['blaze', 'solar-power'],
        stats: {
          [StatName.HP]: [0, 0],
          [StatName.ATTACK]: [60, 120],
          [StatName.DEFENSE]: [0, 0],
          [StatName.SPEED]: [80, 100],
          [StatName.SPECIAL_ATTACK]: [0, 0],
          [StatName.SPECIAL_DEFENSE]: [0, 0],
        },
      };
      const sort: SortOption = { field: SortField.ATTACK, direction: SortDirection.DESC };
      const page = 3;

      const result = buildPaginationUrl(baseUrl, filters, sort, page);

      expect(result).toContain('search=char');
      expect(result).toContain('types=fire%2Cflying');
      expect(result).toContain('generations=1%2C3');
      expect(result).toContain('abilities=blaze%2Csolar-power');
      expect(result).toContain('stats=attack%3A60-120%2Cspeed%3A80-100');
      expect(result).toContain('sortField=attack');
      expect(result).toContain('sortDirection=desc');
      expect(result).toContain('page=3');
    });
  });
});
