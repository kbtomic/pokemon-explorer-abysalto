import { ImageType, PokemonImageVariant } from '@/lib/constants/enums';
import { Pokemon } from '@/types/pokemon/core';

// Generic image URL utilities

export function getImageUrl(itemName: string, type: ImageType = ImageType.ITEM): string | null {
  const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items';

  if (type === ImageType.BERRY) {
    return `${baseUrl}/${itemName}-berry.png`;
  }

  if (type === ImageType.LOCATION) {
    // For locations, return null to use the fallback icon in DataCard
    // This avoids image loading issues and provides consistent styling
    return null;
  }

  return `${baseUrl}/${itemName}.png`;
}

/**
 * Gets the image URL for a Pokemon
 *
 * @param pokemonOrId - Either a Pokemon object or a Pokemon ID number
 * @param variant - The image variant to return (default or shiny)
 * @returns The image URL or null if no image is available
 *
 * When a Pokemon object is provided, it uses the actual sprite data from the API
 * with fallbacks to ensure an image is returned. When only an ID is provided,
 * it constructs a direct URL to the PokeAPI sprites repository as a fallback
 * for cases where you don't have the full Pokemon data but still need an image.
 */
export function getPokemonImageUrl(
  pokemonOrId: Pokemon | number,
  variant: PokemonImageVariant = PokemonImageVariant.DEFAULT
): string | null {
  const pokemon = typeof pokemonOrId === 'number' ? null : pokemonOrId;
  const id = typeof pokemonOrId === 'number' ? pokemonOrId : pokemonOrId.id;

  if (!pokemon) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  const artwork = pokemon.sprites.other['official-artwork'];
  if (variant === PokemonImageVariant.SHINY) {
    return artwork.front_shiny || null;
  }
  return artwork.front_default || pokemon.sprites.front_default || null;
}
