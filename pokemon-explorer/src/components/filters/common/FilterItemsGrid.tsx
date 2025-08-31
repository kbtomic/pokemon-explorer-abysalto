import { Button } from '@/components/ui/Button';
import { FilterItem } from '@/types/ui/filters';
import { ButtonVariant } from '@/lib/constants/ui/buttons';

interface FilterItemsGridProps {
  items: FilterItem[];
  selectedItems: (string | number)[];
  onToggle: (itemId: string | number) => void;
  getItemColor?: (item: FilterItem) => string;
  getItemDisplayName?: (item: FilterItem) => string;
  gridCols?: number;
  useTypeVariant?: boolean;
}

export function FilterItemsGrid({
  items,
  selectedItems,
  onToggle,
  getItemColor,
  getItemDisplayName = item => item.name,
  gridCols = 3,
  useTypeVariant = false,
}: FilterItemsGridProps) {
  const isItemSelected = (itemId: string | number) => selectedItems.includes(itemId);

  return (
    <div className={`grid gap-2 ${gridCols === 1 ? 'grid-cols-1' : gridCols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {items.map(item => {
        const isSelected = isItemSelected(item.id);
        const displayName = getItemDisplayName(item);
        const color = getItemColor ? getItemColor(item) : undefined;

        if (useTypeVariant) {
          return (
            <Button
              key={item.id}
              variant={ButtonVariant.TYPE}
              onClick={() => onToggle(item.id)}
              typeColor={color}
              isSelected={isSelected}
              className="capitalize"
            >
              {displayName}
            </Button>
          );
        }

        return (
          <Button
            key={item.id}
            variant={isSelected ? ButtonVariant.DEFAULT : ButtonVariant.OUTLINE}
            onClick={() => onToggle(item.id)}
            className="capitalize"
          >
            {displayName}
          </Button>
        );
      })}
    </div>
  );
}
