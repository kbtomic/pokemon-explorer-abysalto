'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface PageHeaderProps {
  title: string;
  icon?: ReactNode;
  description?: string;
  stats?: {
    isLoading?: boolean;
    totalItems: number;
    itemName: string;
    isFiltered?: boolean;
  };
  className?: string;
}

export function PageHeader({ title, icon, description, stats, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 flex items-center gap-3">
          {icon}
          {title}
        </h2>
        {stats && (
          <div className="text-sm sm:text-base text-red-500">
            {stats.isLoading ? 'Loading...' : `${stats.totalItems} ${stats.itemName} found`}
            {stats.isFiltered && ' (filtered)'}
          </div>
        )}
      </div>
      {description && <p className="text-sm sm:text-base text-gray-600 mt-2">{description}</p>}
    </div>
  );
}
