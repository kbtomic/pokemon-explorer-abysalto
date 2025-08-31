import { ContentSection } from '@/components/common/ContentSection';
import { formatName } from '@/lib/utils/formatting/stringUtils';
import type { Item } from '@/types/pokemon';

interface ItemHeldBySectionProps {
  item: Item;
}

export function ItemHeldBySection({ item }: ItemHeldBySectionProps) {
  if (!item.held_by_pokemon || item.held_by_pokemon.length === 0) return null;

  return (
    <ContentSection title="Held By Pokemon">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {item.held_by_pokemon.slice(0, 10).map((held, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="font-medium text-white capitalize">{formatName(held.pokemon.name)}</span>
            <span className="text-sm text-white/80">Rarity: {held.version_details[0]?.rarity || 'Unknown'}%</span>
          </div>
        ))}
      </div>
      {item.held_by_pokemon.length > 10 && (
        <p className="text-sm text-white/80 mt-2">And {item.held_by_pokemon.length - 10} more Pokemon...</p>
      )}
    </ContentSection>
  );
}
