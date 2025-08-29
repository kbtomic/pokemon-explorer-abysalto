import { Generation } from '@/types';

// Cache for generation mappings to avoid recalculating
let generationMappingCache: Map<number, number> | null = null;

/**
 * Creates a mapping of Pokemon ID to generation using actual PokeAPI data
 * @param generations Array of generation data from PokeAPI
 * @returns Map of Pokemon ID to generation number
 */
export function createGenerationMapping(generations: Generation[]): Map<number, number> {
  const mapping = new Map<number, number>();

  // Sort generations by ID to ensure correct order
  const sortedGenerations = [...generations].sort((a, b) => a.id - b.id);

  // Process each generation
  sortedGenerations.forEach(generation => {
    generation.pokemon_species.forEach(species => {
      // Extract Pokemon ID from species URL
      const match = species.url.match(/\/pokemon-species\/(\d+)\//);
      if (match) {
        const pokemonId = parseInt(match[1], 10);
        mapping.set(pokemonId, generation.id);
      }
    });
  });

  return mapping;
}

/**
 * Gets the generation for a Pokemon ID using cached mapping
 * @param pokemonId The Pokemon ID
 * @param generations Array of generation data from PokeAPI
 * @returns Generation number, or null if not found
 */
export function getGenerationFromId(pokemonId: number, generations: Generation[]): number | null {
  // Create or use cached mapping
  if (!generationMappingCache) {
    generationMappingCache = createGenerationMapping(generations);
  }

  return generationMappingCache.get(pokemonId) || null;
}

/**
 * Clears the generation mapping cache (useful for testing or when data changes)
 */
export function clearGenerationMappingCache(): void {
  generationMappingCache = null;
}

/**
 * Gets the maximum Pokemon ID for a given generation
 * @param generationId The generation ID
 * @param generations Array of generation data from PokeAPI
 * @returns Maximum Pokemon ID in that generation, or null if not found
 */
export function getMaxPokemonIdForGeneration(generationId: number, generations: Generation[]): number | null {
  const generation = generations.find(g => g.id === generationId);
  if (!generation) return null;

  let maxId = 0;
  generation.pokemon_species.forEach(species => {
    const match = species.url.match(/\/pokemon-species\/(\d+)\//);
    if (match) {
      const pokemonId = parseInt(match[1], 10);
      maxId = Math.max(maxId, pokemonId);
    }
  });

  return maxId > 0 ? maxId : null;
}
