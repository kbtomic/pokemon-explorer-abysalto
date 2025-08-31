import { filterData, sortData, formatName, formatNameCapitalized, needsMoreData, calculateItemsNeeded } from '../dataUtils';
import { SortDirection, SortField } from '@/lib/constants/enums';

describe('dataUtils', () => {
  const mockData = [
    { id: 1, name: 'bulbasaur', type: 'grass', attack: 49, defense: 49 },
    { id: 2, name: 'ivysaur', type: 'grass', attack: 62, defense: 63 },
    { id: 3, name: 'venusaur', type: 'grass', attack: 82, defense: 83 },
    { id: 4, name: 'charmander', type: 'fire', attack: 52, defense: 43 },
    { id: 5, name: 'charmeleon', type: 'fire', attack: 64, defense: 58 },
    { id: 6, name: 'charizard', type: 'fire', attack: 84, defense: 78 },
  ];

  describe('formatName', () => {
    it('should replace hyphens with spaces', () => {
      expect(formatName('mew-two')).toBe('mew two');
      expect(formatName('pikachu')).toBe('pikachu');
      expect(formatName('charizard-mega-x')).toBe('charizard mega x');
    });

    it('should handle empty string', () => {
      expect(formatName('')).toBe('');
    });

    it('should handle string without hyphens', () => {
      expect(formatName('bulbasaur')).toBe('bulbasaur');
    });
  });

  describe('formatNameCapitalized', () => {
    it('should replace hyphens with spaces and capitalize words', () => {
      expect(formatNameCapitalized('mew-two')).toBe('Mew Two');
      expect(formatNameCapitalized('pikachu')).toBe('Pikachu');
      expect(formatNameCapitalized('charizard-mega-x')).toBe('Charizard Mega X');
    });

    it('should handle empty string', () => {
      expect(formatNameCapitalized('')).toBe('');
    });

    it('should handle string without hyphens', () => {
      expect(formatNameCapitalized('bulbasaur')).toBe('Bulbasaur');
    });
  });

  describe('needsMoreData', () => {
    it('should return true when more data is needed', () => {
      expect(needsMoreData(10, 2, 5, 3)).toBe(true);
      expect(needsMoreData(5, 1, 5, 2)).toBe(true);
    });

    it('should return false when enough data is available', () => {
      expect(needsMoreData(15, 2, 5, 3)).toBe(false);
      expect(needsMoreData(10, 1, 5, 2)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(needsMoreData(0, 1, 5, 1)).toBe(true);
      expect(needsMoreData(5, 1, 5, 1)).toBe(false);
    });
  });

  describe('calculateItemsNeeded', () => {
    it('should calculate correct number of items needed', () => {
      expect(calculateItemsNeeded(10, 2, 5)).toBe(10);
      expect(calculateItemsNeeded(5, 1, 5)).toBe(5);
    });

    it('should handle edge cases', () => {
      expect(calculateItemsNeeded(0, 1, 5)).toBe(5);
      expect(calculateItemsNeeded(5, 1, 5)).toBe(5);
    });
  });

  describe('filterData', () => {
    it('should return all data when no search filter is applied', () => {
      const filters = { search: '' };
      const result = filterData(mockData, filters);

      expect(result).toEqual(mockData);
    });

    it('should filter data by search term', () => {
      const filters = { search: 'bulba' };
      const result = filterData(mockData, filters);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('bulbasaur');
    });

    it('should filter data case-insensitive', () => {
      const filters = { search: 'BULBA' };
      const result = filterData(mockData, filters);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('bulbasaur');
    });

    it('should filter data with hyphens in name', () => {
      const dataWithHyphens = [
        { id: 1, name: 'mew-two' },
        { id: 2, name: 'pikachu' },
      ];
      const filters = { search: 'mew two' };
      const result = filterData(dataWithHyphens, filters);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('mew-two');
    });

    it('should return empty array when no matches found', () => {
      const filters = { search: 'nonexistent' };
      const result = filterData(mockData, filters);

      expect(result).toEqual([]);
    });

    it('should handle partial matches', () => {
      const filters = { search: 'char' };
      const result = filterData(mockData, filters);

      expect(result).toHaveLength(3);
      expect(result.every(item => item.name.includes('char'))).toBe(true);
    });
  });

  describe('sortData', () => {
    it('should sort data by name ascending', () => {
      const sort = { field: SortField.NAME, direction: SortDirection.ASC };
      const result = sortData(mockData, sort);

      expect(result[0].name).toBe('bulbasaur');
      expect(result[result.length - 1].name).toBe('venusaur');
    });

    it('should sort data by name descending', () => {
      const sort = { field: SortField.NAME, direction: SortDirection.DESC };
      const result = sortData(mockData, sort);

      expect(result[0].name).toBe('venusaur');
      expect(result[result.length - 1].name).toBe('bulbasaur');
    });

    it('should sort data by ID ascending', () => {
      const sort = { field: SortField.ID, direction: SortDirection.ASC };
      const result = sortData(mockData, sort);

      expect(result[0].id).toBe(1);
      expect(result[result.length - 1].id).toBe(6);
    });

    it('should sort data by ID descending', () => {
      const sort = { field: SortField.ID, direction: SortDirection.DESC };
      const result = sortData(mockData, sort);

      expect(result[0].id).toBe(6);
      expect(result[result.length - 1].id).toBe(1);
    });

    it('should handle empty data', () => {
      const sort = { field: SortField.NAME, direction: SortDirection.ASC };
      const result = sortData([], sort);

      expect(result).toEqual([]);
    });

    it('should not mutate original data', () => {
      const sort = { field: SortField.NAME, direction: SortDirection.ASC };
      const originalData = [...mockData];

      sortData(mockData, sort);

      expect(mockData).toEqual(originalData);
    });

    it('should handle single item', () => {
      const singleItem = [{ id: 1, name: 'bulbasaur' }];
      const sort = { field: SortField.NAME, direction: SortDirection.ASC };
      const result = sortData(singleItem, sort);

      expect(result).toEqual(singleItem);
    });

    it('should handle items with same name', () => {
      const dataWithSameName = [
        { id: 1, name: 'bulbasaur' },
        { id: 2, name: 'bulbasaur' },
      ];
      const sort = { field: SortField.NAME, direction: SortDirection.ASC };
      const result = sortData(dataWithSameName, sort);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('bulbasaur');
      expect(result[1].name).toBe('bulbasaur');
    });

    it('should handle items with same ID', () => {
      const dataWithSameId = [
        { id: 1, name: 'bulbasaur' },
        { id: 1, name: 'ivysaur' },
      ];
      const sort = { field: SortField.ID, direction: SortDirection.ASC };
      const result = sortData(dataWithSameId, sort);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(1);
    });
  });
});
