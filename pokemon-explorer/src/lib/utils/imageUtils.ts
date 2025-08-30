import { ImageType } from '@/lib/constants/enums';

// Generic image URL utilities

export function getImageUrl(itemName: string, type: ImageType = ImageType.ITEM): string {
  const baseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items';

  if (type === ImageType.BERRY) {
    return `${baseUrl}/${itemName}-berry.png`;
  }

  return `${baseUrl}/${itemName}.png`;
}
