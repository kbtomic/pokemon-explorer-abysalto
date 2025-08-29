import { X } from 'lucide-react';

interface SelectedItemBadgeProps {
  onRemove: () => void;
  variant: 'type' | 'default';
  color?: string;
  displayName: string;
}

export function SelectedItemBadge({ onRemove, variant, color, displayName }: SelectedItemBadgeProps) {
  if (variant === 'type' && color) {
    return (
      <span
        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white border shadow-sm"
        style={{ backgroundColor: color }}
      >
        {displayName}
        <button onClick={onRemove} className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer">
          <X className="h-3 w-3 text-white" />
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white border border-red-300 shadow-sm">
      {displayName}
      <button onClick={onRemove} className="ml-1 hover:bg-red-700 rounded-full p-0.5 transition-colors cursor-pointer">
        <X className="h-3 w-3 text-white" />
      </button>
    </span>
  );
}
