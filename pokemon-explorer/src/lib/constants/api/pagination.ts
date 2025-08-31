// ============================================================================
// PAGINATION CONFIGURATION
// ============================================================================

export const DEFAULT_ITEMS_PER_PAGE = 50;

// ============================================================================
// API CHUNKING CONFIGURATION
// ============================================================================

// Optimized chunk size for parallel Pokemon fetching
// With 1302 Pokemon and chunk size of 50, we get ~26 parallel requests
// Reduced from 100 to 50 to reduce load per request and avoid overwhelming PokeAPI
export const POKEMON_CHUNK_SIZE = 100;
