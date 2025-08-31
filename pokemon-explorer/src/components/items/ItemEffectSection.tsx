import { ContentSection } from '@/components/common/ContentSection';
import type { Item } from '@/types/items/items';
import { ContentSectionTitle } from '@/lib/constants/ui/content';

interface ItemEffectSectionProps {
  item: Item;
}

export function ItemEffectSection({ item }: ItemEffectSectionProps) {
  return (
    <>
      {/* Description */}
      {item.effect_entries && item.effect_entries.length > 0 && (
        <ContentSection title={ContentSectionTitle.EFFECT}>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white">
              {item.effect_entries.find(entry => entry.language.name === 'en')?.effect || 'No description available.'}
            </p>
          </div>
        </ContentSection>
      )}

      {/* Flavor Text */}
      {item.flavor_text_entries && item.flavor_text_entries.length > 0 && (
        <ContentSection title={ContentSectionTitle.IN_GAME_DESCRIPTION}>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white italic">
              &ldquo;
              {item.flavor_text_entries.find(entry => entry.language.name === 'en' && entry.version_group.name === 'sword-shield')?.text ||
                item.flavor_text_entries.find(entry => entry.language.name === 'en')?.text ||
                'No flavor text available.'}
              &rdquo;
            </p>
          </div>
        </ContentSection>
      )}
    </>
  );
}
