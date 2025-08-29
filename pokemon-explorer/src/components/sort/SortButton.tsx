import { SortOption } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { getSortOptionLabel } from '@/lib/utils/sortOptions';

interface SortButtonProps {
  currentSort: SortOption;
  onClick: () => void;
  className?: string;
}

export function SortButton({ currentSort, onClick, className = '' }: SortButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`flex items-center space-x-2 border-red-300 text-red-600 hover:bg-red-50 ${className}`}
    >
      <ArrowUpDown className="h-4 w-4" />
      <span>{getSortOptionLabel(currentSort.field)}</span>
    </Button>
  );
}
