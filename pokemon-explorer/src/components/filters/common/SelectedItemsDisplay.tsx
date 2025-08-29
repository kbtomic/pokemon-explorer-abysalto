import { FilterItem } from '../types';
import { SelectedItemBadge } from './SelectedItemBadge';

interface SelectedItemsDisplayProps {
  selectedItems: (string | number)[];
  items: FilterItem[];
  onToggle: (itemId: string | number) => void;
  getItemColor?: (item: FilterItem) => string;
  getItemDisplayName?: (item: FilterItem) => string;
  useTypeVariant?: boolean;
}

export function SelectedItemsDisplay({
  selectedItems,
  items,
  onToggle,
  getItemColor,
  getItemDisplayName = item => item.name,
  useTypeVariant = false,
}: SelectedItemsDisplayProps) {
  if (selectedItems.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-red-200">
      <div className="flex flex-wrap gap-2">
        {selectedItems.map(itemId => {
          const item = items.find(i => i.id === itemId);
          if (!item) return null;

          const displayName = getItemDisplayName(item);
          const color = getItemColor ? getItemColor(item) : undefined;
          const variant = useTypeVariant ? 'type' : 'default';

          return (
            <SelectedItemBadge key={itemId} onRemove={() => onToggle(itemId)} variant={variant} color={color} displayName={displayName} />
          );
        })}
      </div>
    </div>
  );
}
