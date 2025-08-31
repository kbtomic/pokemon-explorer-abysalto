import { pokemonAPI as pokeAPI } from '@/lib/api/pokemon';
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
    it('should fetch Pokemon list successfully with limit', async () => {
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      const mockResponse = createMockResponse(mockApiResponses.pokemonList);
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await pokeAPI.getPokemonList(151);

      expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
      expect(result).toEqual(mockApiResponses.pokemonList);
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
    });
  });
});
