import { ContentSection } from '@/components/common/ContentSection';
import type { Item } from '@/types/items/items';

interface ItemMachinesSectionProps {
  item: Item;
}

export function ItemMachinesSection({ item }: ItemMachinesSectionProps) {
  if (!item.machines || item.machines.length === 0) return null;

  return (
    <ContentSection title="Machine Information">
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-800">This item teaches a move to Pokemon. Available in {item.machines.length} version(s).</p>
      </div>
    </ContentSection>
  );
}
