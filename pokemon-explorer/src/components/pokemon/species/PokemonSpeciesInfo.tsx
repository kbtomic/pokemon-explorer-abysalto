import { PokemonSpecies } from '@/types/pokemon';
import { ContentSectionTitle, CharacteristicLabel, BiologyLabel, SpecialCategoryLabel, BadgeColor } from '@/lib/constants/enums';
import { InfoCard } from '@/components/pokemon/species/InfoCard';
import { InfoGrid } from '@/components/pokemon/species/InfoGrid';
import { InfoSection } from '@/components/pokemon/species/InfoSection';
import { Badge } from '@/components/pokemon/species/Badge';
import { formatGeneration, formatHabitat, formatShape, formatColor, formatGenderRate, formatEggGroup } from '@/lib/utils/speciesUtils';

interface PokemonSpeciesInfoProps {
  species: PokemonSpecies;
}

export function PokemonSpeciesInfo({ species }: PokemonSpeciesInfoProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 space-y-6">
      <InfoSection title={ContentSectionTitle.CHARACTERISTICS}>
        <InfoGrid>
          <InfoCard label={CharacteristicLabel.GENERATION} value={formatGeneration(species.generation)} />
          <InfoCard label={CharacteristicLabel.HABITAT} value={formatHabitat(species.habitat)} />
          <InfoCard label={CharacteristicLabel.SHAPE} value={formatShape(species.shape)} />
          <InfoCard label={CharacteristicLabel.COLOR} value={formatColor(species.color)} />
        </InfoGrid>
      </InfoSection>

      <InfoSection title={ContentSectionTitle.BIOLOGY}>
        <InfoGrid>
          <InfoCard label={BiologyLabel.CAPTURE_RATE} value={`${species.capture_rate}/255`} />
          <InfoCard label={BiologyLabel.BASE_HAPPINESS} value={`${species.base_happiness}/255`} />
          <InfoCard label={BiologyLabel.HATCH_COUNTER} value={`${species.hatch_counter} cycles`} />
          <InfoCard label={BiologyLabel.GENDER_RATE} value={formatGenderRate(species.gender_rate)} />
        </InfoGrid>
      </InfoSection>

      {species.egg_groups.length > 0 && (
        <InfoSection title={ContentSectionTitle.EGG_GROUPS}>
          <div className="flex flex-wrap gap-2">
            {species.egg_groups.map(group => (
              <Badge key={group.name} variant={BadgeColor.RED}>
                {formatEggGroup(group.name)}
              </Badge>
            ))}
          </div>
        </InfoSection>
      )}

      <InfoSection title={ContentSectionTitle.RARITY}>
        <div className="flex flex-wrap gap-2">
          {species.is_baby && <Badge variant={BadgeColor.PINK}>{SpecialCategoryLabel.BABY_POKEMON}</Badge>}
          {species.is_legendary && <Badge variant={BadgeColor.YELLOW}>{SpecialCategoryLabel.LEGENDARY}</Badge>}
          {species.is_mythical && <Badge variant={BadgeColor.PURPLE}>{SpecialCategoryLabel.MYTHICAL}</Badge>}
        </div>
      </InfoSection>
    </div>
  );
}
