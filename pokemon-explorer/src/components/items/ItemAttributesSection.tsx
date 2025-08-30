import { ContentSection } from '@/components/common/ContentSection';
import { formatName } from '@/lib/utils/dataUtils';
import type { Item } from '@/types/pokemon';

interface ItemAttributesSectionProps {
  item: Item;
}

export function ItemAttributesSection({ item }: ItemAttributesSectionProps) {
  if (!item.attributes || item.attributes.length === 0) return null;

  return (
    <ContentSection title="Attributes">
      <div className="flex flex-wrap gap-2">
        {item.attributes.map((attr, index) => (
          <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full capitalize">
            {formatName(attr.name)}
          </span>
        ))}
      </div>
    </ContentSection>
  );
}
