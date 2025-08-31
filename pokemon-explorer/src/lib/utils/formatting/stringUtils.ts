/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format name by replacing hyphens with spaces
 * @param name - The name to format
 * @returns The formatted name with spaces instead of hyphens
 */
export function formatName(name: string): string {
  return name.replace(/-/g, ' ');
}

/**
 * Format name by replacing hyphens with spaces and capitalizing first letter of each word
 * @param name - The name to format
 * @returns The formatted name with spaces and capitalized words
 */
export function formatNameCapitalized(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Format ability name by replacing hyphens with spaces and capitalizing first letter of each word
 * @param name - The ability name to format
 * @returns The formatted ability name with spaces and capitalized words
 */
export function formatAbilityName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
