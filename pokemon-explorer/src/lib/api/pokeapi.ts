import {
  Pokemon,
  PokemonListResponse,
  Type,
  Generation,
  Ability,
  PokemonSpecies,
  PokemonForm,
  PokemonHabitat,
  PokemonShape,
  PokemonColor,
  EvolutionChain,
  Move,
  Berry,
  BerryFirmness,
  BerryFlavor,
  Item,
  ItemCategory,
  Machine,
  Location,
  LocationArea,
  Region,
  Pokedex,
  Version,
  VersionGroup,
  EncounterMethod,
  EncounterCondition,
  EvolutionTrigger,
} from '@/types';
import { POKEMON_CHUNK_SIZE } from '@/lib/constants/pagination';
import { measurePerformance } from '@/lib/utils/performance';

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

async function fetchAPI<T>(endpoint: string, retries: number = 3): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new PokeAPIError(`API request failed: ${response.statusText}`, response.status);
      }

      return response.json();
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new PokeAPIError('Max retries exceeded', 500);
}

// Generic function to get all items from any endpoint
async function getAllItems<T extends { count?: number; results?: unknown[] }>(endpoint: string): Promise<T> {
  const response = await fetchAPI<T>(endpoint);

  // Check if we need to fetch more items
  if (response.count && response.results && response.count > response.results.length) {
    return fetchAPI<T>(`${endpoint}?limit=${response.count}`);
  }

  return response;
}

export const pokeAPI = {
  // Pokemon endpoints
  async getPokemonList(limit?: number, offset: number = 0): Promise<PokemonListResponse> {
    if (limit) {
      return fetchAPI<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    }
    return getAllItems(`/pokemon?offset=${offset}`);
  },

  // New: Get all Pokemon list in one request
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

  // New: Get all Pokemon details with optimized parallel chunking
  async getAllPokemonDetails(): Promise<Pokemon[]> {
    return measurePerformance('Pokemon Fetch All Details', async () => {
      // First get all Pokemon names
      const allPokemonList = await this.getAllPokemonList();
      const allNames = allPokemonList.results.map(p => p.name);

      // Fetch all Pokemon details with optimized parallel chunking
      return this.getPokemonBatchChunked(allNames, POKEMON_CHUNK_SIZE);
    });
  },

  // New: Paginated Pokemon fetching
  async getPokemonPaginated(limit: number = 50, offset: number = 0): Promise<PokemonListResponse> {
    return fetchAPI<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  },

  // New: Batched Pokemon details fetching with controlled parallel chunking to avoid overwhelming PokeAPI
  async getPokemonBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Pokemon[]> {
    // Create all chunks first
    const chunks: (string | number)[][] = [];
    for (let i = 0; i < namesOrIds.length; i += chunkSize) {
      chunks.push(namesOrIds.slice(i, i + chunkSize));
    }

    // Process chunks with controlled concurrency to avoid overwhelming PokeAPI
    const results: Pokemon[] = [];
    const maxConcurrentChunks = 4; // Limit to 4 concurrent chunks to avoid resource exhaustion
    const delayBetweenBatches = 50; // 50ms delay between batches

    for (let i = 0; i < chunks.length; i += maxConcurrentChunks) {
      const batch = chunks.slice(i, i + maxConcurrentChunks);

      // Process this batch of chunks in parallel
      const batchPromises = batch.map(chunk => {
        const pokemonPromises = chunk.map(id => this.getPokemon(id));
        return Promise.all(pokemonPromises);
      });

      // Wait for this batch to complete
      const batchResults = await Promise.all(batchPromises);

      // Flatten and add results
      results.push(...batchResults.flat());

      // Add delay between batches (except for the last batch)
      if (i + maxConcurrentChunks < chunks.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    return results;
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
  async getPokemonSpeciesList(
    limit: number = 1025,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-species?limit=${limit}&offset=${offset}`);
  },

  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    return fetchAPI<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
  },

  async getPokemonSpeciesBatch(namesOrIds: (string | number)[]): Promise<PokemonSpecies[]> {
    const promises = namesOrIds.map(id => this.getPokemonSpecies(id));
    return Promise.all(promises);
  },

  // New: Paginated Pokemon Species fetching
  async getPokemonSpeciesPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-species?limit=${limit}&offset=${offset}`);
  },

  // New: Batched Pokemon Species details fetching with chunking
  async getPokemonSpeciesBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<PokemonSpecies[]> {
    const results: PokemonSpecies[] = [];

    for (let i = 0; i < namesOrIds.length; i += chunkSize) {
      const chunk = namesOrIds.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(id => this.getPokemonSpecies(id));
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    return results;
  },

  // Pokemon Form endpoints
  async getPokemonFormsList(
    limit: number = 1527,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-form?limit=${limit}&offset=${offset}`);
  },

  async getPokemonForm(nameOrId: string | number): Promise<PokemonForm> {
    return fetchAPI<PokemonForm>(`/pokemon-form/${nameOrId}`);
  },

  async getPokemonFormsBatch(namesOrIds: (string | number)[]): Promise<PokemonForm[]> {
    const promises = namesOrIds.map(id => this.getPokemonForm(id));
    return Promise.all(promises);
  },

  // New: Paginated Pokemon Forms fetching
  async getPokemonFormsPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-form?limit=${limit}&offset=${offset}`);
  },

  // New: Batched Pokemon Forms details fetching with chunking
  async getPokemonFormsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<PokemonForm[]> {
    const results: PokemonForm[] = [];

    for (let i = 0; i < namesOrIds.length; i += chunkSize) {
      const chunk = namesOrIds.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(id => this.getPokemonForm(id));
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    return results;
  },

  // Pokemon Habitat endpoints
  async getPokemonHabitats(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-habitat`);
  },

  async getPokemonHabitat(nameOrId: string | number): Promise<PokemonHabitat> {
    return fetchAPI<PokemonHabitat>(`/pokemon-habitat/${nameOrId}`);
  },

  // Pokemon Shape endpoints
  async getPokemonShapes(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-shape`);
  },

  async getPokemonShape(nameOrId: string | number): Promise<PokemonShape> {
    return fetchAPI<PokemonShape>(`/pokemon-shape/${nameOrId}`);
  },

  // Pokemon Color endpoints
  async getPokemonColors(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokemon-color`);
  },

  async getPokemonColor(nameOrId: string | number): Promise<PokemonColor> {
    return fetchAPI<PokemonColor>(`/pokemon-color/${nameOrId}`);
  },

  // Evolution Chain endpoints
  async getEvolutionChain(id: number): Promise<EvolutionChain> {
    return fetchAPI<EvolutionChain>(`/evolution-chain/${id}`);
  },

  // Move endpoints
  async getMove(nameOrId: string | number): Promise<Move> {
    return fetchAPI<Move>(`/move/${nameOrId}`);
  },

  // Berry endpoints
  async getBerries(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    // First get the count, then fetch all berries
    const berryCount = await fetchAPI<{ count: number }>(`/berry?limit=1`);
    return fetchAPI<{ count: number; results: { name: string; url: string }[] }>(`/berry?limit=${berryCount.count}`);
  },

  async getBerry(nameOrId: string | number): Promise<Berry> {
    return fetchAPI<Berry>(`/berry/${nameOrId}`);
  },

  // New: Paginated Berries fetching
  async getBerriesPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/berry?limit=${limit}&offset=${offset}`);
  },

  // New: Batched Berries details fetching with chunking
  async getBerriesBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Berry[]> {
    const results: Berry[] = [];

    for (let i = 0; i < namesOrIds.length; i += chunkSize) {
      const chunk = namesOrIds.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(id => this.getBerry(id));
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    return results;
  },

  async getBerryFirmness(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/berry-firmness`);
  },

  async getBerryFirmnessById(nameOrId: string | number): Promise<BerryFirmness> {
    return fetchAPI<BerryFirmness>(`/berry-firmness/${nameOrId}`);
  },

  async getBerryFlavors(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/berry-flavor`);
  },

  async getBerryFlavor(nameOrId: string | number): Promise<BerryFlavor> {
    return fetchAPI<BerryFlavor>(`/berry-flavor/${nameOrId}`);
  },

  // Item endpoints
  async getItems(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    // First get the count, then fetch all items
    const itemCount = await fetchAPI<{ count: number }>(`/item?limit=1`);
    return fetchAPI<{ count: number; results: { name: string; url: string }[] }>(`/item?limit=${itemCount.count}`);
  },

  async getItem(nameOrId: string | number): Promise<Item> {
    return fetchAPI<Item>(`/item/${nameOrId}`);
  },

  // New: Paginated Items fetching
  async getItemsPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/item?limit=${limit}&offset=${offset}`);
  },

  // New: Batched Items details fetching with chunking
  async getItemsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Item[]> {
    const results: Item[] = [];

    for (let i = 0; i < namesOrIds.length; i += chunkSize) {
      const chunk = namesOrIds.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(id => this.getItem(id));
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    return results;
  },

  async getItemCategories(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/item-category`);
  },

  async getItemCategory(nameOrId: string | number): Promise<ItemCategory> {
    return fetchAPI<ItemCategory>(`/item-category/${nameOrId}`);
  },

  // Machine endpoints
  async getMachines(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/machine`);
  },

  async getMachine(nameOrId: string | number): Promise<Machine> {
    return fetchAPI<Machine>(`/machine/${nameOrId}`);
  },

  // Location endpoints
  async getLocations(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    // First get the count, then fetch all locations
    const locationCount = await fetchAPI<{ count: number }>(`/location?limit=1`);
    return fetchAPI<{ count: number; results: { name: string; url: string }[] }>(`/location?limit=${locationCount.count}`);
  },

  async getLocation(nameOrId: string | number): Promise<Location> {
    return fetchAPI<Location>(`/location/${nameOrId}`);
  },

  // New: Paginated Locations fetching
  async getLocationsPaginated(
    limit: number = 50,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/location?limit=${limit}&offset=${offset}`);
  },

  // New: Batched Locations details fetching with chunking
  async getLocationsBatchChunked(namesOrIds: (string | number)[], chunkSize: number = 50): Promise<Location[]> {
    const results: Location[] = [];

    for (let i = 0; i < namesOrIds.length; i += chunkSize) {
      const chunk = namesOrIds.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(id => this.getLocation(id));
      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    return results;
  },

  async getLocationAreas(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/location-area`);
  },

  async getLocationArea(nameOrId: string | number): Promise<LocationArea> {
    return fetchAPI<LocationArea>(`/location-area/${nameOrId}`);
  },

  // Region endpoints
  async getRegions(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/region`);
  },

  async getRegion(nameOrId: string | number): Promise<Region> {
    return fetchAPI<Region>(`/region/${nameOrId}`);
  },

  // Pokedex endpoints
  async getPokedexes(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/pokedex`);
  },

  async getPokedex(nameOrId: string | number): Promise<Pokedex> {
    return fetchAPI<Pokedex>(`/pokedex/${nameOrId}`);
  },

  // Version endpoints
  async getVersions(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/version`);
  },

  async getVersion(nameOrId: string | number): Promise<Version> {
    return fetchAPI<Version>(`/version/${nameOrId}`);
  },

  // Version Group endpoints
  async getVersionGroups(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/version-group`);
  },

  async getVersionGroup(nameOrId: string | number): Promise<VersionGroup> {
    return fetchAPI<VersionGroup>(`/version-group/${nameOrId}`);
  },

  // Encounter endpoints
  async getEncounterMethods(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/encounter-method`);
  },

  async getEncounterMethod(nameOrId: string | number): Promise<EncounterMethod> {
    return fetchAPI<EncounterMethod>(`/encounter-method/${nameOrId}`);
  },

  async getEncounterConditions(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/encounter-condition`);
  },

  async getEncounterCondition(nameOrId: string | number): Promise<EncounterCondition> {
    return fetchAPI<EncounterCondition>(`/encounter-condition/${nameOrId}`);
  },

  // Evolution endpoints
  async getEvolutionTriggers(): Promise<{
    count: number;
    results: { name: string; url: string }[];
  }> {
    return fetchAPI(`/evolution-trigger`);
  },

  async getEvolutionTrigger(nameOrId: string | number): Promise<EvolutionTrigger> {
    return fetchAPI<EvolutionTrigger>(`/evolution-trigger/${nameOrId}`);
  },

  // Utility functions
  extractIdFromUrl(url: string): number {
    if (!url) return 0;
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : 0;
  },

  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },
};

export { PokeAPIError };
