import type { Ability } from '@/types/pokemon/abilities';
import { LanguageCode, VersionGroup } from '@/lib/constants/enums';

export function getEnglishAbilityEffect(ability: Ability): string {
  const englishEntry = ability.effect_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.effect || 'No description available.';
}

export function getEnglishAbilityFlavorText(ability: Ability): string {
  const englishEntry =
    ability.flavor_text_entries.find(
      entry => entry.language.name === LanguageCode.ENGLISH && entry.version_group.name === VersionGroup.SWORD_SHIELD
    ) || ability.flavor_text_entries.find(entry => entry.language.name === LanguageCode.ENGLISH);
  return englishEntry?.flavor_text || '';
}
