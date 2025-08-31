import { getItemIcon } from '@/lib/utils/items/itemIcons';
import { formatName } from '@/lib/utils/formatting/stringUtils';

interface ItemCategoryDisplayProps {
  item: { category?: { name: string } };
}

export function ItemCategoryDisplay({ item }: ItemCategoryDisplayProps) {
  if (!item.category) return null;

  const { icon: IconComponent, className } = getItemIcon(item.category.name);

  return (
    <>
      <IconComponent className={className} />
      <span className="text-sm text-white capitalize">{formatName(item.category.name)}</span>
    </>
  );
}
