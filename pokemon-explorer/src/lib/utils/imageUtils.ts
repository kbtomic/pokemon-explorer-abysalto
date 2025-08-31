import { ImageType } from '@/lib/constants/enums';

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
