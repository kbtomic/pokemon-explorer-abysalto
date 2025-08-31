import type { Ability } from '@/types';
import { LanguageCode, VersionGroup } from '@/lib/constants/enums';

// Utility function to get English ability effect
export function getEnglishAbilityEffect(ability: Ability): string {
  const englishEntry = ability.effect_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.effect || 'No description available.';
}

// Utility function to get English ability flavor text
export function getEnglishAbilityFlavorText(ability: Ability): string {
  const englishEntry =
    ability.flavor_text_entries.find(
      entry => entry.language.name === LanguageCode.ENGLISH && entry.version_group.name === VersionGroup.SWORD_SHIELD
    ) || ability.flavor_text_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.flavor_text || '';
}
