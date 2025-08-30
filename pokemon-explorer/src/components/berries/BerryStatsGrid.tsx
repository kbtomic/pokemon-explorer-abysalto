import { cn } from '@/lib/utils';

interface BerryStat {
  label: string;
  value: string | number;
}

interface BerryStatsGridProps {
  stats: BerryStat[];
  className?: string;
}

export function BerryStatsGrid({ stats, className = '' }: BerryStatsGridProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4 mb-4', className)}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
