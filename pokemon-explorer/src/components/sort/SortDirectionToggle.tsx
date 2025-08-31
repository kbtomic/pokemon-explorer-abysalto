import { SortOption } from '@/types/ui/filters';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { SortDirection } from '@/lib/constants/pokemon/sorting';
import { ButtonVariant, ButtonSize } from '@/lib/constants/ui/buttons';

interface SortDirectionToggleProps {
  direction: SortOption['direction'];
  onToggle: () => void;
  className?: string;
}

export function SortDirectionToggle({ direction, onToggle, className = '' }: SortDirectionToggleProps) {
  return (
    <Button
      variant={ButtonVariant.OUTLINE}
      size={ButtonSize.SM}
      onClick={onToggle}
      className={`border-red-300 text-red-600 hover:bg-red-50 ${className}`}
    >
      {direction === SortDirection.ASC ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
    </Button>
  );
}
