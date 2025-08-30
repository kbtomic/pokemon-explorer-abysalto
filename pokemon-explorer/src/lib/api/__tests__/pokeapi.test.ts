import { pokeAPI } from '../pokeapi';
import { mockApiResponses, mockPokemon } from '@/lib/test-utils';

// Helper function to create a proper mock Response
function createMockResponse(data: unknown, ok: boolean = true, status: number = 200, statusText: string = 'OK') {
  return {
    ok,
    status,
    statusText,
    json: async () => data,
    headers: new Headers(),
    redirected: false,
    type: 'default' as ResponseType,
    url: '',
    clone: function () {
      return this;
    },
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => JSON.stringify(data),
    body: null,
    bodyUsed: false,
  } as Response;
}

// Mock fetch globally
global.fetch = jest.fn();

describe('PokeAPI Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemonList', () => {
    it('should fetch Pokemon list successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      const mockResponse = createMockResponse(mockApiResponses.pokemonList);
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await pokeAPI.getPokemonList(151);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
      expect(result).toEqual(mockApiResponses.pokemonList);
    });

    it('should handle API errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(pokeAPI.getPokemonList()).rejects.toThrow('Network error');
    });

    it('should handle non-ok response', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse({}, false, 404, 'Not Found'));

      await expect(pokeAPI.getPokemonList()).rejects.toThrow('API request failed: Not Found');
    });
  });

  describe('getPokemon', () => {
    it('should fetch Pokemon data successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse(mockPokemon));

      const result = await pokeAPI.getPokemon(1);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
      expect(result).toEqual(mockPokemon);
    });

    it('should handle Pokemon not found', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse({}, false, 404, 'Not Found'));

      await expect(pokeAPI.getPokemon(99999)).rejects.toThrow('API request failed: Not Found');
    });

    it('should handle network errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(pokeAPI.getPokemon(1)).rejects.toThrow('Network error');
    });
  });

  describe('getTypes', () => {
    it('should fetch types successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse(mockApiResponses.types));

      const result = await pokeAPI.getTypes();

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
      expect(result).toEqual(mockApiResponses.types);
    });

    it('should handle API errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(pokeAPI.getTypes()).rejects.toThrow('Network error');
    });
  });

  describe('getAbilities', () => {
    it('should fetch abilities successfully', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      // Mock the first call (initial response)
      mockFetch.mockResolvedValueOnce(createMockResponse(mockApiResponses.abilities));
      // Mock the second call (when getAllItems fetches all items)
      mockFetch.mockResolvedValueOnce(createMockResponse(mockApiResponses.abilities));

      const result = await pokeAPI.getAbilities();

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/ability');
      expect(result).toEqual(mockApiResponses.abilities);
    });

    it('should handle API errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(pokeAPI.getAbilities()).rejects.toThrow('Network error');
    });
  });

  describe('getAbility', () => {
    it('should fetch ability data successfully', async () => {
      const mockAbility = {
        id: 1,
        name: 'stench',
        effect_entries: [
          {
            effect: 'This Pokémon has a foul odor that may cause flinching.',
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
            short_effect: 'May cause flinching.',
          },
        ],
        flavor_text_entries: [
          {
            flavor_text: 'A foul stench that may cause flinching.',
            language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
            version_group: { name: 'red-blue', url: 'https://pokeapi.co/api/v2/version-group/1/' },
          },
        ],
      };

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse(mockAbility));

      const result = await pokeAPI.getAbility('stench');

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/ability/stench');
      expect(result).toEqual(mockAbility);
    });

    it('should handle ability not found', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse({}, false, 404, 'Not Found'));

      await expect(pokeAPI.getAbility('non-existent-ability')).rejects.toThrow('API request failed: Not Found');
    });

    it('should handle network errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(pokeAPI.getAbility('stench')).rejects.toThrow('Network error');
    });
  });

  describe('Error Handling', () => {
    it('should handle JSON parsing errors', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ...createMockResponse({}),
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(pokeAPI.getPokemon(1)).rejects.toThrow('Invalid JSON');
    });

    it('should handle timeout scenarios', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockImplementationOnce(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 100);
        });
      });

      await expect(pokeAPI.getPokemon(1)).rejects.toThrow('Request timeout');
    });
  });

  describe('URL Construction', () => {
    it('should construct correct URLs for different endpoints', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValue(createMockResponse({}));

      await pokeAPI.getPokemon(1);
      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');

      await pokeAPI.getPokemon(25);
      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25');

      await pokeAPI.getAbility('overgrow');
      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/ability/overgrow');

      await pokeAPI.getTypes();
      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');

      await pokeAPI.getAbilities();
      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/ability');
    });
  });

  describe('Response Validation', () => {
    it('should validate Pokemon response structure', async () => {
      const invalidPokemon = {
        id: 1,
        name: 'bulbasaur',
        // Missing required fields
      };

      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce(createMockResponse(invalidPokemon));

      const result = await pokeAPI.getPokemon(1);
      expect(result).toEqual(invalidPokemon);
    });

    it('should handle empty responses', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ...createMockResponse({}),
        json: async () => null,
      });

      const result = await pokeAPI.getPokemon(1);
      expect(result).toBeNull();
    });
  });
});
