import { Pokemon, PokemonListResponse, Type, Generation, Ability } from '@/types';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokeAPIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'PokeAPIError';
  }
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new PokeAPIError(`API request failed: ${response.statusText}`, response.status);
  }

  return response.json();
}

export const pokeAPI = {
  // Pokemon endpoints
  async getPokemonList(limit: number = 151, offset: number = 0): Promise<PokemonListResponse> {
    return fetchAPI<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  },

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return fetchAPI<Pokemon>(`/pokemon/${nameOrId}`);
  },

  async getPokemonBatch(namesOrIds: (string | number)[]): Promise<Pokemon[]> {
    const promises = namesOrIds.map(id => this.getPokemon(id));
    return Promise.all(promises);
  },

  // Type endpoints
  async getTypes(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/type`);
  },

  async getType(nameOrId: string | number): Promise<Type> {
    return fetchAPI<Type>(`/type/${nameOrId}`);
  },

  // Generation endpoints
  async getGenerations(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/generation`);
  },

  async getGeneration(nameOrId: string | number): Promise<Generation> {
    return fetchAPI<Generation>(`/generation/${nameOrId}`);
  },

  // Ability endpoints
  async getAbilities(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/ability`);
  },

  async getAbility(nameOrId: string | number): Promise<Ability> {
    return fetchAPI<Ability>(`/ability/${nameOrId}`);
  },

  // Utility functions
  extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : 0;
  },

  getPokemonImageUrl(id: number): string {
    const baseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    return baseUrl;
  },
};

export { PokeAPIError };
