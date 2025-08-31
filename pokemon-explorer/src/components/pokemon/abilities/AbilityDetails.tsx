import { Ability } from '@/types/pokemon/abilities';
import { getEnglishAbilityEffect, getEnglishAbilityFlavorText } from '@/lib/utils/pokemon/abilityUtils';
import { AbilityContentSection } from '@/components/pokemon/abilities/AbilityContentSection';
import { AbilityMetadata } from '@/components/pokemon/abilities/AbilityMetadata';
import { ContentSectionTitle } from '@/lib/constants/ui/content';

interface AbilityDetailsProps {
  abilityData: Ability;
}

export function AbilityDetails({ abilityData }: AbilityDetailsProps) {
  const effect = getEnglishAbilityEffect(abilityData);
  const flavorText = getEnglishAbilityFlavorText(abilityData);

  return (
    <div className="space-y-3">
      <AbilityContentSection title={ContentSectionTitle.EFFECT} content={effect} />
      <AbilityContentSection title={ContentSectionTitle.IN_GAME_DESCRIPTION} content={flavorText} isItalic />
      <AbilityMetadata abilityData={abilityData} />
    </div>
  );
}
