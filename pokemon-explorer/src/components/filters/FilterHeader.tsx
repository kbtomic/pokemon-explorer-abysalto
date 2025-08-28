import { Button } from '@/components/ui/button';

interface FilterHeaderProps {
  title: string;
  selectedCount: number;
  onClearAll: () => void;
}

export function FilterHeader({ title, selectedCount, onClearAll }: FilterHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-red-600">Filter by {title}</h3>
      <Button
        variant="destructive"
        size="sm"
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
