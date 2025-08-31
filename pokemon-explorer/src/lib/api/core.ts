export const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokeAPIError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'PokeAPIError';
  }
}

export async function fetchAPI<T>(endpoint: string, retries: number = 3): Promise<T> {
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
export async function getAllItems<T extends { count?: number; results?: unknown[] }>(endpoint: string): Promise<T> {
  const response = await fetchAPI<T>(endpoint);

  // Check if we need to fetch more items
  if (response.count && response.results && response.count > response.results.length) {
    return fetchAPI<T>(`${endpoint}?limit=${response.count}`);
  }

  return response;
}

// Utility functions
export function extractIdFromUrl(url: string): number {
  if (!url) return 0;
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

// Generic batched fetching with controlled parallel chunking
export async function getBatchChunked<T>(
  namesOrIds: (string | number)[],
  fetchFunction: (id: string | number) => Promise<T>,
  chunkSize: number = 50,
  maxConcurrentChunks: number = 4,
  delayBetweenBatches: number = 50
): Promise<T[]> {
  // Create all chunks first
  const chunks: (string | number)[][] = [];
  for (let i = 0; i < namesOrIds.length; i += chunkSize) {
    chunks.push(namesOrIds.slice(i, i + chunkSize));
  }

  // Process chunks with controlled concurrency
  const results: T[] = [];

  for (let i = 0; i < chunks.length; i += maxConcurrentChunks) {
    const batch = chunks.slice(i, i + maxConcurrentChunks);

    // Process this batch of chunks in parallel
    const batchPromises = batch.map(chunk => {
      const itemPromises = chunk.map(id => fetchFunction(id));
      return Promise.all(itemPromises);
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
}
