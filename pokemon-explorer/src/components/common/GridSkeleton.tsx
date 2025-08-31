import { getOptimalGridColumns } from '@/lib/utils/ui/gridLayout';
import { Theme } from '@/lib/constants/enums';

interface GridSkeletonProps {
  itemCount?: number;
  theme?: Theme;
  className?: string;
}

const themeColors = {
  [Theme.GREEN]: {
    bg: 'bg-green-200',
    border: 'border-green-200',
  },
  [Theme.RED]: {
    bg: 'bg-red-200',
    border: 'border-red-200',
  },
  [Theme.BLUE]: {
    bg: 'bg-blue-200',
    border: 'border-blue-200',
  },
  [Theme.GRAY]: {
    bg: 'bg-gray-200',
    border: 'border-gray-200',
  },
};

export function GridSkeleton({ itemCount = 12, theme = Theme.GRAY, className = '' }: GridSkeletonProps) {
  const gridColumns = getOptimalGridColumns(itemCount);
  const colors = themeColors[theme];

  return (
    <div className={`grid ${gridColumns} gap-4 ${className}`}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex flex-col items-center space-y-3">
            <div className={`w-16 h-16 ${colors.bg} rounded-full animate-pulse`}></div>
            <div className={`w-20 h-4 ${colors.bg} rounded animate-pulse`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
