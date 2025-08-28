// Known Pokemon type colors (from official sources)
const KNOWN_TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

// Generate a consistent color for unknown types based on the type name
function generateTypeColor(typeName: string): string {
  // Create a hash from the type name to ensure consistent colors
  let hash = 0;
  for (let i = 0; i < typeName.length; i++) {
    const char = typeName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use the hash to generate HSL values
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash) % 20); // 60-80% saturation
  const lightness = 45 + (Math.abs(hash) % 15); // 45-60% lightness

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Get the color for a Pokemon type
 * @param typeName - The name of the Pokemon type
 * @returns The hex color for the type, or a generated color if not in known types
 */
export function getTypeColor(typeName: string): string {
  const normalizedTypeName = typeName.toLowerCase();

  // Return known color if available
  if (KNOWN_TYPE_COLORS[normalizedTypeName]) {
    return KNOWN_TYPE_COLORS[normalizedTypeName];
  }

  // Generate color for unknown types
  return generateTypeColor(normalizedTypeName);
}

/**
 * Get all known type colors
 * @returns Object with type names as keys and colors as values
 */
export function getKnownTypeColors(): Record<string, string> {
  return { ...KNOWN_TYPE_COLORS };
}

/**
 * Check if a type has a known color
 * @param typeName - The name of the Pokemon type
 * @returns True if the type has a known color, false otherwise
 */
export function hasKnownTypeColor(typeName: string): boolean {
  return typeName.toLowerCase() in KNOWN_TYPE_COLORS;
}
