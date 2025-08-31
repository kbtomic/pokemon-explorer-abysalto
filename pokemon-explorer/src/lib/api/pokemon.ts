import { Pokemon, PokemonListResponse, Type, Generation } from '@/types/pokemon/core';
import { Ability } from '@/types/pokemon/abilities';
import { PokemonSpecies } from '@/types/pokemon/species';
import { EvolutionChain } from '@/types/pokemon/evolution';
import { Move } from '@/types/pokemon/moves';
import { POKEMON_CHUNK_SIZE } from '@/lib/constants/api/pagination';
import { measurePerformance } from '@/lib/utils/performance/performance';
import { fetchAPI, getAllItems, getBatchChunked } from './core';

export const pokemonAPI = {
  // Pokemon endpoints
  async getPokemonList(limit?: number, offset: number = 0): Promise<PokemonListResponse> {
    if (limit) {
      return fetchAPI<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    }
    return getAllItems(`/pokemon?offset=${offset}`);
  },

  async getAllPokemonList(): Promise<PokemonListResponse> {
    return getAllItems('/pokemon');
  },

  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    return fetchAPI<Pokemon>(`/pokemon/${nameOrId}`);
  },

  async getPokemonBatch(namesOrIds: (string | number)[]): Promise<Pokemon[]> {
    const promises = namesOrIds.map(id => this.getPokemon(id));
    return Promise.all(promises);
  },

  async getAllPokemonDetails(): Promise<Pokemon[]> {
    return measurePerformance(async () => {
      // First get all Pokemon names
      const allPokemonList = await this.getAllPokemonList();
      const allNames = allPokemonList.results.map(p => p.name);

      // Fetch all Pokemon details with optimized parallel chunking
      return this.getPokemonBatchChunked(allNames, POKEMON_CHUNK_SIZE);
    });
  },

  async getPokemonPaginated(limit: number = 50, offset: number = 0): Promise<PokemonListResponse> {
    return fetchAPI<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  },

  async getPokemonBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Pokemon[]> {
    return getBatchChunked(namesOrIds, this.getPokemon.bind(this), chunkSize);
  },

  // Type endpoints
  async getTypes(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return getAllItems(`/type`);
  },

  async getType(nameOrId: string | number): Promise<Type> {
    return fetchAPI<Type>(`/type/${nameOrId}`);
  },

  // Generation endpoints
  async getGenerations(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return getAllItems(`/generation`);
  },

  async getGeneration(nameOrId: string | number): Promise<Generation> {
    return fetchAPI<Generation>(`/generation/${nameOrId}`);
  },

  // Ability endpoints
  async getAbilities(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return getAllItems(`/ability`);
  },

  async getAbility(nameOrId: string | number): Promise<Ability> {
    return fetchAPI<Ability>(`/ability/${nameOrId}`);
  },

  // Pokemon Species endpoints
  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    return fetchAPI<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
  },

  // Evolution Chain endpoints
  async getEvolutionChain(id: number): Promise<EvolutionChain> {
    return fetchAPI<EvolutionChain>(`/evolution-chain/${id}`);
  },

  // Move endpoints
  async getMove(nameOrId: string | number): Promise<Move> {
    return fetchAPI<Move>(`/move/${nameOrId}`);
  },
};
