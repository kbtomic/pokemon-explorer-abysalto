import { Ability } from '@/types';
import { getEnglishAbilityEffect } from '@/lib/utils/pokemon/abilityUtils';
import { LabelValuePair } from '@/components/common/LabelValuePair';
import { ContentSectionTitle } from '@/lib/constants/enums';

interface AbilityMetadataProps {
  abilityData: Ability;
}

export function AbilityMetadata({ abilityData }: AbilityMetadataProps) {
  const effect = getEnglishAbilityEffect(abilityData);

  return (
    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
      <LabelValuePair label={ContentSectionTitle.ABILITY_ID} value={`#${abilityData.id.toString().padStart(3, '0')}`} />
      <LabelValuePair label={ContentSectionTitle.EFFECT} value={effect || 'No effect description available'} />
    </div>
  );
}
