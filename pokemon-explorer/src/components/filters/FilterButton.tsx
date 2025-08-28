import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterButtonProps {
  title: string;
  selectedCount: number;
  badgeColor: string;
  onClick: () => void;
  className?: string;
}

export function FilterButton({ title, selectedCount, badgeColor, onClick, className = '' }: FilterButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`flex items-center space-x-2 border-red-300 text-red-600 hover:bg-red-50 ${className}`}
    >
      <Filter className="h-4 w-4" />
      <span>{title}</span>
      <span
        className={`${badgeColor} text-white text-xs rounded-full px-2 py-1 w-8 text-center transition-opacity duration-200 ${
          selectedCount > 0 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {selectedCount}
      </span>
    </Button>
  );
}
