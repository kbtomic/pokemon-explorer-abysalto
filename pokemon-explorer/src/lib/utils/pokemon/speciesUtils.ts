import type { PokemonSpecies } from '@/types/pokemon/species';
import { LanguageCode } from '@/lib/constants/pokemon/species';

export const formatGeneration = (generation: { name: string } | null): string => {
  if (!generation) return 'Unknown';
  return generation.name.replace('generation-', '').toUpperCase();
};

export const formatHabitat = (habitat: { name: string } | null): string => {
  if (!habitat) return 'Unknown';
  return habitat.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatShape = (shape: { name: string } | null): string => {
  if (!shape) return 'Unknown';
  return shape.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatColor = (color: { name: string } | null): string => {
  if (!color) return 'Unknown';
  return color.name.replace(/\b\w/g, l => l.toUpperCase());
};

export const formatGenderRate = (genderRate: number): string => {
  if (genderRate === -1) return 'Genderless';
  const femalePercentage = (genderRate / 8) * 100;
  const malePercentage = 100 - femalePercentage;
  return `${malePercentage.toFixed(1)}% Male, ${femalePercentage.toFixed(1)}% Female`;
};

export const formatEggGroup = (eggGroupName: string): string => {
  return eggGroupName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Utility function to get English flavor text
export function getEnglishFlavorText(species: PokemonSpecies): string {
  const englishEntry = species.flavor_text_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.flavor_text || 'No description available.';
}

// Utility function to get English genus
export function getEnglishGenus(species: PokemonSpecies): string {
  const englishEntry = species.genera.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.genus || 'Unknown';
}

// Utility function to get English name
export function getEnglishName(species: PokemonSpecies): string {
  const englishEntry = species.names.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.name || species.name;
}
