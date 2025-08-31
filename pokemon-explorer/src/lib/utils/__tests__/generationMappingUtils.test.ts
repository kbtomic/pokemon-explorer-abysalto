import { createGenerationMapping, getGenerationFromId, clearGenerationMappingCache } from '../generationMapping';
import { Generation } from '@/types';

// Mock generation data for testing
const mockGenerations: Generation[] = [
  {
    id: 1,
    name: 'generation-i',
    main_region: { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
    pokemon_species: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
    ],
  },
  {
    id: 2,
    name: 'generation-ii',
    main_region: { name: 'johto', url: 'https://pokeapi.co/api/v2/region/2/' },
    pokemon_species: [
      { name: 'chikorita', url: 'https://pokeapi.co/api/v2/pokemon-species/152/' },
      { name: 'bayleef', url: 'https://pokeapi.co/api/v2/pokemon-species/153/' },
      { name: 'meganium', url: 'https://pokeapi.co/api/v2/pokemon-species/154/' },
    ],
  },
];

describe('Generation Mapping', () => {
  beforeEach(() => {
    clearGenerationMappingCache();
  });

  describe('createGenerationMapping', () => {
    it('should create correct mapping from generation data', () => {
      const mapping = createGenerationMapping(mockGenerations);

      expect(mapping.get(1)).toBe(1); // bulbasaur -> generation 1
      expect(mapping.get(2)).toBe(1); // ivysaur -> generation 1
      expect(mapping.get(3)).toBe(1); // venusaur -> generation 1
      expect(mapping.get(152)).toBe(2); // chikorita -> generation 2
      expect(mapping.get(153)).toBe(2); // bayleef -> generation 2
      expect(mapping.get(154)).toBe(2); // meganium -> generation 2
    });

    it('should handle invalid URLs gracefully', () => {
      const invalidGenerations: Generation[] = [
        {
          id: 1,
          name: 'generation-i',
          main_region: { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1/' },
          pokemon_species: [{ name: 'invalid', url: 'invalid-url' }],
        },
      ];

      const mapping = createGenerationMapping(invalidGenerations);
      expect(mapping.size).toBe(0);
    });
  });

  describe('getGenerationFromId', () => {
    it('should return correct generation for valid Pokemon IDs', () => {
      expect(getGenerationFromId(1, mockGenerations)).toBe(1);
      expect(getGenerationFromId(2, mockGenerations)).toBe(1);
      expect(getGenerationFromId(3, mockGenerations)).toBe(1);
      expect(getGenerationFromId(152, mockGenerations)).toBe(2);
      expect(getGenerationFromId(153, mockGenerations)).toBe(2);
      expect(getGenerationFromId(154, mockGenerations)).toBe(2);
    });

    it('should return null for unknown Pokemon IDs', () => {
      expect(getGenerationFromId(999, mockGenerations)).toBeNull();
      expect(getGenerationFromId(0, mockGenerations)).toBeNull();
    });

    it('should use cached mapping on subsequent calls', () => {
      // First call should create the mapping
      expect(getGenerationFromId(1, mockGenerations)).toBe(1);

      // Second call should use cached mapping
      expect(getGenerationFromId(2, mockGenerations)).toBe(1);
    });
  });

  describe('clearGenerationMappingCache', () => {
    it('should clear the cached mapping', () => {
      // Create a mapping
      getGenerationFromId(1, mockGenerations);

      // Clear cache
      clearGenerationMappingCache();

      // Should work again (recreates mapping)
      expect(getGenerationFromId(1, mockGenerations)).toBe(1);
    });
  });
});
