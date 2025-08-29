import { Button } from '@/components/ui/button';
import { ButtonSize, ButtonVariant } from '@/types/enums';

interface FilterHeaderProps {
  title: string;
  selectedCount: number;
  onClearAll: () => void;
  titleColor?: string;
}

export function FilterHeader({ title, selectedCount, onClearAll, titleColor = 'text-red-600' }: FilterHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className={`font-semibold ${titleColor}`}>Filter by {title}</h3>
      <Button
        variant={ButtonVariant.DESTRUCTIVE}
        size={ButtonSize.SM}
        onClick={onClearAll}
        className={`text-white hover:bg-red-50 transition-opacity duration-200 ${
          selectedCount > 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        Clear All
      </Button>
    </div>
  );
}
